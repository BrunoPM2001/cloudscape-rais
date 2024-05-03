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
  Select,
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
    text: "Constancias",
  },
  {
    text: "Reporte de constancias",
  },
];

export default function Reporte_constancias() {
  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [form, setForm] = useState({
    investigadorId: null,
    tipo: null,
  });
  const [selectedOptions, setSelectedOptions] = useState({
    tipo: null,
  });

  //  Functions
  const clearForm = () => {
    setValue("");
    setOptions([]);
    setForm({
      investigadorId: null,
      tipo: null,
    });
    setSelectedOptions({
      tipo: null,
    });
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
      let tipoConst;
      if (form.tipo == 1) {
        tipoConst = "getConstanciaPuntajePublicaciones";
      } else if (form.tipo == 2) {
        tipoConst = "getConstanciaPublicacionesCientificas";
      } else if (form.tipo == 3) {
        tipoConst = "getConstanciaGrupoInvestigacion";
      }
      const res = await fetch(
        "http://localhost:8000/api/admin/constancias/" +
          tipoConst +
          "/" +
          form.investigadorId,
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
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
                  <SpaceBetween size="s">
                    <FormField label="Investigador" stretch>
                      <Autosuggest
                        onChange={({ detail }) => {
                          setValue(detail.value);
                        }}
                        onSelect={({ detail }) => {
                          if (detail.selectedOption.detail != undefined) {
                            setForm((prev) => ({
                              ...prev,
                              investigadorId: detail.selectedOption.detail,
                            }));
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
                    <FormField label="Tipo de constancia" stretch>
                      <Select
                        controlId="tipo"
                        placeholder="Escoga un tipo de constancia"
                        selectedOption={selectedOptions.tipo}
                        onChange={({ detail }) => {
                          setSelectedOptions((prev) => ({
                            ...prev,
                            tipo: detail.selectedOption,
                          }));
                          setForm((prev) => ({
                            ...prev,
                            tipo: detail.selectedOption.value,
                          }));
                        }}
                        options={[
                          {
                            label: "Constancia de puntaje de publicaciones",
                            value: "1",
                          },
                          {
                            label:
                              "Constancia de registro de publicaciones científicas",
                            value: "2",
                          },
                          {
                            label: "Constancia de grupo de investigación",
                            value: "3",
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
    </ProtectedRoute>
  );
}
