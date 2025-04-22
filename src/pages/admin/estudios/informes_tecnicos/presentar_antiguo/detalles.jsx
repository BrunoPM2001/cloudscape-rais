import {
  Badge,
  Box,
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  FileUpload,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  Textarea,
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

const opts = [
  { value: 0, label: "En proceso" },
  { value: 1, label: "Aprobado" },
  { value: 2, label: "Presentado" },
  { value: 3, label: "Observado" },
];

const opt_informe = [
  { value: "Informe de avance" },
  { value: "Informe final" },
  { value: "Informe en extenso" },
];

export default ({
  proyecto,
  formValues,
  formErrors,
  handleChange,
  updating,
  updateInforme,
}) => {
  return (
    <Container
      header={
        <Header
          actions={
            <Button
              variant="primary"
              loading={updating}
              onClick={updateInforme}
            >
              Guardar informe
            </Button>
          }
        >
          <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
            <Box variant="h1">Informe técnico</Box>
            <Badge color="green">{proyecto.tipo}</Badge>
          </SpaceBetween>
        </Header>
      }
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={3}>
          <FormField label="Código de proyecto" stretch>
            <Input disabled value={proyecto.codigo} />
          </FormField>
          <FormField label="Tipo" errorText={formErrors.tipo_informe} stretch>
            <Select
              placeholder="Escoja una opción"
              options={opt_informe}
              selectedOption={formValues.tipo_informe}
              onChange={({ detail }) =>
                handleChange("tipo_informe", detail.selectedOption)
              }
            />
          </FormField>
          <FormField
            label="Estado del informe"
            errorText={formErrors.estado}
            stretch
          >
            <Select
              placeholder="Escoja una opción"
              options={opts}
              selectedOption={formValues.estado}
              onChange={({ detail }) =>
                handleChange("estado", detail.selectedOption)
              }
            />
          </FormField>
          <FormField label="Fecha de presentación VRI" stretch>
            <DatePicker
              placeholder="YYYY-MM-DD"
              value={formValues.fecha_presentacion ?? ""}
              onChange={({ detail }) =>
                handleChange("fecha_presentacion", detail.value)
              }
            />
          </FormField>
          <FormField label="N° de registro VRIP" stretch>
            <Input
              value={formValues.registro_nro_vrip}
              onChange={({ detail }) =>
                handleChange("registro_nro_vrip", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de registro DGITT"
            errorText={formErrors.fecha_registro_csi}
            stretch
          >
            <DatePicker
              placeholder="YYYY-MM-DD"
              value={formValues.fecha_registro_csi ?? ""}
              onChange={({ detail }) =>
                handleChange("fecha_registro_csi", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
        <FormField label="Observaciones al investigador" stretch>
          <Textarea
            rows={2}
            placeholder="Escriba las observaciones para el investigador"
            value={formValues.observaciones}
            onChange={({ detail }) =>
              handleChange("observaciones", detail.value)
            }
          />
        </FormField>
        <FormField label="Observaciones para el administrador" stretch>
          <Textarea
            rows={2}
            placeholder="Escriba las observaciones para el administrador"
            value={formValues.observaciones_admin}
            onChange={({ detail }) =>
              handleChange("observaciones_admin", detail.value)
            }
          />
        </FormField>
        <FormField label="Archivo digital" errorText={formErrors.file1} stretch>
          <FileUpload
            {...propsRepetidas}
            value={formValues.file1}
            onChange={({ detail }) => {
              handleChange("file1", detail.value);
            }}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
