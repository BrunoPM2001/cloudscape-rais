import {
  Alert,
  Button,
  Container,
  SpaceBetween,
} from "@cloudscape-design/components";
import axiosBase from "../../../../api/axios";
import queryString from "query-string";

export default function ({ proyecto_id }) {
  //  Functions
  const previsualizar = async () => {
    const query = queryString.stringify({
      proyecto_id,
    });
    const res = await axiosBase.get(
      "investigador/convocatorias/picv/reporte?" + query,
      {
        responseType: "blob",
      }
    );
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <Container>
      <SpaceBetween size="m">
        <Alert
          header="Resumen de proyecto"
          action={
            <Button variant="primary" onClick={previsualizar}>
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
