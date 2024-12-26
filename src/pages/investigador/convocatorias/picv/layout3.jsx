import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import Paso3 from "./paso3";
import { useContext, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";

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

export default function Registrar_proyecto_paso3() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [requisitos, setRequisitos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [maximo , setMaximo] = useState(false);
  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 2) {
      if (!requisitos) {
        pushNotification(
          "Necesita tener 3 integrantes de tipo Estudiante al menos",
          "warning",
          notifications.length + 1
        );
     
        return;
      }
      if (!maximo) {
        pushNotification(
          "No puede tener más de 5 integrantes de tipo Estudiante.",
          "warning",
          notifications.length + 1
        );
        return;
      }
      const query = queryString.stringify({
        proyecto_id: proyecto_id,
      });
      window.location.href = "paso4?" + query;
    } else {
      const query = queryString.stringify({
        proyecto_id,
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
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={2}
        onCancel={() => {
          window.location.href = "../../";
        }}
        isLoadingNextStep={loading}
        steps={[
          {
            title: "Información general",
          },
          {
            title: "Asesor",
          },
          {
            title: "Integrantes del proyecto",
            description: "Listado de miembros",
            content: (
              <Paso3
                proyecto_id={proyecto_id}
                setRequisitos={setRequisitos}
                setMaximo={setMaximo}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Calendario de actividades",
          },
          // {
          //   title: "Financiamiento del proyecto",
          // },
          {
            title: "Instrucciones finales",
          },
        ]}
      />
    </BaseLayout>
  );
}
