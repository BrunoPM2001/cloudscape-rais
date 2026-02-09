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
import { useAutosuggest } from "../../../../hooks/useAutosuggest";


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
  const [investigadorId, setInvestigadorId] = useState(null);

  const { loading, options, setOptions, value, setValue, setAvoidSelect,} = 
    useAutosuggest("admin/reportes/searchInvestigadorBy");

  //  Functions
  const clearForm = () => {
    setValue("");
    setOptions([]);
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
                  setOptions([]);
                  setValue(detail.value);
                  if (detail.value === "") {
                    setInvestigadorId(null);
                  }
                }}
                onSelect={({ detail }) => {
                  if (detail.selectedOption.investigador_id != undefined) {
                    setInvestigadorId(detail.selectedOption.investigador_id);
                    setAvoidSelect(false);
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
