import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/estudios/convocatorias/verCriteriosEvaluacion/" +
          id,
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (!res.ok) {
        setData([]);
        setLoading(false);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setData(data.evaluacion[0]);
        setLoading(false);
      }
    } catch (error) {
      setData([]);
      setLoading(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container header={<Header variant="h2">Detalles de la evaluación</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Tipo de proyecto</Box>
          {loading ? <Spinner /> : <div>{data.tipo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Periodo</Box>
          {loading ? <Spinner /> : <div>{data.periodo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Estado</Box>
          {loading ? (
            <Spinner />
          ) : (
            <StatusIndicator
              type={data.estado == "APROBADO" ? "success" : "error"}
            >
              {data.estado}
            </StatusIndicator>
          )}
        </div>
      </ColumnLayout>
    </Container>
  );
};
