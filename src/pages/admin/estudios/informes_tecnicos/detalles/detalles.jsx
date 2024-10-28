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
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosBase from "../../../../../api/axios";

const opts = [
  { value: 0, label: "En proceso" },
  { value: 1, label: "Aprobado" },
  { value: 2, label: "Presentado" },
  { value: 3, label: "Observado" },
];

export default ({
  data,
  formValues,
  handleChange,
  updating,
  updateInforme,
}) => {
  //  Url
  const location = useLocation();
  const { id, tipo_proyecto, tipo_informe } = queryString.parse(
    location.search
  );

  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);

  //  Functions
  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get("admin/estudios/informesTecnicos/reporte", {
      params: {
        informe_tecnico_id: id,
        tipo_informe,
        tipo_proyecto,
      },
      responseType: "blob",
    });
    setLoadingReporte(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useEffect(() => {
    handleChange(
      "estado",
      opts.find((opt) => opt.value == formValues.estado)
    );
  }, []);

  return (
    <Container
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button loading={loadingReporte} onClick={reporte}>
                Reporte
              </Button>
              <Button
                variant="primary"
                loading={updating}
                onClick={updateInforme}
              >
                Guardar informe
              </Button>
            </SpaceBetween>
          }
        >
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
