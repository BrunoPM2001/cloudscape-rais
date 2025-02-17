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
  Popover,
  Link,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  autor: "",
  filiacion: null,
  filiacion_unica: null,
  categoria: null,
};

const formRules = {
  autor: { required: true },
  filiacion: { required: true },
  filiacion_unica: { required: true },
  categoria: { required: true },
};

export default ({ id, visible, setVisible, reload, optAutor }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);
  const [form, setForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest(
      "investigador/publicaciones/utils/searchEstudianteRegistrado"
    );
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/publicaciones/utils/agregarAutor",
        {
          ...formValues,
          filiacion: formValues.filiacion.value,
          filiacion_unica: formValues.filiacion_unica.value,
          categoria: formValues.categoria.value,
          publicacion_id: id,
          investigador_id: form.investigador_id,
          sum_id: form.id,
          tipo: "estudiante",
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
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
          <FormField label="Buscar estudiante investigador" stretch>
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
              <Input readOnly value={form.apellido_paterno} />
            </FormField>
            <FormField label="Apellido materno" stretch>
              <Input readOnly value={form.apellido_materno} />
            </FormField>
            <FormField label="Programa" stretch>
              <Input readOnly value={form.programa} />
            </FormField>
          </ColumnLayout>
          <FormField
            label="Nombre con el que aparece en la publicación"
            stretch
            errorText={formErrors.autor}
          >
            <Input
              disabled={!enableCreate}
              placeholder="Escriba el nombre del autor con el que aparece en la publicación"
              value={formValues.autor}
              onChange={({ detail }) => handleChange("autor", detail.value)}
            />
          </FormField>
          <ColumnLayout columns={3}>
            <FormField
              label="Filiación"
              info={
                <Popover
                  header="Descripción"
                  content="En caso la publicación presente filiación con San Marcos"
                  triggerType="custom"
                >
                  <Link variant="info">Info</Link>
                </Popover>
              }
              stretch
              errorText={formErrors.filiacion}
            >
              <Select
                placeholder="Escoja una opción"
                disabled={!enableCreate}
                selectedOption={formValues.filiacion}
                onChange={({ detail }) => {
                  handleChange("filiacion", detail.selectedOption);
                }}
                options={[
                  {
                    value: "1",
                    label: "Sí",
                  },
                  {
                    value: "0",
                    label: "No",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="Filiación única con UNMSM"
              info={
                <Popover
                  header="Descripción"
                  content="En caso la publicación solo presente filiación con una institución"
                  triggerType="custom"
                >
                  <Link variant="info">Info</Link>
                </Popover>
              }
              stretch
              errorText={formErrors.filiacion_unica}
            >
              <Select
                placeholder="Escoja una opción"
                disabled={!enableCreate}
                selectedOption={formValues.filiacion_unica}
                onChange={({ detail }) => {
                  handleChange("filiacion_unica", detail.selectedOption);
                }}
                options={[
                  {
                    value: "1",
                    label: "Sí",
                  },
                  {
                    value: "0",
                    label: "No",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="Condición"
              stretch
              errorText={formErrors.categoria}
            >
              <Select
                placeholder="Escoja una opción"
                disabled={!enableCreate}
                selectedOption={formValues.categoria}
                onChange={({ detail }) => {
                  handleChange("categoria", detail.selectedOption);
                }}
                options={optAutor}
              ></Select>
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
