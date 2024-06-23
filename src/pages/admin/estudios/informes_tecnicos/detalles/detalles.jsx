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
import { useEffect } from "react";

const opts = [
  { value: 0, label: "En proceso" },
  { value: 1, label: "Aprobado" },
  { value: 2, label: "Presentado" },
  { value: 3, label: "Observado" },
];

export default ({ data, formValues, handleChange }) => {
  useEffect(() => {
    handleChange(
      "estado",
      opts.find((opt) => opt.value == formValues.estado)
    );
  }, []);

  return (
    <Container
      header={
        <Header actions={<Button variant="primary">Guardar informe</Button>}>
          <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
            <Box variant="h1">Informe técnico</Box>
            <Badge color="grey">{data.id}</Badge>
            <Badge color="green">{data.tipo_proyecto}</Badge>
            <Badge color="blue">
              {data.estado == 1
                ? "Aprobado"
                : data.estado == 2
                ? "Presentado"
                : data.estado == 3
                ? "Observado"
                : "En proceso"}
            </Badge>
          </SpaceBetween>
        </Header>
      }
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={3}>
          <FormField label="Código de proyecto" stretch>
            <Input disabled value={data.codigo_proyecto} />
          </FormField>
          <FormField label="Fecha de envío" stretch>
            <Input disabled value={data.fecha_envio} />
          </FormField>
          <FormField label="Estado del informe" stretch>
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
          <FormField label="Fecha de registro DGITT" stretch>
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
      </SpaceBetween>
    </Container>
  );
};
