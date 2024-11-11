import {
  Box,
  Button,
  FormField,
  Modal,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useContext, useState } from "react";

export default ({ close, grupo_id, initValue, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  //  Hooks
  const { formValues, handleChange } = useFormValidation(
    { infraestructura_ambientes: initValue },
    {}
  );

  //  Functions
  const update = async () => {
    setLoadingUpdate(true);
    const res = await axiosBase.put("admin/estudios/grupos/updateAmbientes", {
      ...formValues,
      grupo_id,
    });
    const data = res.data;
    setLoadingUpdate(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    close();
    reload();
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Editar ambientes físicos"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={update} loading={loadingUpdate}>
              Actualizar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormField label="Ambientes físicos" stretch>
        <Textarea
          placeholder="Describa los ambientes físicos con los que cuenta el grupo"
          value={formValues.infraestructura_ambientes}
          onChange={({ detail }) =>
            handleChange("infraestructura_ambientes", detail.value)
          }
        />
      </FormField>
    </Modal>
  );
};
