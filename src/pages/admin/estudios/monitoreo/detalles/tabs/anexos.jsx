import {
  Button,
  Container,
  FileUpload,
  FormField,
  Link,
  SpaceBetween,
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

export default ({ data, loading, reload, disabledBtn, value1, handleChange, guardarAnexo, loadingBtn }) => {

  return (
    <Container>
      <SpaceBetween size="m">
        <FormField
        label="Declaración jurada o Carta"
        description={
            data?.declaracion_jurada && (
            <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={data.declaracion_jurada.url}>
                archivo
                </Link>{" "}
                el {data.declaracion_jurada.fecha}
            </>
            )
        }
        stretch
        >
        <FileUpload
            {...propsRepetidas}
            value={value1}
            onChange={({ detail }) => handleChange("file1", detail.value)}
        />
        </FormField>

        <Button
            variant="primary"
            iconName="upload"
            loading={loadingBtn}
            onClick={guardarAnexo}
            disabled={loading || disabledBtn || !value1 || value1.length === 0}
        >
          Guardar documentos
        </Button>
      </SpaceBetween>
    </Container>
  );
};
