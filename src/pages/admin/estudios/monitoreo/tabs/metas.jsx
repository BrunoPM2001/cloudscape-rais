import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import axiosBase from "../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddPeriodo from "../components/modalAddPeriodo";
import ModalAddProyecto from "../components/modalAddProyecto";
import ModalAddMeta from "../components/modalAddMeta";
import ModalEditMeta from "../components/modalEditMeta";

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [tiposProyectos, setTiposProyectos] = useState([]);
  const [type, setType] = useState("");

  //  Hooks
  const {
    items: items1,
    actions: actions1,
    collectionProps: collectionProps1,
    paginationProps: paginationProps1,
  } = useCollection(periodos, {
    pagination: { pageSize: 2 },
    sorting: {},
    selection: {},
  });
  const {
    items: items2,
    actions: actions2,
    collectionProps: collectionProps2,
    paginationProps: paginationProps2,
  } = useCollection(tiposProyectos, {
    pagination: { pageSize: 2 },
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/monitoreo/listadoMetas");
    const data = res.data;
    setData(data);
    setPeriodos(data.periodos);
    setTiposProyectos([]);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      gridDefinition={[
        {
          colspan: {
            default: 12,
            l: 6,
            m: 6,
            s: 6,
          },
        },
        {
          colspan: {
            default: 12,
            l: 6,
            m: 6,
            s: 6,
          },
        },
      ]}
    >
      <Container fitHeight>
        <Table
          {...collectionProps1}
          trackBy="id"
          variant="embedded"
          columnDefinitions={[
            {
              id: "periodo",
              header: "Periodo",
              cell: (item) => item.periodo,
            },
            {
              id: "estado",
              header: "Estado",
              cell: (item) => (
                <Badge color={item.estado == "Válido" ? "green" : "red"}>
                  {item.estado}
                </Badge>
              ),
            },
            {
              id: "descripcion",
              header: "Descripcion",
              cell: (item) => item.descripcion,
            },
          ]}
          columnDisplay={[
            { id: "periodo", visible: true },
            { id: "estado", visible: true },
            { id: "descripcion", visible: false },
          ]}
          enableKeyboardNavigation
          loadingText="Cargando datos"
          items={items1}
          loading={loading}
          wrapLines
          selectionType="single"
          onRowClick={({ detail }) => {
            actions1.setSelectedItems([detail.item]);
            setTiposProyectos(
              data.tipos.filter((opt) => opt.meta_periodo_id == detail.item.id),
            );
          }}
          pagination={<Pagination {...paginationProps1} />}
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header
              variant="h3"
              actions={
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={() => setType("addPeriodo")}
                >
                  Agregar periodo
                </Button>
              }
            >
              Periodos
            </Header>
          }
        />
      </Container>
      <Container fitHeight>
        <Table
          {...collectionProps2}
          variant="embedded"
          columnDefinitions={[
            {
              id: "tipo_proyecto",
              header: "Tipo de proyecto",
              cell: (item) => item.tipo_proyecto,
            },
            {
              id: "estado",
              header: "Estado",
              cell: (item) => (
                <Badge color={item.estado == "Válido" ? "green" : "red"}>
                  {item.estado}
                </Badge>
              ),
            },
          ]}
          columnDisplay={[
            { id: "id", visible: false },
            { id: "tipo_proyecto", visible: true },
            { id: "estado", visible: true },
          ]}
          trackBy="id"
          enableKeyboardNavigation
          loadingText="Cargando datos"
          items={items2}
          loading={loading}
          wrapLines
          selectionType="single"
          onRowClick={({ detail }) => {
            actions2.setSelectedItems([detail.item]);
          }}
          pagination={<Pagination {...paginationProps2} />}
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header
              variant="h3"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="normal"
                    disabled={loading || !collectionProps2.selectedItems.length}
                    onClick={() => setType("editMeta")}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="primary"
                    disabled={loading || !collectionProps1.selectedItems.length}
                    onClick={() => setType("addProyecto")}
                  >
                    Agregar proyecto
                  </Button>
                </SpaceBetween>
              }
            >
              Tipos de proyecto
            </Header>
          }
        />
      </Container>
      {type == "addPeriodo" ? (
        <ModalAddPeriodo close={() => setType("")} reload={getData} />
      ) : type == "addProyecto" ? (
        <ModalAddProyecto
          close={() => setType("")}
          reload={getData}
          id={collectionProps1?.selectedItems[0].id}
        />
      ) : (
        type == "editMeta" && (
          <ModalEditMeta
            close={() => setType("")}
            reload={getData}
            item={collectionProps2?.selectedItems[0]}
          />
        )
      )}
    </Grid>
  );
};
