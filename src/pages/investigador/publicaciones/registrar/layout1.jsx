import {
  Alert,
  Box,
  SpaceBetween,
  Wizard,
} from "@cloudscape-design/components";
import { useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/baseLayout";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Articulo from "./paso1/articulo.jsx";
import Libro from "./paso1/libro.jsx";
import Capitulo_libro from "./paso1/capitulo_libro.jsx";
import Tesis_propia from "./paso1/tesis_propia.jsx";
import Evento from "./paso1/evento.jsx";
import Tesis_asesoria from "./paso1/tesis_asesoria.jsx";
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

export default function Registrar_articulo_1() {
  //  States
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  //  Url
  const location = useLocation();
  const { publicacion_id, tipo } = queryString.parse(location.search);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      setLoading(true);
      const { isValid, res_publicacion_id } =
        await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (!isValid) {
        return;
      }
      const query = queryString.stringify({
        publicacion_id:
          res_publicacion_id == null ? publicacion_id : res_publicacion_id,
        tipo,
      });
      window.location.href = "paso2?" + query;
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
          activeStepIndex={0}
          isLoadingNextStep={loading}
          onCancel={() => {
            window.location.href = "../" + tipo;
          }}
          steps={[
            {
              title: "Descripción de la publicación",
              description: "Metadata de la publicación",
              content: (
                <>
                  {tipo == "articulo" ? (
                    <Articulo
                      ref={(el) => (pasoRefs.current[0] = el)}
                      publicacion_id={publicacion_id}
                    />
                  ) : tipo == "libro" ? (
                    <Libro
                      ref={(el) => (pasoRefs.current[0] = el)}
                      publicacion_id={publicacion_id}
                    />
                  ) : tipo == "capitulo_libro" ? (
                    <Capitulo_libro
                      ref={(el) => (pasoRefs.current[0] = el)}
                      publicacion_id={publicacion_id}
                    />
                  ) : tipo == "tesis_propia" ? (
                    <Tesis_propia
                      ref={(el) => (pasoRefs.current[0] = el)}
                      publicacion_id={publicacion_id}
                    />
                  ) : tipo == "tesis_asesoria" ? (
                    <Tesis_asesoria
                      ref={(el) => (pasoRefs.current[0] = el)}
                      publicacion_id={publicacion_id}
                    />
                  ) : tipo == "evento" ? (
                    <Evento
                      ref={(el) => (pasoRefs.current[0] = el)}
                      publicacion_id={publicacion_id}
                    />
                  ) : (
                    <div></div>
                  )}
                </>
              ),
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
      </SpaceBetween>
    </BaseLayout>
  );
}
