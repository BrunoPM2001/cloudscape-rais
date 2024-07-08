import { Wizard } from "@cloudscape-design/components";
import { useRef, useState } from "react";
import BaseLayout from "../../../components/baseLayout.jsx";
import Paso2 from "./paso2.jsx";

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
  const [loading, setLoading] = useState(false);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 1) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (isValid) {
        window.location.href = "paso3";
      }
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
        activeStepIndex={1}
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
            description: "Datos del coordinador",
            content: <Paso2 ref={(el) => (pasoRefs.current[0] = el)} />,
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
