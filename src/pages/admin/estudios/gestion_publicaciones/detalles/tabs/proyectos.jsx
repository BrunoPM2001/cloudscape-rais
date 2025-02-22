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
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalRegistrado from "../../components/modalRegistrado";
import ModalNoRegistrado from "../../components/modalNoRegistrado";
import ModalEliminarProyecto from "../../components/modalEliminarProyecto";

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
  {
    id: "url",
    header: "Documento",
    cell: (item) =>
      item.url ? (
        <Button
          iconName="download"
          variant="inline-icon"
          href={item.url}
          target="_blank"
        />
      ) : (
        "No"
      ),
  },
];

const columnDisplay = [
  { id: "codigo_proyecto", visible: true },
  { id: "nombre_proyecto", visible: true },
  { id: "entidad_financiadora", visible: true },
  { id: "url", visible: true },
];

export default function ({ loading, data, reload }) {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [type, setType] = useState("");

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
        wrapLines
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
                    setType("eliminar");
                  }}
                >
                  Eliminar
                </Button>
                <ButtonDropdown
                  variant="primary"
                  disabled={collectionProps.totalItemsCount > 0}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setType("registrado");
                    } else if (detail.id == "action_2") {
                      setType("no_registrado");
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
      {type == "registrado" ? (
        <ModalRegistrado id={id} reload={reload} close={() => setType("")} />
      ) : type == "no_registrado" ? (
        <ModalNoRegistrado id={id} reload={reload} close={() => setType("")} />
      ) : type == "eliminar" ? (
        <ModalEliminarProyecto
          id={collectionProps.selectedItems[0].id}
          reload={reload}
          close={() => setType("")}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}
