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
  codigo_orcid: "",
  apellido1: "",
  apellido2: "",
  nombres: "",
  sexo: "",
  institucion: "",
  pais: "",
  email1: "",
  doc_tipo: "",
  doc_numero: "",
  telefono_movil: "",
  titulo_profesional: "",
  grado: "",
  especialidad: "",
  researcher_id: "",
  scopus_id: "",
  link: "",
  posicion_unmsm: "",
  biografia: "",
  file: [],
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

const opt_doc_tipo = [
  { value: "DNI" },
  { value: "CEX" },
  { value: "PASAPORTE" },
];

const opt_posicion = [{ value: "Emérito" }, { value: "Profesor visitante" }];

export default ({ close, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [paises, setPaises] = useState([]);

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
    setPaises(info.paises);
    setFormValues({
      ...info.detalle,
      grado: opt_grados.find((opt) => opt.value == info.detalle.grado),
      pais: info.paises.find((opt) => opt.value == info.detalle.pais),
    });
    setLoading(false);
  };

  const update = async () => {
    if (validateForm()) {
      setLoadingUpdate(true);
      const res = await axiosBase.put("admin/estudios/grupos/editarMiembro", {
        ...formValues,
        id,
        grado: formValues.grado.value,
        instituto: formValues.instituto.value,
        tipo: "externo",
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
      header="Editar externo"
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
        <ColumnLayout columns={4}>
          <FormField label="Nombres" errorText={formErrors.nombres} stretch>
            <Input
              disabled={loading}
              value={formValues.nombres}
              onChange={({ detail }) => handleChange("nombres", detail.value)}
            />
          </FormField>
          <FormField
            label="Apellido paterno"
            errorText={formErrors.apellido1}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.apellido1}
              onChange={({ detail }) => handleChange("apellido1", detail.value)}
            />
          </FormField>
          <FormField
            label="Apellido materno"
            errorText={formErrors.apellido2}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.apellido2}
              onChange={({ detail }) => handleChange("apellido2", detail.value)}
            />
          </FormField>
          <FormField label="Sexo" errorText={formErrors.sexo} stretch>
            <Select
              disabled={loading}
              placeholder="Escoja una opción"
              options={opt_sexo}
              selectedOption={formValues.sexo}
              onChange={({ detail }) =>
                handleChange("sexo", detail.selectedOption)
              }
            />
          </FormField>
        </ColumnLayout>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 9 } },
            { colspan: { default: 12, xs: 3 } },
          ]}
        ></Grid>
        <FormField
          label="Institución"
          errorText={formErrors.institucion}
          stretch
        >
          <Input
            disabled={loading}
            value={formValues.institucion}
            onChange={({ detail }) => handleChange("institucion", detail.value)}
          />
        </FormField>
        <FormField label="País" errorText={formErrors.pais} stretch>
          <Select
            disabled={loading}
            placeholder="Escoja una opción"
            options={paises}
            selectedOption={formValues.pais}
            onChange={({ detail }) =>
              handleChange("pais", detail.selectedOption)
            }
          />
        </FormField>
        <ColumnLayout columns={4}>
          <FormField
            label="Correo principal"
            errorText={formErrors.email1}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.email1}
              onChange={({ detail }) => handleChange("email1", detail.value)}
            />
          </FormField>
          <FormField label="Tipo doc." errorText={formErrors.doc_tipo} stretch>
            <Select
              disabled={loading}
              placeholder="Escoja una opción"
              options={opt_doc_tipo}
              selectedOption={formValues.doc_tipo}
              onChange={({ detail }) =>
                handleChange("doc_tipo", detail.selectedOption)
              }
            />
          </FormField>
          <FormField
            label="N° de documento"
            errorText={formErrors.doc_numero}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.doc_numero}
              onChange={({ detail }) =>
                handleChange("doc_numero", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Teléfono móvil"
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
        </ColumnLayout>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
          ]}
        >
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
            label="ResearcherID"
            errorText={formErrors.researcher_id}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.researcher_id}
              onChange={({ detail }) =>
                handleChange("researcher_id", detail.value)
              }
            />
          </FormField>
          <FormField label="ScopusID" errorText={formErrors.scopus_id} stretch>
            <Input
              disabled={loading}
              value={formValues.scopus_id}
              onChange={({ detail }) => handleChange("scopus_id", detail.value)}
            />
          </FormField>
          <FormField label="Sitio web" errorText={formErrors.link} stretch>
            <Input
              disabled={loading}
              value={formValues.link}
              onChange={({ detail }) => handleChange("link", detail.value)}
            />
          </FormField>
        </Grid>
        <FormField
          label="Posición en la UNMSM"
          errorText={formErrors.posicion_unmsm}
          stretch
        >
          <Select
            disabled={loading}
            placeholder="Escoja una opción"
            options={opt_posicion}
            selectedOption={formValues.posicion_unmsm}
            onChange={({ detail }) =>
              handleChange("posicion_unmsm", detail.selectedOption)
            }
          />
        </FormField>
        <FormField
          label="Perfil del investigador"
          errorText={formErrors.biografia}
          stretch
        >
          <Textarea
            disabled={loading}
            value={formValues.biografia}
            onChange={({ detail }) => handleChange("biografia", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
