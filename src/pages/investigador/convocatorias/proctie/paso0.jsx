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

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto PRO-CTIE",
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

export default function Registro_pro_ctie_0() {
  const [loading, setLoading] = useState(true);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  const { items, actions, collectionProps } = useCollection(proyectos, {
    sorting: {},
    selection: {},
  });

  const getData = async () => {
    setLoading(true);

    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/listado"
    );

    setProyectos(res.data);
    setLoading(false);
  };

  const irPaso1 = (proyecto_id = null) => {
    const query = proyecto_id
      ? "?" +
        queryString.stringify({
          proyecto_id,
        })
      : "";

    window.location.href = "pro-ctie/paso1" + query;
  };

  const reporte = async () => {
    setLoadingReporte(true);

    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/reporte",
      {
        params: {
          proyecto_id: collectionProps.selectedItems[0].id,
        },
        responseType: "blob",
      }
    );

    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    setLoadingReporte(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de proyectos PRO-CTIE"
      helpInfo="Información sobre la página actual."
      disableOverlap
    >
      <Tabs
        tabs={[
          {
            id: "listado",
            label: "Listado",
            content: (
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
                          loading={loadingReporte}
                          onItemClick={({ detail }) => {
                            if (detail.id == "editar") {
                              irPaso1(collectionProps.selectedItems[0].id);
                            }

                            if (detail.id == "reporte") {
                              reporte();
                            }
                          }}
                          items={[
                            {
                              text: "Editar",
                              id: "editar",
                              disabled:
                                collectionProps.selectedItems[0]?.estado !=
                                "En proceso",
                            },
                            {
                              text: "Reporte",
                              id: "reporte",
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
                          onClick={() => irPaso1()}
                          disabled={proyectos.length > 0 || loading}
                        >
                          Registrar
                        </Button>
                      </SpaceBetween>
                    }
                  >
                    Proyectos ({proyectos.length})
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
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}