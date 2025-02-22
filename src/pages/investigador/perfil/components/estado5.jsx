import { Button, Header, SpaceBetween } from "@cloudscape-design/components";
import Constancia from "./constancia";
import Solicitar from "./solicitar";
import ModalSolicitud from "./modalSolicitud";
import { useState } from "react";

export default ({ data, reload }) => {
  //  States
  const [modal, setModal] = useState("");

  return (
    <SpaceBetween size="m">
      <Constancia data={data.constancia} />
      <SpaceBetween size="xs">
        <Header
          variant="h3"
          description="Puede solicitar una nueva constancia a 2 meses del vencimiento de su constancia vigente."
          actions={
            <Button variant="primary" onClick={() => setModal("solicitar")}>
              Solicitar renovación
            </Button>
          }
        >
          Solicitar CDI
        </Header>
        <Solicitar data={data.solicitar} />
      </SpaceBetween>
      {modal == "solicitar" && (
        <ModalSolicitud
          data={data.solicitar.rrhh}
          actividades={data.solicitar.actividades_extra}
          close={() => setModal("")}
          reload={reload}
        />
      )}
    </SpaceBetween>
  );
};
