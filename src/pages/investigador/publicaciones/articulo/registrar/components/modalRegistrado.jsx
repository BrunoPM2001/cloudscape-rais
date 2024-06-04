import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Autosuggest,
  Input,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);
  const [form, setForm] = useState({});
  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("proyectos_registrados");

  //  Functions
  const agregarProyecto = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.post(
      "investigador/publicaciones/agregarProyecto",
      {
        publicacion_id: id,
        proyecto_id: form.proyecto_id,
        codigo_proyecto: form.codigo_proyecto,
        nombre_proyecto: form.titulo,
        entidad_financiadora: form.entidad_financiadora,
      }
    );
    const data = res.data;
    setLoadingCreate(false);
    setVisible(false);
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              disabled={!enableCreate}
              variant="primary"
              onClick={() => agregarProyecto()}
              loading={loadingCreate}
            >
              Agregar proyecto
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar proyecto registrado en la UNMSM"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Buscar egresado" stretch>
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                if (detail.value == "") {
                  setForm({});
                  setEnableCreate(false);
                }
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.proyecto_id != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  setForm(rest);
                  setEnableCreate(true);
                  setAvoidSelect(false);
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="Código o título del proyecto"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados"
            />
          </FormField>
          <FormField label="Título del proyecto" stretch>
            <Input disabled value={form.titulo} />
          </FormField>
          <FormField label="Código de proyecto" stretch>
            <Input disabled value={form.codigo_proyecto} />
          </FormField>
          <FormField label="Fuente financiadora" stretch>
            <Input disabled value={form.entidad_financiadora} />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
