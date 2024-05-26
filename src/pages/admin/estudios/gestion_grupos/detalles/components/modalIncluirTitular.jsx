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
  DatePicker,
  Alert,
  Input,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosBase from "../../../../../../api/axios";
import { NotificationContext } from "../../../../../../routes/admin";

const initialForm = {
  fecha_inclusion: "",
  resolucion_oficina: "",
  resolucion: "",
  resolucion_fecha: "",
};

const formRules = {
  fecha_inclusion: { required: true },
  resolucion_oficina: { required: false },
  resolucion: { required: false },
  resolucion_fecha: { required: false },
};

export default ({ visible, setVisible, reload }) => {
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
    useAutosuggest("rrhh");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "admin/estudios/grupos/incluirMiembroData",
      {
        params: {
          tipo: "titular",
          investigador_id: form.investigador_id,
        },
      }
    );
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
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post("admin/estudios/grupos/agregarMiembro", {
        ...formValues,
        tipo_registro: "titular",
        grupo_id: id,
        investigador_id: form.investigador_id,
        condicion: "Titular",
        tipo: "DOCENTE PERMANENTE",
      });
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
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
      <Form variant="embedded">
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
                if (detail.selectedOption.id != undefined) {
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
                    <Form variant="embedded">
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
                      <ColumnLayout columns={4}>
                        <FormField
                          label="Fecha de inclusión"
                          stretch
                          errorText={formErrors.fecha_inclusion}
                        >
                          <DatePicker
                            controlId="fecha_inclusion"
                            placeholder="YYYY/MM/DD"
                            value={formValues.fecha_inclusion}
                            onChange={({ detail }) =>
                              handleChange("fecha_inclusion", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="R.OF."
                          stretch
                          errorText={formErrors.resolucion_oficina}
                        >
                          <Input
                            controlId="resolucion_oficina"
                            placeholder="Resolución de oficina"
                            value={formValues.resolucion_oficina}
                            onChange={({ detail }) =>
                              handleChange("resolucion_oficina", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="R.R."
                          stretch
                          errorText={formErrors.resolucion}
                        >
                          <Input
                            controlId="resolucion"
                            placeholder="Resolución rectoral"
                            value={formValues.resolucion}
                            onChange={({ detail }) =>
                              handleChange("resolucion", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="R.R. Fecha"
                          stretch
                          errorText={formErrors.resolucion_fecha}
                        >
                          <DatePicker
                            controlId="resolucion_fecha"
                            placeholder="YYYY/MM/DD"
                            value={formValues.resolucion_fecha}
                            onChange={({ detail }) =>
                              handleChange("resolucion_fecha", detail.value)
                            }
                          />
                        </FormField>
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
