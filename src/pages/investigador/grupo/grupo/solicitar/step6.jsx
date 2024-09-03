import {
  Alert,
  Box,
  Header,
  Pagination,
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
    id: "nombre",
    header: "Nombre",
    cell: (item) => item.nombre,
    isRowHeader: true,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    width: 95,
  },
  {
    id: "tipo_publicacion",
    header: "Tipo",
    cell: (item) => item.tipo_publicacion,
    width: 120,
  },
];

const columnDisplay = [
  { id: "nombre", visible: true },
  { id: "titulo", visible: true },
  { id: "periodo", visible: true },
  { id: "tipo_publicacion", visible: true },
];

export default function Solicitar_grupo6() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ publicaciones: [] });
  const { items, collectionProps, paginationProps } = useCollection(
    data.publicaciones ?? [],
    {
      pagination: { pageSize: 10 },
      selection: {},
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar6", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const siguiente = (index) => {
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
        <>
          {data.estado ? (
            <Wizard
              onNavigate={({ detail }) => siguiente(detail.requestedStepIndex)}
              activeStepIndex={5}
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
                  content: (
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
                        <Header counter={"(" + data.publicaciones.length + ")"}>
                          Listado
                        </Header>
                      }
                      pagination={<Pagination {...paginationProps} />}
                    />
                  ),
                },
                {
                  title: "Envío de publicación",
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
