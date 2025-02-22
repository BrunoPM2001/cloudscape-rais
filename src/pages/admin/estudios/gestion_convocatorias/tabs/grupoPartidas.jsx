import {
  Alert,
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import ModalViewGrupo from "../components/modalViewGrupo";
import ModalAddGrupo from "../components/modalAddGrupo";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre",
    key: "nombre",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Partidas",
    key: "partidas",
    groupValuesLabel: "Partidas",
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
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "nombre",
    header: "Nombre",
    cell: (item) => item.nombre,
    sortingField: "nombre",
  },
  {
    id: "monto_max",
    header: "Monto máximo",
    cell: (item) => item.monto_max,
    sortingField: "monto_max",
  },
  {
    id: "partidas",
    header: "Cantidad de partidas",
    cell: (item) => item.partidas,
    sortingField: "partidas",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "nombre", visible: true },
  { id: "monto_max", visible: true },
  { id: "partidas", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [modal, setModal] = useState("");
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
      "admin/estudios/convocatorias/listadoGruposPartidas"
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <SpaceBetween size="m">
      <Alert>
        Desde esta vista puede gestionar grupos de partidas para las
        convocatorias de proyectos, es decir agrupar partidas para que en la
        sección de presupuesto no se supere un determinado monto
      </Alert>
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
            counter={"(" + items.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  variant="normal"
                  iconName="edit"
                  disabled={!collectionProps.selectedItems.length}
                  onClick={() => setModal("view")}
                >
                  Ver detalle
                </Button>
                <Button
                  variant="primary"
                  iconName="add-plus"
                  onClick={() => setModal("add")}
                >
                  Crear grupo
                </Button>
              </SpaceBetween>
            }
          >
            Grupos de partidas
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
      {modal == "view" ? (
        <ModalViewGrupo
          item={collectionProps.selectedItems[0]}
          close={() => setModal("")}
          reload={getData}
        />
      ) : (
        modal == "add" && (
          <ModalAddGrupo close={() => setModal("")} reload={getData} />
        )
      )}
    </SpaceBetween>
  );
};
