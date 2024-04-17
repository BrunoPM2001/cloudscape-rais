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
    text: "Reporte de estudio",
  },
];

export default function Reporte_estudio() {
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
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/reportes/estudio/" +
          form.tipo_proyecto +
          "/" +
          form.periodo +
          "/" +
          form.facultad
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
          <ContentLayout
            header={
              <Header variant="h1">Reporte por tipo, año y facultad</Header>
            }
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
                            value: "CON-CON",
                          },
                          {
                            value: "PCONFIGI",
                          },
                          {
                            value: "FEX",
                          },
                          {
                            value: "ECI",
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
          </ContentLayout>
        }
      />
    </>
  );
}
