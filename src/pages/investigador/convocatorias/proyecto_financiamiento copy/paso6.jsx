import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
  Container,
  Header,
  Pagination,
  SpaceBetween,
  Spinner,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddPartida from "./components/modals/modalAddPartida";
import ModalDeletePartida from "./components/modals/modalDeletePartida";

const CANTIDAD_MINIMA = 1;

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "monto",
    header: "Monto",
    cell: (item) => item.monto,
  },
  {
    id: "porcentaje",
    header: "Porcentaje",
    cell: (item) => item.porcentaje,
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "partida", visible: true },
  { id: "tipo", visible: true },
  { id: "monto", visible: true },
  { id: "porcentaje", visible: true },
];

export default function ({ proyecto_id, setRequisitos, loading, setLoading }) {
  //  State
  const [distributions, setDistribution] = useState([]);
  const [montoDis, setMontoDis] = useState();
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  //  Hooks
  const { items, collectionProps, paginationProps } = useCollection(
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
      "investigador/convocatorias/listarPartidas",
      {
        params: {
          proyecto_id: proyecto_id,
        },
      }
    );
    const data = res.data;
    setRequisitos(CANTIDAD_MINIMA <= data.presupuesto.length ? true : false);
    setDistribution(data.presupuesto);
    setMontoDis(data.monto_disponible);
    setLoading(false);
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <SpaceBetween size="m">
        <Alert header="Para ver información respecto a la asignación de presupuesto revisar el panel de ayuda" />
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
                        setVisible(true);
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
                    onClick={() => {
                      setTypeModal("add_partida");
                      setVisible(true);
                    }}
                    disabled={montoDis <= 0 || loading}
                    variant="primary"
                  >
                    Agregar partida
                  </Button>
                </SpaceBetween>
              }
            >
              Listado de partidas
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
          footer={
            loading ? (
              <Spinner />
            ) : montoDis > 0 ? (
              <Alert header={`Saldo disponible: S/. ${montoDis}`} />
            ) : (
              <Alert header="No cuenta con saldo disponible" type="warning" />
            )
          }
        />
        {visible && typeModal == "add_partida" && (
          <ModalAddPartida
            id={proyecto_id}
            reload={getData}
            setVisible={setVisible}
            visible={visible}
            limit={montoDis}
          />
        )}
        {visible && typeModal == "delete" && (
          <ModalDeletePartida
            id={collectionProps.selectedItems[0].id}
            reload={getData}
            setVisible={setVisible}
            visible={visible}
          />
        )}
      </SpaceBetween>
    </Container>
  );
}
