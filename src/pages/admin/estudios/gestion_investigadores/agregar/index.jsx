import {
  Alert,
  Autosuggest,
  Button,
  Container,
  Form,
  FormField,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import Formulario from "../components/form";

const initialForm = {
  tipo_investigador: "",
  tipo_investigador_categoria: "",
  tipo_investigador_programa: "",
  tipo_investigador_estado: "",
  tipo: null,
  estado: { value: 1, label: "Activo" },
  rrhh_status: "",
  fecha_icsi: "",
  nombres: "",
  apellido1: "",
  apellido2: "",
  sexo: "",
  doc_tipo: null,
  doc_numero: "",
  fecha_nac: "",
  pais: "",
  telefono_casa: "",
  telefono_trabajo: "",
  direccion1: "",
  direccion2: "",
  email1: "",
  email2: "",
  email3: "",
  facebook: "",
  twitter: "",
  codigo_orcid: "",
  researcher_id: "",
  scopus_id: "",
  cti_vitae: "",
  google_scholar: "",
  renacyt: "",
  renacyt_nivel: "",
  palabras_clave: "",
  indice_h: "",
  indice_h_url: "",
  facultad_id: null,
  dependencia_id: null,
  instituto_id: null,
  codigo: "",
  docente_categoria: null,
  posicion_unmsm: "",
  biografia: "",
};

const formRules = {
  tipo_investigador: { required: false },
  tipo_investigador_categoria: { required: false },
  tipo_investigador_programa: { required: false },
  tipo_investigador_estado: { required: false },
  tipo: { required: true },
  estado: { required: true },
  rrhh_status: { required: false },
  fecha_icsi: { required: false },
  nombres: { required: true },
  apellido1: { required: true },
  apellido2: { required: true },
  sexo: { required: true },
  doc_tipo: { required: true },
  doc_numero: { required: true },
  fecha_nac: { required: true },
  pais: { required: true },
  telefono_casa: { required: false },
  telefono_trabajo: { required: false },
  direccion1: { required: false },
  direccion2: { required: false },
  email1: {
    required: false,
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  email2: {
    required: false,
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  email3: {
    required: false,
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  facebook: {
    required: false,
    regex: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(.?)?]+\/?$/,
  },
  twitter: {
    required: false,
    regex: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
  },
  link: {
    required: false,
    regex:
      /^(https?:\/\/)?(([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/,
  },
  codigo_orcid: {
    required: false,
    regex: /^(\d{4}-){3}\d{3}[\dX]$/,
  },
  researcher_id: { required: false },
  scopus_id: { required: false },
  cti_vitae: { required: false },
  google_scholar: { required: false },
  renacyt: { required: false },
  renacyt_nivel: { required: false },
  palabras_clave: { required: false },
  indice_h: { required: false },
  indice_h_url: { required: false },
  facultad_id: { required: false },
  dependencia_id: { required: false },
  instituto_id: { required: false },
  codigo: { required: false },
  docente_categoria: { required: false },
  posicion_unmsm: { required: false },
  biografia: { required: false },
};

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de investigadores",
    href: "/admin/estudios/gestion_investigadores",
  },
  {
    text: "Agregar investigador",
  },
];

const doc_opt = [
  {
    label: "DNI",
    value: "DNI",
  },
  {
    label: "Carné de extranjería",
    value: "CEX",
  },
  {
    label: "Pasaporte",
    value: "PASAPORTE",
  },
];

const tipo_opt = [
  {
    value: "Docente permanente",
  },
  {
    value: "Estudiante pregrado",
  },
  {
    value: "Estudiante posgrado",
  },
  {
    value: "Externo",
  },
];

const estado_opt = [
  {
    label: "Activo",
    value: "1",
  },
  {
    label: "No activo",
    value: "0",
  },
];

const sexo_opt = [
  {
    label: "Masculino",
    value: "M",
  },
  {
    label: "Femenino",
    value: "F",
  },
];

export default function Agregar_investigador() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [paises, setPaises] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [institutos, setInstitutos] = useState([]);
  const [docenteCategorias, setDocenteCategorias] = useState([]);

  //  Url
  const location = useLocation();
  const { tipo } = queryString.parse(location.search);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador_" + tipo);
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getSelectsData = async () => {
    const res = await axiosBase.get(
      "admin/estudios/investigadores/getSelectsData"
    );
    const data = res.data;
    setPaises(data.paises);
    setFacultades(data.facultades);
    setDependencias(data.dependencias);
    setInstitutos(data.institutos);
    setDocenteCategorias(data.docente_categorias);
  };

  const handleSelect = (detail) => {
    if (detail.selectedOption.id != undefined) {
      const { value, ...rest } = detail.selectedOption;
      setFormValues((prev) => ({
        ...prev,
        ...rest,
        tipo: tipo_opt.find((opt) => opt.value == tipo),
        sexo: sexo_opt.find((opt) => opt.value == rest.sexo),
        doc_tipo: doc_opt.find((opt) => opt.value == rest.doc_tipo),
      }));
      setAvoidSelect(false);
    }
  };

  const saveData = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post("admin/estudios/investigadores/create", {
        ...formValues,
        tipo: formValues.tipo.value,
        estado: formValues.estado.value,
        sexo: formValues.sexo.value,
        doc_tipo: formValues.doc_tipo.value,
        pais: formValues.pais.value,
        facultad_id: formValues.facultad_id?.value,
        dependencia_id: formValues.dependencia_id?.value,
        instituto_id: formValues.instituto_id?.value,
        docente_categoria: formValues.docente_categoria?.value,
      });
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  //  Effects
  useEffect(() => {
    getSelectsData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Agregar investigador:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="xl">
        {tipo != "Externo" ? (
          <>
            <Container>
              <Form
                variant="embedded"
                header={<Header variant="h2">Buscar investigador</Header>}
              >
                <FormField label={tipo} stretch>
                  <Autosuggest
                    onChange={({ detail }) => {
                      setOptions([]);
                      setValue(detail.value);
                    }}
                    onSelect={({ detail }) => handleSelect(detail)}
                    value={value}
                    options={options}
                    loadingText="Cargando data"
                    placeholder="DNI o nombre del investigador"
                    statusType={loading ? "loading" : "finished"}
                    empty="No se encontraron resultados"
                  />
                </FormField>
              </Form>
            </Container>
            {formValues.id && (
              <>
                {formValues.investigador_id != null ? (
                  <Alert
                    header="Esta persona ya está registrada como investigador"
                    type="error"
                  />
                ) : (
                  <Form
                    actions={
                      <Button
                        variant="primary"
                        loading={creating}
                        onClick={saveData}
                      >
                        Guardar
                      </Button>
                    }
                    variant="embedded"
                  >
                    <Container>
                      <Formulario
                        formValues={formValues}
                        formErrors={formErrors}
                        handleChange={handleChange}
                        facultades={facultades}
                        paises={paises}
                        dependencias={dependencias}
                        institutos={institutos}
                        docente_categorias={docenteCategorias}
                      />
                    </Container>
                  </Form>
                )}
              </>
            )}
          </>
        ) : (
          <Form
            actions={
              <Button variant="primary" loading={creating} onClick={saveData}>
                Guardar
              </Button>
            }
            variant="embedded"
          >
            <Container>
              <Formulario
                formValues={formValues}
                formErrors={formErrors}
                handleChange={handleChange}
                facultades={facultades}
                paises={paises}
                dependencias={dependencias}
                institutos={institutos}
                docente_categorias={docenteCategorias}
              />
            </Container>
          </Form>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
