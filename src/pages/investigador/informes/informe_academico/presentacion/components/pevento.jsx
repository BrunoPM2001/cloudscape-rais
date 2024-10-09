import {
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  Table,
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
  infinal1: "",
  infinal2: "",
  infinal3: "",
  infinal4: "",
  infinal5: "",
  infinal6: "",
};

const formRules = {};

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id, proyecto_id, tipo_proyecto } = queryString.parse(location.search);

  //  States
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [proyecto, setProyecto] = useState({});
  const [miembros, setMiembros] = useState([]);

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
    setMiembros(data.miembros);
    if (data.informe) {
      handleChange("infinal1", data.informe.infinal1 ?? "");
      handleChange("infinal2", data.informe.infinal2 ?? "");
      handleChange("infinal3", data.informe.infinal3 ?? "");
      handleChange("infinal4", data.informe.infinal4 ?? "");
      handleChange("infinal5", data.informe.infinal5 ?? "");
      handleChange("infinal6", data.informe.infinal6 ?? "");
      handleChange("estado", data.informe.estado);
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
    form.append("infinal1", formValues.infinal1);
    form.append("infinal2", formValues.infinal2);
    form.append("infinal3", formValues.infinal3);
    form.append("infinal4", formValues.infinal4);
    form.append("infinal5", formValues.infinal5);
    form.append("infinal6", formValues.infinal6);
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
      "investigador/informes/informe_academico/verInforme",
      {
        params: {
          id: formValues.id,
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
      ) : formValues.estado ? (
        <>
          <br />
          <Container
            header={
              <Header
                actions={
                  <Button iconName="file" onClick={reporte}>
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
              content: (
                <SpaceBetween size="l">
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
                  <Table
                    trackBy="id"
                    header={<Header>Comité organizador</Header>}
                    columnDefinitions={[
                      {
                        id: "condicion",
                        header: "Condición",
                        cell: (item) => item.condicion,
                      },
                      {
                        id: "nombres",
                        header: "Integrante",
                        cell: (item) => item.nombres,
                      },
                    ]}
                    columnDisplay={[
                      { id: "condicion", visible: true },
                      { id: "nombres", visible: true },
                    ]}
                    items={miembros}
                  />
                </SpaceBetween>
              ),
            },
            {
              title: "Objetivos y metas",
              content: (
                <Tiptap
                  value={formValues.infinal1}
                  handleChange={handleChange}
                  name="infinal1"
                />
              ),
              isOptional: true,
            },
            {
              title: "Comité organizador",
              content: (
                <Tiptap
                  value={formValues.infinal2}
                  handleChange={handleChange}
                  name="infinal2"
                />
              ),
              isOptional: true,
            },
            {
              title: "Programa del evento",
              content: (
                <Tiptap
                  value={formValues.infinal3}
                  handleChange={handleChange}
                  name="infinal3"
                />
              ),
              isOptional: true,
            },
            {
              title: "Descripción del evento",
              content: (
                <Tiptap
                  value={formValues.infinal4}
                  handleChange={handleChange}
                  name="infinal4"
                />
              ),
              isOptional: true,
            },
            {
              title: "Conclusión y recomendaciones",
              content: (
                <Tiptap
                  value={formValues.infinal5}
                  handleChange={handleChange}
                  name="infinal5"
                />
              ),
              isOptional: true,
            },
            {
              title: "Reporte de asistencia",
              content: (
                <Tiptap
                  value={formValues.infinal6}
                  handleChange={handleChange}
                  name="infinal6"
                />
              ),
              isOptional: true,
            },
          ]}
        />
      )}
    </>
  );
};
