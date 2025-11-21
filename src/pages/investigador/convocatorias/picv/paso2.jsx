import {
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import axiosBase from "../../../../api/axios";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import NotificationContext from "../../../../providers/notificationProvider";

const initialForm = {
  carta: [],
};

const formRules = {
  carta: { required: false, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default forwardRef(function ({ proyecto_id }, ref) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/convocatorias/picv/getDataPaso2", {
      params: {
        proyecto_id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const registrar = async () => {
    if (validateForm()) {
      if (proyecto_id != null) {
        let form = new FormData();
        form.append("proyecto_id", proyecto_id);
        form.append("file", formValues.carta[0]);
        const res = await axiosBase.postForm(
          "investigador/convocatorias/picv/registrarPaso2",
          form
        );
        const data = res.data;
        pushNotification(data.detail, data.message, notifications.length + 1);
        if (data.message == "success") {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <SpaceBetween size="l">
      <ColumnLayout columns={2}>
        <Container header="Datos personales">
          <ColumnLayout columns={2}>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">Nombres y apellidos</Box>
                {loading ? <Spinner /> : <div>{data.nombres}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Número de documento</Box>
                {loading ? <Spinner /> : <div>{data.doc_numero}</div>}
              </div>
            </SpaceBetween>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">Fecha de nacimiento</Box>
                {loading ? <Spinner /> : <div>{data.fecha_nac}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Código docente</Box>
                {loading ? <Spinner /> : <div>{data.codigo}</div>}
              </div>
            </SpaceBetween>
          </ColumnLayout>
        </Container>
        <Container header="Datos profesionales">
          <ColumnLayout columns={2}>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">Categoría del docente</Box>
                {loading ? <Spinner /> : <div>{data.docente_categoria}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Código orcid</Box>
                {loading ? <Spinner /> : <div>{data.codigo_orcid}</div>}
              </div>
            </SpaceBetween>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">Renacyt</Box>
                {loading ? <Spinner /> : <div>{data.renacyt}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">CTI Vitae</Box>
                {loading ? <Spinner /> : <div>{data.cti_vitae}</div>}
              </div>
            </SpaceBetween>
          </ColumnLayout>
        </Container>
      </ColumnLayout>
      <Container>
        <FormField
          label="Carta de compromiso"
          description={
            <>
              Puede descargar la plantilla de la carta de compromiso en{" "}
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
                  Ya ha cargado un archivo el {data.comentario},{" "}
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
              removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
              errorIconAriaLabel: "Error",
            }}
            accept=".jpeg, .jpg, .png, .pdf"
          />
        </FormField>
      </Container>
    </SpaceBetween>
  );
});
