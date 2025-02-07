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
  Spinner,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../../api/axios";
import NotificationContext from "../../../../../../../providers/notificationProvider";

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
  const [loading, setLoading] = useState(true);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/proyectosFEX/getEditEstudiante",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setFormValues({
      ...data,
    });
    setLoading(false);
  };

  const editar = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.put(
        "admin/estudios/proyectosFEX/editarEstudiante",
        { ...formValues, id }
      );
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
      reload();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Editar miembro tesista"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={editar} loading={creating}>
              Editar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        {loading ? (
          <SpaceBetween size="xs" direction="horizontal">
            <Spinner /> Cargando información
          </SpaceBetween>
        ) : (
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
