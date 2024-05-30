import {
  Alert,
  Autosuggest,
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
  Textarea,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";

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

export default function Agregar_investigador() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { tipo } = queryString.parse(location.search);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador_" + tipo);
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Editar investigador:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="xl">
        <Container>
          <Form
            variant="embedded"
            header={<Header variant="h2">Buscar investigador</Header>}
          >
            <FormField label="Docente" stretch>
              <Autosuggest
                onChange={({ detail }) => {
                  setOptions([]);
                  setValue(detail.value);
                }}
                onSelect={({ detail }) => {
                  if (detail.selectedOption.id != undefined) {
                    const { value, ...rest } = detail.selectedOption;
                    // console.log(rest);
                    setFormValues((prev) => ({
                      ...prev,
                      ...rest,
                    }));
                    setAvoidSelect(false);
                  }
                }}
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
              <Container>
                <Form
                  actions={<Button variant="primary">Guardar</Button>}
                  variant="embedded"
                ></Form>
              </Container>
            )}
          </>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
