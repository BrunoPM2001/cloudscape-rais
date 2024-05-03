import {
  AppLayout,
  Autosuggest,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Flashbar,
  Form,
  FormField,
  Header,
  HelpPanel,
  SpaceBetween,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/protectedRoute.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Reportes",
  },
  {
    text: "Reporte de investigador",
  },
];

export default function Reporte_investigador() {
  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [investigadorId, setInvestigadorId] = useState(null);

  //  Functions
  const clearForm = () => {
    setValue("");
    setOptions([]);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/admin/usuarios/searchInvestigadorBy/" +
          value
      );
      if (!res.ok) {
        localStorage.clear();
        setLoading(false);
        setOptions([]);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        const opt = data.map((item) => {
          return {
            detail: item.id,
            value: `${item.codigo} | ${item.doc_numero} | ${item.apellido1} ${item.apellido2}, ${item.nombres}`,
          };
        });
        setOptions(opt);
        setLoading(false);
      }
    } catch (error) {
      setOptions([]);
      setLoading(false);
      console.log(error);
    }
  };

  const reporte = async () => {
    try {
      setLoadingReporte(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/reportes/docente/" + investigadorId
      );
      if (!res.ok) {
        localStorage.clear();
        setLoadingReporte(false);
        throw new Error("Error in fetch");
      } else {
        setLoadingReporte(false);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    } catch (error) {
      setLoadingReporte(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    const temp = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(temp);
  }, [value]);

  return (
    <ProtectedRoute>
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
            header={<Header variant="h1">Reporte por investigador</Header>}
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
                        loading={loadingReporte}
                        onClick={() => reporte()}
                      >
                        Generar reporte
                      </Button>
                    </SpaceBetween>
                  }
                  header={<Header variant="h2">Opciones del reporte</Header>}
                >
                  <FormField label="Investigador" stretch>
                    <Autosuggest
                      onChange={({ detail }) => {
                        setValue(detail.value);
                      }}
                      onSelect={({ detail }) => {
                        if (detail.selectedOption.detail != undefined) {
                          setInvestigadorId(detail.selectedOption.detail);
                        }
                      }}
                      value={value}
                      options={options}
                      loadingText="Cargando data"
                      placeholder="DNI o nombre del investigador"
                      ariaLabel="DNI o nombre del investigador"
                      statusType={loading == true ? "loading" : "finished"}
                      empty="No se encontraron resultados"
                    />
                  </FormField>
                </Form>
              </Container>
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
