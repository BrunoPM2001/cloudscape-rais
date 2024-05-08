import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import BaseLayout from "../../components/baseLayout";
import axiosBase from "../../../../api/axios";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Reportes",
  },
  {
    text: "Consolidado general",
  },
];

export default function Consolidado_general() {
  //  States
  const [form, setForm] = useState({
    periodo: null,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    periodo: null,
  });

  const [loading, setLoading] = useState(false);

  //  Functions
  const clearForm = () => {
    setSelectedOptions({
      periodo: null,
    });
  };

  const reporte = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/reportes/consolidadoGeneral/" + form.periodo,
      {
        responseType: "blob",
      }
    );
    setLoading(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Reporte por año:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Container>
          <Form
            variant="embedded"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="normal" onClick={() => clearForm()}>
                  Limpiar campos
                </Button>
                <Button
                  variant="primary"
                  loading={loading}
                  onClick={() => reporte()}
                >
                  Generar reporte
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h2">Opciones del reporte</Header>}
          >
            <FormField label="Periodo" stretch>
              <Select
                controlId="periodo"
                placeholder="Escoga un periodo"
                selectedOption={selectedOptions.periodo}
                onChange={({ detail }) => {
                  setSelectedOptions((prev) => ({
                    ...prev,
                    periodo: detail.selectedOption,
                  }));
                  setForm((prev) => ({
                    ...prev,
                    periodo: detail.selectedOption.value,
                  }));
                }}
                options={[
                  {
                    value: "2024",
                  },
                  {
                    value: "2023",
                  },
                  {
                    value: "2022",
                  },
                  {
                    value: "2021",
                  },
                  {
                    value: "2020",
                  },
                  {
                    value: "2019",
                  },
                  {
                    value: "2018",
                  },
                  {
                    value: "2017",
                  },
                  {
                    value: "2016",
                  },
                ]}
              />
            </FormField>
          </Form>
        </Container>
      </SpaceBetween>
    </BaseLayout>
  );
}
