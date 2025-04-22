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
import BaseLayout from "../../components/baseLayout";
import Multiselect from "@cloudscape-design/components/multiselect";
import Textarea from "@cloudscape-design/components/textarea";
import ColumnLayout from "@cloudscape-design/components/column-layout";
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
    text: "Reporte de grupos de investigación",
  },
];

export default function Reporte_grupo() {
  //  States
  const [form, setForm] = useState({
    estado: null,
    facultad: null,
    grupo_id: null,
    condiciones: [], // para Multiselect
    detalle: "",
  });

  const [selectedOptions, setSelectedOptions] = useState({
    estado: null,
    facultad: null,
  });
  const [selectedCondicion, setSelectedCondicion] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/reportes/searchCoordinador");

  //  Functions
  const clearForm = () => {
    setSelectedOptions({
      estado: null,
      facultad: null,
    });
  };

  const reporte = async () => {
    setLoadingReport(true);
    const condicionesSeleccionadas = form.condiciones.map((c) => c.value);
    const res = await axiosBase.get("admin/reportes/grupo", {
      params: {
        ...form,
        condiciones: condicionesSeleccionadas, // puedes cambiar el nombre si deseas
      },
      responseType: "blob",
    });
    // console.log(condicionesSeleccionadas);
    setLoadingReport(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Reporte por estado y facultad:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="table"
    >
      <SpaceBetween size="l">
        <Container>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="normal" onClick={() => clearForm()}>
                  Limpiar campos
                </Button>
                <Button
                  variant="primary"
                  loading={loadingReport}
                  onClick={() => reporte()}
                >
                  Generar reporte
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h2">Opciones del reporte</Header>}
          >
            <ColumnLayout columns={2} variant="text-grid">
              <FormField label="Estado" stretch>
                <Select
                  controlId="estado"
                  placeholder="Escoga un estado de grupo"
                  selectedOption={selectedOptions.estado}
                  onChange={({ detail }) => {
                    setSelectedOptions((prev) => ({
                      ...prev,
                      estado: detail.selectedOption,
                    }));
                    setForm((prev) => ({
                      ...prev,
                      estado: detail.selectedOption.value,
                    }));
                  }}
                  options={[
                    { label: "Reconocido", value: "1" },
                    { label: "Observado", value: "2" },
                    { label: "Registrado", value: "4" },
                    { label: "Enviado", value: "5" },
                    { label: "En proceso", value: "6" },
                    { label: "Eliminado", value: "-1" },
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
            </ColumnLayout>
            <ColumnLayout columns={2} variant="text-grid">
              <FormField label="Coordinador" stretch>
                <Autosuggest
                  onChange={({ detail }) => {
                    setOptions([]);
                    setValue(detail.value);
                    if (detail.value == "") {
                      setForm((prev) => ({
                        ...prev,
                        grupo_id: null,
                      }));
                    }
                  }}
                  onSelect={({ detail }) => {
                    if (detail.selectedOption.grupo_id != undefined) {
                      const { grupo_id } = detail.selectedOption;
                      setForm((prev) => ({
                        ...prev,
                        grupo_id,
                      }));
                      setAvoidSelect(false);
                    }
                  }}
                  value={value}
                  options={options}
                  loadingText="Cargando data"
                  placeholder="Buscar por nombre, código o facultad"
                  statusType={loading ? "loading" : "finished"}
                  empty="No se encontraron resultados"
                />
              </FormField>
              <FormField label="Condición en el Grupo" stretch>
                <Multiselect
                  selectedOptions={form.condiciones}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      condiciones: detail.selectedOptions,
                    }))
                  }
                  options={[
                    { label: "Coordinador", value: "Coordinador" },
                    { label: "Titulares", value: "Titular" },
                    { label: "Adherentes Internos", value: "Adherente" },
                    {
                      label: "Adherentes Externos",
                      value: "Colaborador Externo",
                    },
                  ]}
                  placeholder="-- Todos --"
                />
              </FormField>
            </ColumnLayout>
            <ColumnLayout columns={2} variant="text-grid">
              <FormField label="Descripción del Informe">
                <Textarea
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      detalle: detail.value,
                    }))
                  }
                  value={form.detalle}
                  placeholder="Escriba la descripción del informe(Opcional)"
                />
              </FormField>
            </ColumnLayout>
          </Form>
        </Container>
      </SpaceBetween>
    </BaseLayout>
  );
}
