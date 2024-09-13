import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de investigación sin financiamiento",
  },
];

export default function Registro_psinfinv_3() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({});

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/psinfinv/verificar3",
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
      setData(info.data);
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
      contentType="wizard"
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
              activeStepIndex={2}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general",
                  description: "Información general",
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                  content: (
                    <Container>
                      <ColumnLayout columns={4}>
                        <SpaceBetween size="s">
                          <div>
                            <Box variant="awsui-key-label">Nombres</Box>
                            <Box>{data.nombres}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">N° documento</Box>
                            <Box>{data.doc_numero}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">
                              Fecha de nacimiento
                            </Box>
                            <Box>{data.fecha_nac}</Box>
                          </div>
                        </SpaceBetween>
                        <SpaceBetween size="s">
                          <div>
                            <Box variant="awsui-key-label">Especialidad</Box>
                            <Box>{data.especialidad}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">
                              Título profesional
                            </Box>
                            <Box>{data.titulo_profesional}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Grado</Box>
                            <Box>{data.grado}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Tipo</Box>
                            <Box>{data.tipo}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">
                              Categoría y clase
                            </Box>
                            <Box>{data.clase}</Box>
                          </div>
                        </SpaceBetween>
                        <SpaceBetween size="s">
                          <div>
                            <Box variant="awsui-key-label">Código</Box>
                            <Box>{data.codigo}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Dependencia</Box>
                            <Box>{data.dependencia}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Facultad</Box>
                            <Box>{data.facultad}</Box>
                          </div>
                        </SpaceBetween>
                        <SpaceBetween size="s">
                          <div>
                            <Box variant="awsui-key-label">Orcid</Box>
                            <Box>{data.codigo_orcid}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Scopus</Box>
                            <Box>{data.scopus_id}</Box>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Google Scholar</Box>
                            <Box>{data.google_scholar}</Box>
                          </div>
                        </SpaceBetween>
                      </ColumnLayout>
                    </Container>
                  ),
                },
                {
                  title: "Programa del taller",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Financiamiento",
                  description: "Montos y partidas",
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
