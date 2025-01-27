import {
  Alert,
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  nombres: "",
  codigo: "",
  doc_numero: "",
  facultad: "",
  email3: "",
  telefono_casa: "",
  telefono_trabajo: "",
  telefono_movil: "",
};

const formRules = {
  doc_numero: { required: true },
  email3: { required: true },
};

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/proyectosFEX/searchEstudiante");
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const agregar = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post(
        "admin/estudios/proyectosFEX/agregarEstudiante",
        {
          ...formValues,
          id,
        }
      );
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
      reload();
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Agregar miembro tesista"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregar}
              loading={creating}
              disabled={!enableCreate}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField label="Buscar estudiante" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
              if (detail.value == "") {
                setEnableCreate(false);
              }
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setFormValues(rest);
                setEnableCreate(true);
                setAvoidSelect(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Dni, código o nombres del estudiante"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        {enableCreate && (
          <SpaceBetween size="m">
            <Alert>
              <ColumnLayout columns={2}>
                <div>
                  <Box variant="awsui-key-label">Apellidos y nombres</Box>
                  <div>
                    {`${formValues?.apellido1} ${formValues?.apellido2}, ${formValues.nombres}`}{" "}
                  </div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Código de estudiante</Box>
                  <div>{formValues?.codigo}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Facultad</Box>
                  <div>{formValues?.facultad}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Programa</Box>
                  <div>{formValues?.programa}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Permanencia</Box>
                  <div>{formValues?.permanencia}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Último periodo matriculado
                  </Box>
                  <div>{formValues?.ultimo_periodo_matriculado}</div>
                </div>
              </ColumnLayout>
            </Alert>
            <ColumnLayout columns={3}>
              <FormField
                label="N° de documento"
                errorText={formErrors.doc_numero}
                stretch
              >
                <Input
                  value={formValues.doc_numero}
                  onChange={({ detail }) =>
                    handleChange("doc_numero", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Correo institucional"
                errorText={formErrors.email3}
                stretch
              >
                <Input
                  value={formValues.email3}
                  onChange={({ detail }) =>
                    handleChange("email3", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <ColumnLayout columns={3} minColumnWidth={150}>
              <FormField
                label="Teléfono de casa"
                errorText={formErrors.telefono_casa}
                stretch
              >
                <Input
                  value={formValues.telefono_casa}
                  onChange={({ detail }) =>
                    handleChange("telefono_casa", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono de trabajo"
                errorText={formErrors.telefono_trabajo}
                stretch
              >
                <Input
                  value={formValues.telefono_trabajo}
                  onChange={({ detail }) =>
                    handleChange("telefono_trabajo", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono celular"
                errorText={formErrors.telefono_movil}
                stretch
              >
                <Input
                  value={formValues.telefono_movil}
                  onChange={({ detail }) =>
                    handleChange("telefono_movil", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Modal>
  );
};
