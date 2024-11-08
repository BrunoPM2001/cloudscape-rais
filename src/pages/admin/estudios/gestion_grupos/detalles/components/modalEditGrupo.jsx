import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const statesGrupo = [
  {
    value: 1,
    label: "Reconocido",
  },
  {
    value: 4,
    label: "Registrado",
  },
  {
    value: 12,
    label: "Reg. observado",
  },
];

const statesSolicitud = [
  {
    value: 6,
    label: "En proceso",
  },
  {
    value: 5,
    label: "Enviado",
  },
  {
    value: 2,
    label: "Observado",
  },
  {
    value: 0,
    label: "No aprobado",
  },
  {
    value: -1,
    label: "Eliminado",
  },
];

const initialForm = {
  grupo_nombre: "",
  grupo_nombre_corto: "",
  resolucion_rectoral_creacion: "",
  resolucion_creacion_fecha: "",
  resolucion_rectoral: "",
  resolucion_fecha: "",
  observaciones: "",
  observaciones_admin: "",
  estado: null,
  grupo_categoria: null,
  telefono: "",
  anexo: "",
  oficina: "",
  direccion: "",
  email: "",
  web: "",
};

const formRules = {
  grupo_nombre: { required: true },
  grupo_nombre_corto: { required: true },
  resolucion_rectoral_creacion: { required: false },
  resolucion_creacion_fecha: { required: false },
  resolucion_rectoral: { required: false },
  resolucion_fecha: { required: false },
  observaciones: { required: false },
  observaciones_admin: { required: false },
  estado: { required: true },
  grupo_categoria: { required: true },
  telefono: { required: false },
  anexo: { required: false },
  oficina: { required: false },
  direccion: { required: false },
  email: { required: false },
  web: { required: false },
};

export default ({ close, item, grupo_id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [optEstado, setOptEstado] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        ...initialForm,
        ...item,
        grupo_categoria:
          item.grupo_categoria == null ? null : { value: item.grupo_categoria },
      },
      {
        ...formRules,
        grupo_categoria: item.tipo == "solicitud" ? null : { require: true },
      }
    );

  //  Functions
  const editarGrupo = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/estudios/grupos/updateDetalle", {
        ...formValues,
        grupo_id,
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      setLoading(false);
      close();
    }
  };

  useEffect(() => {
    if (item.tipo == "grupo") {
      setOptEstado(statesGrupo);
      handleChange(
        "estado",
        statesGrupo.find((opt) => opt.value == item.estado)
      );
    } else if (item.tipo == "solicitud") {
      setOptEstado(statesSolicitud);
      handleChange(
        "estado",
        statesSolicitud.find((opt) => opt.value == item.estado)
      );
    }
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
            <Button variant="primary" loading={loading} onClick={editarGrupo}>
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar datos del grupo"
    >
      <Form>
        <SpaceBetween size="m">
          <FormField
            label="Nombre del grupo"
            stretch
            errorText={formErrors.grupo_nombre}
          >
            <Input
              value={formValues.grupo_nombre}
              onChange={({ detail }) =>
                handleChange("grupo_nombre", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Nombre corto del grupo"
            stretch
            errorText={formErrors.grupo_nombre_corto}
          >
            <Input
              value={formValues.grupo_nombre_corto}
              onChange={({ detail }) =>
                handleChange("grupo_nombre_corto", detail.value)
              }
            />
          </FormField>
          <ColumnLayout columns={4}>
            <FormField
              label="R.R. de creación"
              stretch
              errorText={formErrors.resolucion_rectoral_creacion}
            >
              <Input
                placeholder="Escriba el n° de RR"
                value={formValues.resolucion_rectoral_creacion}
                onChange={({ detail }) =>
                  handleChange("resolucion_rectoral_creacion", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha de R.R. de creación"
              stretch
              errorText={formErrors.resolucion_creacion_fecha}
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.resolucion_creacion_fecha}
                onChange={({ detail }) =>
                  handleChange("resolucion_creacion_fecha", detail.value)
                }
              />
            </FormField>
            <FormField
              label="R.R. actual"
              stretch
              errorText={formErrors.resolucion_rectoral}
            >
              <Input
                placeholder="Escriba el n° de RR"
                value={formValues.resolucion_rectoral}
                onChange={({ detail }) =>
                  handleChange("resolucion_rectoral", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha de R.R. actual"
              stretch
              errorText={formErrors.resolucion_fecha}
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.resolucion_fecha}
                onChange={({ detail }) =>
                  handleChange("resolucion_fecha", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField
            label="Observaciones"
            stretch
            errorText={formErrors.observaciones}
          >
            <Textarea
              value={formValues.observaciones}
              onChange={({ detail }) =>
                handleChange("observaciones", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Observaciones al investigador"
            stretch
            errorText={formErrors.observaciones_admin}
          >
            <Textarea
              rows={3}
              value={formValues.observaciones_admin}
              onChange={({ detail }) =>
                handleChange("observaciones_admin", detail.value)
              }
            />
          </FormField>
          <ColumnLayout columns={item.tipo == "grupo" ? 2 : 1}>
            <FormField label="Estado" stretch errorText={formErrors.estado}>
              <Select
                options={optEstado}
                selectedOption={formValues.estado}
                onChange={({ detail }) =>
                  handleChange("estado", detail.selectedOption)
                }
              />
            </FormField>
            {item.tipo == "grupo" && (
              <FormField
                label="Categoría del grupo"
                stretch
                errorText={formErrors.grupo_categoria}
              >
                <Select
                  placeholder="Escoja una categoría"
                  options={[
                    { value: "A" },
                    { value: "B" },
                    { value: "C" },
                    { value: "D" },
                  ]}
                  selectedOption={formValues.grupo_categoria}
                  onChange={({ detail }) =>
                    handleChange("grupo_categoria", detail.selectedOption)
                  }
                />
              </FormField>
            )}
          </ColumnLayout>
          <Header>Datos del grupo</Header>
          <ColumnLayout columns={3}>
            <FormField label="Teléfono" stretch errorText={formErrors.telefono}>
              <Input
                placeholder="Escriba el n° de telefono"
                value={formValues.telefono}
                onChange={({ detail }) =>
                  handleChange("telefono", detail.value)
                }
              />
            </FormField>
            <FormField label="Anexo" stretch errorText={formErrors.anexo}>
              <Input
                placeholder="Escriba el n° de anexo"
                value={formValues.anexo}
                onChange={({ detail }) => handleChange("anexo", detail.value)}
              />
            </FormField>
            <FormField label="Oficina" stretch errorText={formErrors.oficina}>
              <Input
                placeholder="Escriba el nombre de oficina"
                value={formValues.oficina}
                onChange={({ detail }) => handleChange("oficina", detail.value)}
              />
            </FormField>
            <FormField
              label="Dirección"
              stretch
              errorText={formErrors.direccion}
            >
              <Input
                placeholder="Escriba la direccion"
                value={formValues.direccion}
                onChange={({ detail }) =>
                  handleChange("direccion", detail.value)
                }
              />
            </FormField>
            <FormField label="Correo" stretch errorText={formErrors.email}>
              <Input
                placeholder="Escriba la direccion de email"
                value={formValues.email}
                onChange={({ detail }) => handleChange("email", detail.value)}
              />
            </FormField>
            <FormField label="Web" stretch errorText={formErrors.web}>
              <Input
                placeholder="Escriba la direccion de su página web"
                value={formValues.web}
                onChange={({ detail }) => handleChange("web", detail.value)}
              />
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
