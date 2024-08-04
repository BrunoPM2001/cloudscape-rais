import {
  Badge,
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalAprobarActividad from "./components/modalAprobarActividad";
import { useCollection } from "@cloudscape-design/collection-hooks";

export default ({ data, reload }) => {
  //  States
  const [type, setType] = useState("");

  //  Hooks
  const { items, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <Button
              onClick={() => setType("aprobar")}
              disabled={collectionProps.selectedItems.length == 0}
            >
              Aprobar
            </Button>
          }
        >
          Actividades extra
        </Header>
      }
    >
      <Table
        {...collectionProps}
        isItemDisabled={(item) => item.registrado != null}
        variant="embedded"
        wrapLines
        selectionType="single"
        columnDefinitions={[
          {
            id: "tipo",
            header: "Tipo",
            cell: (item) => item.tipo,
            isRowHeader: true,
          },
          {
            id: "registrado",
            header: "Estado",
            cell: (item) => (
              <Badge color={item.registrado != null ? "green" : "grey"}>
                {item.registrado != null ? "Registrado" : "No registrado"}
              </Badge>
            ),
          },
          {
            id: "ver",
            header: "Ver",
            cell: (item) => (
              <Button
                iconName="download"
                variant="inline-icon"
                href={item.url}
                target="_blank"
              />
            ),
          },
        ]}
        columnDisplay={[
          { id: "tipo", visible: true },
          { id: "registrado", visible: true },
          { id: "ver", visible: true },
        ]}
        items={items}
        empty={
          <Box margin={{ vertical: "xxxs" }} textAlign="center" color="inherit">
            <SpaceBetween size="s">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
      {type == "aprobar" && (
        <ModalAprobarActividad
          data={collectionProps.selectedItems[0]}
          close={() => setType("")}
          reload={reload}
        />
      )}
    </Container>
  );
};
