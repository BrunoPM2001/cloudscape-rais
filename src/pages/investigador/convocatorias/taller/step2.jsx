import {
  Alert,
  Box,
  Container,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Talleres de Investigación y Posgrado",
  },
];

export default function Convocatoria_registro_taller_2() {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar2"
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const siguiente = async () => {
    if (validateForm()) {
      console.log("next");
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
              onNavigate={siguiente}
              activeStepIndex={1}
              isLoadingNextStep={loading}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general del taller",
                  description: "Información general",
                },
                {
                  title: "Comité organizador del taller",
                  description: "Listado de integrantes para el taller",
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <div>
                          <Box variant="awsui-key-label">Título</Box>
                          <Box>
                            Líneas de investigación de los GI en el marco de los
                            Objetivos de Desarrollo Sostenible (ODS)
                          </Box>
                        </div>
                      </Container>
                      <Table
                        columnDefinitions={[
                          {
                            id: "id",
                            header: "Id",
                            cell: (item) => item.id,
                          },
                          {
                            id: "condicion",
                            header: "Condición",
                            cell: (item) => item.condicion,
                          },
                          {
                            id: "cargo",
                            header: "Cargo",
                            cell: (item) => item.cargo,
                          },
                          {
                            id: "apellido1",
                            header: "Apellido paterno",
                            cell: (item) => item.apellido1,
                          },
                          {
                            id: "apellido2",
                            header: "Apellido materno",
                            cell: (item) => item.apellido2,
                          },
                          {
                            id: "nombres",
                            header: "Nombres",
                            cell: (item) => item.nombres,
                          },
                          {
                            id: "doc_numero",
                            header: "Dni",
                            cell: (item) => item.doc_numero,
                          },
                          {
                            id: "codigo",
                            header: "Código docente",
                            cell: (item) => item.codigo,
                          },
                          {
                            id: "email3",
                            header: "Correo institucional",
                            cell: (item) => item.email3,
                          },
                          {
                            id: "facultad",
                            header: "Facultad",
                            cell: (item) => item.facultad,
                          },
                        ]}
                        columnDisplay={[
                          { id: "id", visible: true },
                          { id: "condicion", visible: true },
                          { id: "cargo", visible: true },
                          { id: "apellido1", visible: true },
                          { id: "apellido1", visible: true },
                          { id: "nombres", visible: true },
                          { id: "doc_numero", visible: true },
                          { id: "codigo", visible: true },
                          { id: "email3", visible: true },
                          { id: "facultad", visible: true },
                        ]}
                        header={<Header variant="h3">Miembros</Header>}
                        wrapLines
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
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
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
                header="No puede registrarse en esta convocatoria"
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