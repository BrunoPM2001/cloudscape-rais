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
        onCancel={() => {
          window.location.href = "../../";
        }}
        onSubmit={async () => {
          setLoading(true);
          await axiosBase.put("investigador/convocatorias/picv/enviarProyecto", {
            proyecto_id,
          });
          setLoading(false);
          window.location.href = "/investigador/convocatoria/picv";
        }}
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
              />
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
