import {
  Alert,
  Box,
  Button,
  Container,
  DatePicker,
  FormField,
  Header,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import Tiptap from "../../../../components/tiptap";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  id: null,
  estado: 0,
  objetivos_taller: "",
  fecha_evento: "",
  propuestas_taller: "",
  conclusion_taller: "",
  recomendacion_taller: "",
  asistencia_taller: "",
};

const formRules = {};

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id, proyecto_id, tipo_proyecto, informe } = queryString.parse(
    location.search
  );

  //  States
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [files, setFiles] = useState({});
  const [proyecto, setProyecto] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_academico/getData",
      {
        params: {
          id,
          proyecto_id,
          tipo_proyecto,
        },
      }
    );
    const data = res.data;
    setProyecto(data.proyecto);
    setFiles(data.archivos);
    if (data.informe) {
      handleChange("objetivos_taller", data.informe.objetivos_taller ?? "");
      handleChange("fecha_evento", data.informe.fecha_evento ?? "");
      handleChange("propuestas_taller", data.informe.propuestas_taller ?? "");
      handleChange("conclusion_taller", data.informe.conclusion_taller ?? "");
      handleChange(
        "recomendacion_taller",
        data.informe.recomendacion_taller ?? ""
      );
      handleChange("asistencia_taller", data.informe.asistencia_taller ?? "");
      handleChange("estado", data.informe.estado);
      handleChange("observaciones", data.informe.observaciones);
      handleChange("id", data.informe.id);
    }
    setLoading(false);
  };

  const sendData = async () => {
    setLoadingSave(true);
    const form = new FormData();
    form.append("id", id);
    form.append("proyecto_id", proyecto_id);
    form.append("tipo_proyecto", tipo_proyecto);
    form.append("objetivos_taller", formValues.objetivos_taller);
    form.append("fecha_evento", formValues.fecha_evento);
    form.append("propuestas_taller", formValues.propuestas_taller);
    form.append("conclusion_taller", formValues.conclusion_taller);
    form.append("recomendacion_taller", formValues.recomendacion_taller);
    form.append("asistencia_taller", formValues.asistencia_taller);
    const res = await axiosBase.post(
      "investigador/informes/informe_academico/sendData",
      form
    );
    const data = res.data;
    setLoadingSave(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  const presentar = async () => {
    setLoadingSave(true);
    const res = await axiosBase.put(
      "investigador/informes/informe_academico/presentar",
      {
        id,
        proyecto_id,
        tipo_proyecto,
      }
    );
    const data = res.data;
    data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    getData();
    setLoadingSave(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_academico/reporte",
      {
        params: {
          informe_tecnico_id: id,
          tipo_informe: informe,
          tipo_proyecto,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <br />
          <Container>
            <Spinner /> Cargando datos
          </Container>
        </>
      ) : formValues.estado == 1 || formValues.estado == 2 ? (
        <>
          <br />
          <Container
            header={
              <Header
                actions={
                  <Button
                    iconName="file"
                    loading={loadingBtn}
                    onClick={reporte}
                  >
                    Reporte
                  </Button>
                }
              >
                Informe presentado
              </Header>
            }
          >
            <SpaceBetween size="m">
              <div>
                <Box variant="awsui-key-label">Título</Box>
                <Box>{proyecto.titulo}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Código</Box>
                <Box>{proyecto.codigo_proyecto}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Año</Box>
                <Box>{proyecto.periodo}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Tipo de proyecto</Box>
                <Box>{tipo_proyecto}</Box>
              </div>
            </SpaceBetween>
          </Container>
        </>
      ) : (
        <SpaceBetween size="xs">
          {formValues.estado == 3 && (
            <Box margin={{ top: "s" }}>
              <Alert type="error" header="Observaciones">
                {formValues.observaciones}
              </Alert>
            </Box>
          )}
          <Wizard
            onNavigate={({ detail }) => setStep(detail.requestedStepIndex)}
            activeStepIndex={step}
            onCancel={() => {
              window.location.href = "../informeAcademico";
            }}
            i18nStrings={{
              optional: "Completar",
            }}
            secondaryActions={
              <Button onClick={sendData} loading={loadingSave}>
                Guardar informe
              </Button>
            }
            onSubmit={presentar}
            isLoadingNextStep={loadingSave}
            submitButtonText="Enviar informe"
            allowSkipTo
            steps={[
              {
                title: "Información",
                description:
                  "Programa de equipamiento científico para investigación de la UNMSM",
                content: (
                  <Container>
                    <SpaceBetween size="m">
                      <div>
                        <Box variant="awsui-key-label">Título</Box>
                        {loading ? <Spinner /> : <Box>{proyecto.titulo}</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Código</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>{proyecto.codigo_proyecto}</Box>
                        )}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Resolución</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>{proyecto.resolucion}</Box>
                        )}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Año</Box>
                        {loading ? <Spinner /> : <Box>{proyecto.periodo}</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Facultad</Box>
                        {loading ? <Spinner /> : <Box>{proyecto.facultad}</Box>}
                      </div>
                    </SpaceBetween>
                  </Container>
                ),
              },
              {
                title: "Objetivos",
                description: "Objetivos y metas del taller que se alcanzaron",
                content: (
                  <Tiptap
                    value={formValues.objetivos_taller}
                    handleChange={handleChange}
                    name="objetivos_taller"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Programa taller",
                description:
                  "Indicar al detalle las actividades programadas/realizadas",
                content: (
                  <SpaceBetween size="m">
                    <FormField label="Fecha del evento" stretch>
                      <DatePicker
                        placeholder="YYYY-MM-DD"
                        value={formValues.fecha_evento ?? ""}
                        onChange={({ detail }) =>
                          handleChange("fecha_evento", detail.value)
                        }
                      />
                    </FormField>
                    <FormField label="Programa del taller" stretch>
                      <Tiptap
                        value={formValues.propuestas_taller}
                        handleChange={handleChange}
                        name="propuestas_taller"
                      />
                    </FormField>
                  </SpaceBetween>
                ),
                isOptional: true,
              },
              {
                title: "Conclusiones",
                content: (
                  <Tiptap
                    value={formValues.conclusion_taller}
                    handleChange={handleChange}
                    name="conclusion_taller"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Recomendaciones",
                content: (
                  <Tiptap
                    value={formValues.recomendacion_taller}
                    handleChange={handleChange}
                    name="recomendacion_taller"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Asistencia",
                description: "Obligatoria para docentes a TC y DE",
                content: (
                  <Tiptap
                    value={formValues.asistencia_taller}
                    handleChange={handleChange}
                    name="asistencia_taller"
                  />
                ),
                isOptional: true,
              },
            ]}
          />
        </SpaceBetween>
      )}
    </>
  );
};
