import {
  Modal,
  FormField,
  Input,
  Box,
  SpaceBetween,
  ColumnLayout,
  Button,
  Autosuggest,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";

const initialForm = {
  investigador_id: null,
  facultad_id: null,
  apellido1: "",
  apellido2: "",
  nombres: "",
  username: "",
  password: "",
  password_confirm: "",
};

const formRules = {
  apellido1: { required: true },
  nombres: { required: true },
  username: { required: true },
  password: { required: true },
  password_confirm: { required: true },
};

export default ({ close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/facultad/gestionUFacultad/searchInvestigador");

  //  Functions
  const create = async () => {
    if (validateForm()) {

      if (formValues.password !== formValues.password_confirm) {
        pushNotification(
          "Las contraseñas no coinciden",
          "error",
          notifications.length + 1
        );
        return;
      }

      setCreating(true);
      const res = await axiosBase.post(
        "admin/facultad/gestionUFacultad/crearUsuarioFacultad",
        formValues
      );
      const data = res.data;
      setCreating(false);
      close();
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
    }
  };

  return (
    <Modal
      onDismiss={close}
      visible={true}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={creating} onClick={create}>
              Crear usuario
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Crear usuario facultad"
    >
      <SpaceBetween direction="vertical" size="s">
        <FormField label="Buscar investigador" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.id != undefined) {
                const { apellido1, apellido2, nombres, institucion, codigo, id, facultad, facultad_id, sexo } =
                  detail.selectedOption;
                handleChange("apellido1", apellido1);
                handleChange("apellido2", apellido2);
                handleChange("nombres", nombres);
                handleChange("institucion", institucion);
                handleChange("investigador_id", id);
                handleChange("codigo", codigo);
                handleChange("facultad", facultad);
                handleChange("facultad_id", facultad_id);
                handleChange("sexo", sexo);
                setAvoidSelect(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Código, dni o nombre del investigador"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        <ColumnLayout columns={2}>
          <FormField label="Apellido paterno" errorText={formErrors.apellido1}>
            <Input
              placeholder="Apellido paterno"
              value={formValues.apellido1}
              onChange={({ detail }) => handleChange("apellido1", detail.value)}
            />
          </FormField>
          <FormField label="Apellido materno" errorText={formErrors.apellido2}>
            <Input
              placeholder="Apellido materno"
              value={formValues.apellido2}
              onChange={({ detail }) => handleChange("apellido2", detail.value)}
            />
          </FormField>
          <FormField label="Nombres" errorText={formErrors.nombres}>
            <Input
              placeholder="Escriba los nombres"
              value={formValues.nombres}
              onChange={({ detail }) => handleChange("nombres", detail.value)}
            />
          </FormField>
          <FormField label="Código" errorText={formErrors.institucion}>
            <Input
              placeholder="Codigo"
              value={formValues.codigo}
              onChange={({ detail }) => handleChange("codigo", detail.value)}
            />
          </FormField>
          <FormField label="Facultad" errorText={formErrors.facultad}>
            <Input
              placeholder="Nombre de la facultad"
              value={formValues.facultad}
              onChange={({ detail }) => handleChange("facultad", detail.value)}
            />
          </FormField>
          <FormField label="Correo" errorText={formErrors.facultad} stretch>
            <Input
              placeholder="Correo electronico de instituto"
              value={formValues.correo}
              onChange={({ detail }) => handleChange("correo", detail.value)}
            />
          </FormField>
          <FormField label="Usuario" errorText={formErrors.username}>
            <Input
              placeholder="Nombre de usuario"
              value={formValues.username}
              onChange={({ detail }) => handleChange("username", detail.value)}
            />
          </FormField>
          <FormField label="Contraseña" errorText={formErrors.password}>
            <Input
              type="password"
              value={formValues.password}
              onChange={({ detail }) => handleChange("password", detail.value)}
            />
          </FormField>
          <FormField label="Confirmar contraseña" errorText={formErrors.password_confirm}>
            <Input
              type="password"
              value={formValues.password_confirm}
              onChange={({ detail }) => handleChange("password_confirm", detail.value)}
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Modal>
  );
};
