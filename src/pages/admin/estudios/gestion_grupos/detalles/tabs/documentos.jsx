import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosBase from "../../../../../../api/axios";

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Data
  useEffect(() => {
    const getData = async () => {
      const res = await axiosBase.get("admin/estudios/grupos/docs", {
        params: {
          id,
        },
      });
      const data = await res.data;
      setItems(data.data);
      setLoading(!loading);
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
