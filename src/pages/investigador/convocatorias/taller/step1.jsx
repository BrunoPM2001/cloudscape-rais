import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Talleres de Investigación y Posgrado",
  },
];

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  constraintText:
    "El documento debe estar firmado, en formato PDF y no debe superar los 6 MB",
  i18nStrings: {
    uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
    dropzoneText: (e) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
  },
  accept: ".pdf",
};

const initialForm = {
  file: [],
};

const formRules = {
  file: { isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default function Convocatoria_registro_taller_1() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar"
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const siguiente = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const form = new FormData();
      form.append("id", data.datos.proyecto_id);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/convocatorias/pinvpos/registrar1",
        form
      );
      const info = res.data;
      if (info.message == "success") {
        window.location.href = "paso2";
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
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {data.estado ? (
            <Wizard
              onNavigate={siguiente}
              activeStepIndex={0}
              isLoadingNextStep={loadingBtn}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general del taller",
                  description: "Información general",
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <div>
                          <Box variant="awsui-key-label">Título</Box>
                          <Box>
                            Líneas de investigación de los GI en el marco de los
                            Objetivos de Desarrollo Sostenible (ODS)
                          </Box>
                        </div>
                      </Container>
                      <Container>
                        <ColumnLayout columns={2}>
                          <SpaceBetween size="xs">
                            <div>
                              <Box variant="awsui-key-label">Responsable</Box>

                              <Box>{data.datos.responsable}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">DNI</Box>
                              <Box>{data.datos.doc_numero}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Correo electrónico
                              </Box>
                              <Box>alefran2020@gmail.com</Box>
                            </div>
                          </SpaceBetween>
                          <SpaceBetween size="xs">
                            <div>
                              <Box variant="awsui-key-label">Facultad</Box>
                              <Box>{data.datos.facultad}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Código docente
                              </Box>
                              <Box>{data.datos.codigo}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Categoría y clase
                              </Box>
                              <Box>{data.datos.tipo}</Box>
                            </div>
                          </SpaceBetween>
                        </ColumnLayout>
                      </Container>
                      <Container>
                        <FormField
                          label="Resolución de designación oficial"
                          description={
                            data.datos.url && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  href={data.datos.url}
                                  external
                                  fontSize="body-s"
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                          errorText={formErrors.file}
                          stretch
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file}
                            onChange={({ detail }) =>
                              handleChange("file", detail.value)
                            }
                          />
                        </FormField>
                      </Container>
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Comité organizador del taller",
                  description: "Listado de integrantes para el taller",
                },
                {
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
                },
                {
                  title: "Programa del taller",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Financiamiento",
                  description: "Montos y partidas",
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
                {data.message.map((item) => {
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
