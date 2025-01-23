import {
  Alert,
  Box,
  Button,
  Checkbox,
  ColumnLayout,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

export default ({ close, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        check: item.autorizacion_grupo == "Sí" ? true : false,
      },
      {}
    );

  //  Functions
  const guardar = async () => {
    setLoading(true);
    const res = await axiosBase.put("investigador/grupo/autorizarProyecto", {
      id: item.id,
      autorizacion_grupo: formValues.check,
    });
    const data = res.data;
    setLoading(false);
    reload();
    close();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={guardar}>
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Autorizar proyecto"
    >
      <SpaceBetween size="m">
        <div>
          <Box variant="awsui-key-label">Título del proyecto</Box>
          <div>{item.titulo}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Responsable</Box>
          <div>{item.responsable}</div>
        </div>
        <Alert header="Autorización">
          <Checkbox
            checked={formValues.check}
            description="Al marcar esto autoriza al responsable del proyecto el envío del mismo"
            onChange={({ detail }) => handleChange("check", detail.checked)}
          >
            Autorizar
          </Checkbox>
        </Alert>
      </SpaceBetween>
    </Modal>
  );
};
