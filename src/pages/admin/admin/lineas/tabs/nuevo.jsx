import {
  Select,
  Container,
  ColumnLayout,
  Header,
  Form,
  SpaceBetween,
  Button,
  FormField,
  Input,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { NotificationContext } from "../../../../../routes/admin";

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedPadre, setSelectedPadre] = useState();
  const [form, setForm] = useState({
    facultad: null,
    codigo: null,
    padre: null,
    linea: null,
    resolucion: null,
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    setItems([]);
    setSelectedPadre(null);
    const res = await axiosBase.get(
      "admin/admin/lineasInvestigacion/getAll/" + selectedOption.value
    );
    const data = await res.data;
    setItems(data.data);
    setLoading(false);
  };

  const create = async () => {
    setCreating(true);
    const res = await axiosBase.post("admin/admin/lineasInvestigacion/create", {
      facultad_id: form.facultad,
      parent_id: form.padre,
      codigo: form.codigo,
      nombre: form.linea,
      resolucion: form.resolucion,
    });
    setCreating(false);
    const data = await res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, [selectedOption]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        variant="embedded"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="normal">
              Limpiar campos
            </Button>
            <Button
              variant="primary"
              onClick={() => create()}
              loading={creating}
            >
              Crear
            </Button>
          </SpaceBetween>
        }
        header={<Header variant="h2">Crear línea de investigación</Header>}
      >
        <Container>
          <SpaceBetween direction="vertical" size="xs">
            <ColumnLayout columns={2}>
              <FormField label="Facultad">
                <Select
                  controlId="facultad"
                  placeholder="Escoge una opción"
                  selectedOption={selectedOption}
                  onChange={({ detail }) => {
                    setSelectedOption(detail.selectedOption);
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
              <FormField label="Código">
                <Input
                  controlId="codigo"
                  value={form.codigo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      codigo: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
            <FormField label="Padre" stretch>
              <Select
                controlId="padre"
                placeholder="Escoge una opción"
                selectedOption={selectedPadre}
                onChange={({ detail }) => {
                  setSelectedPadre(detail.selectedOption);
                  setForm((prev) => ({
                    ...prev,
                    padre: detail.selectedOption.value,
                  }));
                }}
                statusType={loading == true ? "loading" : "finished"}
                loadingText="Cargando data"
                empty="No hay opciones"
                options={items.map((item) => {
                  return {
                    label: item.codigo + " " + item.nombre,
                    value: item.id,
                  };
                })}
              />
            </FormField>
            <FormField label="Línea de investigación" stretch>
              <Input
                controlId="linea"
                value={form.linea}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    linea: detail.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Resolución rectoral" stretch>
              <Input
                controlId="resolucion"
                value={form.resolucion}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    resolucion: detail.value,
                  }))
                }
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
};
