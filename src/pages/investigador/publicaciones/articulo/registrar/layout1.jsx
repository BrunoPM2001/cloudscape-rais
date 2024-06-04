import { Wizard } from "@cloudscape-design/components";
import { useRef, useState } from "react";
import Paso1 from "./paso1.jsx";
import BaseLayout from "../../../components/baseLayout";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

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

export default function Registrar_articulo_1() {
  //  States
  const [loading, setLoading] = useState(false);

  //  Url
  const location = useLocation();
  const { publicacion_id } = queryString.parse(location.search);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (!isValid) {
        return;
      }
      const query = queryString.stringify({
        publicacion_id,
      });
      window.location.href = "paso2?" + query;
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      withoutContentLayout
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={0}
        isLoadingNextStep={loading}
        onCancel={() => {
          window.location.href = "../../articulos";
        }}
        steps={[
          {
            title: "Descripción de la publicación",
            description: "Metadata de la publicación",
            content: <Paso1 ref={(el) => (pasoRefs.current[0] = el)} />,
          },
          {
            title: "Resultado de proyecto financiado",
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
