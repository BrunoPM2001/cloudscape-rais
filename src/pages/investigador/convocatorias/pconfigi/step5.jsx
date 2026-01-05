import {
  Alert,
  Badge,
  Box,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Header,
  Link,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddPartida from "./components/modalAddPartida.jsx";
import ModalDeletePartida from "./components/modalDeletePartida.jsx";
import ModalEditPartida from "./components/modalEditPartida.jsx";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalRubros from "./components/modalRubros.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de investigación con financiamiento",
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

const columnDisplay = [
  { id: "partida", visible: true },
  { id: "justificacion", visible: true },
  { id: "tipo", visible: true },
  { id: "monto", visible: true },
];

const MIN_BIENES = 1;

export default function Registro_pconfigi_5() {
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
  const [alertPresupuesto, setAlertPresupuesto] = useState(true);
  const [alertVisible, setAlertVisible] = useState(true);
  const excedidos = [];
  //  Hooks
  const { items, collectionProps, actions } = useCollection(data.presupuesto, {
    selection: {},
  });
  const formatNumber = (number) => {
    return number.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi/verificar5",
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
    if (index < 5) {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
    } else {
      let tempErrors = [...errors];
      const totalMonto = items
        .filter((item) => item.partida_id !== 61) // Excluir partida_id 61
        .reduce((sum, item) => sum + parseFloat(item.monto), 0); // Convertir monto a número

      if (totalMonto < 16000) {
        tempErrors.push(
          "El monto total minimo para postular a esta convocatoria es de S/. 16,000.00"
        );
      }
      if (totalMonto > 40000) {
        tempErrors.push(
          "El monto total máximo para postular a esta convocatoria es de S/. 40,000.00"
        );
      }

      setAlert(tempErrors);
      if (tempErrors.length == 0 && excedidos.length == 0) {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso6?" + query;
      }
    }
  };

  const limits = {
    pasajesViaticos: 6000,
    servicioTerceros: 10000,
    movilidadLocal: 800,
    serviciosDiversos: 10000,
    consultoriaEspecializada: 5000,
    asesoriaEspecializada: 5000,
    materialesInsumos: 32000,
    utilesLimpieza: 800,
    equiposBienes: 32000,
  };

  const categories = {
    pasajesViaticos: [66, 68, 38, 39, 67, 69],
    servicioTerceros: [70, 71, 43, 41, 44, 57, 46, 47, 48, 45, 52],
    movilidadLocal: [40],
    serviciosDiversos: [49, 73],
    consultoriaEspecializada: [78, 50, 74, 55, 56],
    asesoriaEspecializada: [79],
    materialesInsumos: [4, 5, 9, 16, 22, 13, 14, 23],
    utilesLimpieza: [6, 7],
    equiposBienes: [26, 27, 76, 35],
  };

  const categoryNames = {
    pasajesViaticos: "Pasajes y Viáticos",
    servicioTerceros: "Servicios de Terceros",
    movilidadLocal: "Movilidad Local",
    serviciosDiversos: "Servicios Diversos",
    consultoriaEspecializada: "Consultoria Especializada",
    asesoriaEspecializada: "Asesoría Especializada",
    materialesInsumos: "Materiales e Insumos",
    utilesLimpieza: "Útiles de Limpieza",
    equiposBienes: "Equipos y Bienes",
  };

  // 🔒 Determina qué categorías ya excedieron su límite
  const getBlockedCategories = (presupuesto) => {
    const blocked = {};

    Object.entries(categories).forEach(([category, partidaIds]) => {
      let total = 0;

      presupuesto.forEach((p) => {
        if (partidaIds.includes(p.partida_id)) {
          total += Number(p.monto);
        }
      });

      blocked[category] = total >= limits[category];
    });

    return blocked;
  };

  // 🔎 Devuelve la categoría a la que pertenece una partida
  const getCategoryByPartidaId = (partidaId) => {
    return Object.entries(categories).find(([_, ids]) =>
      ids.includes(partidaId)
    )?.[0];
  };

  const blockedCategories = getBlockedCategories(data.presupuesto);

  const partidasConBloqueo = data.partidas.map((p) => {
    const category = getCategoryByPartidaId(p.value); // 👈 usar value
    const blocked = blockedCategories[category];

    return {
      ...p,                     // 👈 conserva value y label existentes
      disabled: blocked === true,
      disabledReason: blocked
        ? `Límite alcanzado en ${categoryNames[category]}`
        : null,
    };
  });

  // Función para calcular y verificar los montos
  Object.entries(categories).forEach(([category, partidaIds]) => {
    let total = 0;

    // Sumar los montos de las partidas que pertenecen a la categoría
    data.presupuesto.forEach((partida) => {
      if (partidaIds.includes(partida.partida_id)) {
        total += parseFloat(partida.monto);
      }
    });

    // Verificar si excede el límite
    if (total > limits[category]) {
      excedidos.push(
        `Excedió el presupuesto para ${
          categoryNames[category]
        }. Total: S/. ${formatNumber(total)}, Límite: S/. ${formatNumber(
          limits[category]
        )}`
      );
    }
  });


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
                window.location.href = "../";
              }}
              steps={[
                {
                  title: "Información general",
                  description: "Información general",
                },
                {
                  title: "Colaboración externa",
                  description:
                    "Documento que acredita financiamiento y/o asistencia técnica externa para el desarrollo del proyecto",
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades",
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                  content: (
                    <SpaceBetween size="m">
                      {excedidos.length > 0 && alertPresupuesto && (
                        <Alert
                          type="warning"
                          header="Tiene que cumplir los siguientes requisitos"
                          dismissible
                          onDismiss={() => setAlertPresupuesto(false)}
                        >
                          {excedidos.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </Alert>
                      )}
                      {alertVisible && (
                        <Alert
                          type="info"
                          statusIconAriaLabel="Info"
                          dismissible
                          onDismiss={() => setAlertVisible(false)}
                          header="Artículo 10° Del incentivo a los investigadores que participan en el proyecto de investigación con financiamiento"
                        >
                          <ul>
                            <li>
                              a) El incentivo a los investigadores será incluido
                              en el presupuesto del proyecto posterior a la
                              evaluación y según el orden de mérito obtenido.
                            </li>
                            <li>
                              b) El incentivo económico asignado a los
                              investigadores será de 8,000 soles.
                            </li>
                          </ul>
                        </Alert>
                      )}
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
                              "Monto máximo: S/40,000.00, monto disponible: S/" +
                              (40000 -
                                Number(
                                  items.reduce(
                                    (sum, item) =>
                                      sum + Number(item.monto) || 0,
                                    0
                                  )
                                ))
                            }
                            info={
                              <Link
                                onClick={() => setType("info")}
                                variant="info"
                              >
                                Rubros financiables
                              </Link>
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
                                  onClick={() => setType("add")}
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
                          options={partidasConBloqueo}
                          presupuesto={data.presupuesto}
                          limit={parseFloat(
                            40000 -
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
                          item={collectionProps.selectedItems[0]}
                          options={data.partidas}
                          presupuesto={data.presupuesto}
                          limit={parseFloat(
                            40000 -
                              items.reduce(
                                (acc, curr) => acc + Number(curr.monto),
                                0
                              ) +
                              Number(collectionProps.selectedItems[0].monto)
                          ).toFixed(2)}
                        />
                      ) : type == "info" ? (
                        <ModalRubros close={() => setType("")} />
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
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados del GI",
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
