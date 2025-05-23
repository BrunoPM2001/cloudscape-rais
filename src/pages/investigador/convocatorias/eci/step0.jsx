import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
  Tabs,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../api/axios";
import ModalDeleteProyecto from "./components/modalDeleteProyecto";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de equipamiento científico",
  },
];

const columnDefinitions = [
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "No aprobado"
            ? "grey"
            : item.estado == "Aprobado"
            ? "green"
            : item.estado == "En evaluación"
            ? "blue"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
            : item.estado == "Anulado"
            ? "red"
            : item.estado == "Sustentado"
            ? "blue"
            : item.estado == "En ejecución"
            ? "blue"
            : item.estado == "Ejecutado"
            ? "green"
            : item.estado == "Concluido"
            ? "green"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "titulo", visible: true },
  { id: "estado", visible: true },
];

export default function Registro_eci_0() {
  //  States
  const [loading, setLoading] = useState(true);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const [type, setType] = useState("");
  const { items, actions, collectionProps } = useCollection(distributions, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/convocatorias/eci/listado");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get("investigador/convocatorias/eci/reporte", {
      params: {
        id: collectionProps.selectedItems[0].id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de proyectos"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Tabs
        tabs={[
          {
            id: "listado",
            label: "Listado",
            content: (
              <>
                <Table
                  {...collectionProps}
                  trackBy="id"
                  items={items}
                  columnDefinitions={columnDefinitions}
                  columnDisplay={columnDisplay}
                  loading={loading}
                  loadingText="Cargando datos"
                  wrapLines
                  selectionType="single"
                  onRowClick={({ detail }) =>
                    actions.setSelectedItems([detail.item])
                  }
                  header={
                    <Header
                      actions={
                        <SpaceBetween size="xs" direction="horizontal">
                          <ButtonDropdown
                            disabled={!collectionProps.selectedItems.length}
                            variant="normal"
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_1_1") {
                                const query = queryString.stringify({
                                  id: collectionProps.selectedItems[0]["id"],
                                });
                                window.location.href = "eci/paso1?" + query;
                              } else if (detail.id == "action_1_2") {
                                setType("delete");
                              } else if (detail.id == "action_1_3") {
                                reporte();
                              }
                            }}
                            loading={loadingReporte}
                            items={[
                              {
                                text: "Editar",
                                id: "action_1_1",
                                disabled:
                                  collectionProps.selectedItems[0]?.estado !=
                                  "En proceso",
                              },
                              {
                                text: "Eliminar",
                                id: "action_1_2",
                                disabled:
                                  collectionProps.selectedItems[0]?.estado !=
                                  "En proceso",
                              },
                              {
                                text: "Reporte",
                                id: "action_1_3",
                                disabled:
                                  collectionProps.selectedItems[0]?.estado !=
                                  "Enviado",
                              },
                            ]}
                          >
                            Acciones
                          </ButtonDropdown>
                          <Button
                            variant="primary"
                            onClick={() => {
                              window.location.href = "eci/paso1";
                            }}
                            disabled={distributions.length > 0 || loading}
                          >
                            Registrar
                          </Button>
                        </SpaceBetween>
                      }
                    >
                      Proyectos ({distributions.length})
                    </Header>
                  }
                  empty={
                    <Box
                      margin={{ vertical: "xs" }}
                      textAlign="center"
                      color="inherit"
                    >
                      <SpaceBetween size="m">
                        <b>No hay registros...</b>
                      </SpaceBetween>
                    </Box>
                  }
                />
                {type == "delete" && (
                  <ModalDeleteProyecto
                    id={collectionProps.selectedItems[0].id}
                    close={() => setType("")}
                    reload={getData}
                  />
                )}
              </>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
