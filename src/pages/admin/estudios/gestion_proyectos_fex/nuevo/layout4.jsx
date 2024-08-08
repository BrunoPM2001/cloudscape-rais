import {
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
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de proyectos FEX",
  },
  {
    text: "Registrar",
    href: "../proyectos_fex",
  },
];

export default function Registrar_proyecto_fex_4() {
  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      id,
    });
    if (detail.requestedStepIndex > 1) {
      window.location.href = "paso_4?" + query;
    } else {
      window.location.href = "paso_2?" + query;
    }
  };

  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("admin/estudios/proyectosFEX/datosPaso4", {
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
          window.location.href = "../proyectos_fex";
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
                    id: "nombres",
                    header: "Nombres",
                    cell: (item) => item.nombres,
                  },
                  {
                    id: "doc_numero",
                    header: "N° documento",
                    cell: (item) => item.doc_numero,
                  },
                  {
                    id: "responsable",
                    header: "Responsable",
                    cell: (item) => item.responsable,
                  },
                  {
                    id: "facultad",
                    header: "Facultad",
                    cell: (item) => item.facultad,
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
            ),
          },
          {
            title: "Integrantes",
          },
        ]}
      />
    </BaseLayout>
  );
}
