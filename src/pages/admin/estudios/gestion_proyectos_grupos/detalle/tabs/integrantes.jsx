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
          "http://localhost:8000/api/admin/estudios/proyectosGrupo/miembros/" +
            id
        );
        if (!res.ok) {
          localStorage.clear();
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
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
        },
        {
          id: "nombre",
          header: "Nombre",
          cell: (item) => item.nombre,
        },
        {
          id: "tipo_investigador",
          header: "Tipo de investigador",
          cell: (item) => item.tipo_investigador,
        },
      ]}
      columnDisplay={[
        { id: "tipo_integrante", visible: true },
        { id: "nombre", visible: true },
        { id: "tipo_investigador", visible: true },
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
      header={<Header>Integrantes del proyecto</Header>}
    />
  );
};
