import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
} from "@cloudscape-design/components";

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
            files["informe-PTPMAEST-INFORME-FINAL-tesis"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PTPMAEST-INFORME-FINAL-tesis"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PTPMAEST-INFORME-FINAL-tesis"].fecha}
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
        <FormField
          label="Acta de sustentación"
          stretch
          description={
            files["informe-PTPMAEST-INFORME-FINAL-acta"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["informe-PTPMAEST-INFORME-FINAL-acta"].url}
                >
                  archivo
                </Link>{" "}
                el {files["informe-PTPMAEST-INFORME-FINAL-acta"].fecha}
              </>
            )
          }
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
            accept=".pdf"
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
