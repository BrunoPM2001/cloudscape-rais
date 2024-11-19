import {
  Container,
  FileUpload,
  FormField,
} from "@cloudscape-design/components";

export default ({ value1, handleChange, files }) => {
  return (
    <Container>
      <FormField
        label="Archivo digital"
        stretch
        description={
          files["informe-PMULTI-INFORME"] && (
            <>
              Ya ha cargado un{" "}
              <Link
                {...propsEnlaces}
                href={files["informe-PMULTI-INFORME"].url}
              >
                archivo
              </Link>{" "}
              el {files["informe-PMULTI-INFORME"].fecha}
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
