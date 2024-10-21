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
        label="Archivo digital de manuscrito"
        constraintText="Artículo, capítulo o libro"
        stretch
        description={
          files["informe-PSINFIPU-RESULTADOS"] && (
            <>
              Ya ha cargado un{" "}
              <Link
                {...propsEnlaces}
                href={files["informe-PSINFIPU-RESULTADOS"]}
              >
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
