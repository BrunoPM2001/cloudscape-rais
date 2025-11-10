import {
  Box,
  Spinner,
  Alert,
  Button,
  SpaceBetween,
  Container,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useState, useEffect } from "react";
import axiosBase from "../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Talleres de Investigación y Posgrado",
  },
];

export default function Convocatoria_step0() {
  // States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

    // Obtener `proyecto_id` desde los parámetros de la URL
  const location = useLocation();  // Obtener la ubicación actual
  const { proyecto_id } = queryString.parse(location.search);  // Extraer `proyecto_id`

  // Function to fetch data for eligibility verification
  const getEligibility = async () => {
    setLoading(true);
    try {
      const res = await axiosBase.get(
        "investigador/convocatorias/pinvpos/verificar"
      );
      setData(res.data);
    } catch (error) {
      setData({
        estado: false,
        message: ["Error al verificar la convocatoria"],
      });
    }
    setLoading(false);
  };

  const handleRedirect = () => {
    if (data?.estado) {
      // Verificar si proyecto_id y step son null
      if (!data?.datos?.proyecto_id || !data?.datos?.step) {
        // Redirigir al Paso 1 si proyecto_id o step son null
        console.log("Redirigiendo a Paso 1...");  // Depuración
        window.location.href = `/investigador/convocatoria/pinvpos/paso1?proyecto_id=${data.datos.proyecto_id}`;
      } else {
        // Si ya tenemos proyecto_id y step, redirigimos al paso correspondiente
        const paso = `paso${data.datos.step}`;
        console.log(`Redirigiendo al paso ${paso}`);  // Depuración
        window.location.href = `/investigador/convocatoria/pinvpos/${paso}?proyecto_id=${data.datos.proyecto_id}`;
      }
    }
  };

  useEffect(() => {
    getEligibility();
  }, [proyecto_id]);

    useEffect(() => {
    if (data?.estado && data?.datos?.proyecto_id && data?.datos?.step) {
      handleRedirect();
    }
  }, [data]);


  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Verificación de convocatoria"
      disableOverlap
    >
      {loading ? (
        <Box>
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {data?.estado ? (
            <Container>
              <SpaceBetween size="m">
                <Alert header="¡Estás habilitado!" type="success">
                  No se encuentra vinculado a ningun proyecto Taller 2025.
                </Alert>
                <Button
                  variant="primary"
                  onClick={handleRedirect}
                >
                  Continuar al registro
                </Button>
              </SpaceBetween>
            </Container>
          ) : (
            <Container>
              <SpaceBetween size="m">
                <Alert header="No puedes registrarte" type="warning">
                  {data?.message?.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </Alert>
                <Button
                  variant="normal"
                  onClick={() => (window.location.href = "/investigador")}
                >
                  Volver
                </Button>
              </SpaceBetween>
            </Container>
          )}
        </>
      )}
    </BaseLayout>
  );
}
