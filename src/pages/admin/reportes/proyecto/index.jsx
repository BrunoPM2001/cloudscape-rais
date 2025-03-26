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
    text: "Reporte de proyectos",
  },
];

export default function Reporte_proyecto() {
  //  States
  const [form, setForm] = useState({
    tipo_proyecto: null,
    periodo: null,
    facultad: null,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    tipo_proyecto: null,
    periodo: null,
    facultad: null,
  });

  const [loading, setLoading] = useState(false);

  //  Functions
  const clearForm = () => {
    setSelectedOptions({
      tipo_proyecto: null,
      periodo: null,
      facultad: null,
    });
  };

  const reporte = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/reportes/proyecto/" +
        form.facultad +
        "/" +
        form.tipo_proyecto +
        "/" +
        form.periodo,
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
      header="Reporte por tipo, año y facultad:"
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
            <SpaceBetween size="s">
              <FormField label="Tipo de proyecto" stretch>
                <Select
                  controlId="periodo"
                  placeholder="Escoga un tipo de proyecto"
                  selectedOption={selectedOptions.tipo_proyecto}
                  onChange={({ detail }) => {
                    setSelectedOptions((prev) => ({
                      ...prev,
                      tipo_proyecto: detail.selectedOption,
                    }));
                    setForm((prev) => ({
                      ...prev,
                      tipo_proyecto: detail.selectedOption.value,
                    }));
                  }}
                  options={[
                    {
                      value: "PCONFIGI",
                    },
                    {
                      value: "PRO-CTIE",
                    },
                    {
                      value: "PCONFIGI-INV",
                    },
                    {
                      value: "ECI",
                    },
                    {
                      value: "CON-CON",
                    },
                    {
                      value: "FEX",
                    },
                    {
                      value: "EVENTO",
                    },
                    {
                      value: "PSINFINV",
                    },
                    {
                      value: "PINVPOS",
                    },
                    {
                      value: "PSINFIPU",
                    },
                  ]}
                />
              </FormField>
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
              <FormField label="Facultad" stretch>
                <Select
                  controlId="facultad"
                  placeholder="Escoge una opción"
                  selectedOption={selectedOptions.facultad}
                  onChange={({ detail }) => {
                    setSelectedOptions((prev) => ({
                      ...prev,
                      facultad: detail.selectedOption,
                    }));
                    setForm((prev) => ({
                      ...prev,
                      facultad: detail.selectedOption.value,
                    }));
                  }}
                  options={[
                    { label: "Medicina", value: "1" },
                    { label: "Derecho y Ciencia Política", value: "2" },
                    { label: "Letras y Ciencias Humanas", value: "3" },
                    { label: "Farmacia y Bioquímica", value: "4" },
                    { label: "Odontología", value: "5" },
                    { label: "Educación", value: "6" },
                    {
                      label: "Química e Ingeniería Química",
                      value: "7",
                    },
                    { label: "Medicina Veterinaria", value: "8" },
                    { label: "Ciencias Administrativas", value: "9" },
                    { label: "Ciencias Biológicas", value: "10" },
                    { label: "Ciencias Contables", value: "11" },
                    { label: "Ciencias Económicas", value: "12" },
                    { label: "Ciencias Físicas", value: "13" },
                    { label: "Ciencias Matemáticas", value: "14" },
                    { label: "Ciencias Sociales", value: "15" },
                    {
                      label:
                        "Ingeniería Geológica, Minera, Metalúrgica y Geográfica",
                      value: "16",
                    },
                    { label: "Ingeniería Industrial", value: "17" },
                    { label: "Psicología", value: "18" },
                    {
                      label: "Ingeniería Electrónica y Eléctrica",
                      value: "19",
                    },
                    {
                      label: "Ingeniería de Sistemas e Informática",
                      value: "20",
                    },
                  ]}
                />
              </FormField>
            </SpaceBetween>
          </Form>
        </Container>
      </SpaceBetween>
    </BaseLayout>
  );
}
