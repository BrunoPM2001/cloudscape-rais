import {
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  FormField,
  Header,
  Input,
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
    const res = await axiosBase.get("admin/estudios/proyectosFEX/detalle", {
      params: {
        id,
      },
    });
    const data = res.data;
    setFormValues({
      ...data,
      estado: opt_estado.find((opt) => opt.value == data.estado),
      resolucion_fecha: data.resolucion_fecha ?? "",
    });
    setLoading(false);
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

  const update = async () => {
    if (validateForm()) {
      setUpdating(true);
      const res = await axiosBase.put(
        "admin/estudios/proyectosFEX/updateDetalle",
        {
          id,
          codigo_proyecto: formValues.codigo_proyecto,
          estado: formValues.estado.value,
          resolucion_rectoral: formValues.resolucion_rectoral,
          resolucion_fecha: formValues.resolucion_fecha,
          comentario: formValues.comentario,
          observaciones_admin: formValues.observaciones_admin,
        }
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
            <SpaceBetween size="xs" direction="horizontal">
              {/* <Button loading={loadingBtn} onClick={reporte} disabled={loading}>
                Reporte
              </Button> */}
              <Button
                variant="primary"
                loading={updating}
                onClick={update}
                disabled={loading}
              >
                Guardar
              </Button>
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
