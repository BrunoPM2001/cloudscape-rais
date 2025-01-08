import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FormField,
  Input,
  Select,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto multidisciplinario",
  },
];

const initialForm = {
  titulo: "",
  nombres: "",
  area: "",
  facultad: "",
  grupo_nombre: "",
  linea: null,
  area_tematica: null,
  localizacion: null,
  ods: null,
  ocde1: null,
  ocde2: null,
  ocde: null,
};

const formRules = {
  titulo: { required: true },
  linea: { required: true },
  area_tematica: { required: true },
  localizacion: { required: true },
  ods: { required: true },
  ocde: { required: true },
};

const areas_tematicas = [
  { value: "Biotecnología" },
  { value: "Biodiversidad" },
  { value: "Tecnología de Materiales" },
  { value: "Salud pública y bienestar social" },
  { value: "Educación y Tecnologías de Información y Comunicación" },
  { value: "Desigualdad e Inequidad Social" },
];

const localizaciones = [
  { value: "En las sedes de la UNMSM en Lima" },
  { value: "En el área de Lima Metropolitana" },
  { value: "En las Regiones de Lima provincias y El Callao" },
  { value: "En otras Regiones del país" },
  { value: "En otros lugares" },
];

export default function Registro_pmulti_1() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pmulti/verificar1",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    setData(info);
    if (info.go) {
      const query = queryString.stringify({ id: info.go });
      window.location.href = "paso" + info.step + "?" + query;
    } else {
      if (!info.estado) {
        setErrors(info.errores);
      } else {
        handleChange("nombres", info.datos.nombres);
        handleChange("area", info.datos.area);
        handleChange("facultad", info.datos.facultad);
        handleChange("grupo_nombre", info.datos.grupo_nombre);

        if (info.proyecto) {
          handleChange("titulo", info.proyecto.titulo);
          handleChange(
            "linea",
            info.lineas.find(
              (opt) => opt.value == info.proyecto.linea_investigacion_id
            )
          );
          handleChange(
            "area_tematica",
            areas_tematicas.find(
              (opt) => opt.value == info.proyecto.area_tematica
            )
          );
          handleChange("localizacion", { value: info.proyecto.localizacion });
          handleChange(
            "ods",
            info.ods.find((opt) => opt.value == info.proyecto.objetivo_ods)
          );

          const ocde_3 = info.ocde.find(
            (opt) => opt.value == info.proyecto.ocde_id
          );
          const ocde_2 = info.ocde.find(
            (opt) => opt.value == ocde_3?.parent_id
          );
          const ocde_1 = info.ocde.find(
            (opt) => opt.value == ocde_2?.parent_id
          );
          handleChange("ocde", ocde_3);
          handleChange("ocde2", ocde_2);
          handleChange("ocde1", ocde_1);
          handleChange("id", id);
        }
      }
      setLoading(false);
    }
  };

  const siguiente = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/pmulti/registrar1",
        formValues
      );
      const info = res.data;
      if (info.message == "success") {
        const query = queryString.stringify({
          id: info.id,
        });
        window.location.href = "paso2?" + query;
      } else {
        pushNotification(info.detail, info.message, notifications.length + 1);
      }
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro a la convocatoria vigente"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="wizard"
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {errors.length == 0 ? (
            <Wizard
              onNavigate={siguiente}
              activeStepIndex={0}
              isLoadingNextStep={loadingBtn}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general",
                  description: "Información general",
                  content: (
                    <SpaceBetween size="l">
                      <Container>
                        <FormField
                          label="Título"
                          stretch
                          errorText={formErrors.titulo}
                        >
                          <Input
                            placeholder="Escriba el título de su proyecto"
                            value={formValues.titulo}
                            onChange={({ detail }) =>
                              handleChange("titulo", detail.value)
                            }
                          />
                        </FormField>
                      </Container>
                      <Container>
                        <ColumnLayout columns={3}>
                          <div>
                            <Box variant="awsui-key-label">
                              Responsable del estudio
                            </Box>
                            <Box>{formValues.nombres}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Área académica</Box>
                            <Box>{formValues.area}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Facultad</Box>
                            <Box>{formValues.facultad}</Box>
                          </div>
                        </ColumnLayout>
                      </Container>
                      <Container>
                        <ColumnLayout columns={2}>
                          <div>
                            <Box variant="awsui-key-label">
                              Grupo de investigación
                            </Box>
                            <Box>{formValues.grupo_nombre}</Box>
                          </div>
                          <FormField
                            label="Línea de investigación"
                            stretch
                            errorText={formErrors.linea}
                          >
                            <Select
                              placeholder="Escoja una opción"
                              selectedOption={formValues.linea}
                              onChange={({ detail }) =>
                                handleChange("linea", detail.selectedOption)
                              }
                              options={data.lineas}
                            />
                          </FormField>
                        </ColumnLayout>
                      </Container>
                      <Container>
                        <SpaceBetween size="m">
                          <ColumnLayout columns={2}>
                            <FormField
                              label="Área temática de la investigación"
                              errorText={formErrors.area_tematica}
                              stretch
                            >
                              <Select
                                placeholder="Escoja una opción"
                                options={areas_tematicas}
                                selectedOption={formValues.area_tematica}
                                onChange={({ detail }) => {
                                  handleChange(
                                    "area_tematica",
                                    detail.selectedOption
                                  );
                                }}
                              />
                            </FormField>
                            <FormField
                              label="Principal lugar de ejecución del proyecto"
                              errorText={formErrors.localizacion}
                              stretch
                            >
                              <Select
                                placeholder="Escoja una opción"
                                options={localizaciones}
                                selectedOption={formValues.localizacion}
                                onChange={({ detail }) => {
                                  handleChange(
                                    "localizacion",
                                    detail.selectedOption
                                  );
                                }}
                              />
                            </FormField>
                          </ColumnLayout>
                          <FormField
                            label="Objetivo ODS"
                            errorText={formErrors.ods}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              selectedOption={formValues.ods}
                              onChange={({ detail }) => {
                                handleChange("ods", detail.selectedOption);
                              }}
                              options={data.ods}
                            />
                          </FormField>
                        </SpaceBetween>
                      </Container>
                      <Container>
                        <ColumnLayout columns={3}>
                          <FormField
                            label="OCDE Área"
                            errorText={formErrors.ocde1}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              statusType={
                                data.ocde.length == 0 ? "loading" : "finished"
                              }
                              loadingText="Cargando datos"
                              options={data.ocde.filter(
                                (item) => item.parent_id == null
                              )}
                              selectedOption={formValues.ocde1}
                              onChange={({ detail }) => {
                                handleChange("ocde1", detail.selectedOption);
                                if (detail.selectedOption != formValues.ocde1) {
                                  handleChange("ocde2", null);
                                  handleChange("ocde", null);
                                }
                              }}
                            />
                          </FormField>
                          <FormField
                            label="OCDE Línea"
                            errorText={formErrors.ocde2}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              statusType={
                                formValues.ocde1 == null
                                  ? "loading"
                                  : "finished"
                              }
                              loadingText="Necesita escoger el área primero"
                              options={
                                formValues.ocde1 == null
                                  ? []
                                  : data.ocde.filter(
                                      (item) =>
                                        item.parent_id ==
                                        formValues.ocde1?.value
                                    )
                              }
                              selectedOption={formValues.ocde2}
                              onChange={({ detail }) => {
                                handleChange("ocde2", detail.selectedOption);
                                if (detail.selectedOption != formValues.ocde2) {
                                  handleChange("ocde3", null);
                                }
                              }}
                            />
                          </FormField>
                          <FormField
                            label="OCDE Sub línea"
                            errorText={formErrors.ocde}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              statusType={
                                formValues.ocde2 == null
                                  ? "loading"
                                  : "finished"
                              }
                              loadingText="Necesita escoger una línea primero"
                              options={
                                formValues.ocde2 == null
                                  ? []
                                  : data.ocde.filter(
                                      (item) =>
                                        item.parent_id ==
                                        formValues.ocde2?.value
                                    )
                              }
                              selectedOption={formValues.ocde}
                              onChange={({ detail }) =>
                                handleChange("ocde", detail.selectedOption)
                              }
                            />
                          </FormField>
                        </ColumnLayout>
                      </Container>
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades junto al responsable",
                },
                {
                  title: "Instrucciones finales",
                  description: "Reporte y envío de la propuesta",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede registrarse en esta convocatoria"
                type="warning"
              >
                {errors.map((item) => {
                  return <li>{item}</li>;
                })}
              </Alert>
            </>
          )}
        </>
      )}
    </BaseLayout>
  );
}
