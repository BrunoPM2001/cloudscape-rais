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
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddActividad from "./components/modals/modalAddActividad";
import ModalDeleteActividad from "./components/modals/modalDeleteActividad";

const CANTIDAD_MINIMA = 3;

const columnDefinitions = [
  {
    id: "actividad",
    header: "Actividad",
    cell: (item) => item.actividad,
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
  },
];

const columnDisplay = [
  { id: "actividad", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
];

export default function ({ proyecto_id, setRequisitos, loading, setLoading }) {
  //  State
  const [distributions, setDistribution] = useState([]);
  const [rangoFechas, setRangoFechas] = useState(null);
  const [typeModal, setTypeModal] = useState(null);

  //  Hooks
  const { items, collectionProps, paginationProps, actions } = useCollection(
    distributions,
    {
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/listarActividades",
      {
        params: {
          proyecto_id: proyecto_id,
        },
      }
    );
    const data = res.data;
    setRequisitos(CANTIDAD_MINIMA <= data.actividades.length ? true : false);
    setDistribution(data.actividades);
    setRangoFechas(data.rango);
    setLoading(false);
  };

  //  Effect
  useEffect(() => {
    getData();
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
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        variant="embedded"
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={
                    collectionProps.selectedItems.length > 0 ? false : true
                  }
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      setTypeModal("delete");
                    }
                  }}
                  items={[
                    {
                      text: "Eliminar",
                      id: "action_1_1",
                      disabled: collectionProps.selectedItems[0]?.presentado,
                    },
                  ]}
                >
                  Acciones
                </ButtonDropdown>
                <Button
                  onClick={() => setTypeModal("add_actividad")}
                  variant="primary"
                >
                  Agregar actividad
                </Button>
              </SpaceBetween>
            }
          >
            Calendario de actividades
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
      {typeModal == "add_actividad" ? (
        <ModalAddActividad
          id={proyecto_id}
          reload={getData}
          close={() => setTypeModal("")}
          rangoFechas={rangoFechas}
        />
      ) : (
        typeModal == "delete" && (
          <ModalDeleteActividad
            id={collectionProps.selectedItems[0].id}
            reload={getData}
            close={() => setTypeModal("")}
          />
        )
      )}
    </Container>
  );
}
