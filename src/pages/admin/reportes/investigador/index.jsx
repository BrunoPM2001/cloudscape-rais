import {
  Autosuggest,
  Button,
  Container,
  Form,
  FormField,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
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
    setLoading(true);
    const res = await axiosBase.get(
      "admin/admin/usuarios/searchInvestigadorBy/" + value
    );
    const data = await res.data;
    const opt = data.map((item) => {
      return {
        detail: item.id,
        value: `${item.codigo} | ${item.doc_numero} | ${item.apellido1} ${item.apellido2}, ${item.nombres}`,
      };
    });
    setOptions(opt);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get(
      "admin/reportes/docente/" + investigadorId,
      {
        responseType: "blob",
      }
    );
    setLoadingReporte(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  //  Effects
  useEffect(() => {
    const temp = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(temp);
  }, [value]);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Reporte por investigador:"
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
    </BaseLayout>
  );
}
