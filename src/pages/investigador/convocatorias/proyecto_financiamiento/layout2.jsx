import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import Paso2 from "./paso2";
import { useRef, useState } from "react";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Registrar",
  },
];

export default function Registrar_proyecto_paso2() {
  //  States
  const [loading, setLoading] = useState(false);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 1) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (!isValid) {
        return;
      }
      const query = queryString.stringify({
        proyecto_id: proyecto_id,
      });
      window.location.href = "paso3?" + query;
    } else {
      const query = queryString.stringify({
        proyecto_id,
      });
      window.location.href = "paso1?" + query;
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
          window.location.href = "../../";
        }}
        steps={[
          {
            title: "Información general",
          },
          {
            title: "Asesor",
            description: "Información del asesor y carta de compromiso",
            content: (
              <Paso2
                ref={(el) => (pasoRefs.current[0] = el)}
                proyecto_id={proyecto_id}
              />
            ),
          },
          {
            title: "Integrantes del proyecto",
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Calendario de actividades",
          },
          {
            title: "Financiamiento del proyecto",
          },
          {
            title: "Instrucciones finales",
          },
        ]}
      />
    </BaseLayout>
  );
}
