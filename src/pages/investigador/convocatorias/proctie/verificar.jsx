import { Alert, Box, Spinner } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout.jsx";
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

export default function Verificar_requisitos() {
  //  States
  const [verifyLoading, setVerifyLoading] = useState(true);
  const [verifyRes, setVerifyRes] = useState({});

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  //  Functions
  const verifyUser = async () => {
    if (proyecto_id == null) {
      const res = await axiosBase.get(
        "investigador/convocatorias/pro-ctie/verificar"
      );
      const data = res.data;
      setVerifyLoading(false);
      setVerifyRes(data);
      if (data.estado == true) {
        window.location.href = "./pro-ctie/" + data.paso;
      }
    }
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
            type="warning"
          >
            {verifyRes.message.map((item) => {
              return <li>{item}</li>;
            })}
          </Alert>
        </Box>
      ) : (
        <></>
      )}
    </BaseLayout>
  );
}
