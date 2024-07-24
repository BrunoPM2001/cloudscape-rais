import {
  Modal,
  Box,
  Button,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import axiosBase from "../../../../api/axios";
import DatosSolicitud from "./datosSolicitud";
import ActividadesSolicitud from "./actividadesSolicitud";
import Declaracion from "./declaracion";

export default ({ data, close, reload, actividades }) => {
  //  States
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  //  Functions
  const presentar = async () => {
    setLoading(true);
    await axiosBase.post("investigador/perfil/solicitarCDI");
    setLoading(false);
    reload();
    close();
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <Button
            variant="primary"
            onClick={presentar}
            loading={loading}
            disabled={!check}
          >
            Presentar solicitud
          </Button>
        </Box>
      }
      header="Solicito ser designado Docente Investigador"
    >
      <SpaceBetween size="m">
        <DatosSolicitud data={data} />
        <ActividadesSolicitud data={actividades} antiguo={data.antiguedad} />
        <Declaracion data={data} check={check} setCheck={setCheck} />
      </SpaceBetween>
    </Modal>
  );
};
