import {
  Box,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Header,
  Input,
  Link,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

const opt_confirmar = [{ value: "Sí" }, { value: "No" }];

const initialForm = {
  confirmar: null,
  descripcion: "",
};

const formRules = {
  confirmar: { required: true },
};

export default ({ id, data, reload }) => {
  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const ficha = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/fichaEvaluacion", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoading(false);
  };

  const constanciaNoFirmada = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/constanciaCDI", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoading(false);
  };

  const enviarCorreo = async () => {
    setLoading(true);
    const res = await axiosBase.post("admin/estudios/docentes/enviarCorreo", {
      id,
    });
    const data = res.data;
    setLoading(false);
  };

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                loading={loading}
                iconName="send"
                iconAlign="right"
                onClick={enviarCorreo}
              >
                Enviar correo con la CDI al VRIP
              </Button>
              <ButtonDropdown
                loading={loading}
                items={[
                  {
                    id: "action_1",
                    text: "Ficha de evaluación",
                  },
                  {
                    id: "action_2",
                    text: "CDI no firmada",
                  },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    ficha();
                  } else if (detail.id == "action_2") {
                    constanciaNoFirmada();
                  }
                }}
              >
                Documentos
              </ButtonDropdown>
              <Button variant="primary">Guardar</Button>
            </SpaceBetween>
          }
        >
          Evaluación
        </Header>
      }
    >
      <ColumnLayout columns={2}>
        <ColumnLayout columns={2}>
          <div>
            <Box variant="awsui-key-label">Califica como</Box>
            <div>DOCENTE INVESTIGADOR</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Evaluación técnica</Box>
            <div>{data.estado_tecnico}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Autoridad</Box>
            <div>DEI</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Confirmar constancia</Box>
            <div>No</div>
          </div>
        </ColumnLayout>
        <SpaceBetween size="s">
          <FormField
            label="Constancia firmada"
            description={
              <>
                Puede descargar el documento cargado en{" "}
                <Link
                  href="#"
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  este enlace.
                </Link>
              </>
            }
            // errorText={formErrors.file}
          >
            <FileUpload
              value={[]}
              // onChange={({ detail }) => handleChange("file", detail.value)}
              // ref={(ref) => registerFileInput("file", ref)}
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
                removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
                errorIconAriaLabel: "Error",
              }}
              accept=".pdf"
            />
          </FormField>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
