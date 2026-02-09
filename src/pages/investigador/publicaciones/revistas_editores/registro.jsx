import {
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import axiosBase from "../../../../api/axios";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Editor en revistas",
  },
  {
    text: "Registro",
  },
];

const initialForm = {
  nombre: "",
  casa: "",
  issn: "",
  issn_e: "",
  pais: "",
  fecha_inicio: "",
};

const formRules = {
  nombre: { required: true },
  casa: { required: true },
  issn: { required: true },
  issn_e: { required: true },
  pais: { required: true },
  fecha_inicio: { required: true },
};

export default function Revistas_editores_registro() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [creating, setCreating] = useState(false);
  const [paises, setPaises] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const listaPaises = async () => {
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/getPaises",
    );
    const data = res.data;
    setPaises(data);
  };

  const registrar = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post(
        "investigador/publicaciones/eventos/registrarPaso1",
        formValues,
      );
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  useEffect(() => {
    listaPaises();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Revistas en las que puede nombrarse como editor"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="form"
    >
      <Container>
        <Form
          header={
            <Header
              actions={
                <Button
                  variant="primary"
                  onClick={registrar}
                  loading={creating}
                >
                  Crear
                </Button>
              }
            >
              Datos de la revista
            </Header>
          }
        >
          <SpaceBetween direction="vertical" size="s">
            <FormField
              label="Nombre de la revista"
              stretch
              errorText={formErrors.nombre}
            >
              <Input
                placeholder="Escriba el nombre de la revista"
                value={formValues.nombre}
                onChange={({ detail }) => handleChange("nombre", detail.value)}
              />
            </FormField>
            <FormField
              label="Casa de la revista"
              stretch
              errorText={formErrors.casa}
            >
              <Input
                placeholder="Escriba el nombre de la casa de la revista"
                value={formValues.casa}
                onChange={({ detail }) => handleChange("casa", detail.value)}
              />
            </FormField>
            <ColumnLayout columns={4}>
              <FormField label="ISSN" stretch errorText={formErrors.issn}>
                <Input
                  placeholder="Escriba el ISSN"
                  value={formValues.issn}
                  onChange={({ detail }) => handleChange("issn", detail.value)}
                />
              </FormField>
              <FormField label="ISSN-E" stretch errorText={formErrors.issn_e}>
                <Input
                  placeholder="Escriba el ISSN-E"
                  value={formValues.issn_e}
                  onChange={({ detail }) =>
                    handleChange("issn_e", detail.value)
                  }
                />
              </FormField>
              <FormField label="País" stretch errorText={formErrors.pais}>
                <Select
                  statusType={paises.length == 0 ? "loading" : "finished"}
                  loadingText="Cargando"
                  placeholder="Escoja una opción"
                  selectedOption={formValues.pais}
                  onChange={({ detail }) => {
                    handleChange("pais", detail.selectedOption);
                  }}
                  options={paises}
                />
              </FormField>
              <FormField
                label="Fecha de inicio como editor"
                constraintText="Por favor sea preciso ya que esta información se validará"
                stretch
                errorText={formErrors.fecha_inicio}
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_inicio}
                  onChange={({ detail }) =>
                    handleChange("fecha_inicio", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </Form>
      </Container>
    </BaseLayout>
  );
}
