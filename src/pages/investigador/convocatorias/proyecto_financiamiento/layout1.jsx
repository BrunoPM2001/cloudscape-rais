import { Alert, Box, Spinner, Wizard } from "@cloudscape-design/components";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout.jsx";
import Paso1 from "./paso1.jsx";
import axiosBase from "../../../../api/axios.js";

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

export default function Registrar_proyecto_paso1() {
  //  States
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(true);
  const [verifyRes, setVerifyRes] = useState({});

  //  Url
  const location = useLocation();
  const { proyecto_id, tipo } = queryString.parse(location.search);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      setLoading(true);
      const { isValid, res_proyecto_id } =
        await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (!isValid) {
        return;
      }
      const query = queryString.stringify({
        proyecto_id: res_proyecto_id == null ? proyecto_id : res_proyecto_id,
      });
      window.location.href = "paso2?" + query;
    }
  };

  const verifyUser = async () => {
    const res = await axiosBase.get("investigador/convocatorias/verificar");
    const data = res.data;
    setVerifyLoading(false);
    setVerifyRes(data);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      withoutContentLayout
    >
      {verifyLoading ? (
        <Box margin="m">
          <Alert header="Verificando intento de registro en la convocatoria">
            <Spinner />
          </Alert>
        </Box>
      ) : !verifyRes.estado ? (
        <Box margin="m">
          <Alert
            header="Solicitud de registro a esta convocatoria no procede"
            type="error"
          >
            {verifyRes.message.map((item) => {
              return <li>{item}</li>;
            })}
          </Alert>
        </Box>
      ) : (
        <Wizard
          onNavigate={({ detail }) => handleNavigate(detail)}
          activeStepIndex={0}
          isLoadingNextStep={loading}
          onCancel={() => {
            window.location.href = "../" + tipo;
          }}
          steps={[
            {
              title: "Información general",
              description: "Detalles básicos e iniciales del proyecto",
              content: (
                <Paso1
                  ref={(el) => (pasoRefs.current[0] = el)}
                  proyecto_id={proyecto_id}
                />
              ),
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
            },
          ]}
        />
      )}
    </BaseLayout>
  );
}
