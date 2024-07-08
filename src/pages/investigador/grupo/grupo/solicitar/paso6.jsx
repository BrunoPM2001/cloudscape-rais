import {
  Box,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useCollection } from "@cloudscape-design/collection-hooks";

const columnDefinitions = [
  {
    id: "nombre",
    header: "Nombre",
    cell: (item) => item.nombre,
    isRowHeader: true,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
  },
  {
    id: "tipo_publicacion",
    header: "Tipo",
    cell: (item) => item.tipo_publicacion,
  },
];

const columnDisplay = [
  { id: "nombre", visible: true },
  { id: "titulo", visible: true },
  { id: "tipo_publicacion", visible: true },
];

export default function ({ loading, setLoading }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [distributions, setDistribution] = useState([]);
  const { items, collectionProps, paginationProps } = useCollection(
    distributions,
    {
      pagination: { pageSize: 10 },
      selection: {},
    }
  );

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/dataPaso6");
    const data = res.data;
    if (data?.message == "error") {
      pushNotification(data.detail, data.message, notifications.length + 1);
    } else {
      setDistribution(data);
      setLoading(false);
    }
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
      enableKeyboardNavigation
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header counter={"(" + distributions.length + ")"}>
          Publicaciones del grupo
        </Header>
      }
      pagination={<Pagination {...paginationProps} />}
    />
  );
}
