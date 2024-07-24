import {
  Modal,
  FormField,
  Input,
  Box,
  SpaceBetween,
  Form,
  Header,
  ColumnLayout,
  Button,
  DatePicker,
  Container,
  Spinner,
  Select,
  Autosuggest,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";

const initialForm = {
  apellidos: "",
  nombres: "",
  institucion: "",
  username: "",
  password: "",
};

const formRules = {
  apellidos: { required: true },
  nombres: { required: true },
  institucion: { required: true },
  username: { required: true },
  password: { required: true },
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
    useAutosuggest("admin/facultad/gestionEvaluadores/searchInvestigador");

  //  Functions
  const create = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post(
        "admin/facultad/gestionEvaluadores/crearEvaluador",
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
      header="Crear usuario evaluador"
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
                const { apellidos, nombres, institucion } =
                  detail.selectedOption;
                handleChange("apellidos", apellidos);
                handleChange("nombres", nombres);
                handleChange("institucion", institucion);
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
          <FormField label="Apellidos" errorText={formErrors.apellidos} stretch>
            <Input
              placeholder="Escriba los apellidos"
              value={formValues.apellidos}
              onChange={({ detail }) => handleChange("apellidos", detail.value)}
            />
          </FormField>
          <FormField label="Nombres" errorText={formErrors.nombres} stretch>
            <Input
              placeholder="Escriba los nombres"
              value={formValues.nombres}
              onChange={({ detail }) => handleChange("nombres", detail.value)}
            />
          </FormField>
          <FormField
            label="Institución"
            errorText={formErrors.institucion}
            stretch
          >
            <Input
              placeholder="Institución de procedencia del evaluador"
              value={formValues.institucion}
              onChange={({ detail }) =>
                handleChange("institucion", detail.value)
              }
            />
          </FormField>
          <FormField label="Usuario" errorText={formErrors.username} stretch>
            <Input
              placeholder="Nombre de usuario"
              value={formValues.username}
              onChange={({ detail }) => handleChange("username", detail.value)}
            />
          </FormField>
          <FormField label="Contraseña" errorText={formErrors.password} stretch>
            <Input
              type="password"
              value={formValues.password}
              onChange={({ detail }) => handleChange("password", detail.value)}
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Modal>
  );
};
