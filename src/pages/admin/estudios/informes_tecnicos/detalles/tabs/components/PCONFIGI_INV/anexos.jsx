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

export default ({ value1, value2, handleChange, files }) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField
          label="Archivo digital"
          stretch
          description={
            files["informe-PCONFIGI-INV-INFORME"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PCONFIGI-INV-INFORME"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PCONFIGI-INV-INFORME"].fecha}
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
        <FormField
          label="Reporte de viabilidad (Obligatorio a partir del 2022)"
          info={
            <Link
              variant="info"
              href="/minio/templates/Modelo_Reporte_Viabilidad.xlsx"
              external
            >
              Descargar modelo
            </Link>
          }
          constraintText="Remitir el formulario con los campos completados (ver modelo) a la Dirección de Promoción DGITT-VRIP dp.vrip@unmsm.edu.pe"
          description={
            files["viabilidad"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["viabilidad"].url}>
                  archivo
                </Link>{" "}
                el {files["viabilidad"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value2}
            onChange={({ detail }) => {
              handleChange("file2", detail.value);
            }}
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
