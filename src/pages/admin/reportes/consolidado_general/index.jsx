import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Flashbar,
  Form,
  FormField,
  Header,
  HelpPanel,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import { useState } from "react";

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
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/reportes/consolidadoGeneral/" +
          form.periodo
      );
      if (!res.ok) {
        setLoading(false);
        throw new Error("Error in fetch");
      } else {
        setLoading(false);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Información sobre la páginal actual para poder mostrarla al público
            en general.
          </HelpPanel>
        }
        content={
          <ContentLayout header={<Header variant="h1">Reporte por año</Header>}>
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
          </ContentLayout>
        }
      />
    </>
  );
}
