import {
  Button,
  Checkbox,
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
  revista: "",
  casa: "",
  issn: "",
  issne: "",
  pais: "",
  fecha_inicio: "",
  fecha_fin: "",
};

const formRules = {
  revista: { required: true },
  casa: { required: true },
  issn: { required: true },
  issne: { required: true },
  pais: { required: true },
  fecha_inicio: { required: true },
  fecha_fin: { required: false },
};

export default function Revistas_editores_registro() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [creating, setCreating] = useState(false);
  const [paises, setPaises] = useState([]);
  const [currentEditor, setCurrentEditor] = useState(false);

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
        "investigador/publicaciones/revistas/registrar",
        formValues,
      );
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      if (data.message == "success") {
        window.location.href = "../revistas_editores";
      }
    }
  };

  useEffect(() => {
    listaPaises();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro de solicitud como editor"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="form"
    >
      <Container>
        <Form
          header={
            <Header
              description="Por favor sea preciso ya que esta información se validará"
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
              errorText={formErrors.revista}
            >
              <Input
                placeholder="Escriba el nombre de la revista"
                value={formValues.revista}
                onChange={({ detail }) => handleChange("revista", detail.value)}
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

            <ColumnLayout columns={3}>
              <FormField label="ISSN" stretch errorText={formErrors.issn}>
                <Input
                  placeholder="Escriba el ISSN"
                  value={formValues.issn}
                  onChange={({ detail }) => handleChange("issn", detail.value)}
                />
              </FormField>
              <FormField label="ISSN-E" stretch errorText={formErrors.issne}>
                <Input
                  placeholder="Escriba el ISSN-E"
                  value={formValues.issne}
                  onChange={({ detail }) => handleChange("issne", detail.value)}
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
            </ColumnLayout>
            <ColumnLayout columns={2}>
              <FormField
                label="Fecha de inicio como editor"
                stretch
                errorText={formErrors.fecha_inicio}
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_inicio}
                  onChange={({ detail }) =>
                    handleChange("fecha_inicio", detail.value)
                  }
                  isDateEnabled={(date) => {
                    if (formValues.fecha_fin != "") {
                      const newDate = new Date(formValues.fecha_fin);
                      return date < newDate;
                    } else {
                      return true;
                    }
                  }}
                  dateDisabledReason={() => {
                    return "La fecha inicial no puede ser mayor a la fecha final";
                  }}
                />
              </FormField>
              <FormField
                label="Fecha de fin como editor"
                constraintText={
                  <SpaceBetween
                    direction="horizontal"
                    alignItems="center"
                    size="xxs"
                  >
                    <Checkbox
                      checked={currentEditor}
                      onChange={() => {
                        setCurrentEditor(!currentEditor);
                        handleChange("fecha_fin", "");
                      }}
                    />
                    <>Marque si es editor actualmente</>
                  </SpaceBetween>
                }
                stretch
                errorText={formErrors.fecha_fin}
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_fin}
                  onChange={({ detail }) =>
                    handleChange("fecha_fin", detail.value)
                  }
                  disabled={currentEditor}
                  isDateEnabled={(date) => {
                    if (formValues.fecha_inicio != "") {
                      const newDate = new Date(formValues.fecha_inicio);
                      return date > newDate;
                    } else {
                      return true;
                    }
                  }}
                  dateDisabledReason={() => {
                    return "La fecha final no puede ser menor a la fecha inicial";
                  }}
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </Form>
      </Container>
    </BaseLayout>
  );
}
