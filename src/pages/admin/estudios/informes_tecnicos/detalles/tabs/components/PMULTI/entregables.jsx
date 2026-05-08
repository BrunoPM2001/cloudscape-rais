import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
  SpaceBetween,
  Box,
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

export default ({ formValues, handleChange, files }) => {
  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Box variant="h4">
            Artículos y capítulos de libro
          </Box>
        }
      >
        <ColumnLayout columns={2}>
          <FormField
            label="Primer artículo"
            description={
              files["articulo1"] && (
                <>
                  Ya ha cargado un{" "}
                    <Link
                      {...propsEnlaces}
                      href={files["articulo1"]?.url}
                    >
                      archivo
                    </Link>
                  </>
              )
            }
            >
              <FileUpload
                {...propsRepetidas}
                value={formValues?.file1}
                onChange={({ detail }) =>
                  handleChange("file2", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Segundo artículo"
              description={
                files["articulo2"] && (
                  <>
                    Ya ha cargado un{" "}
                    <Link
                      {...propsEnlaces}
                      href={files["articulo2"]?.url}
                    >
                      archivo
                    </Link>
                  </>
                )
              }
            >
              <FileUpload
                {...propsRepetidas}
                value={formValues?.file3}
                onChange={({ detail }) =>
                  handleChange("file3", detail.value)
                }
              />
            </FormField>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Box variant="h4">
            Tesis
          </Box>
        }
      >
        <ColumnLayout columns={2}>
          <FormField
            label="Tesis pregrado"
            description={
              files["tesis1"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link
                    {...propsEnlaces}
                    href={files["tesis1"]?.url}
                  >
                    archivo
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={formValues?.file7}
              onChange={({ detail }) =>
                handleChange("file7", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Tesis posgrado"
            description={
              files["tesis4"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link
                    {...propsEnlaces}
                    href={files["tesis4"]?.url}
                  >
                    archivo
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={formValues?.file8}
              onChange={({ detail }) =>
                handleChange("file8", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Box variant="h4">
            Registro de propiedad intelectual o de transferencia, según la
            naturaleza del proyecto
          </Box>
        }
      >
        <FormField
          label="Registro de propiedad intelectual o de transferencia"
          description={
            files["registro"] && (
              <>
                Ya ha cargado un{" "}
                <Link 
                  {...propsEnlaces}
                  href={files["registro"]?.url}
                >
                  archivo.
                </Link>
              </>
            )
          }
        >
          <FileUpload
            {...propsRepetidas}
            value={formValues?.file9}
            onChange={({ detail }) =>
              handleChange("file9", detail.value)
            }
          />
        </FormField>
      </Container>
    </SpaceBetween>
  );
};