import { Wizard } from "@cloudscape-design/components";
import { useRef, useState } from "react";
import BaseLayout from "../../../components/baseLayout.jsx";
import Paso3 from "./paso3.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Solicitar",
  },
];

export default function Solicitar_grupo2() {
  //  States
  const [requisitos, setRequisitos] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 2) {
      if (!requisitos) {
        pushNotification(
          "Necesita tener 2 integrantes de tipo estudiante al menos",
          "warning",
          notifications.length + 1
        );
        return;
      }
      if (isValid) {
        window.location.href = "paso" + (detail.requestedStepIndex + 1);
      }
    } else {
      window.location.href = "paso" + detail.requestedStepIndex;
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={2}
        isLoadingNextStep={loading}
        onCancel={() => {
          window.location.href = "/investigador";
        }}
        steps={[
          {
            title: "Nombre del grupo",
          },
          {
            title: "Coordinador del grupo",
          },
          {
            title: "Integrantes del grupo",
            description: "Miembros del grupo",
            content: (
              <Paso3
                requisitos={requisitos}
                setRequisitos={setRequisitos}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Envío de publicación",
          },
        ]}
      />
    </BaseLayout>
  );
}
