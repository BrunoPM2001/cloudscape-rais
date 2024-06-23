import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
} from "@cloudscape-design/components";

export default ({ value1, value2, handleChange }) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField label="Archivo digital" stretch>
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
        <FormField
          label="Reporte de viabilidad"
          description={
            <>
              Puede descargar el modelo en{" "}
              <Link
                href="/minio/templates/Modelo_Reporte_Viabilidad.xlsx"
                external="true"
                variant="primary"
                fontSize="body-s"
                target="_blank"
              >
                este enlace.
              </Link>{" "}
              Remitir el formulario con los campos completados (según el modelo)
              a la Dirección de Promoción DGITT - VRIP{" "}
              <strong>dp.vrip@unmsm.edu.pe</strong>
            </>
          }
          stretch
        >
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
      </ColumnLayout>
    </Container>
  );
};
