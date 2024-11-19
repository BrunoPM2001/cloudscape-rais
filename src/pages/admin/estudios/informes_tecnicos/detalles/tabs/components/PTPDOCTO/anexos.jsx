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
          label="Tesis concluída y aprobada"
          stretch
          description={
            files["informe-PTPDOCTO-INFORME-FINAL-tesis"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PTPDOCTO-INFORME-FINAL-tesis"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PTPDOCTO-INFORME-FINAL-tesis"].fecha}
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
          label="Acta de sustentación"
          stretch
          description={
            files["informe-PTPDOCTO-INFORME-FINAL-acta"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PTPDOCTO-INFORME-FINAL-acta"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PTPDOCTO-INFORME-FINAL-acta"].fecha}
              </>
            )
          }
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
