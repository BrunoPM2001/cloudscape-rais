import {
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Link,
  Select,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../providers/notificationProvider";
import Formulario from "../components/form";

const initialForm = {
  tipo_investigador: "",
  tipo_investigador_categoria: "",
  tipo_investigador_programa: "",
  tipo_investigador_estado: "",
  tipo: null,
  estado: null,
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
    text: "Editar investigador",
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

export default function Editar_investigador() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [paises, setPaises] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [institutos, setInstitutos] = useState([]);
  const [docenteCategorias, setDocenteCategorias] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/investigadores/getOne", {
      params: {
        id: id,
      },
    });
    const data = res.data.data;
    setPaises(res.data.paises);
    setFacultades(res.data.facultades);
    setDependencias(res.data.dependencias);
    setInstitutos(res.data.institutos);
    setDocenteCategorias(res.data.docente_categorias);
    const initialData = {
      ...data,
      tipo: tipo_opt.find((opt) => opt.value == data.tipo),
      estado: estado_opt.find((opt) => opt.value == data.estado),
      sexo: sexo_opt.find((opt) => opt.value == data.sexo),
      doc_tipo: doc_opt.find((opt) => opt.value == data.doc_tipo),
      pais: res.data.paises.find((opt) => opt.value == data.pais),
      fecha_icsi: data.fecha_icsi ?? "",
      fecha_nac: data.fecha_nac ?? "",
      facultad_id: res.data.facultades.find(
        (opt) => opt.value == data.facultad_id
      ),
      dependencia_id: res.data.dependencias.find(
        (opt) => opt.value == data.dependencia_id
      ),
      instituto_id: res.data.institutos.find(
        (opt) => opt.value == data.instituto_id
      ),
      docente_categoria: res.data.docente_categorias.find(
        (opt) => opt.value == data.docente_categoria
      ),
    };
    setLoading(false);
    setFormValues(initialData);
  };

  const saveData = async () => {
    if (validateForm()) {
      setUpdating(true);
      const res = await axiosBase.put("admin/estudios/investigadores/update", {
        ...formValues,
        id: id,
        tipo: formValues.tipo.value,
        estado: formValues.estado.value,
        sexo: formValues.sexo.value,
        doc_tipo: formValues.doc_tipo.value,
        pais: formValues.pais.value,
        facultad_id: formValues.facultad_id.value,
        dependencia_id: formValues.dependencia_id.value,
        instituto_id: formValues.instituto_id.value,
        docente_categoria: formValues.docente_categoria.value,
      });
      const data = res.data;
      setUpdating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Editar investigador:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Form
        actions={
          <Button
            variant="primary"
            disabled={loading}
            loading={updating}
            onClick={saveData}
          >
            Guardar
          </Button>
        }
        variant="embedded"
      >
        <Container>
          {loading ? (
            <Spinner size="big" />
          ) : (
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
          )}
        </Container>
      </Form>
    </BaseLayout>
  );
}
