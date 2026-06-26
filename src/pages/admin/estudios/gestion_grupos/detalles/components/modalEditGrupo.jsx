import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FormField,
  Header,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Tabs,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import Tiptap from "../../../../components/tiptap";

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
  facultad_id: null,
  telefono: "",
  anexo: "",
  oficina: "",
  direccion: "",
  email: "",
  web: "",
  presentacion: "",
  objetivos: "",
  servicios: "",
  redes:"",
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
  facultad_id: {required: true},
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
  const [optFacultad, setOptFacultad] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        ...initialForm,
        ...item,
        grupo_categoria:
          item.grupo_categoria == null ? { value: null, label: "Sin categoría" } : { value: item.grupo_categoria, label: item.grupo_categoria },
        facultad_id:
          item.facultad_id == null ? null : { value: item.facultad_id, label: item.facultad },
      },
      {
        ...formRules,
        grupo_categoria: item.tipo == "solicitud" ? null : { require: true },
      }
    );
  
  const buildRedes = (values) => {
    const redes = [];

    if (values.red1_nombre || values.red1_link) {
      redes.push({
        nombre: values.red1_nombre,
        link: values.red1_link,
      });
    }

    if (values.red2_nombre || values.red2_link) {
      redes.push({
        nombre: values.red2_nombre,
        link: values.red2_link,
      });
    }

    return redes;
  };

  //  Functions
  const editarGrupo = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/estudios/grupos/updateDetalle", {
        ...formValues,
        redes: buildRedes(formValues),
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
    if (item.redes) {
      try {
        const redes = Array.isArray(item.redes)
          ? item.redes
          : JSON.parse(item.redes);

        handleChange("red1_nombre", redes[0]?.nombre || "");
        handleChange("red1_link", redes[0]?.link || "");
        handleChange("red2_nombre", redes[1]?.nombre || "");
        handleChange("red2_link", redes[1]?.link || "");
      } catch {
        // si falla, no hace nada
      }
    }
  }, []);

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

  useEffect(() => {
    axiosBase
      .get("admin/estudios/grupos/listadoFacultades")
      .then((res) => {
        const opciones = res.data.map((f) => ({
          value: f.id,
          label: f.nombre,
        }));

        setOptFacultad(opciones);
      });
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
        <ColumnLayout columns={item.tipo == "grupo" ? 3 : 1}>
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
                  { value: null, label: "Sin categoría" },
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" },
                ]}
                selectedOption={formValues.grupo_categoria}
                onChange={({ detail }) =>
                  handleChange("grupo_categoria", detail.selectedOption)
                }
              />
            </FormField>
          )}
          {item.tipo == "grupo" && (
            <FormField
              label="Facultad"
              stretch
              errorText={formErrors.facultad_id}
            >
              <Select
                placeholder="Seleccione facultad"
                options={optFacultad}
                selectedOption={formValues.facultad_id}
                loadingText="Cargando facultades..."
                statusType={optFacultad.length === 0 ? "loading" : "finished"}
                onChange={({ detail }) =>
                  handleChange("facultad_id", detail.selectedOption)
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
              onChange={({ detail }) => handleChange("telefono", detail.value)}
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
          <FormField label="Dirección" stretch errorText={formErrors.direccion}>
            <Input
              placeholder="Escriba la direccion"
              value={formValues.direccion}
              onChange={({ detail }) => handleChange("direccion", detail.value)}
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
        <Tabs
          tabs={[
            {
              id: "edit_1",
              label: "Presentación",
              content: (
                <Tiptap
                  value={formValues.presentacion}
                  handleChange={handleChange}
                  name="presentacion"
                />
              ),
            },
            {
              id: "edit_2",
              label: "Objetivos",
              content: (
                <Tiptap
                  value={formValues.objetivos}
                  handleChange={handleChange}
                  name="objetivos"
                />
              ),
            },
            {
              id: "edit_3",
              label: "Servicios ",
              content: (
                <Tiptap
                  value={formValues.servicios}
                  handleChange={handleChange}
                  name="servicios"
                />
              ),
            },
            {
              id: "edit_4",
              label: "Redes ",
              content: (
                <ColumnLayout columns={2}>
                  <FormField label="Red 1 - Nombre">
                    <Input
                      value={formValues.red1_nombre || ""}
                      onChange={({ detail }) =>
                        handleChange("red1_nombre", detail.value)
                      }
                    />
                  </FormField>

                  <FormField label="Red 1 - Link">
                    <Input
                      value={formValues.red1_link || ""}
                      onChange={({ detail }) =>
                        handleChange("red1_link", detail.value)
                      }
                    />
                  </FormField>

                  <FormField label="Red 2 - Nombre">
                    <Input
                      value={formValues.red2_nombre || ""}
                      onChange={({ detail }) =>
                        handleChange("red2_nombre", detail.value)
                      }
                    />
                  </FormField>

                  <FormField label="Red 2 - Link">
                    <Input
                      value={formValues.red2_link || ""}
                      onChange={({ detail }) =>
                        handleChange("red2_link", detail.value)
                      }
                    />
                  </FormField>
                </ColumnLayout>
              ),
            },
          ]}
        />
      </SpaceBetween>
    </Modal>
  );
};
