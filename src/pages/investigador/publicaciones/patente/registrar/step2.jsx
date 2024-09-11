import {
  Box,
  Button,
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
import ModalAddTitular from "./components/modalAddTitular.jsx";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalDeleteTitular from "./components/modalDeleteTitular.jsx";

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
    id: "id",
    header: "Id",
    cell: (item) => item.id,
  },
  {
    id: "titular",
    header: "Titular",
    cell: (item) => item.titular,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "titular", visible: true },
];

export default function Registrar_patente_2() {
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
      "investigador/publicaciones/propiedadInt/verificar2",
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
          activeStepIndex={1}
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
                                collectionProps.selectedItems.length == 0
                              }
                              onClick={() => setType("delete")}
                            >
                              Eliminar
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => setType("add")}
                            >
                              Agregar
                            </Button>
                          </SpaceBetween>
                        }
                      >
                        Manejo de titulares
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
                    <ModalAddTitular
                      close={() => setType("")}
                      reload={getData}
                      id={id}
                    />
                  ) : (
                    type == "delete" && (
                      <ModalDeleteTitular
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
              title: "Autores de la patente",
              description: "Listado de autores de esta patente",
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
