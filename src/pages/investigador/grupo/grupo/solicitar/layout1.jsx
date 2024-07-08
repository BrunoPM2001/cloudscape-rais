import { Wizard } from "@cloudscape-design/components";
import { useRef, useState } from "react";
import BaseLayout from "../../../components/baseLayout.jsx";
import Paso1 from "./paso1.jsx";

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

export default function Solicitar_grupo1() {
  //  States
  const [loading, setLoading] = useState(false);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (isValid) {
        window.location.href = "paso2";
      }
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
        activeStepIndex={0}
        isLoadingNextStep={loading}
        onCancel={() => {
          window.location.href = "/investigador";
        }}
        steps={[
          {
            title: "Nombre del grupo",
            description: "Nombre y nombre corto del GI",
            content: <Paso1 ref={(el) => (pasoRefs.current[0] = el)} />,
          },
          {
            title: "Coordinador del grupo",
          },
          {
            title: "Autores de la publicación",
          },
          {
            title: "Envío de publicación",
          },
        ]}
      />
    </BaseLayout>
  );
}
