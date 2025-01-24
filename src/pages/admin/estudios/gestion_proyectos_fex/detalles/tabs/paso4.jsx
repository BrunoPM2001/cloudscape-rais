import {
  Box,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCollection } from "@cloudscape-design/collection-hooks";

export default function Paso4({ info, loading }) {
  //  States
  const [type, setType] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, collectionProps } = useCollection(info, {
    sorting: {},
    selection: {},
  });

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      columnDefinitions={[
        {
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
          isRowHeader: true,
        },
        {
          id: "nombres",
          header: "Nombres",
          cell: (item) => item.nombres,
        },
        {
          id: "doc_numero",
          header: "N° documento",
          cell: (item) => item.doc_numero,
        },
        {
          id: "facultad",
          header: "Facultad",
          cell: (item) => item.facultad,
        },
      ]}
      columnDisplay={[
        { id: "tipo_integrante", visible: true },
        { id: "nombres", visible: true },
        { id: "doc_numero", visible: true },
        { id: "facultad", visible: true },
      ]}
      selectionType="single"
      items={items}
      loading={loading}
      loadingText="Cargando datos"
      wrapLines
      header={
        <Header
          variant="h3"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <ButtonDropdown
                disabled={collectionProps.selectedItems.length == 0}
                items={[
                  {
                    id: "action_4",
                    text: "Editar",
                  },
                  {
                    id: "action_5",
                    text: "Eliminar",
                  },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_4") {
                    setType("update");
                  } else if (detail.id == "action_5") {
                    setType("delete");
                  }
                }}
              >
                Acciones
              </ButtonDropdown>
              <ButtonDropdown
                items={[
                  {
                    id: "action_1",
                    text: "Convenio, contrato o lo que haga sus veces",
                  },
                  {
                    id: "action_2",
                    text: "Proyecto propuesto (última versión aprobada)",
                  },
                  {
                    id: "action_3",
                    text: "Resolución rectoral (RR)",
                  },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    setDoc_tipo("D01");
                    setType("add");
                  } else if (detail.id == "action_2") {
                    setDoc_tipo("D04");
                    setType("add");
                  } else if (detail.id == "action_3") {
                    setDoc_tipo("D12");
                    setType("add");
                  }
                }}
              >
                Agregar
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Integrantes
        </Header>
      }
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
    />
  );
}
