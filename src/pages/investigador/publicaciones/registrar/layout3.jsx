import { Wizard } from "@cloudscape-design/components";
import Paso3 from "./paso3.jsx";
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

export default function Registrar_articulo_3() {
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
      case 3:
        if (!requisitos) {
          pushNotification(
            "Necesita completar el nombre de autor suyo, filiación san marcos y filiación única",
            "warning",
            notifications.length + 1
          );
        } else {
          window.location.href = "paso4?" + query;
        }
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
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={2}
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
          },
          {
            title: "Autores de la publicación",
            description: "Listado de autores de esta publicación",
            content: (
              <Paso3
                publicacion_id={publicacion_id}
                tipo={tipo}
                loading={loading}
                setLoading={setLoading}
                setRequisitos={setRequisitos}
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
