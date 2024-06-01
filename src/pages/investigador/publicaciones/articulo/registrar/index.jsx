import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Wizard,
} from "@cloudscape-design/components";
import { useState } from "react";
import Paso1 from "./paso1.jsx";
import BaseLayout from "../../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Artículos en revistas de investigación",
  },
  {
    text: "Registrar",
  },
];

export default function Registrar_articulo() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Deudas de proyectos:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      withoutContentLayout
    >
      <Wizard
        onNavigate={({ detail }) => {
          setActiveStepIndex(detail.requestedStepIndex);
        }}
        activeStepIndex={activeStepIndex}
        steps={[
          {
            title: "Descripción de la publicación",
            description: "Metadata de la publicación",
            content: <Paso1 index={activeStepIndex} />,
          },
          {
            title: "Resultado de proyecto financiado",
            content: <Container>{/* Tabla */}</Container>,
          },
          {
            title: "Autores de la publicación",
            content: (
              <Container>{/* Tabla de autores de la publicación */}</Container>
            ),
          },
          {
            title: "Resumen",
            content: (
              <SpaceBetween size="xs">
                <Header
                  variant="h3"
                  actions={
                    <Button onClick={() => setActiveStepIndex(0)}>
                      Editar
                    </Button>
                  }
                >
                  Step 1: Instance type
                </Header>
                <Container
                  header={<Header variant="h2">Container title</Header>}
                >
                  <ColumnLayout columns={2} variant="text-grid">
                    <div>
                      <Box variant="awsui-key-label">First field</Box>
                      <div>Value</div>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Second Field</Box>
                      <div>Value</div>
                    </div>
                  </ColumnLayout>
                </Container>
              </SpaceBetween>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
