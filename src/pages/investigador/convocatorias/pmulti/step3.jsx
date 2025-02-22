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
import BaseLayout from "../../components/baseLayout";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddCoResponsable from "./components/modalAddCoResponsable";
import ModalDeleteIntegrante from "./components/modalDeleteIntegrante";
import ModalAddDocente from "./components/modalAddDocente.jsx";
import ModalAddTesista from "./components/modalAddTesista.jsx";
import ModalAddGestor from "./components/modalAddGestor.jsx";

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
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
  },
  {
    id: "url",
    header: "Carta compromiso",
    cell: (item) =>
      item.tipo_integrante != "Tesista" &&
      item.tipo_integrante != "Miembro externo" && (
        <Box textAlign="center">
          <Button
            iconName="download"
            variant="inline-icon"
            href={item.url}
            target="_blank"
          />
        </Box>
      ),
    minWidth: 95,
  },
  {
    id: "tipo_tesis",
    header: "Tipo de tesis",
    cell: (item) => item.tipo_tesis,
  },
  {
    id: "titulo_tesis",
    header: "Título de tesis",
    cell: (item) => item.titulo_tesis,
  },
];

const columnDisplay = [
  { id: "tipo_integrante", visible: true },
  { id: "nombre", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "grupo", visible: true },
  { id: "url", visible: true },
  { id: "tipo_tesis", visible: true },
  { id: "titulo_tesis", visible: true },
];

const FACULTADES_MIN = 3;
const GRUPOS_MIN = 3;
const TESISTA_PRE_MIN = 2;
const TESISTA_POS_MIN = 1;

const CORRESPONSAL_MIN = 1;
const DOCENTE_MIN = 2;
const TESISTA_MIN = 3;
const GESTOR_ADMIN = 1;

export default function Registro_pmulti_3() {
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
      "investigador/convocatorias/pmulti/verificar3",
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
    if (index < 3) {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
    } else {
      let tempErrors = [...errors];
      if (
        data.filter((item) => item.tipo_integrante == "Co responsable").length <
        CORRESPONSAL_MIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " + CORRESPONSAL_MIN + " corresponsable"
        );
      }

      if (
        data.filter((item) => item.tipo_integrante == "Miembro docente")
          .length < DOCENTE_MIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " + DOCENTE_MIN + " miembros docentes"
        );
      }

      if (
        data.filter((item) => item.tipo_integrante == "Tesista").length <
        TESISTA_MIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " + TESISTA_MIN + " tesistas"
        );
      }

      if (
        new Set(
          data
            .map((item) => item.facultad)
            .filter((facultad) => facultad != null)
        ).size < FACULTADES_MIN
      ) {
        tempErrors.push(
          "Es obligatorio que exista un mínimo de " +
            FACULTADES_MIN +
            " facultades distintas dentro de los integrantes"
        );
      }

      if (
        new Set(
          data
            .map((item) => item.grupo_nombre_corto)
            .filter((grupo_nombre_corto) => grupo_nombre_corto != null)
        ).size < GRUPOS_MIN
      ) {
        tempErrors.push(
          "Es obligatorio que exista un mínimo de " +
            GRUPOS_MIN +
            " grupos distintos dentro de los integrantes"
        );
      }

      if (
        data.filter((item) => item.tipo == "Estudiante pregrado").length <
        TESISTA_PRE_MIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " +
            TESISTA_PRE_MIN +
            " tesista de pregrado"
        );
      }

      if (
        data.filter((item) => item.tipo == "Estudiante posgrado").length <
        TESISTA_POS_MIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " +
            TESISTA_POS_MIN +
            " tesista de posgrado"
        );
      }

      if (
        data.filter((item) => item.tipo_integrante == "Gestor Administrativo")
          .length < GESTOR_ADMIN
      ) {
        tempErrors.push(
          "Necesita registrar al menos " +
            GESTOR_ADMIN +
            " gestor administrativo"
        );
      }

      setAlert(tempErrors);
      if (tempErrors.length == 0) {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso4?" + query;
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
              activeStepIndex={2}
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
                                      setType("addCo");
                                    } else if (detail.id == "action_2_2") {
                                      setType("addDo");
                                    } else if (detail.id == "action_2_3") {
                                      setType("addTe");
                                    } else if (detail.id == "action_2_4") {
                                      setType("addEx");
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
                                      text: "Miembro docente",
                                      id: "action_2_2",
                                    },
                                    {
                                      text: "Tesista",
                                      id: "action_2_3",
                                    },
                                    {
                                      text: "Gestor administrativo",
                                      id: "action_2_4",
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
                      {type == "addCo" ? (
                        <ModalAddCoResponsable
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                          reset={() => setAlert([])}
                        />
                      ) : type == "addDo" ? (
                        <ModalAddDocente
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                          reset={() => setAlert([])}
                        />
                      ) : type == "addTe" ? (
                        <ModalAddTesista
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                          reset={() => setAlert([])}
                        />
                      ) : type == "addEx" ? (
                        <ModalAddGestor
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                          reset={() => setAlert([])}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeleteIntegrante
                            close={() => setType("")}
                            reload={getData}
                            id={collectionProps.selectedItems[0].id}
                            reset={() => setAlert([])}
                          />
                        )
                      )}
                    </SpaceBetween>
                  ),
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
