import {
  Box,
  Button,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalAgregarTitular from "../../components/modalAgregarTitular";
import ModalEliminarTitular from "../../components/modalEliminarTitular";

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
  },
  {
    id: "titular",
    header: "Titular",
    cell: (item) => item.titular,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "titular", visible: true },
];

export default function ({ loading, data, reload }) {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [type, setType] = useState("");

  //  Hooks
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data,
    {
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        wrapLines
        enableKeyboardNavigation
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  variant="normal"
                  disabled={
                    collectionProps.selectedItems.length > 0 ? false : true
                  }
                  onClick={() => {
                    setType("eliminar");
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
                  disabled={loading || collectionProps.totalItemsCount > 0}
                  onClick={() => setType("add")}
                >
                  Agregar
                </Button>
              </SpaceBetween>
            }
          >
            Titulares
          </Header>
        }
        pagination={<Pagination {...paginationProps} />}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
      {type == "add" ? (
        <ModalAgregarTitular
          id={id}
          reload={reload}
          close={() => setType("")}
        />
      ) : (
        type == "eliminar" && (
          <ModalEliminarTitular
            id={collectionProps.selectedItems[0].id}
            reload={reload}
            close={() => setType("")}
          />
        )
      )}
    </>
  );
}
