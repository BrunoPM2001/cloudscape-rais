import { Wizard } from "@cloudscape-design/components";
import Paso4 from "./paso4.jsx";
import BaseLayout from "../../components/baseLayout";
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
    text: "Registrar",
  },
];

export default function Registrar_articulo_4() {
  //  Url
  const location = useLocation();
  const { publicacion_id, tipo } = queryString.parse(location.search);

  if (publicacion_id == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      publicacion_id,
      tipo,
    });
    switch (detail.requestedStepIndex) {
      case 0:
        window.location.href = "paso1?" + query;
        break;
      case 1:
        window.location.href = "paso2?" + query;
        break;
      case 2:
        window.location.href = "paso3?" + query;
        break;
      default:
        console.error("Index error");
        break;
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
        activeStepIndex={3}
        onCancel={() => {
          window.location.href = "../../articulos";
        }}
        submitButtonText="Enviar"
        steps={[
          {
            title: "Descripción de la publicación",
          },
          {
            title: "Resultado de proyecto financiado",
          },
          {
            title: "Autores de la publicación",
          },
          {
            title: "Envío de publicación",
            description: "Opciones finales",
            content: <Paso4 />,
          },
        ]}
      />
    </BaseLayout>
  );
}
