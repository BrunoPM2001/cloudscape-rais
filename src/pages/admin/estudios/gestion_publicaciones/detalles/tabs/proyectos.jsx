import {
  Box,
  Button,
  ButtonDropdown,
  Container,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";

const columnDefinitions = [
  {
    id: "codigo_proyecto",
    header: "Código de proyecto",
    cell: (item) => item.codigo_proyecto,
  },
  {
    id: "nombre_proyecto",
    header: "Nombre del proyecto",
    cell: (item) => item.nombre_proyecto,
  },
  {
    id: "entidad_financiadora",
    header: "Entidad financiadora",
    cell: (item) => item.entidad_financiadora,
  },
];

const columnDisplay = [
  { id: "codigo_proyecto", visible: true },
  { id: "nombre_proyecto", visible: true },
  { id: "entidad_financiadora", visible: true },
];

export default function ({ loading, data }) {
  //  State
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  //  Hooks
  const { items, collectionProps, paginationProps } = useCollection(data, {
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  return (
    <Container>
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
        selectionType="single"
        variant="embedded"
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
                    setTypeModal("eliminar");
                    setVisible(true);
                  }}
                >
                  Eliminar
                </Button>
                <ButtonDropdown
                  variant="primary"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setTypeModal("registrado");
                      setVisible(true);
                    } else if (detail.id == "action_2") {
                      setTypeModal("no_registrado");
                      setVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Proyecto registrado en la UNMSM",
                      id: "action_1",
                    },
                    {
                      text: "Proyecto no registrado en la UNMSM",
                      id: "action_2",
                    },
                  ]}
                >
                  Agregar
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Proyectos asociados
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
    </Container>
  );
}
