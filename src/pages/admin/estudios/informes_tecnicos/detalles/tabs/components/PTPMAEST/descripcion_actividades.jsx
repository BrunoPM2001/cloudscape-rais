import {
  Container,
  FileUpload,
  FormField,
  Link,
  SpaceBetween,
} from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
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

const propsEnlaces = {
  external: "true",
  variant: "primary",
  fontSize: "body-s",
  target: "_blank",
};

export default ({ value1, file1, handleChange, files }) => {
  return (
    <Container>
      <SpaceBetween>
        <FormField
          label="Descripción de actividades realizadas"
          description="Máximo 200 palabras"
          stretch
        >
          <Tiptap value={value1} handleChange={handleChange} name="infinal1" />
        </FormField>
        <FormField
          label="Medios probatorios"
          stretch
          description={
            files["informe-PTPMAEST-INFORME-AVANCE"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PTPMAEST-INFORME-AVANCE"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PTPMAEST-INFORME-AVANCE"].fecha}
              </>
            )
          }
        >
          <FileUpload
            {...propsRepetidas}
            value={file1}
            onChange={({ detail }) => {
              handleChange("file1", detail.value);
            }}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
