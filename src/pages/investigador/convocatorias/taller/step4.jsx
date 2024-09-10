import {
  Alert,
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import ModalAddActividad from "./components/modalAddActividad.jsx";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalEditActividad from "./components/modalEditActividad.jsx";
import ModalDeleteActividad from "./components/modalDeleteActividad.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Talleres de Investigación y Posgrado",
  },
];

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
  {
    id: "duracion",
    header: "Duración",
    cell: (item) => item.duracion,
  },
];

const columnDisplay = [
  { id: "actividad", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "duracion", visible: true },
];

const CANTIDAD_HORAS = 16;
const CANTIDAD_ACTIVIDADES = 5;

export default function Convocatoria_registro_taller_4() {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ actividades: [] });
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([
    "Necesita tener al menos " + CANTIDAD_ACTIVIDADES + " actividades",
    "Debe distribuir " + CANTIDAD_HORAS + " horas como mínimo",
  ]);

  //  Hooks
  const { items, collectionProps, actions } = useCollection(data.actividades, {
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar4"
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const handleNavigate = (index) => {
    if (index == 4) {
      let tempErrors = [];

      if (items.length < CANTIDAD_ACTIVIDADES) {
        tempErrors.push(
          "Necesita tener al menos " + CANTIDAD_ACTIVIDADES + " actividades"
        );
      }

      if (
        items.reduce((acc, curr) => acc + curr.duracion, 0) < CANTIDAD_HORAS
      ) {
        tempErrors.push(
          "Debe distribuir " + CANTIDAD_HORAS + " horas como mínimo"
        );
      }
      setErrors(tempErrors);
      if (tempErrors.length == 0) {
        window.location.href = "paso" + (index + 1);
      }
    } else {
      window.location.href = "paso" + (index + 1);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro a la convocatoria vigente"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {data.estado ? (
            <Wizard
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={3}
              isLoadingNextStep={loading}
              onCancel={() => {
                window.location.href = "../";
              }}
              steps={[
                {
                  title: "Información general del taller",
                  description: "Información general",
                },
                {
                  title: "Comité organizador del taller",
                  description: "Listado de integrantes para el taller",
                },
                {
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
                },
                {
                  title: "Programa del taller",
                  description: "Listado de las actividades del taller",
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <div>
                          <Box variant="awsui-key-label">Título</Box>
                          <Box>
                            Líneas de investigación de los GI en el marco de los
                            Objetivos de Desarrollo Sostenible (ODS)
                          </Box>
                        </div>
                      </Container>
                      {errors.length > 0 && (
                        <Alert
                          header="No cumple con los siguientes requisitos"
                          type="warning"
                          dismissible
                          onDismiss={() => setErrors([])}
                        >
                          {errors.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </Alert>
                      )}
                      <Table
                        {...collectionProps}
                        trackBy="id"
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        wrapLines
                        resizableColumns
                        items={items}
                        selectionType="single"
                        onRowClick={({ detail }) =>
                          actions.setSelectedItems([detail.item])
                        }
                        header={
                          <Header
                            variant="h3"
                            actions={
                              <SpaceBetween size="xs" direction="horizontal">
                                <Button
                                  disabled={
                                    !collectionProps.selectedItems.length
                                  }
                                  onClick={() => setType("delete")}
                                >
                                  Eliminar
                                </Button>
                                <Button
                                  disabled={
                                    !collectionProps.selectedItems.length
                                  }
                                  onClick={() => setType("update")}
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => setType("add")}
                                >
                                  Añadir
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Actividades
                          </Header>
                        }
                        footer={
                          <Box textAlign="right">
                            <b>Total de horas:</b>{" "}
                            {items.reduce(
                              (acc, curr) => acc + curr.duracion,
                              0
                            )}
                          </Box>
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
                      {type == "add" ? (
                        <ModalAddActividad
                          close={() => setType("")}
                          reload={getData}
                          id={data.datos.proyecto_id}
                        />
                      ) : type == "update" ? (
                        <ModalEditActividad
                          close={() => setType("")}
                          reload={getData}
                          item={collectionProps.selectedItems[0]}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeleteActividad
                            close={() => setType("")}
                            reload={getData}
                            id={collectionProps.selectedItems[0].id}
                          />
                        )
                      )}
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Financiamiento",
                  description: "Montos y partidas",
                },
                {
                  title: "Instrucciones finales",
                  description: "Reporte y envío de la propuesta",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede registrarse en esta convocatoria"
                type="warning"
              >
                {data.message.map((item) => {
                  return <li>{item}</li>;
                })}
              </Alert>
            </>
          )}
        </>
      )}
    </BaseLayout>
  );
}
