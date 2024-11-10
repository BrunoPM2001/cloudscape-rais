import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Grid,
  Input,
  Modal,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  doc_numero: "",
  email3: "",
  telefono_movil: "",
  telefono_casa: "",
  telefono_trabajo: "",
};

const formRules = {
  doc_numero: { required: true },
  email3: { required: true },
  telefono_movil: { required: true },
};

export default ({ close, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/grupos/editarMiembroData", {
      params: {
        id,
      },
    });
    const info = res.data;
    setFormValues(info);
    setLoading(false);
  };

  const update = async () => {
    if (validateForm()) {
      setLoadingUpdate(true);
      const res = await axiosBase.post("admin/estudios/grupos/editarMiembro", {
        ...formValues,
        tipo: "interno",
      });
      const data = res.data;
      setLoadingUpdate(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      header="Editar adherente interno"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={loading}
              loading={loadingUpdate}
              onClick={update}
            >
              Actualizar datos
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Alert>
          <SpaceBetween size="m">
            <div>
              <Box variant="awsui-key-label">Apellidos y nombres</Box>
              {loading ? <Spinner /> : <div>{formValues?.nombres}</div>}
            </div>
            <ColumnLayout columns={3}>
              <div>
                <Box variant="awsui-key-label">Código de alumno</Box>
                {loading ? <Spinner /> : <div>{formValues?.codigo}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Facultad</Box>
                {loading ? <Spinner /> : <div>{formValues?.facultad}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Programa</Box>
                {loading ? <Spinner /> : <div>{formValues?.programa}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Permanencia</Box>
                {loading ? <Spinner /> : <div>{formValues?.permanencia}</div>}
              </div>
              <div>
                <Box variant="awsui-key-label">Ultimo periodo</Box>
                {loading ? (
                  <Spinner />
                ) : (
                  <div>{formValues?.ultimo_periodo}</div>
                )}
              </div>
              <div>
                <Box variant="awsui-key-label">Tipo de alumno</Box>
                {loading ? <Spinner /> : <div>{formValues?.tipo_alumno}</div>}
              </div>
            </ColumnLayout>
          </SpaceBetween>
        </Alert>
        <ColumnLayout columns={2}>
          <FormField label="Dni" errorText={formErrors.doc_numero} stretch>
            <Input
              disabled={loading}
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
              disabled={loading}
              value={formValues.email3}
              onChange={({ detail }) => handleChange("email3", detail.value)}
            />
          </FormField>
        </ColumnLayout>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
          ]}
        >
          <FormField
            label="Teléfono celular"
            errorText={formErrors.telefono_movil}
            stretch
          >
            <Input
              disabled={loading}
              value={formValues.telefono_movil}
              onChange={({ detail }) =>
                handleChange("telefono_movil", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Teléfono de casa"
            errorText={formErrors.telefono_casa}
            stretch
          >
            <Input
              disabled={loading}
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
              disabled={loading}
              value={formValues.telefono_trabajo}
              onChange={({ detail }) =>
                handleChange("telefono_trabajo", detail.value)
              }
            />
          </FormField>
        </Grid>
      </SpaceBetween>
    </Modal>
  );
};
