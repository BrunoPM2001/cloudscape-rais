import {
  ColumnLayout,
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

export default ({
  value1,
  handleChange,
  files,
}) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField
          label="Documentos adjuntos"
          description={
            files["anexo1"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["anexo1"].url}>
                  archivo
                </Link>{" "}
                el {files["anexo1"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value1}
            onChange={({ detail }) => {
              handleChange("file1", detail.value);
            }}
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
