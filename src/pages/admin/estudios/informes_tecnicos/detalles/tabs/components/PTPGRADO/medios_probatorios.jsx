import {
  Container,
  FileUpload,
  FormField,
  Link,
} from "@cloudscape-design/components";

const propsEnlaces = {
  external: "true",
  variant: "primary",
  fontSize: "body-s",
  target: "_blank",
};

export default ({ value1, handleChange, file }) => {
  return (
    <Container>
      <FormField
        label="Adjuntar archivo digital de los medios probatorios"
        stretch
        description={
          file && (
            <>
              Ya ha cargado un{" "}
              <Link {...propsEnlaces} href={file.url}>
                archivo
              </Link>{" "}
              el {file.fecha}
            </>
          )
        }
      >
        <FileUpload
          value={value1}
          onChange={({ detail }) => {
            handleChange("file1", detail.value);
          }}
          showFileLastModified
          showFileSize
          showFileThumbnail
          constraintText="El archivo cargado no debe superar los 6 MB"
          i18nStrings={{
            uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
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
    </Container>
  );
};
