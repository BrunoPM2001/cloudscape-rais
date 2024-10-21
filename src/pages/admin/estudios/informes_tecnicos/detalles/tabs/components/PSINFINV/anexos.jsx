import {
  Container,
  FileUpload,
  FormField,
  Link,
} from "@cloudscape-design/components";

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

export default ({ value1, handleChange, files }) => {
  return (
    <Container>
      <FormField
        label="Archivo digital"
        stretch
        description={
          files["informe-PSINFINV-INFORME"] && (
            <>
              Ya ha cargado un{" "}
              <Link {...propsEnlaces} href={files["informe-PSINFINV-INFORME"]}>
                archivo.
              </Link>
            </>
          )
        }
      >
        <FileUpload
          {...propsRepetidas}
          value={value1}
          onChange={({ detail }) => {
            handleChange("file1", detail.value);
          }}
        />
      </FormField>
    </Container>
  );
};
