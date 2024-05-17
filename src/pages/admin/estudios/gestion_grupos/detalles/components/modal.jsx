import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Select,
  Autosuggest,
  ColumnLayout,
  Spinner,
  DatePicker,
  Textarea,
  Alert,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import { NotificationContext } from "../../../../../../routes/admin";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";

const IncluirMiembroModal = ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const { loading, options, setOptions, value, setValue } = useAutosuggest();
  const [loadingData, setLoadingData] = useState(false);
  const [form, setForm] = useState({});
  const [creating, setCreating] = useState(false);

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("admin/admin/usuarios/");
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
            <Button disabled variant="primary" loading={creating}>
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir miembro al grupo"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Tipo de miembro" stretch>
            <Select
              placeholder="Escoga una opción"
              options={[
                {
                  label: "Docente ordinario",
                },
              ]}
            />
          </FormField>
          <FormField label="Buscar docente ordinario" stretch>
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.detail != undefined) {
                  setForm((prev) => ({
                    ...prev,
                    investigador_id: detail.selectedOption.detail,
                  }));
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="DNI o nombre del investigador"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados"
            />
          </FormField>
          {form.investigador_id != null && (
            <Alert header="Detalles">
              <ColumnLayout columns={2} variant="text-grid">
                <SpaceBetween size="s">
                  <div>
                    <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                  <div>
                    <Box variant="awsui-key-label">N° de documento:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Código de docente:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Categoría / Clase:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                </SpaceBetween>
                <SpaceBetween size="s">
                  <div>
                    <Box variant="awsui-key-label">Dependencia:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Facultad:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Puntaje total:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Deudas:</Box>
                    {loading ? <Spinner /> : <>Sample</>}
                  </div>
                </SpaceBetween>
              </ColumnLayout>
            </Alert>
          )}
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

const ExcluirMiembro = ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const excluir = async () => {
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
              Excluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar convocatoria"
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={4}>
          <FormField label="Fecha de exclusión">
            <DatePicker />
          </FormField>
          <FormField label="Res. exclusión">
            <Input />
          </FormField>
          <FormField label="Fecha de res. exclusión">
            <DatePicker />
          </FormField>
          <FormField label="Res. ofi. exclusión">
            <Input />
          </FormField>
        </ColumnLayout>
        <FormField label="Observación / Comentario">
          <Textarea rows={4} />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};

const EditarMiembro = ({ visible, setVisible, reload }) => {};

export { IncluirMiembroModal, ExcluirMiembro };
