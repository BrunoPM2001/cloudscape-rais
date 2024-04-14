import {
  Table,
  Box,
  SpaceBetween,
  Header,
  ColumnLayout,
  Spinner,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  //  State
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/admin/estudios/proyectosGrupo/presupuesto/" +
            id
        );
        if (!res.ok) {
          setItems([]);
          setLoading(!loading);
          throw new Error("Error in fetch");
        } else {
          const data = await res.json();
          setItems(data.data);
          setLoading(!loading);
        }
      } catch (error) {
        setItems([]);
        setLoading(!loading);
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Table
      columnDefinitions={[
        {
          id: "tipo",
          header: "Tipo",
          cell: (item) => item.tipo,
        },
        {
          id: "partida",
          header: "Partida",
          cell: (item) => item.partida,
        },
        {
          id: "justificacion",
          header: "Justificación",
          cell: (item) => item.justificacion,
        },
        {
          id: "monto",
          header: "Monto",
          cell: (item) => item.monto,
        },
      ]}
      columnDisplay={[
        { id: "tipo", visible: true },
        { id: "partida", visible: true },
        { id: "justificacion", visible: true },
        { id: "monto", visible: true },
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Cargando datos"
      loading={loading}
      resizableColumns
      trackBy="id"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      footer={
        <ColumnLayout columns={2}>
          <SpaceBetween direction="vertical" size="s">
            <div>
              <Box variant="awsui-key-label">Bienes</Box>
              {loading ? <Spinner /> : <div></div>}
            </div>
          </SpaceBetween>
          <SpaceBetween direction="vertical" size="s">
            <div>
              <Box variant="awsui-key-label">Servicios</Box>
              {loading ? <Spinner /> : <div></div>}
            </div>
          </SpaceBetween>
        </ColumnLayout>
      }
      header={<Header>Presupuesto del proyecto</Header>}
    />
  );
};
