import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
  Spinner,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";

export default function () {
  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Functions
  const getData = async () => {
    try {
      setLoading("loading");
      const res = await fetch(
        "http://localhost:8000/api/investigador/dashboard/metricas",
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (res.status == 401) {
        localStorage.removeItem("Auth");
        setLoading(false);
      } else {
        if (!res.ok) {
          setLoading("error");
          throw new Error("Error in fetch");
        } else {
          const data = await res.json();
          setData(data);
          setLoading(false);
        }
      }
    } catch (error) {
      setItems([]);
      setLoading(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de registros de algunas tablas"
        >
          Cifras generales
        </Header>
      }
      fitHeight={true}
    >
      <ColumnLayout columns={4} minColumnWidth={170}>
        <div>
          <Box variant="awsui-key-label">Grupos</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.grupos}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.proyectos}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Publicaciones</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.publicaciones}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Puntaje global</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.puntaje}
            </Link>
          )}
        </div>
      </ColumnLayout>
    </Container>
  );
}
