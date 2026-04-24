import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import BaseLayout from "../../components/baseLayout";
import axiosBase from "../../../../api/axios";

const breadcrumbs = [
  { 
    text: "Admin", 
    href: "/admin" 
  },
  { 
    text: "Reportes" 
  },
  { 
    text: "Reporte de deudores" 
  },
];

export default function ReporteDeudores() {
  // States
  const [form, setForm] = useState({
    periodo: null, 
    facultad: null
  });

  const [selectedOptions, setSelectedOptions] = useState({
    periodo: null, 
    facultad: null
  });
  const [facultadesOptions, setFacultadesOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Functions
  const clearForm = () => {
    setSelectedOptions({ 
      periodo: null, 
      facultad: null 
    });
    setForm({ 
      periodo: null, 
      facultad: null 
    });
  };

  const getFacultades = async () => {
    const res = await axiosBase.get("admin/reportes/facultades");
    return res.data;
  };

  const generarReporte = async () => {
    setLoading(true);
    const url =
      form.periodo && form.facultad
        ? `admin/reportes/deudores?periodo=${form.periodo}&facultad=${form.facultad}`
        : form.periodo
        ? `admin/reportes/deudores?periodo=${form.periodo}`
        : form.facultad
        ? `admin/reportes/deudores?facultad=${form.facultad}`
        : `admin/reportes/deudores`;

    const res = await axiosBase.get(url, {
      responseType: "blob",
    });

    const fileUrl = window.URL.createObjectURL(res.data);
    window.open(fileUrl, "_blank");

    setLoading(false);
  };

  // Effect
  useEffect(() => {
    getFacultades().then(data => {
      setFacultadesOptions(data);
    });
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Reporte de deudores"
      helpInfo="Genera el reporte de proyectos con deudas."
    >
      <SpaceBetween size="l">
        <Container>
          <Form
            variant="embedded"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={clearForm}>
                  Limpiar campos
                </Button>
                <Button
                  variant="primary"
                  loading={loading}
                  onClick={generarReporte}
                >
                  Generar reporte
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h2">Opciones del reporte</Header>}
          >
            <SpaceBetween size="s">
              <FormField label="Facultad" stretch>
                <Select
                  controlId="facultad"
                  placeholder="Escoge una opción"
                  selectedOption={selectedOptions.facultad}
                  onChange={({ detail }) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      facultad: detail.selectedOption
                    });
                    setForm({
                      ...form,
                      facultad: detail.selectedOption.value
                    });
                  }}
                  options={facultadesOptions}
                />
              </FormField>
              <FormField label="Periodo" stretch>
                <Select
                  controlId="periodo"
                  placeholder="Escoja un periodo"
                  selectedOption={selectedOptions.periodo}
                  onChange={({ detail }) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      periodo: detail.selectedOption
                    });
                    setForm({
                      ...form,
                      periodo: detail.selectedOption.value
                    });
                  }}
                  options={[
                    { label: "2026", value: "2026" },
                    { label: "2025", value: "2025" },
                    { label: "2024", value: "2024" },
                    { label: "2023", value: "2023" },
                    { label: "2022", value: "2022" },
                    { label: "2021", value: "2021" },
                    { label: "2020", value: "2020" },
                    { label: "2019", value: "2019" },
                    { label: "2018", value: "2018" },
                    { label: "2017", value: "2017" },
                    { label: "2016 y anteriores", value: "2016_anteriores" },
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