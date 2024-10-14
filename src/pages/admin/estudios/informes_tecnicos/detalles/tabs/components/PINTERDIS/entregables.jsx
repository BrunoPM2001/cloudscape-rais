import {
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Header,
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

export default ({
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  value10,
  value11,
  value12,
  handleChange,
  files,
}) => {
  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Box variant="h4">
            Dos (02) artículos publicados o aceptados en revistas indizadas a
            SCOPUS O WoS,o un libro,o dos(02) capítulos de libro publicados en
            editoriales reconocido prestigio, de acuerdo con las normas internas
            de la universidad.
          </Box>
        }
      >
        <ColumnLayout columns={2}>
          <FormField
            label="Primer artículo"
            stretch
            description={
              files["articulo1"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["articulo1"]}>
                    archivo.
                  </Link>
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
          <FormField
            label="Segundo artículo"
            stretch
            description={
              files["articulo2"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["articulo2"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value3}
              onChange={({ detail }) => {
                handleChange("file3", detail.value);
              }}
            />
          </FormField>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Box variant="h4">
            Cuatro (04) tesis sustentadas, siendo tres(03) de ellas de pregrado
            y la una(01) de posgrado.En el caso de las tesis realizadas por
            estudiante(s) de la(s) universidad(es) colaboradora(s) el asesor
            presenta el acta de sustentación al responsable del proyecto.
          </Box>
        }
      >
        <ColumnLayout columns={2}>
          <FormField
            label="Primera tesis de pregrado"
            stretch
            description={
              files["tesis1"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["tesis1"]}>
                    archivo.
                  </Link>
                </>
              )
            }
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
            label="Segunda tesis de pregrado"
            stretch
            description={
              files["tesis2"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["tesis2"]}>
                    archivo.
                  </Link>
                </>
              )
            }
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
            label="Tercera tesis de pregrado"
            stretch
            description={
              files["tesis3"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["tesis3"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value6}
              onChange={({ detail }) => {
                handleChange("file6", detail.value);
              }}
            />
          </FormField>
          <FormField
            label="Primera tesis de posgrado"
            stretch
            description={
              files["tesis4"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["tesis4"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value7}
              onChange={({ detail }) => {
                handleChange("file7", detail.value);
              }}
            />
          </FormField>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Box variant="h4">
            Cuatro (04) trabajos de investigación para obtener el grado de
            bachiller.
          </Box>
        }
      >
        <ColumnLayout columns={2}>
          <FormField
            label="Primera investigación"
            stretch
            description={
              files["investigacion1"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["investigacion1"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value8}
              onChange={({ detail }) => {
                handleChange("file8", detail.value);
              }}
            />
          </FormField>
          <FormField
            label="Segunda investigación"
            stretch
            description={
              files["investigacion2"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["investigacion2"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value9}
              onChange={({ detail }) => {
                handleChange("file9", detail.value);
              }}
            />
          </FormField>
          <FormField
            label="Tercera investigación"
            stretch
            description={
              files["investigacion3"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["investigacion3"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value10}
              onChange={({ detail }) => {
                handleChange("file10", detail.value);
              }}
            />
          </FormField>
          <FormField
            label="Cuarta investigación"
            stretch
            description={
              files["investigacion4"] && (
                <>
                  Ya ha cargado un{" "}
                  <Link {...propsEnlaces} href={files["investigacion4"]}>
                    archivo.
                  </Link>
                </>
              )
            }
          >
            <FileUpload
              {...propsRepetidas}
              value={value11}
              onChange={({ detail }) => {
                handleChange("file11", detail.value);
              }}
            />
          </FormField>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Box variant="h4">
            La formación de una red científica o el registro y/o inscripción al
            menos de una (01) solicitud de protección de propiedad intelectual y
            de transferencia tecnólogica según la naturaleza del proyecto.
          </Box>
        }
      >
        <FormField
          label="Archivo"
          stretch
          description={
            files["registro"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["registro"]}>
                  archivo.
                </Link>
              </>
            )
          }
        >
          <FileUpload
            {...propsRepetidas}
            value={value12}
            onChange={({ detail }) => {
              handleChange("file12", detail.value);
            }}
          />
        </FormField>
      </Container>
    </SpaceBetween>
  );
};
