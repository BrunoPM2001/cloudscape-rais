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

// Breadcrumbs para navegación
const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto con financiamiento",
  },
];

// Definición de columnas para la tabla
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

// Definir columnas visibles
const columnDisplay = [
  { id: "titulo", visible: true },
  { id: "estado", visible: true },
];

export default function Registro_pro_ctie() {
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [errores, setErrors] = useState([]);
  const { items, actions, collectionProps } = useCollection(distributions, {
    sorting: {},
    selection: {},
  });

  // Función para obtener datos de los proyectos
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/convocatorias/pro-ctie/listado");
    const data = res.data;
    setDistribution(data.listado);
    setErrors(data.errores);
    setLoading(false);
  };

  // Ejecutar la función para obtener los datos al montar el componente
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de proyectos"
      helpInfo="Información sobre la página actual para mostrarla al público."
      disableOverlap
    >
      <Tabs
        tabs={[
          {
            id: "listado",
            label: "Listado de Proyectos",
            content: (
              <SpaceBetween size="m">
                {errores.length > 0 && (
                  <Alert type="warning">
                    No puede presentar una propuesta de proyecto porque:
                    {errores.map((item, index) => (
                      <li key={index}>{item}</li>
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
                                  "pro-ctie/paso1?" + query;
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
                              window.location.href = "pro-ctie/paso1";
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
