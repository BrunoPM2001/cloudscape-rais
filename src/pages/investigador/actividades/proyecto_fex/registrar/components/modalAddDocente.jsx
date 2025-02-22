import {
  Alert,
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  condicion: null,
  responsabilidad: "",
};

const formRules = {
  condicion: { required: true },
};

const opts = [
  { value: 45, label: "Investigador principal" },
  { value: 46, label: "Co-Investigador" },
  { value: 48, label: "Otros" },
  { value: 49, label: "Coordinador administrativo" },
  { value: 91, label: "Responsable Técnico" },
];

export default ({ close, proyecto_id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [form, setForm] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/actividades/fex/searchDocente");

  //  Functions
  const submit = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/actividades/fex/agregarDocente",
        {
          proyecto_id: proyecto_id,
          investigador_id: form.investigador_id,
          condicion: formValues.condicion.value,
          responsabilidad: formValues.responsabilidad,
        }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoadingCreate(false);
      reload();
      close();
    }
  };
  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Agregar docente"
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
          <SpaceBetween size="m">
            <Alert>
              <ColumnLayout columns={2} variant="text-grid">
                <SpaceBetween size="xxs">
                  <div>
                    <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                    <>{form.nombres}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Dependencia:</Box>
                    <>{form.des_dep_cesantes}</>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Código de docente:</Box>
                    <>{form.codigo}</>
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
                    <>{form.doc_numero}</>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Facultad:</Box>
                    <>{form.facultad}</>
                  </div>
                </SpaceBetween>
              </ColumnLayout>
            </Alert>
            <FormField
              label="Condición"
              errorText={formErrors.condicion}
              stretch
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.condicion}
                onChange={({ detail }) =>
                  handleChange("condicion", detail.selectedOption)
                }
                options={opts}
              />
            </FormField>
            {formValues?.condicion?.value == 48 && (
              <FormField
                label="Otra condición"
                stretch
                errorText={formErrors.responsabilidad}
              >
                <Input
                  value={formValues.responsabilidad}
                  onChange={({ detail }) =>
                    handleChange("responsabilidad", detail.value)
                  }
                />
              </FormField>
            )}
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Modal>
  );
};
