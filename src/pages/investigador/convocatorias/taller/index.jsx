import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";

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
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default function Convocatoria_registro_taller() {
  //  States
  const [loading, setLoading] = useState(true);
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
      console.log("next");
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
              isLoadingNextStep={loading}
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
                  title: "Envío de publicación",
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
