import {
  ColumnLayout,
  Container,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  Wizard,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

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
    text: "Nuevo",
    href: "../proyectos_fex",
  },
];

const initialForm = {
  titulo: "",
  linea_investigacion_id: null,
  ocde_1: null,
  ocde_2: null,
  ocde_3: null,
  moneda: null,
  aporte_unmsm: "0.0",
  aporte_no_unmsm: "0.0",
  financiamiento_fuente_externa: "0.0",
  entidad_asociada: "0.0",
  fuente: null,
  fuente_input: "",
  pais: null,
  sitio: "",
  participacion: null,
  resolucion_rectoral: "",
};

const formRules = {
  titulo: { required: true },
  moneda: { required: true },
  aporte_unmsm: { required: true, regex: /^(0|[1-9]\d*)(\.\d+)?$/ },
  aporte_no_unmsm: { required: true, regex: /^(0|[1-9]\d*)(\.\d+)?$/ },
  financiamiento_fuente_externa: {
    required: true,
    regex: /^(0|[1-9]\d*)(\.\d+)?$/,
  },
  entidad_asociada: { required: true, regex: /^(0|[1-9]\d*)(\.\d+)?$/ },
};

const monedas = [
  { value: "DOLARES", label: "$ Dólares" },
  { value: "EUROS", label: "€ Euros" },
  { value: "LIBRA", label: "£ Libra Esterlina" },
  { value: "SOLES", label: "S/ Soles" },
];

const entidades = [
  { value: "CONCYTEC" },
  { value: "CONCYTEC - FONDECYT" },
  { value: "FINCYT" },
  { value: "FONDECYT" },
  { value: "FONDECYT - Banco Mundial" },
  { value: "FONDECYT - CONCYTEC" },
  { value: "OTROS" },
];

const participaciones = [
  { value: "Entidad principal", label: "1. Entidad principal / ejecutora" },
  { value: "Entidad asociada", label: "2. Entidad asociada" },
  { value: "Entidad colaboradora", label: "3. Entidad colaboradora" },
];

export default function Registrar_proyecto_fex_2() {
  //  States
  const [loading, setLoading] = useState(false);
  const [lineas, setLineas] = useState([]);
  const [ocde, setOcde] = useState([]);
  const [paises, setPaises] = useState([]);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const lineasUnmsm = async () => {
    const res = await axiosBase.get("admin/estudios/proyectosFEX/lineasUnmsm");
    const data = res.data;
    setLineas(data.lineas);
    setOcde(data.ocde);
    setPaises(data.paises);
  };

  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      if (validateForm()) {
        setLoading(true);
        const res = await axiosBase.post(
          "admin/estudios/proyectosFEX/registrarPaso1",
          formValues
        );
        setLoading(false);
        const data = res.data;
        const query = queryString.stringify({
          id: data.id,
        });
        window.location.href = "paso_2?" + query;
      }
    }
  };

  useEffect(() => {
    lineasUnmsm();
  }, []);

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
            description: "Información general del proyecto",
          },
          {
            title: "Descripción del proyecto",
            description: "Detalles del proyecto",
            content: (
              <SpaceBetween size="m">
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
                    header={<Header variant="h3">Duración del proyecto</Header>}
                  >
                    <ColumnLayout columns={3}>
                      <FormField
                        label="Años"
                        errorText={formErrors.años}
                        stretch
                      >
                        <Input
                          placeholder="Escriba la cantidad de años"
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
                          value={formValues.dias}
                          onChange={({ detail }) =>
                            handleChange("dias", detail.value)
                          }
                        />
                      </FormField>
                    </ColumnLayout>
                  </Form>
                </Container>
                <Container>
                  <ColumnLayout columns={3}>
                    <FormField label="Fuente financiadora" stretch>
                      <Select
                        placeholder="Escoja una opción"
                        options={entidades}
                        selectedOption={formValues.fuente}
                        onChange={({ detail }) =>
                          handleChange("fuente", detail.selectedOption)
                        }
                      />
                    </FormField>
                    <FormField label="Otro" stretch>
                      <Input
                        disabled={
                          formValues.fuente == null ||
                          formValues.fuente?.value != "OTROS"
                        }
                        value={formValues.fuente_input}
                        onChange={({ detail }) =>
                          handleChange("fuente_input", detail.value)
                        }
                      />
                    </FormField>
                    <FormField label="País" stretch>
                      <Select
                        placeholder="Escoja una opción"
                        statusType={paises.length == 0 ? "loading" : "finished"}
                        loadingText="Cargando datos"
                        options={paises}
                        selectedOption={formValues.pais}
                        onChange={({ detail }) =>
                          handleChange("pais", detail.selectedOption)
                        }
                        virtualScroll
                      />
                    </FormField>
                    <FormField label="Sitio web fuente financiadora" stretch>
                      <Input
                        value={formValues.sitio}
                        onChange={({ detail }) =>
                          handleChange("sitio", detail.value)
                        }
                      />
                    </FormField>
                    <FormField label="La UNMSM participa como" stretch>
                      <Select
                        placeholder="Escoja una opción"
                        options={participaciones}
                        selectedOption={formValues.participacion}
                        onChange={({ detail }) =>
                          handleChange("participacion", detail.selectedOption)
                        }
                      />
                    </FormField>
                    <FormField label="Nro RR" stretch>
                      <Input
                        value={formValues.resolucion_rectoral}
                        onChange={({ detail }) =>
                          handleChange("resolucion_rectoral", detail.value)
                        }
                      />
                    </FormField>
                  </ColumnLayout>
                </Container>
              </SpaceBetween>
            ),
          },
          {
            title: "Resultado de proyecto financiado",
          },
          {
            title: "Autores de la publicación",
          },
          {
            title: "Envío de publicación",
          },
        ]}
      />
    </BaseLayout>
  );
}
