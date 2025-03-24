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

export default ({ value1, handleChange, files }) => {
  return (
    <Container>
      <ColumnLayout columns={1}>
        <FormField
          label="Reporte Final"
          info={
            <Link variant="info" href="/minio/templates/anexo_picv.docx">
              Descargar modelo
            </Link>
          }
          constraintText="Remitir el formulario con los campos completados (ver modelo) a la Dirección de Promoción DGITT-VRIP dp.vrip@unmsm.edu.pe"
          description={
            files["informe-PICV-INFORME"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PICV-INFORME"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PICV-INFORME"].fecha}
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
