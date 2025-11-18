import { 
  Box, 
  Button, 
  Spinner, 
  SpaceBetween, 
  Modal, 
  Autosuggest, 
  Alert, 
  ColumnLayout,
  Form,
  FormField,
} from '@cloudscape-design/components';
import { useState, useEffect } from 'react';
import axiosBase from "../../../../../api/axios.js"; // Asegúrate de que esta importación sea correcta
import { useAutosuggest } from '../../../../../hooks/useAutosuggest.js';
import { useFormValidation } from "../../../../../hooks/useFormValidation.js";
const initialForm = {};
const formRules = {};

export default function ModalAddIntegrante({id, close, reload }) {

  // States
  const [loadingData, setLoadingData] = useState(false);
  const [form, setForm] = useState({});
  const [enableCreate, setEnableCreate] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [incluirMiembroData, setIncluirMiembroData] = useState({});

  // Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/convocatorias/pinvpos/searchIntegrante", 0);
  const {
    validateForm,
  } = useFormValidation(initialForm, formRules);

  // Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificarIntegrante",
      {
        params: {
          investigador_id: form.id,
        },
      }
    );
    const data = await res.data;
    setIncluirMiembroData(data);
    setLoadingData(false);
    if (data.message == "success") {
      setEnableCreate(false);
    }
  };

  const agregarIntegrante = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      let formData = new FormData();
      formData.append("proyecto_id", id);
      formData.append("investigador_id", form.id);
      const res = await axiosBase.postForm(
        "investigador/convocatorias/pinvpos/agregarIntegrante",
        formData
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

    //  Effects
  useEffect(() => {
    if (Object.keys(form).length != 0) {
      getData();
    }
  }, [form]);

  return (
    <Modal 
      visible={true} 
      size="large"
      onDismiss={close} 
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
      header="Selecciona un integrante para agregar"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Buscar integrante" stretch>
            <Autosuggest 
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                if (detail.value == "") {
                  setForm({});
                }
                setEnableCreate(false);
              }}
              onSelect={({ detail }) => {
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setEnableCreate(true);
                setAvoidSelect(false);
                setForm(detail.selectedOption);
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="Nombre o apellido"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados">
            </Autosuggest>
          </FormField>
          {form.id != null && (
            <>
              <Alert>
                <ColumnLayout columns={2} variant="text-grid">
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                      <>{`${form.apellido1} ${form.apellido2}, ${form.nombres}`}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Dni:</Box>
                      <>{form.dni}</>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Cargo:</Box>
                      <>{form.description}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Correo:</Box>
                      <>{form.email}</>
                    </div>
                  </SpaceBetween>
                </ColumnLayout>
              </Alert>
              {loadingData ? (
                <SpaceBetween
                  direction="horizontal"
                  size="xs"
                  alignItems="center"
                >
                  <Spinner />
                  <Box variant="p">
                    Verificando si está incluído en algún proyecto
                  </Box>
                </SpaceBetween>
              ) : (
                <>
                  <Alert
                    type={incluirMiembroData.message}
                    header={incluirMiembroData.detail}
                  />
                </>
              )}
            </>
          )}
        </SpaceBetween>
      </Form>
    </Modal>
  );
}
