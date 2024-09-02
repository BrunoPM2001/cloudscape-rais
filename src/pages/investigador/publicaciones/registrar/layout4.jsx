import {
  Alert,
  Box,
  SpaceBetween,
  Wizard,
} from "@cloudscape-design/components";
import Paso4 from "./paso4.jsx";
import BaseLayout from "../../components/baseLayout";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";
import axiosBase from "../../../../api/axios.js";

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
  //  States
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  //  Url
  const location = useLocation();
  const { publicacion_id, tipo } = queryString.parse(location.search);

  //  Ref
  const pasoRefs = useRef([]);

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
      case 2:
        window.location.href = "paso3?" + query;
        break;
      default:
        console.error("Index error");
        break;
    }
  };

  const verificarObs = async () => {
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/observacion",
      {
        params: {
          id: publicacion_id,
        },
      }
    );
    const data = res.data;
    setData(data);
  };

  useEffect(() => {
    if (publicacion_id != null) {
      verificarObs();
    }
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        {data.estado == 2 && (
          <Box
            margin={{
              top: "s",
            }}
          >
            <Alert header="Observación" type="warning">
              {data.observaciones_usuario}
            </Alert>
          </Box>
        )}
        <Wizard
          onNavigate={({ detail }) => handleNavigate(detail)}
          activeStepIndex={3}
          onCancel={() => {
            window.location.href = "../" + tipo;
          }}
          onSubmit={async () => {
            setLoading(true);
            const res = await pasoRefs.current[0]?.registrar();
            setLoading(false);
            if (res) {
              setTimeout(() => {
                window.location.href = "/investigador";
              }, 3000);
            }
          }}
          isLoadingNextStep={loading}
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
              content: (
                <Paso4
                  ref={(el) => (pasoRefs.current[0] = el)}
                  publicacion_id={publicacion_id}
                  tipo={tipo}
                />
              ),
            },
          ]}
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
