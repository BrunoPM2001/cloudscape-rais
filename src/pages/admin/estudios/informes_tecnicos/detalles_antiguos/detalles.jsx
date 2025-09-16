import {
  Badge,
  Box,
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";

const opt_informe = [
  { value: "Informe de Avance" },
  { value: "Informe Final" },
  { value: "Informe en Extenso" },
];

export default ({
  tipo_proyecto,
  proyecto,
  formValues,
  formErrors,
  handleChange,
  updating,
  updateInforme,
  opts,
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
            <Badge color="green">{tipo_proyecto}</Badge>
          </SpaceBetween>
        </Header>
      }
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={3}>
          <FormField label="Código de proyecto" stretch>
            <Input disabled value={proyecto.codigo_proyecto} />
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
            errorText={formErrors.status}
            stretch
          >
            <Select
              placeholder="Escoja una opción"
              options={opts}
              selectedOption={formValues.status}
              onChange={({ detail }) =>
                handleChange("status", detail.selectedOption)
              }
            />
          </FormField>
          <FormField
            label="Fecha de presentación VRI"
            errorText={formErrors.fecha_presentacion}
            stretch
          >
            <DatePicker
              placeholder="YYYY-MM-DD"
              value={formValues.fecha_presentacion ?? ""}
              onChange={({ detail }) =>
                handleChange("fecha_presentacion", detail.value)
              }
            />
          </FormField>
          <FormField
            label="N° de registro VRIP"
            errorText={formErrors.registro_nro_vri}
            stretch
          >
            <Input
              value={formValues.registro_nro_vri}
              onChange={({ detail }) =>
                handleChange("registro_nro_vri", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de registro DGITT"
            errorText={formErrors.registro_fecha_csi}
            stretch
          >
            <DatePicker
              placeholder="YYYY-MM-DD"
              value={formValues.registro_fecha_csi ?? ""}
              onChange={({ detail }) =>
                handleChange("registro_fecha_csi", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
        <FormField
          label="Observaciones al investigador"
          errorText={formErrors.observaciones}
          stretch
        >
          <Textarea
            rows={2}
            placeholder="Escriba las observaciones para el investigador"
            value={formValues.observaciones}
            onChange={({ detail }) =>
              handleChange("observaciones", detail.value)
            }
          />
        </FormField>
        <FormField
          label="Observaciones para el administrador"
          errorText={formErrors.observaciones_admin}
          stretch
        >
          <Textarea
            rows={2}
            placeholder="Escriba las observaciones para el administrador"
            value={formValues.observaciones_admin}
            onChange={({ detail }) =>
              handleChange("observaciones_admin", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
