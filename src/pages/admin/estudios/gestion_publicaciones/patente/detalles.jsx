import {
  Badge,
  Box,
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  FileUpload,
  FormField,
  Grid,
  Header,
  Input,
  Link,
  Select,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const initialForm = {
  nro_registro: "",
  estado: null,
  titulo: "",
  tipo: null,
  nro_expediente: "",
  fecha_presentacion: "",
  oficina_presentacion: "",
  enlace: "",
  url: "",
  comentario: "",
  observaciones_usuario: "",
  file: [],
};

const formRules = {
  validado: { required: true },
  estado: { required: true },
};

const opt_estado = [
  { value: -1, label: "Eliminado" },
  { value: 1, label: "Registrado" },
  { value: 2, label: "Observado" },
  { value: 5, label: "Enviado" },
  { value: 6, label: "En proceso" },
  { value: 7, label: "Anulado" },
  { value: 8, label: "No registrado" },
  { value: 9, label: "Duplicado" },
];

const opt_tipo = [
  { value: "Patente de invención" },
  { value: "Modelo de utilidad" },
  { value: "Certificado de obtentor" },
];

export default ({ id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [updating, setUpdating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/patentes/detalle", {
      params: {
        id,
      },
    });
    const data = res.data;
    setFormValues({
      ...data,
      comentario: data.comentario ?? "",
      observaciones_usuario: data.observaciones_usuario ?? "",
      fecha_presentacion: data.fecha_presentacion ?? "",
      tipo: opt_tipo.find((opt) => opt.value == data.tipo),
      estado: opt_estado.find((opt) => opt.value == data.estado),
      file: [],
    });
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("admin/estudios/patentes/reporte", {
      params: {
        id,
      },
      responseType: "blob",
    });
    setLoadingBtn(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const update = async () => {
    if (validateForm()) {
      setUpdating(true);
      const form = new FormData();
      form.append("id", id);
      form.append("nro_registro", formValues.nro_registro ?? "");
      form.append("estado", formValues.estado.value);
      form.append("titulo", formValues.titulo ?? "");
      form.append("tipo", formValues.tipo.value);
      form.append("nro_expediente", formValues.nro_expediente ?? "");
      form.append("fecha_presentacion", formValues.fecha_presentacion ?? "");
      form.append(
        "oficina_presentacion",
        formValues.oficina_presentacion ?? ""
      );
      form.append("enlace", formValues.enlace ?? "");
      form.append("comentario", formValues.comentario ?? "");
      form.append(
        "observaciones_usuario",
        formValues.observaciones_usuario ?? ""
      );
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "admin/estudios/patentes/updateDetalle",
        form
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setUpdating(false);
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      header={
        <Header
          actions={
            !loading && (
              <SpaceBetween size="xs" direction="horizontal">
                <Button loading={loadingBtn} onClick={reporte}>
                  Reporte
                </Button>
                <Button variant="primary" loading={updating} onClick={update}>
                  Guardar
                </Button>
              </SpaceBetween>
            )
          }
        >
          {!loading && (
            <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
              <Box variant="h2">Datos generales</Box>
              <Badge color="green">Propiedad intelectual</Badge>
              <Badge color="blue">{formValues.id}</Badge>
              <Badge color="grey">{formValues.estado_text}</Badge>
            </SpaceBetween>
          )}
        </Header>
      }
    >
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : (
        <SpaceBetween size="m">
          <ColumnLayout columns={2}>
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
            <FormField label="Estado" errorText={formErrors.estado} stretch>
              <Select
                placeholder="Escoja una opción"
                options={opt_estado}
                selectedOption={formValues.estado}
                onChange={({ detail }) =>
                  handleChange("estado", detail.selectedOption)
                }
              />
            </FormField>

            <FormField label="Título" errorText={formErrors.titulo} stretch>
              <Input
                value={formValues.titulo}
                onChange={({ detail }) => handleChange("titulo", detail.value)}
              />
            </FormField>
            <FormField label="Tipo" errorText={formErrors.tipo} stretch>
              <Select
                placeholder="Escoja una opción"
                options={opt_tipo}
                selectedOption={formValues.tipo}
                onChange={({ detail }) =>
                  handleChange("tipo", detail.selectedOption)
                }
              />
            </FormField>
            <FormField
              label="Número de expediente"
              errorText={formErrors.nro_expediente}
              stretch
            >
              <Input
                value={formValues.nro_expediente}
                onChange={({ detail }) =>
                  handleChange("nro_expediente", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha presentacion"
              errorText={formErrors.fecha_presentacion}
              stretch
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_presentacion}
                onChange={({ detail }) =>
                  handleChange("fecha_presentacion", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Oficina de presentación"
              errorText={formErrors.oficina_presentacion}
              stretch
            >
              <Input
                value={formValues.oficina_presentacion}
                onChange={({ detail }) =>
                  handleChange("oficina_presentacion", detail.value)
                }
              />
            </FormField>
            <FormField label="Enlace" errorText={formErrors.enlace} stretch>
              <Input
                value={formValues.enlace}
                onChange={({ detail }) => handleChange("enlace", detail.value)}
              />
            </FormField>
          </ColumnLayout>
          <Grid
            gridDefinition={[
              {
                colspan: {
                  default: 12,
                  xl: 9,
                  l: 9,
                  m: 9,
                  s: 9,
                  xs: 7,
                },
              },
              {
                colspan: {
                  default: 12,
                  xl: 3,
                  l: 3,
                  m: 3,
                  s: 3,
                  xs: 5,
                },
              },
            ]}
          >
            <FormField label="Comentarios / Observaciones" stretch>
              <Textarea
                placeholder="Comentario para administradores"
                value={formValues.comentario}
                onChange={({ detail }) =>
                  handleChange("comentario", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Certificado emitido"
              description={
                formValues.url ? (
                  <>
                    Puede{" "}
                    <Link
                      href={formValues.url}
                      variant="primary"
                      fontSize="body-s"
                      external
                      target="_blank"
                    >
                      descargar el anexo
                    </Link>
                  </>
                ) : (
                  "No se ha cargado un anexo"
                )
              }
              stretch
            >
              <FileUpload
                value={formValues.file}
                onChange={({ detail }) => {
                  handleChange("file", detail.value);
                }}
                showFileLastModified
                showFileSize
                showFileThumbnail
                constraintText="El archivo cargado no debe superar los 6 MB"
                i18nStrings={{
                  uploadButtonText: (e) =>
                    e ? "Cargar archivos" : "Cargar archivo",
                  dropzoneText: (e) =>
                    e
                      ? "Arrastre los archivos para cargarlos"
                      : "Arrastre el archivo para cargarlo",
                  removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
                  errorIconAriaLabel: "Error",
                }}
                accept=".pdf"
              />
            </FormField>
          </Grid>
          <FormField label="Observaciones al docente" stretch>
            <Textarea
              placeholder="Observaciones para el docente"
              value={formValues.observaciones_usuario}
              onChange={({ detail }) =>
                handleChange("observaciones_usuario", detail.value)
              }
            />
          </FormField>
        </SpaceBetween>
      )}
    </Container>
  );
};
