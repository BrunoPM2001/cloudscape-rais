import {
  Alert,
  Box,
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
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddDocente from "./components/modalAddDocente";
import ModalAddEstudiante from "./components/modalAddEstudiante";
import ModalAddExterno from "./components/modalAddExterno";
import ModalEliminarIntegrante from "./components/modalEliminarIntegrante";

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

export default function Registrar_proyecto_fex_4() {
  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState({
    integrantes: [],
  });
  const [modal, setModal] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, actions, collectionProps } = useCollection(data.integrantes, {
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
    const res = await axiosBase.get("investigador/actividades/fex/datosPaso4", {
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
        activeStepIndex={3}
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
          },
          {
            title: "Integrantes",
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
                  trackBy="doc_numero"
                  columnDefinitions={[
                    {
                      id: "tipo_integrante",
                      header: "Tipo de integrante",
                      cell: (item) => item.tipo_integrante,
                      isRowHeader: true,
                      minWidth: 130,
                    },
                    {
                      id: "nombres",
                      header: "Nombres",
                      cell: (item) => item.nombres,
                      minWidth: 125,
                    },
                    {
                      id: "doc_numero",
                      header: "N° documento",
                      cell: (item) => item.doc_numero,
                      minWidth: 120,
                    },
                    {
                      id: "responsable",
                      header: "Responsable",
                      cell: (item) => item.responsable,
                      minWidth: 130,
                    },
                    {
                      id: "facultad",
                      header: "Facultad",
                      cell: (item) => item.facultad,
                      minWidth: 110,
                    },
                  ]}
                  columnDisplay={[
                    { id: "tipo_integrante", visible: true },
                    { id: "nombres", visible: true },
                    { id: "doc_numero", visible: true },
                    { id: "responsable", visible: true },
                    { id: "facultad", visible: true },
                  ]}
                  selectionType="single"
                  items={items}
                  loading={loadingData}
                  loadingText="Cargando datos"
                  wrapLines
                  onRowClick={({ detail }) =>
                    actions.setSelectedItems([detail.item])
                  }
                  header={
                    <Header
                      variant="h3"
                      actions={
                        <SpaceBetween size="xs" direction="horizontal">
                          <ButtonDropdown
                            disabled={collectionProps.selectedItems.length == 0}
                            items={[
                              {
                                id: "action_5",
                                text: "Eliminar",
                                disabled:
                                  collectionProps.selectedItems[0]
                                    ?.responsable == "Sí",
                              },
                            ]}
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_5") {
                                setModal("deleteMiembro");
                              }
                            }}
                          >
                            Acciones
                          </ButtonDropdown>
                          <ButtonDropdown
                            variant="primary"
                            items={[
                              {
                                id: "action_1",
                                text: "Docente",
                              },
                              {
                                id: "action_2",
                                text: "Tesista",
                              },
                              {
                                id: "action_3",
                                text: "Externo",
                              },
                            ]}
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_1") {
                                setModal("addDocente");
                              } else if (detail.id == "action_2") {
                                setModal("addTesista");
                              } else if (detail.id == "action_3") {
                                setModal("addExterno");
                              }
                            }}
                          >
                            Agregar
                          </ButtonDropdown>
                        </SpaceBetween>
                      }
                    >
                      Integrantes
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
            title: "Envío de propuesta",
          },
        ]}
      />
      {modal == "addDocente" ? (
        <ModalAddDocente
          close={() => setModal("")}
          proyecto_id={id}
          reload={getData}
        />
      ) : modal == "addTesista" ? (
        <ModalAddEstudiante
          close={() => setModal("")}
          proyecto_id={id}
          reload={getData}
        />
      ) : modal == "addExterno" ? (
        <ModalAddExterno
          close={() => setModal("")}
          proyecto_id={id}
          reload={getData}
        />
      ) : (
        modal == "deleteMiembro" && (
          <ModalEliminarIntegrante
            id={collectionProps.selectedItems[0].id}
            close={() => setModal("")}
            reload={getData}
          />
        )
      )}
    </BaseLayout>
  );
}
