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
import axiosBase from "../../../../../api/axios";

export default () => {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/verCriteriosEvaluacion/" + id
    );
    const data = await res.data;
    setData(data.evaluacion[0]);
    setLoading(false);
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
