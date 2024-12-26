import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Autosuggest,
  Alert,
  Input,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  contribucion: "",
};
const formRules = {
  contribucion: { required: true },
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
    useAutosuggest("investigador/convocatorias/pconfigi/listadoGrupoDocente");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);
  //  Functions
  const agregarIntegrante = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.postForm(
      "investigador/convocatorias/pconfigi/agregarIntegrante",
      { ...form, id, proyecto_integrante_tipo_id: 3 }
    );
    const data = res.data;
    setLoadingCreate(false);
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
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
          <>
            <li key={1}>
              Corresponde al perfil <strong>Docente</strong>
            </li>
            <li key={2}>
              Está bajo las condiciones de{" "}
              <strong>Coordinador o Adjunto o títular</strong>
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
        <FormField
          label="Contribución"
          stretch
          errorText={formErrors.contribucion ?? ""}
        >
          <Input
            value={formValues.contribucion}
            onChange={({ detail }) =>
              handleChange("contribucion", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
