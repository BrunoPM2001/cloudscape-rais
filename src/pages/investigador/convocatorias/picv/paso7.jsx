import {
  Alert,
  Button,
  Container,
  SpaceBetween,
} from "@cloudscape-design/components";
import axiosBase from "../../../../api/axios";
import { useState } from "react";

export default function ({ proyecto_id }) {
  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);

  //  Functions
  const previsualizar = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get("investigador/convocatorias/picv/reporte", {
      params: {
        proyecto_id,
      },
      responseType: "blob",
    });
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };

  return (
    <Container>
      <SpaceBetween size="m">
        <Alert
          header="Resumen de proyecto"
          action={
            <Button
              variant="primary"
              onClick={previsualizar}
              loading={loadingReporte}
            >
              Previsualizar
            </Button>
          }
        >
          Si desea puede previsualizar el informe de resumen de su proyecto.
        </Alert>
        <Alert header="Declaración jurada">
          Declara bajo juramento que toda información consignada en este
          formulario es verídica.
        </Alert>
      </SpaceBetween>
    </Container>
  );
}
