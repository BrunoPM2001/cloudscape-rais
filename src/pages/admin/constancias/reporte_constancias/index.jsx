import {
  Autosuggest,
  Button,
  Container,
  Form,
  FormField,
  Header,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import axiosBase from "../../../../api/axios";
import BaseLayout from "../../components/baseLayout.jsx";
import { useAutosuggest } from "../../../../hooks/useAutosuggest.js";

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

  const [form, setForm] = useState({
    investigadorId: null,
    tipo: null,
  });
  const [selectedOptions, setSelectedOptions] = useState({
    tipo: null,
  });

  const [opt_constancias, setOpt_constancias] = useState([
    {
      label: "Estudios de Investigación",
      value: "1",
    },
    {
      label: "Grupos de Investigación",
      value: "2",
    },
    {
      label: "Registro de Publicaciones",
      value: "3",
    },
    {
      label: "Puntaje de Publicaciones",
      value: "4",
    },
    {
      label: "Proyectos Multidisciplinarios",
      value: "5",
    },
    {
      label: "Capitulo de Libro",
      value: "6",
    },
    {
      label: "Proyectos Equipamiento Científico",
      value: "7",
    },
    {
      label: "Evaluador de Proyectos",
      value: "8",
    },
    {
      label: "Eventos UNMSM",
      value: "9",
    },
    {
      label: "No adeudar Informes",
      value: "10",
    },
    {
      label: "Asesor de Tésis",
      value: "11",
    },
    {
      label: "Participante Tesista",
      value: "12",
    },
    {
      label: "Asesor de Grupo",
      value: "13",
    },
    {
      label: "Miembro de Grupo",
      value: "14",
    },
  ]);

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

  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/admin/usuarios/searchConstanciaBy");

  const reporte = async () => {
    setLoadingReporte(true);
    let tipoConst;
    if (form.tipo == 4) {
      tipoConst = "getConstanciaPuntajePublicaciones";
    } else if (form.tipo == 3) {
      tipoConst = "getConstanciaPublicacionesCientificas";
    } else if (form.tipo == 2) {
      tipoConst = "getConstanciaGrupoInvestigacion";
    } else if (form.tipo == 1) {
      tipoConst = "getConstanciaEstudiosInvestigacion";
    } else if (form.tipo == 7) {
      tipoConst = "getConstanciaEquipamientoCientifico";
    } else if (form.tipo == 6) {
      tipoConst = "getConstanciaCapituloLibro";
    } else if (form.tipo == 10) {
      tipoConst = "getConstanciaNoDeuda";
    } else if (form.tipo == 11) {
      tipoConst = "getConstanciaTesisAsesoria";
    }
    const res = await axiosBase.get(
      "admin/constancias/" + tipoConst + "/" + form.investigadorId,
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
      <Container>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="normal" onClick={() => clearForm()}>
                Limpiar campos
              </Button>
              <Button
                variant="primary"
                loading={loadingReporte}
                disabled={!form.investigadorId || !form.tipo} // Deshabilitar el botón si no se ha seleccionado un investigador o un tipo de constancia
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
                  setOptions([]);
                  setValue(detail.value);
                  if (detail.value == "") {
                    setForm({});
                  }
                }}
                onSelect={({ detail }) => {
                  if (detail.selectedOption?.investigador_id != undefined) {
                    const { value, ...rest } = detail.selectedOption;
                    setForm(rest);
                    setAvoidSelect(false);
                    setOpt_constancias((prev) =>
                      prev.map((item) =>
                        detail.selectedOption.publicaciones == 0 &&
                        (item.value == 3 || item.value == 4)
                          ? { ...item, disabled: true }
                          : { ...item, disabled: false }
                      )
                    );
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
                options={opt_constancias}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </Container>
    </BaseLayout>
  );
}
