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
import { DeleteModal, EditModal } from "../components/modal";
import ModalCreateConvocatoria from "../components/modalCreateConvocatoria";

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
  const [modal, setModal] = useState("");
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
    sorting: {},
    selection: {},
  });

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
        onRowClick={({ detail }) => {
          if (detail.item.estado == 1) {
            actions.setSelectedItems([detail.item]);
          }
        }}
        header={
          <Header
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <ButtonDropdown
                  disabled={!collectionProps.selectedItems.length}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setModal("edit");
                    } else if (detail.id == "action_2") {
                      setModal("delete");
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
                <Button variant="primary" onClick={() => setModal("add")}>
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
      {modal == "add" ? (
        <ModalCreateConvocatoria close={() => setModal("")} reload={getData} />
      ) : modal == "edit" ? (
        <EditModal
          close={() => setModal("")}
          id={collectionProps.selectedItems[0].id}
          reload={getData}
        />
      ) : (
        modal == "delete" && (
          <DeleteModal
            close={() => setModal("")}
            id={collectionProps.selectedItems[0].id}
            reload={getData}
          />
        )
      )}
    </>
  );
};
