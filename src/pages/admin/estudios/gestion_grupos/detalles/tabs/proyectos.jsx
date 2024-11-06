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
import { useCollection } from "@cloudscape-design/collection-hooks";

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [distributions, setDistributions] = useState([]);
  const { items, actions, collectionProps } = useCollection(distributions, {
    sorting: {},
    selection: {},
    expandableRows: {
      getId: (item) => item.id,
      getParentId: (item) => item.investigador_id,
    },
  });

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/proyectos/" + id);
    const data = res.data;
    setDistributions(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      {...collectionProps}
      columnDefinitions={[
        {
          id: "nombres",
          header: "Nombres",
          cell: (item) => item.nombres,
          minWidth: 200,
        },
        {
          id: "titulo",
          header: "Título",
          cell: (item) => item.titulo,
          minWidth: 300,
        },
        {
          id: "periodo",
          header: "Periodo",
          cell: (item) => item.periodo,
          minWidth: 50,
        },
        {
          id: "tipo_proyecto",
          header: "Tipo de proyecto",
          cell: (item) => item.tipo_proyecto,
          minWidth: 70,
        },
      ]}
      columnDisplay={[
        { id: "nombres", visible: true },
        { id: "titulo", visible: true },
        { id: "periodo", visible: true },
        { id: "tipo_proyecto", visible: true },
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Cargando datos"
      loading={loading}
      wrapLines
      trackBy="id_unico"
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
