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
  const [tipos, setTipos] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  //  Functions
  const clearForm = () => {
    setSelectedOptions({
      tipo_proyecto: null,
      periodo: null,
      facultad: null,
    });

    setForm({
      tipo_proyecto: null,
      periodo: null,
      facultad: null,
    });

    setPeriodos([]);
  };

  const handleTipoChange = async (selectedOption) => {
    const tipo = selectedOption.value;

    // actualizar selects
    setSelectedOptions((prev) => ({
      ...prev,
      tipo_proyecto: selectedOption,
      periodo: null,
    }));

    // actualizar form
    setForm((prev) => ({
      ...prev,
      tipo_proyecto: tipo,
      periodo: null,
    }));

    // cargar periodos
    const res = await axiosBase.get(
      "admin/reportes/estudio/periodos/" + tipo
    );

    const data = res.data;

    setPeriodos(
      data.map((item) => ({
        label: String(item.periodo),
        value: String(item.periodo),
      }))
    );
  };

  const reporte = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/reportes/estudio/" +
        form.tipo_proyecto +
        "/" +
        form.periodo +
        "/" +
        form.facultad,
      {
        responseType: "blob",
      }
    );
    setLoading(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useEffect(() => {
    const getTipos = async () => {
      const res = await axiosBase.get("admin/reportes/estudio/tipos");
      const data = res.data;

      setTipos(
        data.map((item) => ({
          label: item.value,
          value: item.value,
        }))
      );
    };

    getTipos();
  }, []);

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
                  placeholder="Escoja un tipo de proyecto"
                  selectedOption={selectedOptions.tipo_proyecto}
                  onChange={({ detail }) => handleTipoChange(detail.selectedOption)}
                  options={tipos}
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
                  options={periodos}
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
                    { label: "Química e Ingeniería Química", value: "7" },
                    { label: "Medicina Veterinaria", value: "8" },
                    { label: "Ciencias Administrativas", value: "9" },
                    { label: "Ciencias Biológicas", value: "10" },
                    { label: "Ciencias Contables", value: "11" },
                    { label: "Ciencias Económicas", value: "12" },
                    { label: "Ciencias Físicas", value: "13" },
                    { label: "Ciencias Matemáticas", value: "14" },
                    { label: "Ciencias Sociales", value: "15" },
                    { label: "Ingeniería Geológica, Minera, Metalúrgica y Geográfica", value: "16" },
                    { label: "Ingeniería Industrial", value: "17" },
                    { label: "Psicología", value: "18" },
                    { label: "Ingeniería Electrónica y Eléctrica", value: "19" },
                    { label: "Ingeniería de Sistemas e Informática", value: "20" },
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
