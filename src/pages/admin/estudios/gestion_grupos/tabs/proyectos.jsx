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
          "http://localhost:8000/api/admin/estudios/grupos/proyectos/257"
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
          id: "periodo",
          header: "Periodo",
          cell: (item) => item.periodo,
        },
        {
          id: "tipo_proyecto",
          header: "Tipo de proyecto",
          cell: (item) => item.tipo_proyecto,
        },
      ]}
      columnDisplay={[
        { id: "titulo", visible: true },
        { id: "periodo", visible: true },
        { id: "tipo_proyecto", visible: true },
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
      header={<Header>Proyectos</Header>}
    />
  );
};
