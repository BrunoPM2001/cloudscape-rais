import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import ModalAprobarCriterios from "../components/modalAprobarCriterios";
import { useState } from "react";

export default ({ data, loading, reload }) => {
  //  State
  const [visible, setVisible] = useState(false);

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            !loading &&
            data.estado != "APROBADO" && (
              <Button onClick={() => setVisible(true)} variant="primary">
                Aprobar criterios
              </Button>
            )
          }
        >
          Detalles de la evaluación
        </Header>
      }
    >
      <ColumnLayout columns={3} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Tipo de proyecto</Box>
          {loading ? <Spinner /> : <div>{data.tipo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Periodo</Box>
          {loading ? <Spinner /> : <div>{data.periodo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Estado</Box>
          {loading ? (
            <Spinner />
          ) : (
            <StatusIndicator
              type={
                data.estado == "APROBADO"
                  ? "success"
                  : data.estado == "EN PROCESO"
                  ? "in-progress"
                  : "error"
              }
            >
              {data.estado}
            </StatusIndicator>
          )}
        </div>
      </ColumnLayout>
      {visible && (
        <ModalAprobarCriterios
          close={() => setVisible(false)}
          id={data.id}
          reload={reload}
        />
      )}
    </Container>
  );
};
