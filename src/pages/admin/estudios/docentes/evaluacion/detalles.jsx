import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalObservaciones from "./components/modalObservaciones";

export default ({ id, data, loading }) => {
  //  States
  const [type, setType] = useState("");

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button onClick={() => setType("obs")}>Observaciones</Button>
              <Button>Editar perfil</Button>
            </SpaceBetween>
          }
        >
          Detalles de la solicitud
        </Header>
      }
    >
      <ColumnLayout columns={4} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Apellidos y nombres</Box>
            {loading ? <Spinner /> : <div>{data.nombres}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">N° documento</Box>
            {loading ? <Spinner /> : <div>{data.doc_numero}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de ingreso UNMSM</Box>
            {loading ? <Spinner /> : <div>{data.fecha}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Email</Box>
            {loading ? <Spinner /> : <div>{data.email3}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator
                type={
                  data.estado == "No aprobado"
                    ? "error"
                    : data.estado == "Observado"
                    ? "pending"
                    : data.estado == "En trámite"
                    ? "in-progress"
                    : data.estado == "Enviado"
                    ? "info"
                    : data.estado == "Aprobado"
                    ? "success"
                    : data.estado == "Pendiente"
                    ? "pending"
                    : "error"
                }
              >
                {data.estado}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">CTI Vitae</Box>
            {loading ? <Spinner /> : <div>{data.cti_vitae}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Renacyt</Box>
            {loading ? <Spinner /> : <div>{data.renacyt}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Renacyt nivel</Box>
            {loading ? <Spinner /> : <div>{data.renacyt_nivel}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Código orcid</Box>
            {loading ? <Spinner /> : <div>{data.orcid}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Google scholar</Box>
            {loading ? <Spinner /> : <div>{data.google_scholar}</div>}
          </div>

          <div>
            <Box variant="awsui-key-label">Fecha de envío de la solicitud</Box>
            {loading ? <Spinner /> : <div>{data.created_at}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Tipo de docente</Box>
            {loading ? <Spinner /> : <div>{data.tipo_docente}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Categoría de docente</Box>
            {loading ? <Spinner /> : <div>{data.docente_categoria}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Clase</Box>
            {loading ? <Spinner /> : <div>{data.clase}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Horas</Box>
            {loading ? <Spinner /> : <div>{data.horas}</div>}
          </div>
        </SpaceBetween>
      </ColumnLayout>
      {type == "obs" ? (
        <ModalObservaciones
          id={id}
          close={() => setType("")}
          enabled={data?.estado}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};
