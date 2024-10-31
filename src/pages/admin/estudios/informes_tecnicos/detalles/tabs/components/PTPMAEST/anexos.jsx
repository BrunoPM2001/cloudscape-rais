import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
} from "@cloudscape-design/components";

export default ({ value1, value2, handleChange }) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField label="Tesis concluída y aprobada" stretch>
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
        <FormField label="Acta de sustentación" stretch>
          <FileUpload
            value={value2}
            onChange={({ detail }) => {
              handleChange("file2", detail.value);
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
            accept=".pdf"
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
