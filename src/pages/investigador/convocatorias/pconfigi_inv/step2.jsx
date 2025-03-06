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
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
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
    text: "Proyecto pconfigi innova",
  },
];

const initialForm = {
  carta: [],
};

const formRules = {
  carta: { required: false, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default function Registro_pconfigi_inv_2() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi_inv/verificar2",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    if (!info.estado) {
      setErrors(info.errores);
    } else {
      setData({
        ...info.data,
        url: info.carta?.url,
        url_fecha: info.carta?.url_fecha,
      });
    }
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    const query = queryString.stringify({
      id,
    });
    if (index == 2) {
      if (validateForm()) {
        setLoadingForm(true);
        let form = new FormData();
        form.append("id", id);
        form.append("file", formValues.carta[0]);
        const res = await axiosBase.postForm(
          "investigador/convocatorias/pconfigi_inv/registrar2",
          form
        );
        const data = res.data;
        pushNotification(data.detail, data.message, notifications.length + 1);
        if (data.message == "success") {
          window.location.href = "paso" + (index + 1) + "?" + query;
        }
        setLoadingForm(false);
      }
    } else {
      window.location.href = "paso" + (index + 1) + "?" + query;
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
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={1}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              isLoadingNextStep={loadingForm}
              steps={[
                {
                  title: "Información general",
                  description: "Información general",
                },
                {
                  title: "Carta de vinculación",
                  description: "Documento cargado por el responsable",
                  content: (
                    <SpaceBetween size="l">
                      <Container>
                        <ColumnLayout columns={4}>
                          <SpaceBetween size="s">
                            <div>
                              <Box variant="awsui-key-label">Nombres</Box>
                              <Box>{data.nombres}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">N° documento</Box>
                              <Box>{data.doc_numero}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Fecha de nacimiento
                              </Box>
                              <Box>{data.fecha_nac}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">Tipo</Box>
                              <Box>{data.tipo}</Box>
                            </div>
                          </SpaceBetween>
                          <SpaceBetween size="s">
                            <div>
                              <Box variant="awsui-key-label">Especialidad</Box>
                              <Box>{data.especialidad}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Título profesional
                              </Box>
                              <Box>{data.titulo_profesional}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">Grado</Box>
                              <Box>{data.grado}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Categoría y clase
                              </Box>
                              <Box>{data.clase}</Box>
                            </div>
                          </SpaceBetween>
                          <SpaceBetween size="s">
                            <div>
                              <Box variant="awsui-key-label">Código</Box>
                              <Box>{data.codigo}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">Dependencia</Box>
                              <Box>{data.dependencia}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">Facultad</Box>
                              <Box>{data.facultad}</Box>
                            </div>
                          </SpaceBetween>
                          <SpaceBetween size="s">
                            <div>
                              <Box variant="awsui-key-label">Orcid</Box>
                              <Box>{data.codigo_orcid}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">Scopus</Box>
                              <Box>{data.scopus_id}</Box>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Google Scholar
                              </Box>
                              <Box>{data.google_scholar}</Box>
                            </div>
                          </SpaceBetween>
                        </ColumnLayout>
                      </Container>
                      <Container>
                        <FormField
                          label="Carta de compromiso de confidencialidad"
                          description={
                            <>
                              Puede descargar la plantilla de la carta de
                              compromiso en{" "}
                              <Link
                                href="/minio/templates/compromiso-confidencialidad.docx"
                                variant="primary"
                                fontSize="body-s"
                                target="_blank"
                              >
                                este enlace.
                              </Link>{" "}
                              {data.url && (
                                <>
                                  Ya ha cargado un archivo el {data.url_fecha},{" "}
                                  <Link
                                    href={data.url}
                                    external="true"
                                    variant="primary"
                                    fontSize="body-s"
                                    target="_blank"
                                  >
                                    descargar archivo.
                                  </Link>
                                </>
                              )}
                            </>
                          }
                          stretch
                          errorText={formErrors.carta}
                        >
                          <FileUpload
                            value={formValues.carta}
                            onChange={({ detail }) => {
                              handleChange("carta", detail.value);
                            }}
                            showFileLastModified
                            showFileSize
                            showFileThumbnail
                            constraintText="El archivo cargado no debe superar los 6 MB"
                            i18nStrings={{
                              uploadButtonText: (e) =>
                                e ? "Cargar archivos" : "Cargar archivo",
                              dropzoneText: (e) =>
                                e
                                  ? "Arrastre los archivos para cargarlos"
                                  : "Arrastre el archivo para cargarlo",
                              removeFileAriaLabel: (e) =>
                                `Eliminar archivo ${e + 1}`,
                              errorIconAriaLabel: "Error",
                            }}
                            accept=".jpeg, .jpg, .png, .pdf"
                          />
                        </FormField>
                      </Container>
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades junto al responsable",
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados de GI",
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
