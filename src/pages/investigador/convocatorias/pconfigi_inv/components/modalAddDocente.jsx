import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Autosuggest,
  Alert,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../api/axios";

export default ({ close, reload, id, reset }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [enableCreate, setEnableCreate] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form, setForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest(
      "investigador/convocatorias/pconfigi_inv/listadoDocentes?id=" + id
    );

  //  Functions
  const agregarIntegrante = async () => {
    setLoadingCreate(true);
    let formulario = new FormData();
    formulario.append("id", id);
    formulario.append("investigador_id", form.investigador_id);
    formulario.append("grupo_integrante_id", form.grupo_integrante_id);
    formulario.append("proyecto_integrante_tipo_id", 38);
    const res = await axiosBase.post(
      "investigador/convocatorias/pconfigi_inv/agregarIntegrante",
      formulario
    );
    const data = res.data;
    setLoadingCreate(false);
    reset();
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              disabled={enableCreate}
              variant="primary"
              onClick={agregarIntegrante}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir integrante al proyecto"
    >
      <SpaceBetween size="m">
        <Alert header="Acerca de este integrante">
          <li>
            Corresponde al perfil <strong>Docente</strong>
          </li>
          <li>
            Está bajo las condiciones de <strong>Títular</strong>
          </li>
        </Alert>
        <FormField label="Buscar investigador" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
              if (detail.value == "") {
                setForm({});
              }
              setEnableCreate(true);
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.investigador_id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setForm(rest);
                setAvoidSelect(false);
                setEnableCreate(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Nombre del miembro de grupo"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
