import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
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
import queryString from "query-string";
import ModalAddDoc from "./components/modalAddDoc";
import ModalDeleteDoc from "./components/modalDeleteDoc";

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
    id: "comentario",
    header: "Comentario",
    cell: (item) => item.comentario,
  },
  {
    id: "url",
    header: "Carta compromiso",
    cell: (item) => (
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
];

const columnDisplay = [
  { id: "comentario", visible: true },
  { id: "url", visible: true },
];

export default function Registro_pmulti_7() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);

  //  Hooks
  const { items, collectionProps, actions } = useCollection(data, {
    selection: {},
  });
  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pmulti/verificar7",
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
      setData(info.docs);
    }
    setLoading(false);
  };

  const handleNavigate = (index) => {
    const query = queryString.stringify({
      id,
    });
    window.location.href = "paso" + (index + 1) + "?" + query;
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
                  description: "Montos y partidas",
                },
                {
                  title: "Colaboración externa",
                  description:
                    "Documento de compromiso del Cooperante Internacional",
                  content: (
                    <SpaceBetween size="m">
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
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Eliminar",
                                      id: "action_1_1",
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
                                >
                                  Añadir
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Documentos
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
                      {type == "add" ? (
                        <ModalAddDoc
                          close={() => setType("")}
                          reload={getData}
                          id={id}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeleteDoc
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
