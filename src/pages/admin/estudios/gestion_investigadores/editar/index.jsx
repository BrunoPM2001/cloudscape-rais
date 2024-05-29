import {
  Alert,
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

const initialForm = {
  tipo_investigador: "",
  tipo_investigador_categoria: "",
  tipo_investigador_programa: "",
  tipo_investigador_estado: "",
  tipo: "",
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
    text: "Editar investigador",
  },
];

export default function Editar_investigador() {
  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Functions
  const saveData = () => {
    if (validateForm()) {
      console.log("Ok");
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Editar investigador:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Form
        actions={
          <Button variant="primary" onClick={saveData}>
            Guardar
          </Button>
        }
        variant="embedded"
      >
        <SpaceBetween direction="vertical" size="m">
          <Alert
            header="Este investigador aún no otorga permisos al sistema en Orcid"
            dismissible
          ></Alert>
          <Container>
            <SpaceBetween direction="vertical" size="s">
              <>
                <Header variant="h3">Datos de investigador rais</Header>
                <ColumnLayout columns={4}>
                  <FormField
                    label="Tipo de investigador"
                    stretch
                    errorText={formErrors.tipo_investigador}
                  >
                    <Input
                      placeholder="Escriba el tipo de investigador"
                      value={formValues.tipo_investigador}
                      onChange={({ detail }) =>
                        handleChange("tipo_investigador", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Tipo de categoría del investigador"
                    stretch
                    errorText={formErrors.tipo_investigador_categoria}
                  >
                    <Input
                      placeholder="Escriba la categoría de investigador"
                      value={formValues.tipo_investigador_categoria}
                      onChange={({ detail }) =>
                        handleChange(
                          "tipo_investigador_categoria",
                          detail.value
                        )
                      }
                    />
                  </FormField>
                  <FormField
                    label="Tipo de programa del investigador"
                    stretch
                    errorText={formErrors.tipo_investigador_programa}
                  >
                    <Input
                      placeholder="Escriba el programa del investigador"
                      value={formValues.tipo_investigador_programa}
                      onChange={({ detail }) =>
                        handleChange("tipo_investigador_programa", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Tipo de estado del investigador"
                    stretch
                    errorText={formErrors.tipo_investigador_estado}
                  >
                    <Input
                      placeholder="Escriba el tipo de estado de investigador"
                      value={formValues.tipo_investigador_estado}
                      onChange={({ detail }) =>
                        handleChange("tipo_investigador_estado", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="Tipo" stretch errorText={formErrors.tipo}>
                    <Select
                      placeholder="Escoga una opción"
                      selectedOption={formValues.tipo}
                      onChange={({ detail }) =>
                        handleChange("tipo", detail.selectedOption)
                      }
                      options={[
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
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="Estado"
                    stretch
                    errorText={formErrors.estado}
                  >
                    <Select
                      placeholder="Escoga una opción"
                      selectedOption={formValues.estado}
                      onChange={({ detail }) =>
                        handleChange("estado", detail.selectedOption)
                      }
                      options={[
                        {
                          label: "Activo",
                          value: "1",
                        },
                        {
                          label: "Inactivo",
                          value: "0",
                        },
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="RRHH Estado"
                    stretch
                    errorText={formErrors.rrhh_status}
                  >
                    <Input readOnly value={formValues.rrhh_status} />
                  </FormField>
                  <FormField
                    label="Fecha ICSI"
                    stretch
                    errorText={formErrors.fecha_icsi}
                  >
                    <DatePicker
                      placeholder="YYYY-MM-DD"
                      value={formValues.fecha_icsi}
                      onChange={({ detail }) =>
                        handleChange("fecha_icsi", detail.value)
                      }
                    />
                  </FormField>
                </ColumnLayout>
              </>
              <>
                <Header variant="h3">Datos personales</Header>
                <ColumnLayout columns={4}>
                  <FormField
                    label="Nombres"
                    stretch
                    errorText={formErrors.nombres}
                  >
                    <Input
                      placeholder="Escriba su nombres"
                      value={formValues.nombres}
                      onChange={({ detail }) =>
                        handleChange("nombres", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Apellido paterno"
                    stretch
                    errorText={formErrors.apellido1}
                  >
                    <Input
                      placeholder="Escriba su ap. paterno"
                      value={formValues.apellido1}
                      onChange={({ detail }) =>
                        handleChange("apellido1", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Apellido materno"
                    stretch
                    errorText={formErrors.apellido2}
                  >
                    <Input
                      placeholder="Escriba su ap. materno"
                      value={formValues.apellido2}
                      onChange={({ detail }) =>
                        handleChange("apellido2", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="Sexo" stretch errorText={formErrors.sexo}>
                    <Select
                      placeholder="Escoga una opción"
                      selectedOption={formValues.sexo}
                      onChange={({ detail }) =>
                        handleChange("sexo", detail.selectedOption)
                      }
                      options={[
                        {
                          label: "Masculino",
                          value: "M",
                        },
                        {
                          label: "Femenino",
                          value: "F",
                        },
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="Tipo de documento"
                    stretch
                    errorText={formErrors.doc_tipo}
                  >
                    <Select
                      placeholder="Escoga una opción"
                      selectedOption={formValues.doc_tipo}
                      onChange={({ detail }) =>
                        handleChange("doc_tipo", detail.selectedOption)
                      }
                      options={[
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
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="N° documento"
                    stretch
                    errorText={formErrors.doc_numero}
                  >
                    <Input
                      placeholder="Escriba el n° de doc"
                      value={formValues.doc_numero}
                      onChange={({ detail }) =>
                        handleChange("doc_numero", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Fecha nacimiento"
                    stretch
                    errorText={formErrors.fecha_nac}
                  >
                    <DatePicker
                      placeholder="YYYY-MM-DD"
                      value={formValues.fecha_nac}
                      onChange={({ detail }) =>
                        handleChange("fecha_nac", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="País" stretch errorText={formErrors.pais}>
                    <Select
                      placeholder="Escoga una opción"
                      selectedOption={formValues.pais}
                      onChange={({ detail }) =>
                        handleChange("pais", detail.selectedOption)
                      }
                      options={[
                        {
                          value: "Perú",
                        },
                        {
                          value: "Argentina",
                        },
                        {
                          value: "Chile",
                        },
                      ]}
                    />
                  </FormField>
                </ColumnLayout>
              </>
              <>
                <Header variant="h3">Datos de contacto</Header>
                <ColumnLayout columns={4}>
                  <FormField
                    label="Teléfono de casa"
                    stretch
                    errorText={formErrors.telefono_casa}
                  >
                    <Input
                      placeholder="Escriba su teléfono de casa"
                      value={formValues.telefono_casa}
                      onChange={({ detail }) =>
                        handleChange("telefono_casa", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Teléfono de trabajo"
                    stretch
                    errorText={formErrors.telefono_trabajo}
                  >
                    <Input
                      placeholder="Escriba su teléfono de trabajo"
                      value={formValues.telefono_trabajo}
                      onChange={({ detail }) =>
                        handleChange("telefono_trabajo", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Teléfono móvil"
                    stretch
                    errorText={formErrors.telefono_movil}
                  >
                    <Input
                      placeholder="Escriba su teléfono móvil"
                      value={formValues.telefono_movil}
                      onChange={({ detail }) =>
                        handleChange("telefono_movil", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Teléfono móvil"
                    stretch
                    errorText={formErrors.telefono_movil}
                  >
                    <Input
                      placeholder="Escriba su teléfono móvil"
                      value={formValues.telefono_movil}
                      onChange={({ detail }) =>
                        handleChange("telefono_movil", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Dirección 1"
                    stretch
                    errorText={formErrors.direccion1}
                  >
                    <Input
                      placeholder="Escriba una dirección"
                      value={formValues.direccion1}
                      onChange={({ detail }) =>
                        handleChange("direccion1", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Dirección 2"
                    stretch
                    errorText={formErrors.direccion2}
                  >
                    <Input
                      placeholder="Escriba una dirección"
                      value={formValues.direccion2}
                      onChange={({ detail }) =>
                        handleChange("direccion2", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Correo 1"
                    stretch
                    errorText={formErrors.email1}
                  >
                    <Input
                      placeholder="Escriba un correo"
                      type="email"
                      value={formValues.email1}
                      onChange={({ detail }) =>
                        handleChange("email1", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Correo 2"
                    stretch
                    errorText={formErrors.email2}
                  >
                    <Input
                      placeholder="Escriba un correo"
                      type="email"
                      value={formValues.email2}
                      onChange={({ detail }) =>
                        handleChange("email2", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Correo unmsm"
                    stretch
                    errorText={formErrors.email3}
                  >
                    <Input
                      placeholder="Escriba un correo"
                      type="email"
                      value={formValues.email3}
                      onChange={({ detail }) =>
                        handleChange("email3", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Facebook"
                    stretch
                    errorText={formErrors.facebook}
                  >
                    <Input
                      placeholder="Url de facebook"
                      value={formValues.facebook}
                      onChange={({ detail }) =>
                        handleChange("facebook", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Twitter"
                    stretch
                    errorText={formErrors.twitter}
                  >
                    <Input
                      placeholder="Url de twitter"
                      value={formValues.twitter}
                      onChange={({ detail }) =>
                        handleChange("twitter", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Página web"
                    stretch
                    errorText={formErrors.link}
                  >
                    <Input
                      placeholder="Escriba la url"
                      value={formValues.link}
                      onChange={({ detail }) =>
                        handleChange("link", detail.value)
                      }
                    />
                  </FormField>
                </ColumnLayout>
              </>
              <>
                <Header variant="h3">Datos de investigador</Header>
                <ColumnLayout columns={4}>
                  <FormField
                    label="Orcid"
                    stretch
                    errorText={formErrors.codigo_orcid}
                  >
                    <Input
                      placeholder="Escriba su código orcid"
                      value={formValues.codigo_orcid}
                      onChange={({ detail }) =>
                        handleChange("codigo_orcid", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label={
                      <Link
                        external
                        href="https://access.clarivate.com/login?app=wos"
                        variant="primary"
                      >
                        ResearcherID
                      </Link>
                    }
                    stretch
                    errorText={formErrors.researcher_id}
                  >
                    <Input
                      placeholder="Escriba su researcher id"
                      value={formValues.researcher_id}
                      onChange={({ detail }) =>
                        handleChange("researcher_id", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Scopus Author ID"
                    stretch
                    errorText={formErrors.scopus_id}
                  >
                    <Input
                      placeholder="Escriba su scopus id"
                      value={formValues.scopus_id}
                      onChange={({ detail }) =>
                        handleChange("scopus_id", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label={
                      <Link
                        external
                        href="https://ctivitae.concytec.gob.pe/appDirectorioCTI/"
                        variant="primary"
                      >
                        CTI Vitae
                      </Link>
                    }
                    stretch
                    errorText={formErrors.enlace_cti}
                  >
                    <Input
                      placeholder="Url de cti"
                      value={formValues.enlace_cti}
                      onChange={({ detail }) =>
                        handleChange("enlace_cti", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Google scholar"
                    stretch
                    errorText={formErrors.google_scholar}
                  >
                    <Input
                      placeholder="Escriba su url de google scholar"
                      value={formValues.google_scholar}
                      onChange={({ detail }) =>
                        handleChange("google_scholar", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Renacyt"
                    stretch
                    errorText={formErrors.renacyt}
                  >
                    <Input
                      placeholder="Escriba su renacyt"
                      value={formValues.renacyt}
                      onChange={({ detail }) =>
                        handleChange("renacyt", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Renacyt nivel"
                    stretch
                    errorText={formErrors.renacyt_nivel}
                  >
                    <Input
                      placeholder="Escriba su renacyt"
                      value={formValues.renacyt_nivel}
                      onChange={({ detail }) =>
                        handleChange("renacyt_nivel", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Palabras clave"
                    stretch
                    errorText={formErrors.palabras_clave}
                  >
                    <Input
                      placeholder="Escriba palabras clave"
                      value={formValues.palabras_clave}
                      onChange={({ detail }) =>
                        handleChange("palabras_clave", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Índice h"
                    stretch
                    errorText={formErrors.indice_h}
                  >
                    <Input
                      placeholder="Escriba su índice h"
                      value={formValues.indice_h}
                      onChange={({ detail }) =>
                        handleChange("indice_h", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Indice h URL"
                    stretch
                    errorText={formErrors.indice_h_url}
                  >
                    <Input
                      placeholder="Escriba la url de su índice h"
                      value={formValues.indice_h_url}
                      onChange={({ detail }) =>
                        handleChange("indice_h_url", detail.value)
                      }
                    />
                  </FormField>
                </ColumnLayout>
              </>
              <>
                <Header variant="h3">Datos de docente</Header>
                <ColumnLayout columns={3}>
                  <FormField
                    label="Código"
                    stretch
                    errorText={formErrors.codigo}
                  >
                    <Input readOnly value={formValues.codigo} />
                  </FormField>
                  <FormField
                    label="Categoria del docente"
                    stretch
                    errorText={formErrors.docente_categoria}
                  >
                    <Select
                      placeholder="Escoja una opción"
                      value={formValues.docente_categoria}
                      onChange={({ detail }) =>
                        handleChange("docente_categoria", detail.selectedOption)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Posición UNMSM"
                    stretch
                    errorText={formErrors.posicion_unmsm}
                  >
                    <Input
                      placeholder="Escriba su posición en la UNMSM"
                      value={formValues.posicion_unmsm}
                      onChange={({ detail }) =>
                        handleChange("posicion_unmsm", detail.value)
                      }
                    />
                  </FormField>
                </ColumnLayout>
              </>
              <FormField
                label="Biografía"
                stretch
                errorText={formErrors.biografia}
              >
                <Textarea
                  placeholder="Escriba su biografia"
                  value={formValues.biografia}
                  onChange={({ detail }) =>
                    handleChange("biografia", detail.value)
                  }
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
    </BaseLayout>
  );
}
