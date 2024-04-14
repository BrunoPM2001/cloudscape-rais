import {
  Table,
  Box,
  SpaceBetween,
  Header,
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
          "http://localhost:8000/api/admin/estudios/proyectosGrupo/actividades/" +
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
          id: "actividad",
          header: "Actividad",
          cell: (item) => item.actividad,
        },
        {
          id: "fecha_inicio",
          header: "Fecha de inicio",
          cell: (item) => item.fecha_inicio,
        },
        {
          id: "fecha_fin",
          header: "Fecha de fin",
          cell: (item) => item.fecha_fin,
        },
      ]}
      columnDisplay={[
        { id: "actividad", visible: true },
        { id: "fecha_inicio", visible: true },
        { id: "fecha_fin", visible: true },
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
      header={<Header>Calendario del proyecto</Header>}
    />
  );
};
