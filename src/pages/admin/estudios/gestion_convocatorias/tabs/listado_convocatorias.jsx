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
import axiosBase from "../../../../../api/axios";
import { CreateModal, DeleteModal, EditModal } from "../components/modal";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Evento",
    key: "evento",
    groupValuesLabel: "Eventos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha inicial",
    key: "fecha_inicial",
    groupValuesLabel: "Fechas iniciales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha final",
    key: "fecha_final",
    groupValuesLabel: "Fechas finales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de corte",
    key: "fecha_corte",
    groupValuesLabel: "Fechas de corte",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Convocatoria",
    key: "convocatoria",
    groupValuesLabel: "Convocatorias",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
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
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "evento",
    header: "Evento",
    cell: (item) => item.evento,
    sortingField: "evento",
  },
  {
    id: "fecha_inicial",
    header: "Fecha inicial",
    cell: (item) => item.fecha_inicial,
    sortingField: "fecha_inicial",
  },
  {
    id: "fecha_final",
    header: "Fecha final",
    cell: (item) => item.fecha_final,
    sortingField: "fecha_final",
  },
  {
    id: "fecha_corte",
    header: "Fecha de corte",
    cell: (item) => item.fecha_corte,
    sortingField: "fecha_corte",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "convocatoria",
    header: "Convocatoria",
    cell: (item) => item.convocatoria,
    sortingField: "convocatoria",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge color={item.estado == 1 ? "green" : "red"}>
        {item.estado == 1 ? "Activo" : "No activo"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo", visible: true },
  { id: "evento", visible: true },
  { id: "fecha_inicial", visible: true },
  { id: "fecha_final", visible: true },
  { id: "fecha_corte", visible: true },
  { id: "periodo", visible: true },
  { id: "convocatoria", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
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
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/listarConvocatorias"
    );
    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);
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
    <>
      <Table
        {...collectionProps}
        isItemDisabled={(item) => item.estado != 1}
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
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        header={
          <Header
            counter={
              selectedItems.length
                ? "(" + selectedItems.length + "/" + items.length + ")"
                : "(" + items.length + ")"
            }
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <ButtonDropdown
                  disabled={!enableBtn}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setEditVisible(true);
                    } else if (detail.id == "action_2") {
                      setDeleteVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Editar",
                      id: "action_1",
                      disabled: false,
                    },
                    {
                      text: "Eliminar",
                      id: "action_2",
                      disabled: false,
                    },
                  ]}
                >
                  Acciones para convocatoria
                </ButtonDropdown>
                <Button
                  variant="primary"
                  onClick={() => setCreateVisible(true)}
                >
                  Añadir convocatoria
                </Button>
              </SpaceBetween>
            }
          >
            Convocatorias
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar grupo"
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
      {createVisible && (
        <CreateModal
          visible={createVisible}
          setVisible={setCreateVisible}
          reload={getData}
        />
      )}
      {editVisible && (
        <EditModal
          visible={editVisible}
          setVisible={setEditVisible}
          item={selectedItems}
          reload={getData}
        />
      )}
      {deleteVisible && (
        <DeleteModal
          visible={deleteVisible}
          setVisible={setDeleteVisible}
          item={selectedItems}
          reload={getData}
        />
      )}
    </>
  );
};
