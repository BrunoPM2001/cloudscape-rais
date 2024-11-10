import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FormField,
  Grid,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  cti_vitae: "",
  dep_academico: "",
  especialidad: "",
  titulo_profesional: "",
  grado: null,
  instituto: null,
  codigo_orcid: "",
  email3: "",
  telefono_casa: "",
  telefono_trabajo: "",
  telefono_movil: "",
  google_scholar: "",
  fecha_inclusion: "",
  resolucion: "",
  resolucion_fecha: "",
  observacion: "",
};

const formRules = {
  cti_vitae: { required: true },
  titulo_profesional: { required: true },
  grado: { required: true },
  instituto: { required: true },
  codigo_orcid: { required: true },
  email3: { required: true },
  telefono_movil: { required: true },
  google_scholar: { required: true },
};

const opt_grados = [
  { value: "Bachiller" },
  { value: "Maestro" },
  { value: "Doctor" },
  { value: "Msci" },
  { value: "Phd" },
];

export default ({ close, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [data, setData] = useState({});
  const [institutos, setInstitutos] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/grupos/editarMiembroData", {
      params: {
        id,
      },
    });
    const info = res.data;
    setData(info.detalle);
    setInstitutos(info.institutos);
    setFormValues({
      ...info.detalle,
      grado: opt_grados.find((opt) => opt.value == info.detalle.grado),
      instituto: info.institutos.find(
        (opt) => opt.value == info.detalle.instituto
      ),
    });
    setLoading(false);
  };

  const update = async () => {
    if (validateForm()) {
      setLoadingUpdate(true);
      const res = await axiosBase.post("admin/estudios/grupos/editarMiembro", {
        ...formValues,
        id,
        grado: formValues.grado.value,
        instituto: formValues.instituto.value,
        tipo: "titular",
      });
      const data = res.data;
      setLoadingUpdate(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      header="Editar titular"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={loading}
              loading={loadingUpdate}
              onClick={update}
            >
              Actualizar datos
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Alert>
          <SpaceBetween size="m">
            <div>
              <Box variant="awsui-key-label">Apellidos y nombres</Box>
              {loading ? <Spinner /> : <div>{data?.nombres}</div>}
            </div>
            <ColumnLayout columns={4}>
              <div>
                <Box variant="awsui-key-label">Código de docente</Box>
                {loading ? <Spinner /> : <div>{data?.codigo}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">N° de documento</Box>
                {loading ? <Spinner /> : <div>{data?.doc_numero}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Categoría / Clase</Box>
                {loading ? (
                  <Spinner />
                ) : (
                  <div>
                    {data?.categoria +
                      " - " +
                      data?.clase +
                      " - " +
                      data?.horas}
                  </div>
                )}
              </div>
              <div>
                <Box variant="awsui-key-label">Dependencia</Box>
                {loading ? <Spinner /> : <div>{data?.dependencia}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Facultad</Box>
                {loading ? <Spinner /> : <div>{data?.facultad}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Puntaje total</Box>
                {loading ? <Spinner /> : <div>{data?.puntaje_total}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">
                  Puntaje en los últimos 7 años
                </Box>
                {loading ? <Spinner /> : <div>{data?.puntaje_7_años}</div>}
              </div>
            </ColumnLayout>
          </SpaceBetween>
        </Alert>
        <ColumnLayout columns={2}>
          <FormField label="CTI Vitae" errorText={formErrors.cti_vitae} stretch>
            <Input
              disabled={loading}
              value={formValues.cti_vitae}
              onChange={({ detail }) => handleChange("cti_vitae", detail.value)}
            />
          </FormField>
          <FormField
            label="Departamento académico"
            errorText={formErrors.dep_academico}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.dep_academico}
              onChange={({ detail }) =>
                handleChange("dep_academico", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Especialidad"
            errorText={formErrors.especialidad}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.especialidad}
              onChange={({ detail }) =>
                handleChange("especialidad", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Título profesional"
            errorText={formErrors.titulo_profesional}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.titulo_profesional}
              onChange={({ detail }) =>
                handleChange("titulo_profesional", detail.value)
              }
            />
          </FormField>
          <FormField label="Grado" errorText={formErrors.grado} stretch>
            <Select
              disabled={loading}
              placeholder="Escoja una opción"
              options={opt_grados}
              selectedOption={formValues.grado}
              onChange={({ detail }) =>
                handleChange("grado", detail.selectedOption)
              }
            />
          </FormField>
          <FormField label="Instituto" errorText={formErrors.instituto} stretch>
            <Select
              disabled={loading}
              placeholder="Escoja una opción"
              options={institutos}
              selectedOption={formValues.instituto}
              onChange={({ detail }) =>
                handleChange("instituto", detail.selectedOption)
              }
            />
          </FormField>
          <FormField
            label="Código orcid"
            errorText={formErrors.codigo_orcid}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.codigo_orcid}
              onChange={({ detail }) =>
                handleChange("codigo_orcid", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Correo institucional"
            errorText={formErrors.email3}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.email3}
              onChange={({ detail }) => handleChange("email3", detail.value)}
            />
          </FormField>
        </ColumnLayout>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
          ]}
        >
          <FormField
            label="Teléfono de casa"
            errorText={formErrors.telefono_casa}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.telefono_casa}
              onChange={({ detail }) =>
                handleChange("telefono_casa", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Teléfono de trabajo"
            errorText={formErrors.telefono_trabajo}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.telefono_trabajo}
              onChange={({ detail }) =>
                handleChange("telefono_trabajo", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Teléfono celular"
            errorText={formErrors.telefono_movil}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.telefono_movil}
              onChange={({ detail }) =>
                handleChange("telefono_movil", detail.value)
              }
            />
          </FormField>
        </Grid>
        <FormField
          label="Google scholar"
          errorText={formErrors.google_scholar}
          stretch
        >
          <Input
            disabled={loading}
            value={formValues.google_scholar}
            onChange={({ detail }) =>
              handleChange("google_scholar", detail.value)
            }
          />
        </FormField>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
          ]}
        >
          <FormField
            label="Fecha de inclusión"
            errorText={formErrors.fecha_inclusion}
            stretch
          >
            <DatePicker
              placeholder="DD/MM/YYYY"
              disabled={loading}
              value={formValues.fecha_inclusion ?? ""}
              onChange={({ detail }) =>
                handleChange("fecha_inclusion", detail.value)
              }
            />
          </FormField>
          <FormField label="N° de RR" errorText={formErrors.resolucion} stretch>
            <Input
              disabled={loading}
              value={formValues.resolucion}
              onChange={({ detail }) =>
                handleChange("resolucion", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de RR"
            errorText={formErrors.resolucion_fecha}
            stretch
          >
            <DatePicker
              placeholder="DD/MM/YYYY"
              disabled={loading}
              value={formValues.resolucion_fecha ?? ""}
              onChange={({ detail }) =>
                handleChange("resolucion_fecha", detail.value)
              }
            />
          </FormField>
        </Grid>
        <FormField
          label="Observación / Comentario"
          errorText={formErrors.resolucion_fecha}
          stretch
        >
          <Textarea
            disabled={loading}
            value={formValues.observacion}
            onChange={({ detail }) => handleChange("observacion", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
