import {
  ColumnLayout,
  Container,
  FormField,
  Input,
  Select,
  SpaceBetween,
  Spinner,
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
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Proyectos FEX",
  },
  {
    text: "Registrar",
    href: "../proyectos_fex",
  },
];

const initialForm = {
  titulo: "",
  linea_investigacion_id: null,
  ocde_1: null,
  ocde_2: null,
  ocde_3: null,
  moneda_tipo: null,
  aporte_unmsm: "0.0",
  aporte_no_unmsm: "0.0",
  financiamiento_fuente_externa: "0.0",
  entidad_asociada: "0.0",
  fuente_financiadora: null,
  otra_fuente: "",
  pais: null,
  web_fuente: "",
  participacion_unmsm: null,
  resolucion_rectoral: "",
};

const formRules = {
  titulo: { required: true },
  moneda_tipo: { required: true },
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

export default function Registrar_proyecto_fex_1() {
  //  States
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
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
    const res = await axiosBase.get("investigador/actividades/fex/lineasUnmsm");
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
          "investigador/actividades/fex/registrarPaso1",
          { ...formValues, id }
        );
        setLoading(false);
        const data = res.data;
        const query = queryString.stringify({
          id: data.id,
        });
        window.location.href = "paso2?" + query;
      }
    }
  };

  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("investigador/actividades/fex/datosPaso1", {
      params: {
        id,
      },
    });
    const data = res.data;
    setLineas(data.lineas);
    setOcde(data.ocde);
    setPaises(data.paises);
    handleChange("titulo", data.proyecto.titulo);
    handleChange(
      "linea_investigacion_id",
      data.lineas.find(
        (opt) => opt.value == data.proyecto.linea_investigacion_id
      )
    );
    //  Ocde
    const ocde_3 = data.ocde.find((opt) => opt.value == data.proyecto.ocde_id);
    const ocde_2 = data.ocde.find((opt) => opt.value == ocde_3?.parent_id);
    const ocde_1 = data.ocde.find((opt) => opt.value == ocde_2?.parent_id);
    handleChange("ocde_3", ocde_3);
    handleChange("ocde_2", ocde_2);
    handleChange("ocde_1", ocde_1);

    handleChange(
      "moneda_tipo",
      monedas.find((opt) => opt.value == data.extras?.moneda_tipo)
    );
    handleChange("aporte_unmsm", data.proyecto.aporte_unmsm);
    handleChange("aporte_no_unmsm", data.proyecto.aporte_no_unmsm);
    handleChange(
      "financiamiento_fuente_externa",
      data.proyecto.financiamiento_fuente_externa
    );
    handleChange("entidad_asociada", data.proyecto.entidad_asociada);
    handleChange("resolucion_rectoral", data.proyecto.resolucion_rectoral);

    handleChange(
      "fuente_financiadora",
      entidades.find((opt) => opt.value == data.extras?.fuente_financiadora)
    );
    handleChange("otra_fuente", data.extras?.otra_fuente ?? "");
    handleChange(
      "pais",
      data.paises.find((opt) => opt.value == data.extras?.pais)
    );
    handleChange("web_fuente", data.extras?.web_fuente ?? "");
    handleChange(
      "participacion_unmsm",
      participaciones.find(
        (opt) => opt.value == data.extras?.participacion_unmsm
      )
    );
    setLoadingData(false);
  };

  useEffect(() => {
    if (id) {
      getData();
    } else {
      lineasUnmsm();
    }
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Registrar o actualizar la información de un proyecto FEX."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={0}
        isLoadingNextStep={loading}
        onCancel={() => {
          window.location.href = "../proyectosFex";
        }}
        steps={[
          {
            title: "Datos básicos",
            description: "Información general del proyecto",
            content: (
              <>
                {loadingData ? (
                  <Container>
                    <Spinner /> Cargando datos
                  </Container>
                ) : (
                  <SpaceBetween size="m">
                    <Container>
                      <SpaceBetween size="s">
                        <FormField
                          label="Título"
                          errorText={formErrors.titulo}
                          stretch
                        >
                          <Input
                            placeholder="Escriba el título del proyecto"
                            value={formValues.titulo}
                            onChange={({ detail }) =>
                              handleChange("titulo", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Línea de investigación UNMSM"
                          errorText={formErrors.linea_investigacion_id}
                          stretch
                        >
                          <Select
                            placeholder="Escoja una opción"
                            statusType={
                              lineas.length == 0 ? "loading" : "finished"
                            }
                            loadingText="Cargando datos"
                            options={lineas}
                            selectedOption={formValues.linea_investigacion_id}
                            onChange={({ detail }) =>
                              handleChange(
                                "linea_investigacion_id",
                                detail.selectedOption
                              )
                            }
                            virtualScroll
                          />
                        </FormField>
                        <ColumnLayout columns={3}>
                          <FormField
                            label="OCDE Área"
                            errorText={formErrors.ocde_1}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              statusType={
                                ocde.length == 0 ? "loading" : "finished"
                              }
                              loadingText="Cargando datos"
                              options={ocde.filter(
                                (item) => item.parent_id == null
                              )}
                              selectedOption={formValues.ocde_1}
                              onChange={({ detail }) => {
                                handleChange("ocde_1", detail.selectedOption);
                                if (
                                  detail.selectedOption != formValues.ocde_1
                                ) {
                                  handleChange("ocde_2", null);
                                  handleChange("ocde_3", null);
                                }
                              }}
                            />
                          </FormField>
                          <FormField
                            label="OCDE Línea"
                            errorText={formErrors.ocde_2}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              statusType={
                                formValues.ocde_1 == null
                                  ? "loading"
                                  : "finished"
                              }
                              loadingText="Necesita escoger el área primero"
                              options={
                                formValues.ocde_1 == null
                                  ? []
                                  : ocde.filter(
                                      (item) =>
                                        item.parent_id ==
                                        formValues.ocde_1?.value
                                    )
                              }
                              selectedOption={formValues.ocde_2}
                              onChange={({ detail }) => {
                                handleChange("ocde_2", detail.selectedOption);
                                if (
                                  detail.selectedOption != formValues.ocde_2
                                ) {
                                  handleChange("ocde_3", null);
                                }
                              }}
                            />
                          </FormField>
                          <FormField
                            label="OCDE Sub línea"
                            errorText={formErrors.ocde_3}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              statusType={
                                formValues.ocde_2 == null
                                  ? "loading"
                                  : "finished"
                              }
                              loadingText="Necesita escoger una línea primero"
                              options={
                                formValues.ocde_2 == null
                                  ? []
                                  : ocde.filter(
                                      (item) =>
                                        item.parent_id ==
                                        formValues.ocde_2?.value
                                    )
                              }
                              selectedOption={formValues.ocde_3}
                              onChange={({ detail }) =>
                                handleChange("ocde_3", detail.selectedOption)
                              }
                            />
                          </FormField>
                        </ColumnLayout>
                      </SpaceBetween>
                    </Container>
                    <Container>
                      <ColumnLayout columns={3}>
                        <FormField
                          label="Tipo de moneda"
                          errorText={formErrors.moneda_tipo}
                          stretch
                        >
                          <Select
                            placeholder="Escoja una opción"
                            options={monedas}
                            selectedOption={formValues.moneda_tipo}
                            onChange={({ detail }) =>
                              handleChange("moneda_tipo", detail.selectedOption)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Aporte monetario UNMSM"
                          errorText={formErrors.aporte_unmsm}
                          stretch
                        >
                          <Input
                            type="number"
                            value={formValues.aporte_unmsm}
                            onChange={({ detail }) =>
                              handleChange("aporte_unmsm", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Aporte no monetario UNMSM"
                          errorText={formErrors.aporte_no_unmsm}
                          stretch
                        >
                          <Input
                            type="number"
                            value={formValues.aporte_no_unmsm}
                            onChange={({ detail }) =>
                              handleChange("aporte_no_unmsm", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Financiamiento de la fuente externa"
                          errorText={formErrors.financiamiento_fuente_externa}
                          stretch
                        >
                          <Input
                            type="number"
                            value={formValues.financiamiento_fuente_externa}
                            onChange={({ detail }) =>
                              handleChange(
                                "financiamiento_fuente_externa",
                                detail.value
                              )
                            }
                          />
                        </FormField>
                        <FormField
                          label="Entidad asociada y/o colaboradora"
                          errorText={formErrors.entidad_asociada}
                          stretch
                        >
                          <Input
                            type="number"
                            value={formValues.entidad_asociada}
                            onChange={({ detail }) =>
                              handleChange("entidad_asociada", detail.value)
                            }
                          />
                        </FormField>
                        <FormField label="Aporte total del proyecto" stretch>
                          <Input
                            disabled
                            type="number"
                            value={parseFloat(
                              parseFloat(formValues.aporte_unmsm) +
                                parseFloat(formValues.aporte_no_unmsm) +
                                parseFloat(
                                  formValues.financiamiento_fuente_externa
                                ) +
                                parseFloat(formValues.entidad_asociada)
                            ).toFixed(3)}
                          />
                        </FormField>
                      </ColumnLayout>
                    </Container>
                    <Container>
                      <ColumnLayout columns={3}>
                        <FormField label="Fuente financiadora" stretch>
                          <Select
                            placeholder="Escoja una opción"
                            options={entidades}
                            selectedOption={formValues.fuente_financiadora}
                            onChange={({ detail }) =>
                              handleChange(
                                "fuente_financiadora",
                                detail.selectedOption
                              )
                            }
                          />
                        </FormField>
                        <FormField label="Otro" stretch>
                          <Input
                            disabled={
                              formValues.fuente_financiadora == null ||
                              formValues.fuente_financiadora?.value != "OTROS"
                            }
                            value={formValues.otra_fuente}
                            onChange={({ detail }) =>
                              handleChange("otra_fuente", detail.value)
                            }
                          />
                        </FormField>
                        <FormField label="País" stretch>
                          <Select
                            placeholder="Escoja una opción"
                            statusType={
                              paises.length == 0 ? "loading" : "finished"
                            }
                            loadingText="Cargando datos"
                            options={paises}
                            selectedOption={formValues.pais}
                            onChange={({ detail }) =>
                              handleChange("pais", detail.selectedOption)
                            }
                            virtualScroll
                          />
                        </FormField>
                        <FormField
                          label="Sitio web fuente financiadora"
                          stretch
                        >
                          <Input
                            value={formValues.web_fuente}
                            onChange={({ detail }) =>
                              handleChange("web_fuente", detail.value)
                            }
                          />
                        </FormField>
                        <FormField label="La UNMSM participa como" stretch>
                          <Select
                            placeholder="Escoja una opción"
                            options={participaciones}
                            selectedOption={formValues.participacion_unmsm}
                            onChange={({ detail }) =>
                              handleChange(
                                "participacion_unmsm",
                                detail.selectedOption
                              )
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
                )}
              </>
            ),
          },
          {
            title: "Descripción del proyecto",
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
