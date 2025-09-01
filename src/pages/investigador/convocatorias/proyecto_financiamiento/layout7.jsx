import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import { useState } from "react";
import Paso7 from "./paso7";
import axiosBase from "../../../../api/axios";

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

export default function Registrar_proyecto_paso7() {
  //  States
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");  // Estado para el mensaje
  const [messageType, setMessageType] = useState("");  // Estado para el tipo de mensaje ('success', 'error', etc.)

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      proyecto_id,
    });
    window.location.href = "paso6?" + query;
  };

    // Manejo del submit
  const handleSubmit = async () => {
    setLoading(true);
    try {

      if (!proyecto_id) {
        console.error("El proyecto_id no está presente");
        return;
      }

      const res = await axiosBase.put("investigador/convocatorias/pro-ctie/enviarProyecto", {
        proyecto_id,
      });

      setLoading(false);
      
      if (res.data.message === 'info' && res.data.detail === 'Proyecto registrado exitosamente') {
        setMessage("Proyecto registrado exitosamente");
        setMessageType("success");
                // Redirigir al usuario a la página principal (o a la página deseada)
        setTimeout(() => {
          window.location.href = "/investigador";  // Redirige a la página principal
        }, 2000);  // Espera 2 segundos para mostrar el mensaje

      } else {
        setMessage(res.data.detail || "Hubo un problema al enviar el proyecto.");
        setMessageType("error");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Hubo un error al enviar el proyecto.");
      setMessageType("error");
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público en general."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={6}
        onCancel={() => {
          window.location.href = "../../";
        }}
        onSubmit={handleSubmit}
        isLoadingNextStep={loading}
        submitButtonText="Enviar proyecto"
        steps={[
          {
            title: "Información general",
          },
          {
            title: "Asesor",
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
            description: "Envío de proyecto para evaluación",
            content: (
              <Paso7
                proyecto_id={proyecto_id}
                loading={loading}
                setLoading={setLoading}
                message={message} 
                messageType={messageType}
              />
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
