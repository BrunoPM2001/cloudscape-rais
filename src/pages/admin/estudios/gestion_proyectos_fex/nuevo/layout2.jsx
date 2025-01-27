import {
  Alert,
  ColumnLayout,
  Container,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  SpaceBetween,
  Spinner,
  Tabs,
  Wizard,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import Objetivos from "./tabs/objetivos";
import Palabras_clave from "./tabs/palabras_clave";
import Resumen from "./tabs/resumen";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de proyectos FEX",
  },
  {
    text: "Registrar",
    href: "../proyectos_fex",
  },
];

const initialForm = {
  fecha_inicio: "",
  fecha_fin: "",
  años: "",
  meses: "",
  dias: "",
  resumen: "",
  objetivos: "",
  palabras_clave: "",
};

const formRules = {
  años: { regex: /^[1-9]\d*$/ },
  meses: { regex: /^([1-9]|1[0-2])$/ },
  dias: { regex: /^([1-9]|[1-2][0-9]|3[0-1])$/ },
  resumen: { required: true },
  objetivos: { required: true },
};

export default function Registrar_proyecto_fex_2() {
  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions

  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      id,
    });
    if (detail.requestedStepIndex > 1) {
      if (validateForm()) {
        //  Validar que se hayan llenado o las fechas
        if (
          (formValues.fecha_inicio != "" && formValues.fecha_fin != "") ||
          (formValues.años != "" &&
            formValues.meses != "" &&
            formValues.dias != "")
        ) {
          setLoading(true);
          await axiosBase.post("admin/estudios/proyectosFEX/registrarPaso2", {
            ...formValues,
            id,
          });
          setLoading(false);
          window.location.href = "paso_3?" + query;
        } else {
          setAlert(true);
        }
      }
    } else {
      window.location.href = "paso_1?" + query;
    }
  };

  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/proyectosFEX/datosPaso2", {
      params: {
        id,
      },
    });
    const data = res.data;
    handleChange("fecha_inicio", data.proyecto.fecha_inicio);
    handleChange("fecha_fin", data.proyecto.fecha_fin);
    handleChange("palabras_clave", data.proyecto.palabras_clave);
    if (data.extras) {
      handleChange("resumen", data.extras.resumen);
      handleChange("objetivos", data.extras.objetivos);
      handleChange("años", data.extras.duracion_anio);
      handleChange("meses", data.extras.duracion_mes);
      handleChange("dias", data.extras.duracion_dia);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getData();
  }, []);

  //  Tabs
  const tabs = [
    {
      id: "resumen_ejecutivo",
      label: "Resumen ejecutivo",
      content: (
        <Resumen
          value={formValues.resumen}
          error={formErrors.resumen}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "objetivos",
      label: "Objetivos",
      content: (
        <Objetivos
          value={formValues.objetivos}
          error={formErrors.objetivos}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "palabras_clave",
      label: "Palabras clave",
      content: (
        <Palabras_clave
          value={formValues.palabras_clave}
          error={formErrors.palabras_clave}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Registrar o actualizar la información de un proyecto FEX."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={1}
        isLoadingNextStep={loading}
        onCancel={() => {
          window.location.href = "../proyectos_fex";
        }}
        steps={[
          {
            title: "Datos básicos",
          },
          {
            title: "Descripción del proyecto",
            description: "Detalles del proyecto",
            content: (
              <>
                {loadingData ? (
                  <Container>
                    <Spinner /> Cargando datos
                  </Container>
                ) : (
                  <SpaceBetween size="m">
                    {alert && (
                      <Alert
                        type="error"
                        header="Campo requerido"
                        dismissible
                        onDismiss={() => setAlert(false)}
                      >
                        Necesita completar la fecha de inicio y fin, o el tiempo
                        en años, meses y días.
                      </Alert>
                    )}
                    <Container>
                      <Form
                        header={
                          <Header
                            variant="h3"
                            description="Colocar el tiempo estipulado en el convenio, contrato u otro"
                          >
                            Plazo del proyecto
                          </Header>
                        }
                      >
                        <ColumnLayout columns={2}>
                          <FormField
                            label="Fecha de inicio"
                            errorText={formErrors.fecha_inicio}
                            stretch
                          >
                            <DatePicker
                              placeholder="YYYY/MM/DD"
                              isDateEnabled={(date) => {
                                if (formValues.fecha_fin != "") {
                                  const newDate = new Date(
                                    formValues.fecha_fin
                                  );
                                  return date < newDate;
                                } else {
                                  return true;
                                }
                              }}
                              dateDisabledReason={() => {
                                return "La fecha inicial no puede ser mayor a la fecha final";
                              }}
                              value={formValues.fecha_inicio}
                              onChange={({ detail }) =>
                                handleChange("fecha_inicio", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Fecha de fin"
                            errorText={formErrors.fecha_fin}
                            stretch
                          >
                            <DatePicker
                              placeholder="YYYY/MM/DD"
                              isDateEnabled={(date) => {
                                if (formValues.fecha_inicio != "") {
                                  const newDate = new Date(
                                    formValues.fecha_inicio
                                  );
                                  return date > newDate;
                                } else {
                                  return true;
                                }
                              }}
                              dateDisabledReason={() => {
                                return "La fecha final no puede ser menor a la fecha inicial";
                              }}
                              value={formValues.fecha_fin}
                              onChange={({ detail }) =>
                                handleChange("fecha_fin", detail.value)
                              }
                            />
                          </FormField>
                        </ColumnLayout>
                      </Form>
                    </Container>
                    <Container>
                      <Form
                        header={
                          <Header
                            variant="h3"
                            description="En caso no complete las fechas de inicio o de fin colocar el tiempo de duración del proyecto"
                          >
                            Duración del proyecto
                          </Header>
                        }
                      >
                        <ColumnLayout columns={3}>
                          <FormField
                            label="Años"
                            errorText={formErrors.años}
                            stretch
                          >
                            <Input
                              placeholder="Escriba la cantidad de años"
                              type="number"
                              value={formValues.años}
                              onChange={({ detail }) =>
                                handleChange("años", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Meses"
                            errorText={formErrors.meses}
                            stretch
                          >
                            <Input
                              placeholder="Escriba la cantidad de meses"
                              type="number"
                              value={formValues.meses}
                              onChange={({ detail }) =>
                                handleChange("meses", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Días"
                            errorText={formErrors.dias}
                            stretch
                          >
                            <Input
                              placeholder="Escriba la cantidad de dias"
                              type="number"
                              value={formValues.dias}
                              onChange={({ detail }) =>
                                handleChange("dias", detail.value)
                              }
                            />
                          </FormField>
                        </ColumnLayout>
                      </Form>
                    </Container>
                    <Container
                      header={
                        <Header
                          variant="h3"
                          description="Completar las secciones de Resumen ejecutivo y Objetivos es obligatorio"
                        >
                          Descripción
                        </Header>
                      }
                    >
                      <Tabs tabs={tabs} />
                    </Container>
                  </SpaceBetween>
                )}
              </>
            ),
          },
          {
            title: "Documentos",
          },
          {
            title: "Integrantes",
          },
        ]}
      />
    </BaseLayout>
  );
}
