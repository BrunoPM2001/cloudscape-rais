import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAutorDocente from "./components/modalAutorDocente.jsx";
import ModalAutorExterno from "./components/modalAutorExterno.jsx";
import ModalAutorEstudiante from "./components/modalAutorEstudiante.jsx";
import ModalDeleteAutor from "./components/modalDeleteAutor.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Patentes",
  },
  {
    text: "Registrar",
  },
];

const columnDefinitions = [
  {
    id: "condicion",
    header: "Tipo",
    cell: (item) => item.condicion,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "tipo",
    header: "Condición",
    cell: (item) => item.tipo,
  },
  {
    id: "es_presentador",
    header: "Presentador",
    cell: (item) => (
      <Badge color={item.es_presentador == 1 ? "green" : "red"}>
        {item.es_presentador == 1 ? "Sí" : "No"}
      </Badge>
    ),
  },
];

const columnDisplay = [
  { id: "condicion", visible: true },
  { id: "nombres", visible: true },
  { id: "tipo", visible: true },
  { id: "es_presentador", visible: true },
];

export default function Registrar_patente_3() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const { items, actions, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/propiedadInt/verificar3",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setData(data);
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
        <Wizard
          onNavigate={({ detail }) => handleNavigate(detail.requestedStepIndex)}
          activeStepIndex={2}
          onCancel={() => {
            window.location.href = ".";
          }}
          steps={[
            {
              title: "Descripción de la propiedad intelectual",
              description: "Metadata de la patente",
            },
            {
              title: "Manejo de titulares",
              description: "Listado de titulares",
            },
            {
              title: "Autores de la patente",
              description: "Listado de autores de esta patente",
              content: (
                <>
                  <Table
                    {...collectionProps}
                    trackBy="id"
                    items={items}
                    columnDefinitions={columnDefinitions}
                    columnDisplay={columnDisplay}
                    loading={loading}
                    loadingText="Cargando datos"
                    wrapLines
                    enableKeyboardNavigation
                    selectionType="single"
                    onRowClick={({ detail }) =>
                      actions.setSelectedItems([detail.item])
                    }
                    header={
                      <Header
                        variant="h3"
                        actions={
                          <SpaceBetween size="xs" direction="horizontal">
                            <Button
                              disabled={
                                collectionProps.selectedItems.length == 0 ||
                                collectionProps.selectedItems[0]
                                  .es_presentador == 1
                              }
                              onClick={() => setType("delete")}
                            >
                              Eliminar
                            </Button>
                            <ButtonDropdown
                              items={[
                                {
                                  text: "Docente",
                                  id: "action_1",
                                },
                                {
                                  text: "Alumno",
                                  id: "action_2",
                                },
                                {
                                  text: "Externo",
                                  id: "action_3",
                                },
                              ]}
                              onItemClick={({ detail }) => {
                                if (detail.id == "action_1") {
                                  setType("docente");
                                } else if (detail.id == "action_2") {
                                  setType("estudiante");
                                } else if (detail.id == "action_3") {
                                  setType("externo");
                                }
                              }}
                              variant="primary"
                            >
                              Agregar autor
                            </ButtonDropdown>
                          </SpaceBetween>
                        }
                      >
                        Inventor/ Autor
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
                  {type == "docente" ? (
                    <ModalAutorDocente
                      close={() => setType("")}
                      reload={getData}
                      id={id}
                    />
                  ) : type == "estudiante" ? (
                    <ModalAutorEstudiante
                      close={() => setType("")}
                      reload={getData}
                      id={id}
                    />
                  ) : type == "externo" ? (
                    <ModalAutorExterno
                      close={() => setType("")}
                      reload={getData}
                      id={id}
                    />
                  ) : (
                    type == "delete" && (
                      <ModalDeleteAutor
                        close={() => setType("")}
                        reload={getData}
                        id={collectionProps.selectedItems[0].id}
                      />
                    )
                  )}
                </>
              ),
            },
            {
              title: "Envío de patente",
              description: "Opciones finales",
            },
          ]}
        />
      )}
    </BaseLayout>
  );
}
