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
  Tabs,
  Alert
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
    text: "Programa de Proyectos de Investigación para Grupos de Investigación (PCONFIGI)",
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
  const [validationErrors, setValidationErrors] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const { items, actions, collectionProps } = useCollection(distributions, {
    sorting: {},
    selection: {},
  });
  const item = items[0] ?? 0; // Accedemos al primer elementotems", items);
  const { id, titulo, step, estado } = item; // Desestructuramos el objeto para acceder a sus propiedades

console.log(id, titulo, step, estado); // Muestra las propiedades

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi/listado"
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const getValidacion = async () => {
    setLoading(true);
    try {
      const res = await axiosBase.get(
        "investigador/convocatorias/pconfigi/validarDatos"
      );
      const data = res.data;

      if (data.errores && Array.isArray(data.errores)) {
        setValidationErrors(data.errores); // Guardar los errores en el estado
      } else {
        setValidationErrors([]); // Limpiar en caso de que no haya errores
      }
    } catch (error) {
      console.error("Error al validar datos:", error);
      setValidationErrors([]);
    } finally {
      setLoading(false);
    }
  };

  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi/reporte",
      {
        params: {
          id,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };


  //  Effects
  useEffect(() => {
    getData();
    getValidacion();
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
            label: "Listado - PCONFIGI",
            content: (
              <>
                <div style={{ marginBottom: '20px' }}> {/* Espacio entre Alert y Table */}
                  {validationErrors.length > 0 && ( // Verificar si hay errores
                    <Alert
                      style={{ paddingTop: '16px', paddingBottom: '16px' }}
                      dismissible
                      statusIconAriaLabel="Error"
                      type="error"
                      header="No puede postular a otra convocatoria por los siguientes motivos:"
                    >
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        {validationErrors.map((error, index) => (
                          <li key={index} style={{ marginBottom: "8px" }}>
                            {error.isHtml ? (
                              // Renderizar mensaje como HTML si el campo isHtml es true
                              <span dangerouslySetInnerHTML={{ __html: error.message }} />
                            ) : (
                              // Mostrar mensaje como texto normal si isHtml es false
                              <span>{error.message}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                </div>


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
                          <Button
                            ariaLabel="Report a bug (opens new tab)"

                            loading={loadingReporte}
                            onClick={reporte}
                            iconAlign="right"
                            iconName="external"
                            target="_blank"
                            disabled={!id || estado != "Enviado"}
                          >
                            Reporte
                          </Button>
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
                                // window.location.href = "pconfigi/paso1?" + query;
                                window.location.href = "./paso1?" + query;
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
                              window.location.href = "../pconfigi/paso1";
                            }}
                            disabled={validationErrors.length > 0} // Deshabilitar si hay errores
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
              </>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
