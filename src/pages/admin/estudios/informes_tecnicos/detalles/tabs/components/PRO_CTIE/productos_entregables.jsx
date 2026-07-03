import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
  Select,
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

const productosEntregablesOptions = [
  {
    label: "Pruebas de concepto.",
    value: "Pruebas de concepto.",
  },
  {
    label: "Prototipos básicos viables.",
    value: "Prototipos básicos viables.",
  },
  {
    label: "Producción de materiales educativos.",
    value: "Producción de materiales educativos.",
  },
  {
    label: "Desarrollo de herramientas digitales.",
    value: "Desarrollo de herramientas digitales.",
  },
  {
    label: "Software o aplicaciones.",
    value: "Software o aplicaciones.",
  },
  {
    label: "Modelos de emprendimiento.",
    value: "Modelos de emprendimiento.",
  },
  {
    label: "Planes de negocio.",
    value: "Planes de negocio.",
  },
  {
    label: "Propuestas de políticas o mejoras institucionales.",
    value: "Propuestas de políticas o mejoras institucionales.",
  },
  {
    label: "Tesis sustentadas, cuando hayan sido consideradas en el proyecto.",
    value: "Tesis sustentadas, cuando hayan sido consideradas en el proyecto.",
  },
];

export default ({ value3, value4, valueProductoEntregable, handleChange, files }) => {
  const productoGuardado = files["producto_entregable"]?.nombre;
  const selectedProductoEntregable =
    valueProductoEntregable ??
    (productoGuardado
      ? {
        label: productoGuardado,
        value: productoGuardado,
        }
      : null);

  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField
          label="Aprobación del curso 'Gestión de la Madurez Tecnológica (TRL)' de la plataforma VÍNCULATE (CONCYTEC) por parte del equipo de trabajo (carácter obligatorio)"
          constraintText="Adjunte el certificado o constancia de aprobación del curso por parte de todo el equipo de trabajo."
          stretch
          description={
            files["trl_vinculate_concytec"] && (
              <>
                Ya ha cargado un{" "}
                <Link
                  {...propsEnlaces}
                  href={files["trl_vinculate_concytec"].url}
                >
                  archivo
                </Link>{" "}
                el {files["trl_vinculate_concytec"].fecha}
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
        <FormField
          label="Otro productos entregable del proyecto"
          constraintText="Seleccione el producto entregable que corresponda al proyecto y adjunte el archivo que lo sustente."
          description={
            files["producto_entregable"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["producto_entregable"].url}>
                  archivo
                </Link>{" "}
                el {files["producto_entregable"].fecha}
                {files["producto_entregable"].nombre && (
                  <>
                    {" "}
                    como producto entregable:{" "}
                    <b>{files["producto_entregable"].nombre}</b>
                  </>
                )}
              </>
            )
          }
          stretch
        >
          <SpaceBetween size="s">
            <Select
                placeholder="Seleccione una opción"
                selectedOption={selectedProductoEntregable}
                options={productosEntregablesOptions}
                onChange={({ detail }) => {
                  handleChange("producto_entregable", detail.selectedOption);
                }}
            />

            <FileUpload
                {...propsRepetidas}
                value={value4}
                onChange={({ detail }) => {
                handleChange("file4", detail.value);
                }}
            />
          </SpaceBetween>
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
