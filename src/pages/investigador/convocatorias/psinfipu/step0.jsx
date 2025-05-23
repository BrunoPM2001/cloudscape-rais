import {
  Alert,
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
    text: "Proyecto de publicación académica",
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

export default function Registro_psinfipu_0() {
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [errores, setErrors] = useState([]);
  const { items, actions, collectionProps } = useCollection(distributions, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/psinfipu/listado"
    );
    const data = res.data;
    setDistribution(data.listado);
    setErrors(data.errores);
    setLoading(false);
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
              <SpaceBetween size="m">
                {errores.length > 0 && (
                  <Alert type="warning">
                    No puede presentar una propuesta de proyecto porque:
                    {errores.map((item) => (
                      <li>{item}</li>
                    ))}
                  </Alert>
                )}
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
                            disabled={
                              !collectionProps.selectedItems.length ||
                              collectionProps.selectedItems[0]?.estado !=
                                "En proceso"
                            }
                            variant="normal"
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_1_1") {
                                const query = queryString.stringify({
                                  id: collectionProps.selectedItems[0]["id"],
                                });
                                window.location.href =
                                  "psinfipu/paso1?" + query;
                              } else if (detail.id == "action_1_2") {
                                setType("delete");
                              }
                            }}
                            items={[
                              {
                                text: "Editar",
                                id: "action_1_1",
                              },
                              {
                                text: "Eliminar",
                                id: "action_1_2",
                              },
                            ]}
                          >
                            Acciones
                          </ButtonDropdown>
                          <Button
                            variant="primary"
                            onClick={() => {
                              window.location.href = "psinfipu/paso1";
                            }}
                            disabled={loading || errores.length}
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
              </SpaceBetween>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
