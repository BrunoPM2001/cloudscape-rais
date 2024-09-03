import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Autosuggest,
  ColumnLayout,
  Spinner,
  Alert,
  Input,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ close, reload, grupo_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingData, setLoadingData] = useState(false);
  const [enableCreate, setEnableCreate] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form, setForm] = useState({});
  const [incluirMiembroData, setIncluirMiembroData] = useState({});
  const [dataInvestForm, setDataInvestForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/grupo/solicitar/searchDocenteRrhh");

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("investigador/grupo/incluirMiembroData", {
      params: {
        tipo: "titular",
        investigador_id: form.investigador_id,
      },
    });
    const data = await res.data;
    setIncluirMiembroData(data);
    setLoadingData(false);
    if (data.message == "success") {
      setEnableCreate(false);
      setDataInvestForm({
        codigo_orcid: data.codigo_orcid,
        dependencia: data.dependencia,
        facultad: data.facultad,
        instituto: data.instituto,
      });
    }
  };

  const agregarMiembro = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.post("investigador/grupo/agregarMiembro", {
      tipo_registro: "Colaborador",
      grupo_id: grupo_id,
      investigador_id: form.investigador_id,
    });
    const data = res.data;
    setLoadingCreate(false);
    close();
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  //  Effects
  useEffect(() => {
    if (Object.keys(form).length != 0) {
      getData();
    }
  }, [form]);

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
              disabled={enableCreate}
              variant="primary"
              onClick={() => agregarMiembro()}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir miembro al grupo"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Buscar docente ordinario" stretch>
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
                if (detail.selectedOption?.id != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  setForm(rest);
                  setAvoidSelect(false);
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
          {form.id != null && (
            <>
              <Alert>
                <ColumnLayout columns={2} variant="text-grid">
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                      <>{`${form.ser_ape_pat} ${form.ser_ape_mat}, ${form.ser_nom}`}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Dependencia:</Box>
                      <>{form.des_dep_cesantes}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Código de docente:</Box>
                      <>{form.ser_cod_ant}</>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">
                        Categoría / Clase / Horas:
                      </Box>
                      <>{`${form.categoria} / ${form.clase} / ${form.horas}`}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">N° de documento:</Box>
                      <>{form.ser_doc_id_act}</>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Facultad:</Box>
                      <>{form.facultad}</>
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
                    Verificando si pertenece a algún grupo de investigación
                  </Box>
                </SpaceBetween>
              ) : (
                <>
                  <Alert
                    type={incluirMiembroData.message}
                    header={incluirMiembroData.detail}
                  />
                  {enableCreate == false && (
                    <Form>
                      <ColumnLayout columns={2} variant="text-grid">
                        <SpaceBetween direction="vertical" size="xs">
                          <FormField label="Código ORCID" stretch>
                            <Input
                              controlId="codigo_orcid"
                              value={dataInvestForm.codigo_orcid}
                              disabled
                            />
                          </FormField>
                          <FormField label="Instituto" stretch>
                            <Input
                              controlId="instituto"
                              value={dataInvestForm.instituto}
                              disabled
                            />
                          </FormField>
                        </SpaceBetween>
                        <SpaceBetween direction="vertical" size="xs">
                          <FormField label="Dependencia" stretch>
                            <Input
                              controlId="dependencia"
                              value={dataInvestForm.dependencia}
                              disabled
                            />
                          </FormField>
                          <FormField label="Facultad" stretch>
                            <Input
                              controlId="facultad"
                              value={dataInvestForm.facultad}
                              disabled
                            />
                          </FormField>
                        </SpaceBetween>
                      </ColumnLayout>
                    </Form>
                  )}
                </>
              )}
            </>
          )}
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
