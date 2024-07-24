import {
  Box,
  ButtonDropdown,
  Container,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";

const columnDefinitions = [
  {
    id: "presentado",
    header: "Presentado",
    cell: (item) => (item.presentado ? "Sí" : "No"),
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.categoria,
  },
  {
    id: "autor",
    header: "Nombre en la publicación",
    cell: (item) => item.autor,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "filiacion",
    header: "Filiación",
    cell: (item) => item.filiacion,
  },
];

const columnDisplay = [
  { id: "presentado", visible: true },
  { id: "categoria", visible: true },
  { id: "autor", visible: true },
  { id: "tipo", visible: true },
  { id: "nombres", visible: true },
  { id: "filiacion", visible: true },
];

export default function ({ data, loading, tipo }) {
  //  State
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [optAutor, setOptAutor] = useState([]);
  const [tipoAutor, setTipoAutor] = useState([]);

  //  Hooks
  const { items, collectionProps, paginationProps } = useCollection(data, {
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  //  Effect
  useEffect(() => {
    if (tipo == "articulo") {
      setOptAutor([{ value: "Autor" }, { value: "Autor de correspondencia" }]);
      setTipoAutor([
        { text: "Docente", id: "action_2_1" },
        { text: "Estudiante", id: "action_2_2" },
        { text: "Externo", id: "action_2_3" },
      ]);
    } else if (["libro", "capitulo_libro", "evento"].includes(tipo)) {
      setOptAutor([{ value: "Autor" }]);
      setTipoAutor([
        { text: "Docente", id: "action_2_1" },
        { text: "Estudiante", id: "action_2_2" },
        { text: "Externo", id: "action_2_3" },
      ]);
    } else if (tipo == "tesis_propia") {
      setOptAutor([{ value: "Asesor" }, { value: "Co-Asesor" }]);
      setTipoAutor([
        { text: "Asesor / co-asesor interno", id: "action_2_1" },
        { text: "Asesor / co-asesor externo", id: "action_2_3" },
      ]);
    } else if (tipo == "tesis_asesoria") {
      setOptAutor([{ value: "Tesista" }]);
      setTipoAutor([
        { text: "Agregar autor estudiante UNMSM", id: "action_2_2" },
      ]);
    }
  }, []);

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
                <ButtonDropdown
                  disabled={
                    collectionProps.selectedItems.length > 0 ? false : true
                  }
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      setTypeModal("edit");
                      setVisible(true);
                    } else if (detail.id == "action_1_2") {
                      setTypeModal("delete");
                      setVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Editar",
                      id: "action_1_1",
                    },
                    {
                      text: "Eliminar",
                      id: "action_1_2",
                      disabled: collectionProps.selectedItems[0]?.presentado,
                    },
                  ]}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      setTypeModal("add_docente");
                      setVisible(true);
                    } else if (detail.id == "action_2_2") {
                      setTypeModal("add_estudiante");
                      setVisible(true);
                    } else if (detail.id == "action_2_3") {
                      setTypeModal("add_externo");
                      setVisible(true);
                    }
                  }}
                  items={tipoAutor}
                >
                  Agregar autor
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Autores de la publicación
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
