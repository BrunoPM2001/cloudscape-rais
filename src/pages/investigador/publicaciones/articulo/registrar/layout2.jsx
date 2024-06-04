import { Wizard } from "@cloudscape-design/components";
import { useRef } from "react";
import Paso2 from "./paso2.jsx";
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

export default function Registrar_articulo_2() {
  //  Url
  const location = useLocation();
  const { publicacion_id } = queryString.parse(location.search);

  if (publicacion_id == null) {
    window.location.href = "paso1";
  }

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      const query = queryString.stringify({
        publicacion_id,
      });
      window.location.href = "paso3?" + query;
    } else {
      const query = queryString.stringify({
        publicacion_id,
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
      withoutContentLayout
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={1}
        onCancel={() => {
          window.location.href = "../../articulos";
        }}
        steps={[
          {
            title: "Descripción de la publicación",
          },
          {
            title: "Resultado de proyecto financiado",
            description: "Proyectos asociados a la publicación",
            content: <Paso2 />,
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
