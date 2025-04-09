import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Input,
  ColumnLayout,
  Select,
  Link,
  Popover,
  DatePicker,
  Autosuggest,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";

const optFiliacion = [
  {
    value: "1",
    label: "Sí",
  },
  {
    value: "0",
    label: "No",
  },
];

const initialForm = {
  investigador_id: null,
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

export default ({ item, reload, close, optAutor, tipo }) => {
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
  const asociarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.put(
        "admin/estudios/publicaciones/asociarInvestigador",
        {
          ...formValues,
          id: item.id,
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  useEffect(() => {
    handleChange("autor", item.autor);
    handleChange(
      "filiacion",
      optFiliacion.find((opt) => opt.label == item.filiacion)
    );
    handleChange(
      "filiacion_unica",
      optFiliacion.find((opt) => opt.label == item.filiacion_unica)
    );
    handleChange("categoria", { value: item.categoria });
  }, []);

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
              disabled={!formValues.investigador_id}
              onClick={asociarAutor}
              loading={loadingCreate}
            >
              Asociar docente
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Asociar investigador"
    >
      <SpaceBetween direction="vertical" size="s">
        <FormField label="Buscar investigador registrado" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                handleChange("investigador_id", rest.id);
                handleChange("nombres", rest.nombres);
                handleChange("apellido1", rest.apellido1);
                handleChange("apellido2", rest.apellido2);
                setAvoidSelect(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Dni, código o nombres del docente permanente"
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
        <ColumnLayout
          columns={tipo != "tesis-asesoria" ? 3 : 2}
          minColumnWidth={180}
        >
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
              options={optFiliacion}
            />
          </FormField>
          {tipo != "tesis-asesoria" && (
            <FormField
              label="Filiación única con UNMSM"
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
                options={optFiliacion}
              />
            </FormField>
          )}
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
