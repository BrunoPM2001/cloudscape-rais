import {
  Alert,
  Box,
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
import ModalAddCoResponsable from "./components/modalAddCoResponsable.jsx";
import ModalAddDocente from "./components/modalAddDocente.jsx";
import ModalAddExterno from "./components/modalAddExterno.jsx";
import ModalAddTesista from "./components/modalAddTesista.jsx";
import ModalAddColaborador from "./components/modalAddColaborador.jsx";
import ModalDeleteIntegrante from "./components/modalDeleteIntegrante.jsx";

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
    id: "tipo_integrante",
    header: "Tipo de integrante",
    cell: (item) => item.tipo_integrante,
  },
  {
    id: "nombre",
    header: "Nombre",
    cell: (item) => item.nombre,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "tipo_tesis",
    header: "Tipo tesis",
    cell: (item) => item.tipo_tesis,
  },
  {
    id: "titulo_tesis",
    header: "Título tesis",
    cell: (item) => item.titulo_tesis,
  },
];

const columnDisplay = [
  { id: "tipo_integrante", visible: true },
  { id: "nombre", visible: true },
  { id: "tipo", visible: true },
  { id: "tipo_tesis", visible: true },
  { id: "titulo_tesis", visible: true },
];

const CO_RESPONSABLE_MIN = 1;

export default function Registro_pconfigi_7() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
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
      "investigador/convocatorias/pconfigi/verificar7",
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
      setData(info.integrantes);
    }
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
      if (
        data.filter((item) => item.tipo_integrante == "Co responsable").length <
        CO_RESPONSABLE_MIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " +
            CO_RESPONSABLE_MIN +
            " co responsable"
        );
      }
      if (
        data.filter((item) => item.tipo_integrante == "Tesista").length == 0 &&
        data.filter((item) => item.tipo_integrante == "Colaborador").length == 0
      ) {
        tempErrors.push("Necesita registrar a un Tesista o un Colaborador");
      }

      setAlert(tempErrors);
      if (tempErrors.length == 0) {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso8?" + query;
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
              activeStepIndex={6}
              onCancel={() => {
                window.location.href = "../" + tipo;
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
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados del GI",
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
                                    if (detail.id == "action_1_2") {
                                      setType("delete");
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Eliminar",
                                      id: "action_1_2",
                                      disabled:
                                        collectionProps.selectedItems[0]
                                          ?.tipo_integrante == "Responsable",
                                    },
                                  ]}
                                >
                                  Acciones
                                </ButtonDropdown>
                                <ButtonDropdown
                                  variant="primary"
                                  onItemClick={({ detail }) => {
                                    if (detail.id == "action_2_1") {
                                      setType("addRe");
                                    } else if (detail.id == "action_2_2") {
                                      setType("addDo");
                                    } else if (detail.id == "action_2_3") {
                                      setType("addEx");
                                    } else if (detail.id == "action_2_4") {
                                      setType("addTe");
                                    } else if (detail.id == "action_2_5") {
                                      setType("addCo");
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Co responsable",
                                      id: "action_2_1",
                                      disabled:
                                        data.filter(
                                          (item) =>
                                            item.tipo_integrante ==
                                            "Co responsable"
                                        ).length == 1,
                                    },
                                    {
                                      text: "Docente",
                                      id: "action_2_2",
                                    },
                                    {
                                      text: "Externo",
                                      id: "action_2_3",
                                    },
                                    {
                                      text: "Tesista",
                                      id: "action_2_4",
                                    },
                                    {
                                      text: "Colaborador",
                                      id: "action_2_5",
                                    },
                                  ]}
                                >
                                  Agregar integrante
                                </ButtonDropdown>
                              </SpaceBetween>
                            }
                          >
                            Integrantes del proyecto
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
                      {type == "addRe" ? (
                        <ModalAddCoResponsable
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                        />
                      ) : type == "addDo" ? (
                        <ModalAddDocente
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                        />
                      ) : type == "addEx" ? (
                        <ModalAddExterno
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                        />
                      ) : type == "addTe" ? (
                        <ModalAddTesista
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                        />
                      ) : type == "addCo" ? (
                        <ModalAddColaborador
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeleteIntegrante
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
