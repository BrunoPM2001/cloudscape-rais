import {
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
import ModalAgregarDocente from "./components/modalAgregarDocente";
import ModalAgregarTesista from "./components/modalAgregarTesista";
import ModalEliminarMiembro from "./components/modalEliminarMiembro";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de proyectos FEX",
    href: "../proyectos_fex",
  },
  {
    text: "Registrar",
  },
];

export default function Registrar_proyecto_fex_4() {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, actions, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      id,
    });
    window.location.href =
      "paso_" + detail.requestedStepIndex + 1 + "?" + query;
  };

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/proyectosFEX/datosPaso4", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const goBack = async () => {
    window.location.href = "../proyectos_fex";
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
          window.location.href = "../proyectos_fex";
        }}
        submitButtonText="Salir"
        onSubmit={goBack}
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
              <>
                <Table
                  {...collectionProps}
                  trackBy="id"
                  columnDefinitions={[
                    {
                      id: "tipo_integrante",
                      header: "Tipo de integrante",
                      cell: (item) => item.tipo_integrante,
                      isRowHeader: true,
                    },
                    {
                      id: "nombre",
                      header: "Nombres",
                      cell: (item) => item.nombre,
                    },
                    {
                      id: "doc_numero",
                      header: "N° documento",
                      cell: (item) => item.doc_numero,
                    },
                    {
                      id: "facultad",
                      header: "Facultad",
                      cell: (item) => item.facultad,
                    },
                  ]}
                  columnDisplay={[
                    { id: "tipo_integrante", visible: true },
                    { id: "nombre", visible: true },
                    { id: "doc_numero", visible: true },
                    { id: "facultad", visible: true },
                  ]}
                  selectionType="single"
                  items={items}
                  loading={loading}
                  loadingText="Cargando datos"
                  onRowClick={({ detail }) =>
                    actions.setSelectedItems([detail.item])
                  }
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
                                id: "action_5",
                                text: "Eliminar",
                              },
                            ]}
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_5") {
                                setType("delete");
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
                            ]}
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_1") {
                                setType("addDo");
                              } else if (detail.id == "action_2") {
                                setType("addTe");
                              }
                            }}
                            disabled={loading}
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
                {type == "addDo" ? (
                  <ModalAgregarDocente
                    id={id}
                    close={() => setType("")}
                    reload={getData}
                  />
                ) : type == "addTe" ? (
                  <ModalAgregarTesista
                    id={id}
                    close={() => setType("")}
                    reload={getData}
                  />
                ) : (
                  type == "delete" && (
                    <ModalEliminarMiembro
                      id={collectionProps.selectedItems[0].id}
                      close={() => setType("")}
                      reload={getData}
                    />
                  )
                )}
              </>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
