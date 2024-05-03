import {
  Box,
  ColumnLayout,
  Container,
  Grid,
  Header,
  Link,
  SpaceBetween,
  Spinner,
  StatusIndicator,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";

export default ({ data, loading, id }) => {
  //  States
  const [items, setItems] = useState([]);
  const [loadItems, setLoadItems] = useState(true);

  const getData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/admin/estudios/monitoreo/metasCumplidas/" +
          id
      );
      if (!res.ok) {
        localStorage.clear();
        setItems([]);
        setLoadItems(false);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setItems(data.data);
        setLoadItems(false);
      }
    } catch (error) {
      setItems([]);
      setLoadItems(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      gridDefinition={[
        {
          colspan: {
            l: 6,
            m: 6,
            s: 6,
            xs: 12,
          },
        },
        {
          colspan: {
            l: 6,
            m: 6,
            s: 6,
            xs: 12,
          },
        },
      ]}
    >
      <Container
        header={<Header variant="h2">Detalles del proyecto</Header>}
        fitHeight
      >
        <ColumnLayout columns={2} variant="text-grid">
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Código</Box>
              {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Título</Box>
              {loading ? <Spinner /> : <div>{data.titulo}</div>}
            </div>
          </SpaceBetween>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Tipo</Box>
              {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Periodo</Box>
              <div>{data.periodo}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Facultad</Box>
              {loading ? <Spinner /> : <div>{data.facultad}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Estado</Box>
              {loading ? (
                <Spinner />
              ) : (
                <StatusIndicator
                  type={
                    data.estado == -1
                      ? "error"
                      : data.estado == 1
                      ? "info"
                      : data.estado == 2
                      ? "stopped"
                      : data.estado == 4
                      ? "success"
                      : data.estado == 5
                      ? "pending"
                      : data.estado == 6
                      ? "in-progress"
                      : "error"
                  }
                >
                  {data.estado == -1
                    ? "Eliminado"
                    : data.estado == 1
                    ? "Reconocido"
                    : data.estado == 2
                    ? "Observado"
                    : data.estado == 4
                    ? "Registrado"
                    : data.estado == 5
                    ? "Enviado"
                    : data.estado == 6
                    ? "En proceso"
                    : "error"}
                </StatusIndicator>
              )}
            </div>
          </SpaceBetween>
        </ColumnLayout>
      </Container>
      <Container
        header={<Header variant="h2">Requisitos cumplidos</Header>}
        fitHeight
      >
        <Table
          variant="embedded"
          columnDefinitions={[
            {
              id: "tipo_publicacion",
              header: "Tipo de publicación",
              cell: (item) => <Link href="#">{item.tipo_publicacion}</Link>,
            },
            {
              id: "cantidad_requerida",
              header: "Cant. requerida",
              cell: (item) => item.cantidad_requerida,
            },
            {
              id: "cantidad_completada",
              header: "Cant. completada",
              cell: (item) => item.cantidad_completada,
            },
          ]}
          columnDisplay={[
            { id: "tipo_publicacion", visible: true },
            { id: "cantidad_requerida", visible: true },
            { id: "cantidad_completada", visible: true },
          ]}
          enableKeyboardNavigation
          items={items}
          loadingText="Cargando datos"
          loading={loadItems}
          resizableColumns
          trackBy="id"
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
        />
      </Container>
    </Grid>
  );
};
