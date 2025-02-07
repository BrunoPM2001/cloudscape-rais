import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import ModalAgregarDoc from "./components/modalAgregarDoc";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalEditarDoc from "./components/modalEditarDoc";
import ModalEliminar from "./components/modalEliminar";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Proyectos FEX",
  },
  {
    text: "Registrar",
    href: "../proyectos_fex",
  },
];

export default function Registrar_proyecto_fex_3() {
  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState({
    documentos: [],
  });
  const [type, setType] = useState("");
  const [doc_tipo, setDoc_tipo] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, collectionProps } = useCollection(data.documentos, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      id,
    });
    window.location.href =
      "paso" + (detail.requestedStepIndex + 1) + "?" + query;
  };

  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("investigador/actividades/fex/datosPaso3", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoadingData(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Registrar o actualizar la información de un proyecto FEX."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={2}
        onCancel={() => {
          window.location.href = "../proyectosFex";
        }}
        steps={[
          {
            title: "Datos básicos",
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Documentos",
            description: "Convenios, contratos, presupuesto o resoluciones",
            content: (
              <SpaceBetween size="m">
                {data.proyecto?.estado == 2 && (
                  <Alert type="warning" header="Observación">
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {data.proyecto.observaciones_admin}
                    </div>
                  </Alert>
                )}
                <Table
                  {...collectionProps}
                  trackBy="id"
                  columnDefinitions={[
                    {
                      id: "doc_tipo",
                      header: "Tipo de documento",
                      cell: (item) => {
                        switch (item.doc_tipo) {
                          case "D01":
                            return "Convenio, contrato o lo que haga sus veces";
                          case "D04":
                            return "Proyecto propuesto (última versión aprobada)";
                          case "D12":
                            return "Resolución rectoral (RR)";
                          default:
                            return "Tipo de documento desconocido";
                        }
                      },
                      isRowHeader: true,
                      minWidth: 200,
                    },
                    {
                      id: "nombre",
                      header: "Nombre",
                      cell: (item) => item.nombre,
                      minWidth: 200,
                    },
                    {
                      id: "comentario",
                      header: "Comentario",
                      cell: (item) => item.comentario,
                      minWidth: 200,
                    },
                    {
                      id: "fecha",
                      header: "Fecha",
                      cell: (item) => item.fecha,
                      minWidth: 115,
                    },
                    {
                      id: "url",
                      header: "Archivo",
                      cell: (item) => (
                        <Button
                          iconName="download"
                          variant="inline-icon"
                          href={item.url}
                          target="_blank"
                        />
                      ),
                      minWidth: 95,
                    },
                  ]}
                  columnDisplay={[
                    { id: "doc_tipo", visible: true },
                    { id: "nombre", visible: true },
                    { id: "comentario", visible: true },
                    { id: "fecha", visible: true },
                    { id: "url", visible: true },
                  ]}
                  selectionType="single"
                  items={items}
                  loading={loadingData}
                  loadingText="Cargando datos"
                  wrapLines
                  header={
                    <Header
                      variant="h3"
                      actions={
                        <SpaceBetween size="xs" direction="horizontal">
                          <ButtonDropdown
                            disabled={collectionProps.selectedItems.length == 0}
                            items={[
                              {
                                id: "action_4",
                                text: "Editar",
                              },
                              {
                                id: "action_5",
                                text: "Eliminar",
                              },
                            ]}
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_4") {
                                setType("update");
                              } else if (detail.id == "action_5") {
                                setType("delete");
                              }
                            }}
                          >
                            Acciones
                          </ButtonDropdown>
                          <ButtonDropdown
                            items={[
                              {
                                id: "action_1",
                                text: "Convenio, contrato o lo que haga sus veces",
                              },
                              {
                                id: "action_2",
                                text: "Proyecto propuesto (última versión aprobada)",
                              },
                              {
                                id: "action_3",
                                text: "Resolución rectoral (RR)",
                              },
                            ]}
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_1") {
                                setDoc_tipo("D01");
                                setType("add");
                              } else if (detail.id == "action_2") {
                                setDoc_tipo("D04");
                                setType("add");
                              } else if (detail.id == "action_3") {
                                setDoc_tipo("D12");
                                setType("add");
                              }
                            }}
                          >
                            Agregar doc
                          </ButtonDropdown>
                        </SpaceBetween>
                      }
                    >
                      Documentos cargados
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
          {
            title: "Integrantes",
          },
          {
            title: "Envío de propuesta",
          },
        ]}
      />
      {type == "add" ? (
        <ModalAgregarDoc
          id={id}
          doc_tipo={doc_tipo}
          close={() => setType("")}
          reload={getData}
        />
      ) : type == "update" ? (
        <ModalEditarDoc
          item={collectionProps.selectedItems[0]}
          close={() => setType("")}
          reload={getData}
        />
      ) : (
        type == "delete" && (
          <ModalEliminar
            id={collectionProps.selectedItems[0].id}
            close={() => setType("")}
            reload={getData}
          />
        )
      )}
    </BaseLayout>
  );
}
