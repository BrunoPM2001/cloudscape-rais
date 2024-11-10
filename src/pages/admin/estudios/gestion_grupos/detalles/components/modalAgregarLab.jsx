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
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ close, grupo_id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [enableCreate, setEnableCreate] = useState(false);
  const [form, setForm] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/grupos/searchLaboratorio");

  //  Functions
  const agregar = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.post(
      "admin/estudios/grupos/agregarLaboratorio",
      {
        grupo_id,
        laboratorio_id: form.id,
      }
    );
    const data = res.data;
    setLoadingCreate(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };

  return (
    <Modal
      size="medium"
      visible
      onDismiss={close}
      header="Agregar laboratorio"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={!enableCreate}
              loading={loadingCreate}
              onClick={agregar}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="l">
        <FormField>
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
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setForm(rest);
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
        {form.id != null && (
          <>
            <Alert>
              <SpaceBetween size="m">
                <div>
                  <Box variant="awsui-key-label">Nombre:</Box>
                  <>{form.laboratorio}</>
                </div>
                <ColumnLayout columns={3} minColumnWidth={150}>
                  <div>
                    <Box variant="awsui-key-label">Código:</Box>
                    <>{form.codigo}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Responsable:</Box>
                    <>{form.responsable}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Facultad:</Box>
                    <>{form.facultad}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Categoría - uso:</Box>
                    <>{form.categoria_uso}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Facultad:</Box>
                    <>{form.facultad}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Ubicación:</Box>
                    <>{form.ubicacion}</>
                  </div>
                </ColumnLayout>
              </SpaceBetween>
            </Alert>
          </>
        )}
      </SpaceBetween>
    </Modal>
  );
};
