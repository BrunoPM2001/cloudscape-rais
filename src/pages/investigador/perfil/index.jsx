import {
  Button,
  ColumnLayout,
  Container,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import BaseLayout from "../components/baseLayout";
import axiosBase from "../../../api/axios";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../providers/notificationProvider";
import Cdi from "./cdi";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Perfil",
  },
];

const initialForm = {
  nombres: "",
  doc: "",
  fecha_nac: "",
  direccion1: "",
  email1: "",
  telefono_movil: "",
  telefono_trabajo: "",
  telefono_casa: "",
  codigo: "",
  dependencia_id: null,
  instituto_id: null,
  facultad_id: null,
  email3: "",
  codigo_orcid: "",
  google_scholar: "",
  scopus_id: "",
  researcher_id: "",
  cti_vitae: "",
  renacyt: "",
  renacyt_nivel: "",
  tipo: "",
  categoria: "",
  clase: "",
  horas: "",
  especialidad: "",
  titulo_profesional: "",
  grado: null,
  biografia: "",
  facebook: "",
  twitter: "",
};

const formRules = {
  direccion1: { required: true },
  email1: { required: true },
  telefono_movil: { required: true },
  dependencia_id: { required: true },
  facultad_id: { required: true },
  scopus_id: { required: true },
  researcher_id: { required: true },
  especialidad: { required: true },
  titulo_profesional: { required: true },
  grado: { required: true },
};

export default function Perfil() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [facultades, setFacultades] = useState([]);  
  const [institutos, setInstitutos] = useState([]);
  const [dependencias, setDependencias] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, setFormValues, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/perfil/getData");
    const data = res.data;
    setLoading(false);
    setFormValues({
      ...data.data,
      dependencia_id: data.dependencias.find(
        (opt) => opt.value == data.data.dependencia_id
      ),
      facultad_id: data.facultades.find(
        (opt) => opt.value == data.data.facultad_id
      ),
      instituto_id: data.institutos.find(
        (opt) => opt.value == data.data.instituto_id
      ),
      grado: { value: data.data.grado },
    });
    setFacultades(data.facultades);
    setDependencias(data.dependencias);
    setInstitutos(data.institutos);
  };

  const updateData = async () => {
    if (validateForm()) {
      setUpdating(true);
      const res = await axiosBase.put(
        "investigador/perfil/updateData",
        formValues
      );
      const data = res.data;
      setUpdating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Mi perfil"
      helpInfo="Desde aquí puede solicitar ser CDI, además de editar sus datos personales y profesionales."
      actions={
        <Button
          variant="primary"
          onClick={updateData}
          loading={updating}
          disabled={loading}
        >
          Guardar cambios
        </Button>
      }
      contentType="cards"
    >
      {loading ? (
        <Container>
          <Spinner /> Cargando datos
        </Container>
      ) : (
        <ColumnLayout columns={3}>
          <SpaceBetween size="l">
            <Container>
              <Form header={<Header variant="h3">Datos personales</Header>}>
                <SpaceBetween size="s">
                  <FormField label="Nombres y apellidos" stretch>
                    <Input disabled value={formValues.nombres} />
                  </FormField>
                  <FormField label="N° de documento" stretch>
                    <Input disabled value={formValues.doc} />
                  </FormField>
                  <FormField label="Fecha de nacimiento" stretch>
                    <Input disabled value={formValues.fecha_nac} />
                  </FormField>
                  <FormField
                    label="Dirección"
                    errorText={formErrors.direccion1}
                    stretch
                  >
                    <Input
                      value={formValues.direccion1}
                      onChange={({ detail }) =>
                        handleChange("direccion1", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Correo personal"
                    errorText={formErrors.email1}
                    stretch
                  >
                    <Input
                      value={formValues.email1}
                      onChange={({ detail }) =>
                        handleChange("email1", detail.value)
                      }
                    />
                  </FormField>
                </SpaceBetween>
              </Form>
            </Container>
            <Container>
              <Form header={<Header variant="h3">Teléfonos</Header>}>
                <SpaceBetween size="s">
                  <FormField
                    label="Teléfono celular"
                    errorText={formErrors.telefono_movil}
                    stretch
                  >
                    <Input
                      value={formValues.telefono_movil}
                      onChange={({ detail }) =>
                        handleChange("telefono_movil", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Teléfono de trabajo"
                    errorText={formErrors.telefono_trabajo}
                    stretch
                  >
                    <Input
                      value={formValues.telefono_trabajo}
                      onChange={({ detail }) =>
                        handleChange("telefono_trabajo", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Teléfono de casa"
                    errorText={formErrors.telefono_casa}
                    stretch
                  >
                    <Input
                      value={formValues.telefono_casa}
                      onChange={({ detail }) =>
                        handleChange("telefono_casa", detail.value)
                      }
                    />
                  </FormField>
                </SpaceBetween>
              </Form>
            </Container>
            <Container>
              <Form
                header={<Header variant="h3">Datos institucionales</Header>}
              >
                <SpaceBetween size="s">
                  <FormField label="Código" stretch>
                    <Input disabled value={formValues.codigo} />
                  </FormField>
                  <FormField
                    label="Dependencia"
                    errorText={formErrors.dependencia_id}
                    stretch
                  >
                    <Select
                      placeholder="Escoja una opción"
                      selectedOption={formValues.dependencia_id}
                      onChange={({ detail }) =>
                        handleChange("dependencia_id", detail.selectedOption)
                      }
                      options={dependencias}
                    />
                  </FormField>
                  <FormField
                    label="Instituto"
                    errorText={formErrors.instituto_id}
                    stretch
                  >
                    <Select
                      placeholder="Escoja una opción"
                      selectedOption={formValues.instituto_id}
                      onChange={({ detail }) =>
                        handleChange("instituto_id", detail.selectedOption)
                      }
                      options={institutos}
                    />
                  </FormField>
                  <FormField
                    label="Facultad"
                    errorText={formErrors.facultad_id}
                    stretch
                  >
                    <Select
                      placeholder="Escoja una opción"
                      selectedOption={formValues.facultad_id}
                      onChange={({ detail }) =>
                        handleChange("facultad_id", detail.selectedOption)
                      }
                      options={facultades}
                    />
                  </FormField>
                  <FormField label="Correo institucional" stretch>
                    <Input disabled value={formValues.email3} />
                  </FormField>
                </SpaceBetween>
              </Form>
            </Container>
          </SpaceBetween>
          <SpaceBetween size="l">
            <Container>
              <Form header={<Header variant="h3">Académico</Header>}>
                <SpaceBetween size="s">
                  <FormField label="Código ORCID" stretch>
                    <Input disabled value={formValues.codigo_orcid} />
                  </FormField>
                  <FormField label="Google Scholar" stretch>
                    <Input disabled value={formValues.google_scholar} />
                  </FormField>
                  <FormField
                    label="Scopus Author ID"
                    errorText={formErrors.scopus_id}
                    stretch
                  >
                    <Input
                      value={formValues.scopus_id}
                      onChange={({ detail }) =>
                        handleChange("scopus_id", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="ResearcherID"
                    errorText={formErrors.researcher_id}
                    stretch
                  >
                    <Input
                      value={formValues.researcher_id}
                      onChange={({ detail }) =>
                        handleChange("researcher_id", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="CTI Vitae" stretch>
                    <Input disabled value={formValues.cti_vitae} />
                  </FormField>
                  <FormField label="Renacyt" stretch>
                    <Input disabled value={formValues.renacyt} />
                  </FormField>
                  <FormField label="Renacyt NIVEL" stretch>
                    <Input disabled value={formValues.renacyt_nivel} />
                  </FormField>
                </SpaceBetween>
              </Form>
            </Container>
            <Container>
              <Form header={<Header variant="h3">Datos profesionales</Header>}>
                <SpaceBetween size="s">
                  <FormField label="Tipo" stretch>
                    <Input disabled value={formValues.tipo} />
                  </FormField>
                  <FormField label="Categoría y clase" stretch>
                    <Input
                      disabled
                      value={
                        formValues.categoria +
                        " / " +
                        formValues.clase +
                        " / " +
                        formValues.horas
                      }
                    />
                  </FormField>
                  <FormField
                    label="Especialidad"
                    errorText={formErrors.especialidad}
                    stretch
                  >
                    <Input
                      value={formValues.especialidad}
                      onChange={({ detail }) =>
                        handleChange("especialidad", detail.value)
                      }
                    />
                  </FormField>
                  <FormField
                    label="Título Profesional"
                    errorText={formErrors.titulo_profesional}
                    stretch
                  >
                    <Input
                      value={formValues.titulo_profesional}
                      onChange={({ detail }) =>
                        handleChange("titulo_profesional", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="Grado" errorText={formErrors.grado} stretch>
                    <Select
                      placeholder="Escoja una opción"
                      selectedOption={formValues.grado}
                      onChange={({ detail }) =>
                        handleChange("grado", detail.selectedOption)
                      }
                      options={[
                        { value: "Bachiller" },
                        { value: "Maestro" },
                        { value: "Doctor" },
                        { value: "Msci" },
                        { value: "Phd" },
                      ]}
                    />
                  </FormField>
                </SpaceBetween>
              </Form>
            </Container>
          </SpaceBetween>
          <SpaceBetween size="l">
            <Cdi />
            <Container>
              <Form
                header={<Header variant="h3">Información adicional</Header>}
              >
                <SpaceBetween size="s">
                  <FormField label="Resumen biográfico" stretch>
                    <Textarea
                      value={formValues.biografia}
                      onChange={({ detail }) =>
                        handleChange("biografia", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="Facebook" stretch>
                    <Input
                      value={formValues.facebook}
                      onChange={({ detail }) =>
                        handleChange("facebook", detail.value)
                      }
                    />
                  </FormField>
                  <FormField label="Twitter" stretch>
                    <Input
                      value={formValues.twitter}
                      onChange={({ detail }) =>
                        handleChange("twitter", detail.value)
                      }
                    />
                  </FormField>
                </SpaceBetween>
              </Form>
            </Container>
          </SpaceBetween>
        </ColumnLayout>
      )}
    </BaseLayout>
  );
}
