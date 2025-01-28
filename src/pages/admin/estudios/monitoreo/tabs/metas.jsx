import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Container,
  Grid,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import axiosBase from "../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddPeriodo from "../components/modalAddPeriodo";
import ModalAddProyecto from "../components/modalAddProyecto";
import ModalAddMeta from "../components/modalAddMeta";
import ModalDeleteMeta from "../components/modalDeleteMeta";
import ModalEditMeta from "../components/modalEditMeta";

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [tiposProyectos, setTiposProyectos] = useState([]);
  const [tiposPublicaciones, setTiposPublicaciones] = useState([]);
  const [type, setType] = useState("");

  //  Hooks
  const {
    items: items1,
    actions: actions1,
    collectionProps: collectionProps1,
  } = useCollection(periodos, {
    sorting: {},
    selection: {},
  });
  const {
    items: items2,
    actions: actions2,
    collectionProps: collectionProps2,
  } = useCollection(tiposProyectos, {
    sorting: {},
    selection: {},
  });
  const {
    items: items3,
    actions: actions3,
    collectionProps: collectionProps3,
  } = useCollection(tiposPublicaciones, {
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
    setTiposPublicaciones([]);
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
            l: 4,
            m: 6,
            s: 6,
          },
        },
        {
          colspan: {
            default: 12,
            l: 4,
            m: 6,
            s: 6,
          },
        },
        {
          colspan: {
            default: 12,
            l: 4,
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
              data.tipos.filter((opt) => opt.meta_periodo_id == detail.item.id)
            );
          }}
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
            setTiposPublicaciones(
              data.publicaciones.filter(
                (opt) => opt.meta_tipo_proyecto_id == detail.item.id
              )
            );
          }}
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
                  disabled={loading || !collectionProps1.selectedItems.length}
                  onClick={() => setType("addProyecto")}
                >
                  Agregar proyecto
                </Button>
              }
            >
              Tipos de proyecto
            </Header>
          }
        />
      </Container>
      <Container fitHeight>
        <Table
          {...collectionProps3}
          variant="embedded"
          columnDefinitions={[
            {
              id: "tipo_publicacion",
              header: "Tipo de publicacion",
              cell: (item) => item.tipo_publicacion,
            },
            {
              id: "cantidad",
              header: "Cantidad",
              cell: (item) => item.cantidad,
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
            { id: "tipo_publicacion", visible: true },
            { id: "cantidad", visible: true },
            { id: "estado", visible: true },
          ]}
          trackBy="id"
          enableKeyboardNavigation
          items={items3}
          loadingText="Cargando datos"
          loading={loading}
          wrapLines
          selectionType="single"
          onRowClick={({ detail }) => actions3.setSelectedItems([detail.item])}
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
                <SpaceBetween size="xs" direction="horizontal">
                  <ButtonDropdown
                    items={[
                      {
                        id: "action_1",
                        text: "Editar",
                      },
                      {
                        id: "action_2",
                        text: "Eliminar",
                      },
                    ]}
                    onItemClick={({ detail }) => {
                      if (detail.id == "action_1") {
                        setType("editMeta");
                      } else if (detail.id == "action_2") {
                        setType("deleteMeta");
                      }
                    }}
                    disabled={loading || !collectionProps3.selectedItems.length}
                    expandToViewport
                  >
                    Acciones
                  </ButtonDropdown>
                  <Button
                    variant="primary"
                    disabled={loading || !collectionProps2.selectedItems.length}
                    onClick={() => setType("addMeta")}
                  >
                    Agregar meta
                  </Button>
                </SpaceBetween>
              }
            >
              Publicaciones
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
      ) : type == "addMeta" ? (
        <ModalAddMeta
          close={() => setType("")}
          reload={getData}
          id={collectionProps2?.selectedItems[0].id}
        />
      ) : type == "editMeta" ? (
        <ModalEditMeta
          close={() => setType("")}
          reload={getData}
          item={collectionProps3?.selectedItems[0]}
        />
      ) : (
        type == "deleteMeta" && (
          <ModalDeleteMeta
            close={() => setType("")}
            reload={getData}
            id={collectionProps3.selectedItems[0].id}
          />
        )
      )}
    </Grid>
  );
};
