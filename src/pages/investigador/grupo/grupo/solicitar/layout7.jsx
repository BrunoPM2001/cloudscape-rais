import { Wizard } from "@cloudscape-design/components";
import { useRef, useState } from "react";
import BaseLayout from "../../../components/baseLayout.jsx";
import Paso7 from "./paso7.jsx";

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

export default function Solicitar_grupo7() {
  //  States
  const [loading, setLoading] = useState(true);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 1) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (isValid) {
        window.location.href = "paso" + (detail.requestedStepIndex + 1);
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
        activeStepIndex={6}
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
          },
          {
            title: "Listado de publicaciones",
          },
          {
            title: "Infraestructura",
            description: "Ambientes físicos y laboratorios del grupo",
            content: (
              <Paso7
                ref={(el) => (pasoRefs.current[0] = el)}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Listado de publicaciones",
          },
        ]}
      />
    </BaseLayout>
  );
}
