import {
  Alert,
  Badge,
  Box,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Header,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useLocation } from "react-router-dom";
import BaseLayout from "../../components/baseLayout";
import axiosBase from "../../../../api/axios";
import ModalAddPartida from "./components/modalAddPartida";
import ModalDeletePartida from "./components/modalDeletePartida";
import queryString from "query-string";
import ModalEditPartida from "./components/modalEditPartida";

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
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
  },
  {
    id: "justificacion",
    header: "Justificación",
    cell: (item) => item.justificacion,
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
];

const MAX = 500000;

const columnDisplay = [
  { id: "partida", visible: true },
  { id: "justificacion", visible: true },
  { id: "tipo", visible: true },
  { id: "monto", visible: true },
];

export default function Registro_pmulti_6() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    presupuesto: [],
    partidas: [],
    montos: {},
  });
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState([]);

  //  Hooks
  const { items, collectionProps, actions } = useCollection(data.presupuesto, {
    selection: {},
  });
  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pmulti/verificar6",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setErrors([]);
    setLoading(false);
  };

  const handleNavigate = (index) => {
    if (index < 6) {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
    } else {
      let tempErrors = [...errors];
      const totalMonto = items.reduce(
        (sum, item) => sum + parseFloat(item.monto),
        0
      );

      if (totalMonto < 250000) {
        tempErrors.push(
          "El monto total minimo para postular a esta convocatoria es de S/. 250,000.00"
        );
      }
      if (totalMonto > MAX) {
        tempErrors.push(
          "El monto total máximo para postular a esta convocatoria es de S/. 500,000.00"
        );
      }

      setAlert(tempErrors);
      if (tempErrors.length == 0) {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso7?" + query;
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
              activeStepIndex={5}
              onCancel={() => {
                window.location.href = "../";
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
                },
                {
                  title: "Presupuesto",
                  description:
                    "Montos y partidas (Monto disponible entre: S/250,000 y S/500,000)",
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
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        wrapLines
                        items={items}
                        selectionType="single"
                        onRowClick={({ detail }) =>
                          actions.setSelectedItems([detail.item])
                        }
                        header={
                          <Header
                            variant="h3"
                            description={
                              "Saldo disponible S./ " +
                              (MAX -
                                Number(
                                  items.reduce(
                                    (sum, item) =>
                                      sum + Number(item.monto) || 0,
                                    0
                                  )
                                ))
                            }
                            actions={
                              <SpaceBetween size="xs" direction="horizontal">
                                <ButtonDropdown
                                  disabled={
                                    collectionProps.selectedItems.length == 0
                                  }
                                  variant="normal"
                                  onItemClick={({ detail }) => {
                                    if (detail.id == "action_1_1") {
                                      setType("delete");
                                    } else if (detail.id == "action_1_2") {
                                      setType("update");
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Eliminar",
                                      id: "action_1_1",
                                      disabled:
                                        collectionProps.selectedItems[0]
                                          ?.partida_id == 61,
                                    },
                                    {
                                      text: "Editar",
                                      id: "action_1_2",
                                      disabled:
                                        collectionProps.selectedItems[0]
                                          ?.partida_id == 61,
                                    },
                                  ]}
                                >
                                  Acciones
                                </ButtonDropdown>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    setType("add");
                                  }}
                                  disabled={
                                    MAX -
                                      Number(
                                        items.reduce(
                                          (sum, item) =>
                                            sum + Number(item.monto) || 0,
                                          0
                                        )
                                      ) ==
                                    0
                                  }
                                >
                                  Añadir
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Partidas
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
                        footer={
                          <ColumnLayout columns={3} variant="text-grid">
                            <div>
                              <Box variant="awsui-key-label">
                                Bienes ({data.info.bienes_cantidad})
                              </Box>
                              <SpaceBetween direction="horizontal" size="xxs">
                                <Badge color="green">
                                  S/. {data.info.bienes_monto}
                                </Badge>
                                <Badge color="blue">
                                  {data.info.bienes_porcentaje + "%"}
                                </Badge>
                              </SpaceBetween>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Servicios ({data.info.servicios_cantidad})
                              </Box>
                              <SpaceBetween direction="horizontal" size="xxs">
                                <Badge color="green">
                                  S/. {data.info.servicios_monto}
                                </Badge>
                                <Badge color="blue">
                                  {data.info.servicios_porcentaje + "%"}
                                </Badge>
                              </SpaceBetween>
                            </div>
                            <div>
                              <Box variant="awsui-key-label">
                                Otros ({data.info.otros_cantidad})
                              </Box>
                              <SpaceBetween direction="horizontal" size="xxs">
                                <Badge color="green">
                                  S/. {data.info.otros_monto}
                                </Badge>
                                <Badge color="blue">
                                  {data.info.otros_porcentaje + "%"}
                                </Badge>
                              </SpaceBetween>
                            </div>
                          </ColumnLayout>
                        }
                      />
                      {type == "add" ? (
                        <ModalAddPartida
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                          options={data.partidas}
                          presupuesto={data.presupuesto}
                          limit={parseFloat(
                            MAX -
                              items.reduce(
                                (acc, curr) => acc + Number(curr.monto),
                                0
                              )
                          ).toFixed(2)}
                        />
                      ) : type == "update" ? (
                        <ModalEditPartida
                          close={() => setType("")}
                          reload={getData}
                          id={collectionProps.selectedItems[0].id}
                          limit={parseFloat(
                            MAX -
                              items.reduce(
                                (acc, curr) => acc + Number(curr.monto),
                                0
                              ) +
                              Number(collectionProps.selectedItems[0].monto)
                          ).toFixed(2)}
                          item={collectionProps.selectedItems[0]}
                          options={data.partidas}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeletePartida
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
