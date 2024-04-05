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
          "http://localhost:8000/api/admin/estudios/grupos/docs/257"
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
          id: "nombre",
          header: "Nombre",
          cell: (item) => <Link href="#">{item.nombre}</Link>,
        },
        {
          id: "archivo_tipo",
          header: "Tipo de archivo",
          cell: (item) => item.archivo_tipo,
        },
        {
          id: "fecha",
          header: "Fecha",
          cell: (item) => item.fecha,
        },
        {
          id: "accion",
          header: "Acción",
          cell: (item) => <div>{item.id}</div>,
        },
      ]}
      columnDisplay={[
        { id: "nombre", visible: true },
        { id: "archivo_tipo", visible: true },
        { id: "fecha", visible: true },
        { id: "accion", visible: true },
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
      header={<Header>Documentos</Header>}
    />
  );
};
