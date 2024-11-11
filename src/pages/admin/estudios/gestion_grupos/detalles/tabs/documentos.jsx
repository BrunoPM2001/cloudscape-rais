import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
  Button,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosBase from "../../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalEliminarDoc from "../components/modalEliminarDoc";

export default () => {
  //  States
  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [distributions, setDistributions] = useState([]);
  const { items, actions, collectionProps } = useCollection(distributions, {
    sorting: {},
    selection: {},
  });

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/docs", {
      params: {
        id,
      },
    });
    const data = await res.data;
    setDistributions(data);
    setLoading(false);
  };

  //  Data
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table
        {...collectionProps}
        columnDefinitions={[
          {
            id: "nombre",
            header: "Nombre",
            cell: (item) => (
              <Link href={item.url} external>
                {item.nombre}
              </Link>
            ),
          },
          {
            id: "fecha",
            header: "Fecha",
            cell: (item) => item.fecha,
          },
        ]}
        columnDisplay={[
          { id: "nombre", visible: true },
          { id: "fecha", visible: true },
        ]}
        trackBy="id"
        enableKeyboardNavigation
        items={items}
        loadingText="Cargando datos"
        loading={loading}
        resizableColumns
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            actions={
              <Button
                onClick={() => setModal("eliminar")}
                disabled={collectionProps.selectedItems.length == 0}
              >
                Eliminar
              </Button>
            }
          >
            Documentos
          </Header>
        }
      />
      {modal == "eliminar" && (
        <ModalEliminarDoc
          close={() => setModal("")}
          id={collectionProps.selectedItems[0].id}
          reload={getData}
        />
      )}
    </>
  );
};
