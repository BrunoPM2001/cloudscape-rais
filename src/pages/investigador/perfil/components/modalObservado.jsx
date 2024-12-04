import { Modal, Box, Button, Header } from "@cloudscape-design/components";
import { useState } from "react";
import axiosBase from "../../../../api/axios";
import ActividadesObs from "./actividadesObs";

export default ({ id, antiguo, close, reload }) => {
  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const presentar = async () => {
    setLoading(true);
    await axiosBase.post("investigador/perfil/actualizarSolicitud", {
      id,
    });
    setLoading(false);
    reload();
    close();
  };

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header={
        <Header
          description="Al actualizar su solicitud, los datos en los requisitos establecidos
          se actualizarán, es decir, reemplazarán a los de su primera solicitud"
        >
          Solicito ser designado Docente Investigador
        </Header>
      }
      footer={
        <Box float="right">
          <Button variant="primary" onClick={presentar} loading={loading}>
            Presentar solicitud
          </Button>
        </Box>
      }
    >
      <ActividadesObs id={id} antiguo={antiguo} />
    </Modal>
  );
};
