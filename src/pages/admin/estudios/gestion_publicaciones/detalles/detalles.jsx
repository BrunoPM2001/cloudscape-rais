import {
  Button,
  ColumnLayout,
  Container,
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

const gridDefinition = [
  {
    colspan: {
      default: 12,
      l: 3,
      m: 3,
      s: 3,
      xs: 3,
    },
  },
  {
    colspan: {
      default: 12,
      l: 3,
      m: 3,
      s: 3,
      xs: 3,
    },
  },
  {
    colspan: {
      default: 12,
      l: 6,
      m: 6,
      s: 6,
      xs: 6,
    },
  },
];

const initialForm = {
  validado: null,
  categoria_id: null,
  comentario: "",
  observaciones_usuario: "",
  resolucion: "",
  fecha_inscripcion: { value: 1, label: "Sí" },
  estado: { value: null, label: "Ninguna" },
  file: [],
  file_comentario: [],
};

const formRules = {
  validado: { required: true },
  estado: { required: true },
};

const opt_validado = [
  { value: 0, label: "No" },
  { value: 1, label: "Sí" },
];

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

export default ({ id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [opt_categoria, setOpt_categoria] = useState(true);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/detalle", {
      params: {
        id,
      },
    });
    const data = res.data;
    setOpt_categoria(data.categorias);
    setFormValues({
      ...data.data,
      codigo_registro: data.data.codigo_registro ?? "No tiene código",
      validado: opt_validado.find((opt) => opt.value == data.data.validado),
      estado: opt_estado.find((opt) => opt.value == data.data.estado),
      categoria_id:
        data.categorias.find((opt) => opt.value == data.data.categoria_id) ||
        null,
      file: [],
      file_comentario: [],
    });
    setLoading(false);
  };

  const update = async () => {
    if (validateForm()) {
      setUpdating(true);
      const form = new FormData();
      form.append("id", id);
      form.append("validado", formValues.validado?.value ?? null);
      form.append("categoria_id", formValues.categoria_id?.value ?? null);
      form.append("comentario", formValues.comentario);
      form.append("observaciones_usuario", formValues.observaciones_usuario);
      form.append("resolucion", formValues.resolucion);
      form.append("estado", formValues.estado?.value);
      form.append("file", formValues.file[0]);
      form.append("file_comentario", formValues.file_comentario[0]);
      const res = await axiosBase.post(
        "admin/estudios/publicaciones/updateDetalle",
        form
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setUpdating(false);
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
                <Button>Reporte</Button>
                <Button variant="primary" loading={updating} onClick={update}>
                  Guardar
                </Button>
              </SpaceBetween>
            )
          }
          variant="h3"
        >
          Datos generales
        </Header>
      }
    >
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : (
        <SpaceBetween size="m">
          <Grid gridDefinition={gridDefinition}>
            <FormField label="Código">
              <Input value={formValues.codigo_registro} disabled />
            </FormField>
            <FormField label="Validado">
              <Select
                placeholder="Escoja una opción"
                options={opt_validado}
                selectedOption={formValues.validado}
                onChange={({ detail }) =>
                  handleChange("validado", detail.selectedOption)
                }
              />
            </FormField>
            <FormField label="Calificación">
              <Select
                placeholder="Escoja una opción"
                options={opt_categoria}
                selectedOption={formValues.categoria_id}
                onChange={({ detail }) =>
                  handleChange("categoria_id", detail.selectedOption)
                }
              />
            </FormField>
          </Grid>
          <Grid
            gridDefinition={[
              {
                colspan: {
                  default: 12,
                  xl: 9,
                  l: 9,
                  m: 9,
                  s: 9,
                  xs: 9,
                },
              },
              {
                colspan: {
                  default: 12,
                  xl: 3,
                  l: 3,
                  m: 3,
                  s: 3,
                  xs: 3,
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
              label="Anexo comentario"
              description={
                formValues.file_id_2 ? (
                  <>
                    Puede{" "}
                    <Link
                      href={formValues.url_2}
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
            >
              <FileUpload
                value={formValues.file_comentario}
                onChange={({ detail }) => {
                  handleChange("file_comentario", detail.value);
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
          <ColumnLayout columns={4}>
            <FormField label="Fecha de envío de publicación">
              <Input value={formValues.fecha_inscripcion} disabled />
            </FormField>
            <FormField label="Resolución">
              <Input
                placeholder="N° de resolución"
                value={formValues.resolucion}
                onChange={({ detail }) =>
                  handleChange("resolucion", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Anexo"
              description={
                formValues.file_id_1 ? (
                  <>
                    Puede{" "}
                    <Link
                      href={formValues.url_1}
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
            <FormField label="Estado">
              <Select
                placeholder="Escoja una opción"
                options={opt_estado}
                selectedOption={formValues.estado}
                onChange={({ detail }) =>
                  handleChange("estado", detail.selectedOption)
                }
              />
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      )}
    </Container>
  );
};
