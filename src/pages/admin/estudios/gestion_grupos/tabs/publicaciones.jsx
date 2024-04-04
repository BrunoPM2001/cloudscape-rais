import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";

export default () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  //  Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/admin/estudios/grupos/publicaciones/257"
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
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Table
      columnDefinitions={[
        {
          id: "titulo",
          header: "Título",
          cell: (item) => <Link href="#">{item.titulo}</Link>,
        },
        {
          id: "fecha_publicacion",
          header: "Fecha de publicación",
          cell: (item) => item.fecha_publicacion,
        },
        {
          id: "tipo",
          header: "Tipo",
          cell: (item) => item.tipo,
        },
      ]}
      columnDisplay={[
        { id: "titulo", visible: true },
        { id: "fecha_publicacion", visible: true },
        { id: "tipo", visible: true },
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
      header={<Header>Publicaciones</Header>}
    />
  );
};
