import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
} from "@cloudscape-design/components";

export default ({
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  handleChange,
}) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField
          label="Documento de conformidad firmada por el coordinador del GI"
          stretch
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
              uploadButtonText: (e) =>
                e ? "Cargar archivos" : "Cargar archivo",
              dropzoneText: (e) =>
                e
                  ? "Arrastre los archivos para cargarlos"
                  : "Arrastre el archivo para cargarlo",
              removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
              errorIconAriaLabel: "Error",
            }}
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
        <FormField label="Imágenes del equipo/gabinete instalado" stretch>
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
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
        <FormField
          label="Imágenes de equipos complementarios al equipo/gabinete instalado"
          stretch
        >
          <FileUpload
            value={value3}
            onChange={({ detail }) => {
              handleChange("file3", detail.value);
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
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
        <FormField
          label="Formato de control del uso del equipo, incluir uso compartido"
          stretch
        >
          <FileUpload
            value={value4}
            onChange={({ detail }) => {
              handleChange("file4", detail.value);
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
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
        <FormField
          label="Plan de manejo de residuos, efluentes y/o emisiones"
          description="Si corresponde"
          stretch
        >
          <FileUpload
            value={value5}
            onChange={({ detail }) => {
              handleChange("file5", detail.value);
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
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
        <FormField
          label="Otros documentos"
          description="Si fueran necesarios"
          stretch
        >
          <FileUpload
            value={value6}
            onChange={({ detail }) => {
              handleChange("file6", detail.value);
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
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
