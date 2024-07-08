import { Wizard } from "@cloudscape-design/components";
import { useState } from "react";
import BaseLayout from "../../../components/baseLayout.jsx";
import Paso5 from "./paso5.jsx";

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

export default function Solicitar_grupo5() {
  //  States
  const [loading, setLoading] = useState(true);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 1) {
      window.location.href = "paso" + (detail.requestedStepIndex + 1);
    } else {
      window.location.href = "paso1";
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
        activeStepIndex={4}
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
          },
          {
            title: "Información del grupo",
          },
          {
            title: "Listado de proyectos",
            description: "Proyectos de los miembros titulares del grupo",
            content: <Paso5 loading={loading} setLoading={setLoading} />,
          },
          {
            title: "Información del grupo",
          },
        ]}
      />
    </BaseLayout>
  );
}
