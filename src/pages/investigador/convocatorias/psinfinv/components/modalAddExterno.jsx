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
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  contribucion: null,
};

export default ({ close, reload, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [enableCreate, setEnableCreate] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form, setForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/convocatorias/psinfinv/listadoGrupoExterno");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, {});

  //  Functions
  const agregarIntegrante = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.postForm(
        "investigador/convocatorias/psinfinv/agregarIntegrante",
        { ...form, id, ...formValues, proyecto_integrante_tipo_id: 10 }
      );
      const data = res.data;
      setLoadingCreate(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
    }
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
          <>
            <li key={1}>
              Corresponde al perfil <strong>Externo</strong>
            </li>
            <li key={2}>
              Está bajo las condiciones de{" "}
              <strong>Adjunto externo o Adherente</strong>
            </li>
          </>
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
