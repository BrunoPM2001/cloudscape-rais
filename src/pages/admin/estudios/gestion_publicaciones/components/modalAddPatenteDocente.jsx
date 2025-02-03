import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Autosuggest,
  Input,
  ColumnLayout,
  Select,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  condicion: null,
};

const formRules = {
  condicion: { required: true },
};

export default ({ id, reload, close }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);
  const [form, setForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/publicaciones/searchDocenteRegistrado");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post("admin/estudios/patentes/agregarAutor", {
        ...formValues,
        condicion: formValues.condicion.value,
        id: id,
        investigador_id: form.id,
        tipo: "interno",
      });
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              disabled={!enableCreate}
              variant="primary"
              onClick={agregarAutor}
              loading={loadingCreate}
            >
              Agregar autor
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar autor"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Buscar docente investigador" stretch>
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                if (detail.value == "") {
                  setForm({});
                  setEnableCreate(false);
                }
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.id != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  setForm(rest);
                  setEnableCreate(true);
                  setAvoidSelect(false);
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="Dni, código o nombres de docente"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados"
            />
          </FormField>
          <ColumnLayout columns={4}>
            <FormField label="Nombres" stretch>
              <Input readOnly value={form.nombres} />
            </FormField>
            <FormField label="Apellido paterno" stretch>
              <Input readOnly value={form.apellido1} />
            </FormField>
            <FormField label="Apellido materno" stretch>
              <Input readOnly value={form.apellido2} />
            </FormField>
            <FormField label="Tipo" stretch>
              <Input readOnly value={form.tipo} />
            </FormField>
          </ColumnLayout>
          <FormField label="Condición" stretch errorText={formErrors.condicion}>
            <Select
              placeholder="Escoja una opción"
              disabled={!enableCreate}
              selectedOption={formValues.condicion}
              onChange={({ detail }) => {
                handleChange("condicion", detail.selectedOption);
              }}
              options={[{ value: "Autor" }, { value: "Inventor" }]}
            ></Select>
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
