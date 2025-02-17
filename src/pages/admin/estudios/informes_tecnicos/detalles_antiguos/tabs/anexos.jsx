import {
  Container,
  FileUpload,
  FormField,
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

export default ({ value1, handleChange }) => {
  return (
    <Container>
      <FormField label="Archivo digital" stretch>
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
