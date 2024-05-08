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
      const res = await axiosBase.get(
        "admin/estudios/grupos/laboratorios/" + id
      );
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
