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
  estado: { value: null, label: "Ninguna" },
  codigo_proyecto: "",
  resolucion_rectoral: "",
  resolucion_fecha: "",
  comentario: "",
  observaciones_admin: "",
};

const formRules = {
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

export default ({ id, reload }) => {
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
    const res = await axiosBase.get("admin/estudios/proyectosFEX/detalle", {
      params: {
        id,
      },
    });
    const data = res.data;
    setLoading(false);
    reload();
  };

  // const reporte = async () => {
  //   setLoadingBtn(true);
  //   const res = await axiosBase.get("admin/estudios/proyectosFEX/reporte", {
  //     params: {
  //       id,
  //     },
  //     responseType: "blob",
  //   });
  //   setLoadingBtn(false);
  //   const blob = res.data;
  //   const url = URL.createObjectURL(blob);
  //   window.open(url, "_blank");
  // };

  // const update = async () => {
  //   console.log(changes);
  //   if (changes <= 1) {
  //     if (validateForm()) {
  //       setUpdating(true);
  //       const form = new FormData();
  //       form.append("id", id);
  //       form.append("validado", formValues.validado?.value ?? null);
  //       form.append("categoria_id", formValues.categoria_id?.value ?? null);
  //       form.append("comentario", formValues.comentario);
  //       form.append("observaciones_usuario", formValues.observaciones_usuario);
  //       form.append("resolucion", formValues.resolucion);
  //       form.append("estado", formValues.estado?.value);
  //       form.append("file", formValues.file[0]);
  //       form.append("file_comentario", formValues.file_comentario[0]);
  //       const res = await axiosBase.post(
  //         "admin/estudios/publicaciones/updateDetalle",
  //         form
  //       );
  //       const data = res.data;
  //       pushNotification(data.detail, data.message, notifications.length + 1);
  //       setUpdating(false);
  //       getData();
  //     }
  //   } else {
  //     pushNotification(
  //       "No ha guardado los cambios hechos en la pestaña de Detalles",
  //       "warning",
  //       notifications.length + 1
  //     );
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              {/* <Button loading={loadingBtn} onClick={reporte} disabled={loading}>
                Reporte
              </Button> */}
              {/* <Button
                variant="primary"
                loading={updating}
                onClick={update}
                disabled={loading}
              >
                Guardar
              </Button> */}
            </SpaceBetween>
          }
        >
          Detalles del proyecto
        </Header>
      }
    >
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : (
        <SpaceBetween size="m">
          <ColumnLayout columns={4}>
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
            <FormField label="Código de proyecto" stretch>
              <Input
                value={formValues.codigo_proyecto}
                onChange={({ detail }) =>
                  handleChange("codigo_proyecto", detail.value)
                }
              />
            </FormField>
            <FormField label="N° de R.R." stretch>
              <Input
                value={formValues.resolucion_rectoral}
                onChange={({ detail }) =>
                  handleChange("resolucion_rectoral", detail.value)
                }
              />
            </FormField>
            <FormField label="Fecha de R.R." stretch>
              <DatePicker
                value={formValues.resolucion_fecha}
                onChange={({ detail }) =>
                  handleChange("resolucion_fecha", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>

          <FormField label="Comentarios / Observaciones" stretch>
            <Textarea
              placeholder="Comentario para administradores"
              value={formValues.comentario}
              onChange={({ detail }) =>
                handleChange("comentario", detail.value)
              }
            />
          </FormField>

          <FormField label="Observaciones al docente" stretch>
            <Textarea
              placeholder="Observaciones para el docente"
              value={formValues.observaciones_admin}
              onChange={({ detail }) =>
                handleChange("observaciones_admin", detail.value)
              }
            />
          </FormField>
        </SpaceBetween>
      )}
    </Container>
  );
};
