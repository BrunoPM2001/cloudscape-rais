import {
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
  });

  const [selectedOptions, setSelectedOptions] = useState({
    estado: null,
    facultad: null,
  });

  const [loading, setLoading] = useState(false);

  //  Functions
  const clearForm = () => {
    setSelectedOptions({
      estado: null,
      facultad: null,
    });
  };

  const reporte = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/reportes/grupo", {
      params: {
        ...form,
      },
      responseType: "blob",
    });
    setLoading(false);
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
            </SpaceBetween>
          </Form>
        </Container>
      </SpaceBetween>
    </BaseLayout>
  );
}
