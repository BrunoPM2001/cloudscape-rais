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
  value2,
  value3,
  value4,
  value5,
  value6,
  handleChange,
  files,
}) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField
          label="Documento de conformidad firmada por el coordinador del GI"
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
        <FormField
          label="Imágenes del equipo/gabinete instalado"
          description={
            files["anexo2"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["anexo2"].url}>
                  archivo
                </Link>{" "}
                el {files["anexo2"].fecha}
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
        <FormField
          label="Imágenes de equipos complementarios al equipo/gabinete instalado"
          description={
            files["anexo3"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["anexo3"].url}>
                  archivo
                </Link>{" "}
                el {files["anexo3"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value3}
            onChange={({ detail }) => {
              handleChange("file3", detail.value);
            }}
          />
        </FormField>
        <FormField
          label="Formato de control del uso del equipo, incluir uso compartido"
          description={
            files["anexo4"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["anexo4"].url}>
                  archivo
                </Link>{" "}
                el {files["anexo4"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value4}
            onChange={({ detail }) => {
              handleChange("file4", detail.value);
            }}
          />
        </FormField>
        <FormField
          label="Plan de manejo de residuos, efluentes y/o emisiones"
          description={
            files["anexo5"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["anexo5"].url}>
                  archivo
                </Link>{" "}
                el {files["anexo5"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value5}
            onChange={({ detail }) => {
              handleChange("file5", detail.value);
            }}
          />
        </FormField>
        <FormField
          label="Otros documentos (Adjuntar la PECOSA y NEA)"
          description={
            files["anexo6"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["anexo6"].url}>
                  archivo
                </Link>{" "}
                el {files["anexo6"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value6}
            onChange={({ detail }) => {
              handleChange("file6", detail.value);
            }}
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
