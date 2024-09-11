import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Autosuggest,
  Input,
  ColumnLayout,
  Select,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  investigador_id: "",
  apellido1: "",
  apellido2: "",
  nombres: "",
  condicion: null,
};

const formRules = {
  investigador_id: { required: true },
  condicion: { required: true },
};

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/publicaciones/utils/searchDocenteRegistrado");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/publicaciones/propiedadInt/addAutor",
        {
          ...formValues,
          tipo: "docente",
          id,
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={!formValues.investigador_id}
              onClick={agregarAutor}
              loading={loadingCreate}
            >
              Agregar autor
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar autor"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Buscar docente investigador" stretch>
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                if (detail.value == "") {
                  handleChange("investigador_id", "");
                  handleChange("apellido1", "");
                  handleChange("apellido2", "");
                  handleChange("nombres", "");
                }
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.id != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  handleChange("investigador_id", rest.id);
                  handleChange("apellido1", rest.apellido1);
                  handleChange("apellido2", rest.apellido2);
                  handleChange("nombres", rest.nombres);
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
          <ColumnLayout columns={3}>
            <FormField label="Nombres" stretch>
              <Input readOnly value={formValues.nombres} />
            </FormField>
            <FormField label="Apellido paterno" stretch>
              <Input readOnly value={formValues.apellido1} />
            </FormField>
            <FormField label="Apellido materno" stretch>
              <Input readOnly value={formValues.apellido2} />
            </FormField>
          </ColumnLayout>
          <FormField label="Condición" stretch errorText={formErrors.condicion}>
            <Select
              placeholder="Escoja una opción"
              disabled={!formValues.investigador_id}
              selectedOption={formValues.condicion}
              onChange={({ detail }) => {
                handleChange("condicion", detail.selectedOption);
              }}
              options={[{ value: "Autor" }, { value: "Inventor" }]}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
