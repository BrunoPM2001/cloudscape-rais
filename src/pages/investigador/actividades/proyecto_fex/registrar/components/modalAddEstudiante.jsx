import {
  Alert,
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ close, proyecto_id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [form, setForm] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/actividades/fex/searchEstudiante");

  //  Functions
  const submit = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.post(
      "investigador/actividades/fex/agregarEstudiante",
      {
        proyecto_id: proyecto_id,
        investigador_id: form.investigador_id,
        condicion: 47,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingCreate(false);
    reload();
    close();
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Agregar documento"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={!enableCreate}
              onClick={submit}
              loading={loadingCreate}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField label="Buscar docente investigador" stretch>
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
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setForm(rest);
                setEnableCreate(true);
                setAvoidSelect(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Dni, código o nombres de docente"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        {form.id != null && (
          <>
            <Alert>
              <ColumnLayout columns={2} variant="text-grid">
                <SpaceBetween size="xxs">
                  <div>
                    <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                    <>{form.nombres}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Facultad:</Box>
                    <>{form.facultad}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Código de alumno:</Box>
                    <>{form.codigo_alumno}</>
                  </div>
                </SpaceBetween>
                <SpaceBetween size="xxs">
                  <div>
                    <Box variant="awsui-key-label">Programa:</Box>
                    <>{form.programa}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Permanencia:</Box>
                    <>{form.permanencia}</>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Última matrícula:</Box>
                    <>{form.ultimo_periodo_matriculado}</>
                  </div>
                </SpaceBetween>
              </ColumnLayout>
            </Alert>
          </>
        )}
      </SpaceBetween>
    </Modal>
  );
};
