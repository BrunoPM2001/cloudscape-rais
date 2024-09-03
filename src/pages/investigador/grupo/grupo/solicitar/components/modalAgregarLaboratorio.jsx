import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Autosuggest,
  Alert,
  ColumnLayout,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";

export default ({ close, reload, grupo_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [disabledCreate, setDisabledCreate] = useState(true);
  const [info, setInfo] = useState({});

  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/grupo/solicitar/searchLaboratorio");

  //  Functions
  const agregar = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.post(
      "investigador/grupo/solicitar/agregarLaboratorio",
      {
        id: info.id,
        grupo_id,
      }
    );
    const data = res.data;
    setLoadingCreate(false);
    close();
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregar}
              loading={loadingCreate}
              disabled={disabledCreate}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar laboratorio"
    >
      <SpaceBetween size="s">
        <FormField label="Buscar laboratorio" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
              if (detail.value == "") {
                setInfo({});
              }
              setDisabledCreate(false);
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setInfo(rest);
                setAvoidSelect(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Facultad, nombre o código del laboratorio"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        {info.id != null && (
          <Alert header="Datos del laboratorio">
            <ColumnLayout columns={3}>
              <div>
                <Box variant="awsui-key-label">Código:</Box>
                <>{info.codigo}</>
              </div>
              <div>
                <Box variant="awsui-key-label">Nombre:</Box>
                <>{info.laboratorio}</>
              </div>
              <div>
                <Box variant="awsui-key-label">Categoría:</Box>
                <>{info.categoria_uso}</>
              </div>
              <div>
                <Box variant="awsui-key-label">Responsable:</Box>
                <>{info.responsable}</>
              </div>
              <div>
                <Box variant="awsui-key-label">Ubicación:</Box>
                <>{info.ubicacion}</>
              </div>
            </ColumnLayout>
          </Alert>
        )}
      </SpaceBetween>
    </Modal>
  );
};
