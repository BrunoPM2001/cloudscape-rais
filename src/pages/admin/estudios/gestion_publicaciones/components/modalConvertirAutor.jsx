import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Input,
  ColumnLayout,
  Select,
  Link,
  Popover,
  DatePicker,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  nombres: "",
  apellido1: "",
  apellido2: "",
  autor: "",
  filiacion: null,
  filiacion_unica: null,
  categoria: null,
  nro_registro: "",
  fecha_registro: "",
};

const formRules = {
  autor: { required: true },
  filiacion: { required: true },
  filiacion_unica: { required: true },
  categoria: { required: true },
};

export default ({ id, reload, close, optAutor }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/publicaciones/searchDocentePermanente");

  //  Functions
  const agregarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "admin/estudios/publicaciones/agregarAutor",
        {
          ...formValues,
          filiacion: formValues.filiacion.value,
          filiacion_unica: formValues.filiacion_unica.value,
          categoria: formValues.categoria.value,
          id: id,
          tipo: "externo",
        }
      );
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
      <SpaceBetween direction="vertical" size="s">
        <FormField label="Buscar investigador registrado" stretch>
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
            placeholder="Dni, código o nombres del docente"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        <ColumnLayout columns={3} minColumnWidth={180}>
          <FormField label="Nombres" stretch>
            <Input disabled value={formValues.nombres} />
          </FormField>
          <FormField label="Apellido paterno" stretch>
            <Input disabled value={formValues.apellido1} />
          </FormField>
          <FormField label="Apellido materno" stretch>
            <Input disabled value={formValues.apellido2} />
          </FormField>
        </ColumnLayout>
        <FormField
          label="Nombre con el que aparece en la publicación"
          stretch
          errorText={formErrors.autor}
        >
          <Input
            placeholder="Escriba el nombre del autor con el que aparece en la publicación"
            value={formValues.autor}
            onChange={({ detail }) => handleChange("autor", detail.value)}
          />
        </FormField>
        <ColumnLayout columns={3} minColumnWidth={180}>
          <FormField
            label="Filiación UNMSM"
            stretch
            info={
              <Popover
                header="Descripción"
                content="En caso la publicación presente filiación con San Marcos"
              >
                <Link variant="info">Info</Link>
              </Popover>
            }
            errorText={formErrors.filiacion}
          >
            <Select
              placeholder="Escoja una opción"
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
            label="Filiación única"
            info={
              <Popover
                header="Descripción"
                content="En caso la publicación solo presente filiación con una institución"
              >
                <Link variant="info">Info</Link>
              </Popover>
            }
            stretch
            errorText={formErrors.filiacion_unica}
          >
            <Select
              placeholder="Escoja una opción"
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
          <FormField label="Condición" stretch errorText={formErrors.categoria}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.categoria}
              onChange={({ detail }) => {
                handleChange("categoria", detail.selectedOption);
              }}
              options={optAutor}
            />
          </FormField>
          <FormField
            label="N° de registro"
            errorText={formErrors.nro_registro}
            stretch
          >
            <Input
              value={formValues.nro_registro}
              onChange={({ detail }) =>
                handleChange("nro_registro", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de registro"
            errorText={formErrors.fecha_registro}
            stretch
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_registro}
              onChange={({ detail }) =>
                handleChange("fecha_registro", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Modal>
  );
};
