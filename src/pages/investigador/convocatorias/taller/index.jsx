import {
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
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider.jsx";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";

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
  file: { required: true },
};

export default function Convocatoria_registro_taller() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
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
                    {loading ? <Spinner /> : <Box>Título</Box>}
                  </div>
                </Container>
                <Container>
                  <ColumnLayout columns={2}>
                    <SpaceBetween size="xs">
                      <div>
                        <Box variant="awsui-key-label">Responsable</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>Aldo Javier Guzman Duxtan</Box>
                        )}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">DNI</Box>
                        {loading ? <Spinner /> : <Box>72458762</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Correo electrónico</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>alefran2020@gmail.com</Box>
                        )}
                      </div>
                    </SpaceBetween>
                    <SpaceBetween size="xs">
                      <div>
                        <Box variant="awsui-key-label">Facultad</Box>
                        {loading ? <Spinner /> : <Box></Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Código docente</Box>
                        {loading ? <Spinner /> : <Box></Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Categoría y clase</Box>
                        {loading ? <Spinner /> : <Box></Box>}
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
                    <FileUpload {...propsRepetidas} value={formValues.file} />
                  </FormField>
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
