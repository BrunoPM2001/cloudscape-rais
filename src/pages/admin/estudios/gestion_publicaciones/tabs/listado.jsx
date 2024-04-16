import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código de registro",
    key: "codigo_registro",
    groupValuesLabel: "Códigos de registro",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Isbn",
    key: "isbn",
    groupValuesLabel: "Isbns",
    operators: stringOperators,
  },
  {
    propertyLabel: "Issn",
    key: "issn",
    groupValuesLabel: "Issns",
    operators: stringOperators,
  },
  {
    propertyLabel: "Editorial",
    key: "editorial",
    groupValuesLabel: "Editoriales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre de evento",
    key: "evento_nombre",
    groupValuesLabel: "Nombres de eventos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de publicación",
    key: "fecha_publicacion",
    groupValuesLabel: "Fechas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Procedencia",
    key: "procedencia",
    groupValuesLabel: "Procedencias",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    isRowHeader: true,
  },
  {
    id: "codigo_registro",
    header: "Código de registro",
    cell: (item) => item.codigo_registro,
    sortingField: "codigo_registro",
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "isbn",
    header: "Isbn",
    cell: (item) => item.isbn,
    sortingField: "isbn",
  },
  {
    id: "issn",
    header: "Issn",
    cell: (item) => item.issn,
    sortingField: "issn",
  },
  {
    id: "editorial",
    header: "Editorial",
    cell: (item) => item.editorial,
    sortingField: "editorial",
  },
  {
    id: "evento_nombre",
    header: "Nombre de evento",
    cell: (item) => item.evento_nombre,
    sortingField: "evento_nombre",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "fecha_publicacion",
    header: "Fecha de publicación",
    cell: (item) => item.fecha_publicacion,
    sortingField: "fecha_publicacion",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == -1
            ? "red"
            : item.estado == 1
            ? "grey"
            : item.estado == 2
            ? "grey"
            : item.estado == 4
            ? "green"
            : item.estado == 5
            ? "blue"
            : item.estado == 6
            ? "grey"
            : "red"
        }
      >
        {item.estado == -1
          ? "Eliminado"
          : item.estado == 1
          ? "Reconocido"
          : item.estado == 2
          ? "Observado"
          : item.estado == 4
          ? "Registrado"
          : item.estado == 5
          ? "Enviado"
          : item.estado == 6
          ? "En proceso"
          : "Error"}
      </Badge>
    ),
    sortingField: "estado",
  },
  {
    id: "procedencia",
    header: "Procedencia",
    cell: (item) => item.procedencia,
    sortingField: "procedencia",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo_registro", visible: true },
  { id: "tipo", visible: true },
  { id: "isbn", visible: true },
  { id: "issn", visible: true },
  { id: "editorial", visible: true },
  { id: "evento_nombre", visible: true },
  { id: "titulo", visible: true },
  { id: "fecha_publicacion", visible: true },
  { id: "estado", visible: true },
  { id: "procedencia", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(distributions, {
    propertyFiltering: {
      filteringProperties: FILTER_PROPS,
      empty: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      ),
      noMatch: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay coincidencias</b>
          </SpaceBetween>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  const [enableBtn, setEnableBtn] = useState(true);

  //  Functions
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/estudios/publicaciones/listado/"
      );
      if (!res.ok) {
        setDistribution([]);
        setLoading(false);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setDistribution(data.data);
        setLoading(false);
      }
    } catch (error) {
      setDistribution([]);
      setLoading(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [selectedItems]);

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
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      header={
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/" + items.length + ")"
              : "(" + items.length + ")"
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    setEditVisible(true);
                  } else if (detail.id == "action_2") {
                    setDeleteVisible(true);
                  }
                }}
                items={[
                  {
                    text: "Artículo de revista",
                    id: "action_1",
                    disabled: false,
                  },
                  {
                    text: "Capítulo de libro",
                    id: "action_2",
                    disabled: false,
                  },
                  {
                    text: "Libro",
                    id: "action_3",
                    disabled: false,
                  },
                  {
                    text: "Evento científico",
                    id: "action_4",
                    disabled: false,
                  },
                  {
                    text: "Tesis propia",
                    id: "action_5",
                    disabled: false,
                  },
                  {
                    text: "Tesis asesoría",
                    id: "action_6",
                    disabled: false,
                  },
                  {
                    text: "Patente",
                    id: "action_7",
                    disabled: false,
                  },
                ]}
              >
                Nuevo
              </ButtonDropdown>
              <Button variant="normal" disabled={!enableBtn}>
                Reporte
              </Button>
              <Button variant="primary" disabled={!enableBtn}>
                Editar
              </Button>
            </SpaceBetween>
          }
        >
          Publicaciones
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyecto de grupo"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
        />
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
  );
};
