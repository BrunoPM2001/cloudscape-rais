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
          "http://localhost:8000/api/admin/estudios/grupos/laboratorios/257"
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
          id: "codigo",
          header: "Código",
          cell: (item) => <Link href="#">{item.codigo}</Link>,
        },
        {
          id: "laboratorio",
          header: "Laboratorio",
          cell: (item) => item.laboratorio,
        },
        {
          id: "ubicacion",
          header: "Ubicación",
          cell: (item) => item.ubicacion,
        },
        {
          id: "responsable",
          header: "Responsable",
          cell: (item) => item.responsable,
        },
      ]}
      columnDisplay={[
        { id: "codigo", visible: true },
        { id: "laboratorio", visible: true },
        { id: "ubicacion", visible: true },
        { id: "responsable", visible: true },
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
      header={<Header>Laboratorios</Header>}
    />
  );
};
