import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
  Header,
  Pagination,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddActividad from "./components/modalAddActividad.jsx";
import ModalDeleteActividad from "./components/modalDeleteActividad.jsx";
import ModalEditActividad from "./components/modalEditActividad.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de multidisciplinario",
  },
];

const columnDefinitions = [
  {
    id: "actividad",
    header: "Actividad",
    cell: (item) => item.actividad,
  },
  {
    id: "justificacion",
    header: "Justificación",
    cell: (item) => item.justificacion,
    maxWidth: 300,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
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
  { id: "justificacion", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
];

const MIN_ACTIVIDADES = 6;

export default function Registro_pmulti_5() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  const [integrantes, setIntegrantes] = useState([]);
  const [type, setType] = useState("");
  const [alert, setAlert] = useState([]);

  //  Hooks
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data,
    {
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pmulti/verificar5",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    if (!info.estado) {
      setErrors(info.errores);
    } else {
      setData(info.actividades);
      setIntegrantes(info.integrantes);
    }
    setLoading(false);
  };

  const handleNavigate = (index) => {
    if (index < 5) {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
    } else {
      let tempErrors = [...errors];
      if (data.length < MIN_ACTIVIDADES) {
        tempErrors.push(
          "Necesita registrar al menos " + MIN_ACTIVIDADES + " actividades"
        );
      }
      setAlert(tempErrors);
      if (tempErrors.length == 0) {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso6?" + query;
      }
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
      contentType="table"
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {errors.length == 0 ? (
            <Wizard
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={4}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general",
                  description: "Información general",
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados de GI",
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades junto al responsable",
                  content: (
                    <SpaceBetween size="m">
                      {alert.length > 0 && (
                        <Alert
                          type="warning"
                          header="Tiene que cumplir los siguientes requisitos"
                          dismissible
                          onDismiss={() => setAlert([])}
                        >
                          {alert.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </Alert>
                      )}
                      <Table
                        {...collectionProps}
                        trackBy="id"
                        items={items}
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        enableKeyboardNavigation
                        selectionType="single"
                        onRowClick={({ detail }) =>
                          actions.setSelectedItems([detail.item])
                        }
                        wrapLines
                        header={
                          <Header
                            counter={"(" + data.length + ")"}
                            actions={
                              <SpaceBetween direction="horizontal" size="xs">
                                <ButtonDropdown
                                  disabled={
                                    collectionProps.selectedItems.length > 0
                                      ? false
                                      : true
                                  }
                                  variant="normal"
                                  onItemClick={({ detail }) => {
                                    if (detail.id == "action_1_1") {
                                      setType("delete");
                                    } else if (detail.id == "action_1_2") {
                                      setType("edit");
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Eliminar",
                                      id: "action_1_1",
                                    },
                                    {
                                      text: "Editar",
                                      id: "action_1_2",
                                    },
                                  ]}
                                >
                                  Acciones
                                </ButtonDropdown>
                                <Button
                                  onClick={() => {
                                    setType("add");
                                  }}
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
                          id={id}
                          reload={getData}
                          close={() => setType("")}
                          integrantes={integrantes}
                          reset={() => setAlert([])}
                        />
                      ) : type == "delete" ? (
                        <ModalDeleteActividad
                          id={collectionProps.selectedItems[0].id}
                          reload={getData}
                          close={() => setType("")}
                          reset={() => setAlert([])}
                        />
                      ) : (
                        type == "edit" && (
                          <ModalEditActividad
                            item={collectionProps.selectedItems[0]}
                            reload={getData}
                            close={() => setType("")}
                            integrantes={integrantes}
                            reset={() => setAlert([])}
                          />
                        )
                      )}
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Colaboración externa",
                  description:
                    "Documento de compromiso del Cooperante Internacional",
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
                {errors.map((item) => {
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
