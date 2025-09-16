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
import BaseLayout from "../../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalIncluirTitular from "./components/modalIncluirTitular.jsx";
import ModalIncluirExterno from "./components/modalIncluirExterno.jsx";
import ModalIncluirEstudiante from "./components/modalIncluirEstudiante.jsx";
import ModalIncluirEgresado from "./components/modalIncluirEgresado.jsx";
import ModalIncluirColaborador from "./components/modalIncluirColaborador.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Solicitar",
  },
];

const columnDefinitions = [
  {
    id: "condicion",
    header: "Condicion",
    cell: (item) => item.condicion,
    sortingField: "condicion",
    isRowHeader: true,
  },
  {
    id: "cargo",
    header: "Cargo",
    cell: (item) => item.cargo,
    sortingField: "cargo",
  },
  {
    id: "doc_numero",
    header: "Documento de identidad",
    cell: (item) => item.doc_numero,
    sortingField: "doc_numero",
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "codigo_orcid",
    header: "Código orcid",
    cell: (item) => item.codigo_orcid,
    sortingField: "codigo_orcid",
  },
  {
    id: "google_scholar",
    header: "Google Scholar",
    cell: (item) => item.google_scholar,
    sortingField: "google_scholar",
  },
  {
    id: "cti_vitae",
    header: "CTI Vitae",
    cell: (item) => item.cti_vitae,
    sortingField: "cti_vitae",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
];

const columnDisplay = [
  { id: "condicion", visible: true },
  { id: "cargo", visible: true },
  { id: "doc_numero", visible: true },
  { id: "nombres", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "google_scholar", visible: true },
  { id: "cti_vitae", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
];

const TITULARES_MINIMO = 3;
const ADHERENTE_MINIMO = 1;

export default function Solicitar_grupo3() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({ integrantes: [] });
  const [typeModal, setTypeModal] = useState("");
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data.integrantes ?? [],
    {
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar3", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const eliminar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.delete(
      "investigador/grupo/solicitar/eliminarMiembro",
      {
        params: {
          id: collectionProps.selectedItems[0].id,
        },
      }
    );
    const info = res.data;
    pushNotification(info.detail, info.message, notifications.length + 1);
    setLoadingBtn(false);
    getData();
  };

  const siguiente = async (index) => {
    if (index == 3) {
      let tempErrors = [...errors];
      if (
        data.integrantes.filter((item) => item.condicion == "Titular").length <
        TITULARES_MINIMO
      ) {
        tempErrors.push(
          "Su grupo necesita tener al menos " +
            TITULARES_MINIMO +
            " investigadores titulares"
        );
      }
      if (
        data.integrantes.filter((item) => item.condicion == "Adherente")
          .length < ADHERENTE_MINIMO
      ) {
        tempErrors.push(
          "Su grupo necesita tener al menos " + TITULARES_MINIMO + " adherente"
        );
      }
      setErrors(tempErrors);
      if (tempErrors.length == 0) {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso4?" + query;
      }
    } else {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
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
              onNavigate={({ detail }) => siguiente(detail.requestedStepIndex)}
              activeStepIndex={2}
              onCancel={() => {
                window.location.href = "../";
              }}
              steps={[
                {
                  title: "Nombre del grupo",
                  description: "Nombre y nombre corto del GI",
                },
                {
                  title: "Coordinador del grupo",
                  description: "Datos del coordinador",
                },
                {
                  title: "Integrantes del grupo",
                  description: "Miembros del grupo",
                  content: (
                    <SpaceBetween size="m">
                      {errors.length > 0 && (
                        <Alert
                          type="warning"
                          header="Su grupo debe cumplir con los siguientes requisitos"
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
                        items={items}
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        loading={loading}
                        loadingText="Cargando datos"
                        resizableColumns
                        enableKeyboardNavigation
                        selectionType="single"
                        onRowClick={({ detail }) =>
                          actions.setSelectedItems([detail.item])
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
                        header={
                          <Header
                            counter={"(" + data.integrantes.length + ")"}
                            actions={
                              <SpaceBetween direction="horizontal" size="xs">
                                <Button
                                  loading={loadingBtn}
                                  disabled={
                                    !collectionProps.selectedItems.length
                                  }
                                  onClick={eliminar}
                                >
                                  Eliminar
                                </Button>
                                <ButtonDropdown
                                  variant="primary"
                                  loading={loadingBtn}
                                  expandableGroups
                                  items={[
                                    {
                                      id: "action_1_1",
                                      text: "Incluir titular",
                                    },
                                    {
                                      id: "action_1_2",
                                      text: "Incluir adherente",
                                      items: [
                                        {
                                          id: "action_1_2_1",
                                          text: "Externo",
                                        },
                                        {
                                          id: "action_1_2_2",
                                          text: "Estudiante UNMSM",
                                        },
                                        {
                                          id: "action_1_2_3",
                                          text: "Egresado UNMSM",
                                        },
                                      ],
                                    },
                                  ]}
                                  onItemClick={({ detail }) => {
                                    if (detail.id == "action_1_1") {
                                      setTypeModal("Titular");
                                    } else if (detail.id == "action_1_3") {
                                      setTypeModal("Colaborador");
                                    } else if (detail.id == "action_1_2_1") {
                                      setTypeModal("Externo");
                                    } else if (detail.id == "action_1_2_2") {
                                      setTypeModal("Estudiante");
                                    } else if (detail.id == "action_1_2_3") {
                                      setTypeModal("Egresado");
                                    }
                                  }}
                                >
                                  Incluir
                                </ButtonDropdown>
                              </SpaceBetween>
                            }
                          >
                            Miembros del grupo
                          </Header>
                        }
                        pagination={<Pagination {...paginationProps} />}
                      />
                      {typeModal == "Titular" ? (
                        <ModalIncluirTitular
                          close={() => setTypeModal("")}
                          reload={getData}
                          grupo_id={id}
                        />
                      ) : typeModal == "Colaborador" ? (
                        <ModalIncluirColaborador
                          close={() => setTypeModal("")}
                          reload={getData}
                          grupo_id={id}
                        />
                      ) : typeModal == "Externo" ? (
                        <ModalIncluirExterno
                          close={() => setTypeModal("")}
                          reload={getData}
                          grupo_id={id}
                        />
                      ) : typeModal == "Estudiante" ? (
                        <ModalIncluirEstudiante
                          close={() => setTypeModal("")}
                          reload={getData}
                          grupo_id={id}
                        />
                      ) : (
                        typeModal == "Egresado" && (
                          <ModalIncluirEgresado
                            close={() => setTypeModal("")}
                            reload={getData}
                            grupo_id={id}
                          />
                        )
                      )}
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Información del grupo de investigación",
                  description: "Detalles y líneas de investigación",
                },
                {
                  title: "Proyectos de investigación",
                  description:
                    "De los integrantes (proyectos de los últimos 7 años)",
                },
                {
                  title: "Resultados de investigación",
                  description:
                    "Publicaciones más relevantes de los integrantes",
                },
                {
                  title: "Infraestructura",
                  description: "Ambientes físicos y laboratorios",
                },
                {
                  title: "Datos de contacto",
                  description: "Deben corresponder al grupo",
                },
                {
                  title: "Envío de solicitud",
                  description: "Previsualización de solicitud",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede solicitar la creación de un nuevo grupo"
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
