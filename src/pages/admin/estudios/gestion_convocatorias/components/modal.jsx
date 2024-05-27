import {
  Modal,
  FormField,
  Input,
  Box,
  SpaceBetween,
  Form,
  Header,
  ColumnLayout,
  Button,
  DatePicker,
  Container,
  Spinner,
  Select,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const CreateModal = ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({});

  //  Functions
  const createConvocatoria = async () => {
    setCreating(true);
    const response = await axiosBase.post(
      "admin/estudios/convocatorias/createConvocatoria",
      form
    );
    const data = await response.data;
    setCreating(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={creating}
              onClick={() => createConvocatoria()}
            >
              Crear convocatoria
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Crear convocatoria"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <Container header={<Header variant="h3">Datos del Registro</Header>}>
            <ColumnLayout columns={2}>
              <div>
                <FormField label="Tipo de proyecto" stretch>
                  <Input
                    controlId="tipo"
                    value={form.tipo}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        tipo: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Año" stretch>
                  <Input
                    controlId="periodo"
                    value={form.periodo}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        periodo: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Convocatoria" stretch>
                  <Input
                    controlId="convocatoria"
                    value={form.convocatoria}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        convocatoria: detail.value,
                      }))
                    }
                  />
                </FormField>
              </div>
              <div>
                <FormField label="Fecha de inicio" stretch>
                  <DatePicker
                    controlId="fecha_inicio_registro"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_inicial}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_inicial: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Fecha fin" stretch>
                  <DatePicker
                    controlId="fecha_fin_registro"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_final}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_final: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Fecha de corte" stretch>
                  <DatePicker
                    controlId="fecha_corte_registro"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_corte}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_corte: detail.value,
                      }))
                    }
                  />
                </FormField>
              </div>
            </ColumnLayout>
          </Container>
          <Container header={<Header variant="h3">Datos de calendario</Header>}>
            <ColumnLayout columns={2}>
              <FormField label="Fecha de inicio" stretch>
                <DatePicker
                  controlId="fecha_inicio_calendario"
                  placeholder="YYYY/MM/DD"
                  value={form.fecha_inicial_calendario}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      fecha_inicial_calendario: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Fecha fin" stretch>
                <DatePicker
                  controlId="fecha_fin_calendario"
                  placeholder="YYYY/MM/DD"
                  value={form.fecha_final_calendario}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      fecha_final_calendario: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </Container>
          <Container header={<Header variant="h3">Datos de evaluación</Header>}>
            <ColumnLayout columns={2}>
              <FormField label="Fecha de inicio" stretch>
                <DatePicker
                  controlId="fecha_inicio_evaluacion"
                  placeholder="YYYY/MM/DD"
                  value={form.fecha_inicial_evaluacion}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      fecha_inicial_evaluacion: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Fecha fin" stretch>
                <DatePicker
                  controlId="fecha_fin_evaluacion"
                  placeholder="YYYY/MM/DD"
                  value={form.fecha_final_evaluacion}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      fecha_final_evaluacion: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </Container>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

const EditModal = ({ visible, setVisible, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/getOneConvocatoria/" + item[0].id
    );
    const data = await res.data;
    setForm(data.data);
    setLoading(false);
  };

  const editConvocatoria = async () => {
    setEditing(true);
    const response = await axiosBase.put(
      "admin/estudios/convocatorias/updateConvocatoria",
      { ...form, id: item[0].id }
    );
    const data = await response.data;
    setEditing(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={editing}
              onClick={() => editConvocatoria()}
            >
              Editar convocatoria
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar convocatoria"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <Container header={<Header variant="h3">Datos del Registro</Header>}>
            <ColumnLayout columns={2}>
              <div>
                <FormField label="Tipo de proyecto" stretch>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Input disabled controlId="tipo" value={form.tipo} />
                  )}
                </FormField>
                <FormField label="Año" stretch>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Input
                      controlId="periodo"
                      value={form.periodo}
                      onChange={({ detail }) =>
                        setForm((prev) => ({
                          ...prev,
                          periodo: detail.value,
                        }))
                      }
                    />
                  )}
                </FormField>
                <FormField label="Convocatoria" stretch>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Input
                      controlId="convocatoria"
                      value={form.convocatoria}
                      onChange={({ detail }) =>
                        setForm((prev) => ({
                          ...prev,
                          convocatoria: detail.value,
                        }))
                      }
                    />
                  )}
                </FormField>
              </div>
              <div>
                <FormField label="Fecha de inicio" stretch>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <DatePicker
                      controlId="fecha_inicio_registro"
                      placeholder="YYYY/MM/DD"
                      value={form.fecha_inicial}
                      onChange={({ detail }) =>
                        setForm((prev) => ({
                          ...prev,
                          fecha_inicial: detail.value,
                        }))
                      }
                    />
                  )}
                </FormField>
                <FormField label="Fecha fin" stretch>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <DatePicker
                      controlId="fecha_fin_registro"
                      placeholder="YYYY/MM/DD"
                      value={form.fecha_final}
                      onChange={({ detail }) =>
                        setForm((prev) => ({
                          ...prev,
                          fecha_final: detail.value,
                        }))
                      }
                    />
                  )}
                </FormField>
                <FormField label="Fecha de corte" stretch>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <DatePicker
                      controlId="fecha_corte_registro"
                      placeholder="YYYY/MM/DD"
                      value={form.fecha_corte}
                      onChange={({ detail }) =>
                        setForm((prev) => ({
                          ...prev,
                          fecha_corte: detail.value,
                        }))
                      }
                    />
                  )}
                </FormField>
              </div>
            </ColumnLayout>
          </Container>
          <Container header={<Header variant="h3">Datos de calendario</Header>}>
            <ColumnLayout columns={2}>
              <FormField label="Fecha de inicio" stretch>
                {loading ? (
                  <Spinner />
                ) : (
                  <DatePicker
                    controlId="fecha_inicio_calendario"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_inicial_calendario}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_inicial_calendario: detail.value,
                      }))
                    }
                  />
                )}
              </FormField>
              <FormField label="Fecha fin" stretch>
                {loading ? (
                  <Spinner />
                ) : (
                  <DatePicker
                    controlId="fecha_fin_calendario"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_final_calendario}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_final_calendario: detail.value,
                      }))
                    }
                  />
                )}
              </FormField>
            </ColumnLayout>
          </Container>
          <Container header={<Header variant="h3">Datos de evaluación</Header>}>
            <ColumnLayout columns={2}>
              <FormField label="Fecha de inicio" stretch>
                {loading ? (
                  <Spinner />
                ) : (
                  <DatePicker
                    controlId="fecha_inicio_evaluacion"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_inicial_evaluacion}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_inicial_evaluacion: detail.value,
                      }))
                    }
                  />
                )}
              </FormField>
              <FormField label="Fecha fin" stretch>
                {loading ? (
                  <Spinner />
                ) : (
                  <DatePicker
                    controlId="fecha_fin_evaluacion"
                    placeholder="YYYY/MM/DD"
                    value={form.fecha_final_evaluacion}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        fecha_final_evaluacion: detail.value,
                      }))
                    }
                  />
                )}
              </FormField>
            </ColumnLayout>
          </Container>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

const DeleteModal = ({ visible, setVisible, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const deleteConvocatoria = async () => {
    setLoading(true);
    const response = await axiosBase.delete(
      "admin/estudios/convocatorias/deleteConvocatoria",
      {
        data: {
          id: item[0].id,
        },
      }
    );
    const data = await response.data;
    setLoading(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={() => deleteConvocatoria()}
            >
              Eliminar convocatoria
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar convocatoria"
    >
      ¿Estás seguro de eliminar esta convocatoria en conjunto? Se eliminarán
      tanto las etapas de registro, evento y evaluación
    </Modal>
  );
};

const AddCriterioModal = ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    selectedOption: {
      value: "No",
    },
  });

  //  Functions
  const createCriterio = async () => {
    setCreating(true);
    const response = await axiosBase.post(
      "admin/estudios/convocatorias/createCriterio",
      form
    );
    const data = await response.data;
    setCreating(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={creating}
              onClick={() => createCriterio()}
            >
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Añadir criterio"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <div>
            <Header variant="h3">Datos del template</Header>
            <ColumnLayout columns={2}>
              <FormField label="Tipo de proyecto" stretch>
                <Input
                  controlId="tipo"
                  value={form.tipo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      tipo: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Año" stretch>
                <Input
                  controlId="periodo"
                  value={form.periodo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      periodo: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </div>
          <div>
            <Header variant="h3">Reutilizar criterios pasados</Header>
            <FormField
              label="Copiar los criterios de ese tipo de proyecto de año anterior"
              stretch
            >
              <Select
                selectedOption={form.selectedOption}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    selectedOption: detail.selectedOption,
                  }))
                }
                options={[{ value: "Sí" }, { value: "No" }]}
              />
            </FormField>
          </div>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

export { CreateModal, EditModal, DeleteModal, AddCriterioModal };
