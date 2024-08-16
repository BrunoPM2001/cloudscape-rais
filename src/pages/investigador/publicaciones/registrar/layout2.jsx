import { Wizard } from "@cloudscape-design/components";
import Paso2 from "./paso2.jsx";
import BaseLayout from "../../components/baseLayout";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useContext, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider.jsx";

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

export default function Registrar_articulo_2() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [requisitos, setRequisitos] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { publicacion_id, tipo } = queryString.parse(location.search);

  if (publicacion_id == null || tipo == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 1) {
      if (!requisitos) {
        pushNotification(
          "Necesita tener 1 proyecto asociado como mínimo",
          "warning",
          notifications.length + 1
        );
        return;
      }
      const query = queryString.stringify({
        publicacion_id,
        tipo,
      });
      window.location.href = "paso3?" + query;
    } else {
      const query = queryString.stringify({
        publicacion_id,
        tipo,
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
        onCancel={() => {
          window.location.href = "../" + tipo;
        }}
        isLoadingNextStep={loading}
        steps={[
          {
            title: "Descripción de la publicación",
          },
          {
            title: "Resultado de proyecto financiado",
            description: "Proyectos asociados a la publicación",
            content: (
              <Paso2
                publicacion_id={publicacion_id}
                loading={loading}
                setLoading={setLoading}
                setRequisitos={setRequisitos}
              />
            ),
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
