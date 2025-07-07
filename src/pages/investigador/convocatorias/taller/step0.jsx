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

  // Function to fetch data for eligibility verification
  const getEligibility = async () => {
    setLoading(true);
    try {
      const res = await axiosBase.get("investigador/convocatorias/pinvpos/verificar");
      setData(res.data);
    } catch (error) {
      setData({ estado: false, message: ["Error al verificar la convocatoria"] });
    }
    setLoading(false);
  };

  useEffect(() => {
    getEligibility();
  }, []);

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
                  Puedes continuar con la inscripción en la convocatoria.
                </Alert>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = "pinvpos/paso1"}
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
                  onClick={() => window.location.href = "/investigador"}
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
