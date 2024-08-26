import {
  Alert,
  Badge,
  Box,
  Button,
  Container,
  FileUpload,
  FormField,
  Grid,
  Header,
  Input,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import ModalAddActividad from "./components/modalAddActividad.jsx";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalEditActividad from "./components/modalEditActividad.jsx";
import ModalDeleteActividad from "./components/modalDeleteActividad.jsx";

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

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "monto",
    header: "Monto",
    cell: (item) => item.monto,
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "partida", visible: true },
  { id: "tipo", visible: true },
  { id: "monto", visible: true },
];

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  constraintText:
    "El documento debe estar firmado, en formato PDF y no debe superar los 6 MB",
  i18nStrings: {
    uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
    dropzoneText: (e) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
  },
  accept: ".pdf",
};

export default function Convocatoria_registro_taller_5() {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ partidas: [] });
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);

  //  Hooks
  const { items, collectionProps, actions } = useCollection(data.partidas, {
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar5"
    );
    const data = res.data;
    setData(data);
    setErrors([]);
    setLoading(false);
  };

  const handleNavigate = (index) => {
    if (index == 5) {
      window.location.href = "paso" + (index + 1);
    } else {
      window.location.href = "paso" + (index + 1);
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
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={4}
              isLoadingNextStep={loading}
              onCancel={() => {
                window.location.href = "../";
              }}
              steps={[
                {
                  title: "Información general del taller",
                  description: "Información general",
                },
                {
                  title: "Comité organizador del taller",
                  description: "Listado de integrantes para el taller",
                },
                {
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
                },
                {
                  title: "Programa del taller",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Financiamiento",
                  info: <Badge color="blue">Monto disponible: S/ 3700</Badge>,
                  description: "Montos y partidas",
                  content: (
                    <SpaceBetween size="m">
                      {errors.length > 0 && (
                        <Alert
                          header="No cumple con los siguientes requisitos"
                          type="warning"
                          dismissible
                          onDismiss={() => setErrors([])}
                        >
                          {errors.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </Alert>
                      )}
                      <Table
                        {...collectionProps}
                        trackBy="id"
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        wrapLines
                        resizableColumns
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
                                <Button
                                  disabled={
                                    !collectionProps.selectedItems.length
                                  }
                                  onClick={() => setType("delete")}
                                >
                                  Eliminar
                                </Button>
                                <Button
                                  disabled={
                                    !collectionProps.selectedItems.length
                                  }
                                  onClick={() => setType("update")}
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => setType("add")}
                                >
                                  Añadir
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Partidas
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
                      <Grid
                        gridDefinition={[
                          {
                            colspan: {
                              default: 8,
                            },
                          },
                          {
                            colspan: {
                              default: 4,
                            },
                          },
                        ]}
                      >
                        <Container fitHeight>
                          <FormField
                            label="Indique el monto según el artículo 8, participación de facultad para cofinanciamiento"
                            errorText=""
                            stretch
                          >
                            <Input value="0" type="number" />
                          </FormField>
                        </Container>
                        <Container fitHeight>
                          <Box variant="awsui-key-label">
                            Subvención económica VRIP
                          </Box>
                          <Box
                            variant="awsui-value-large"
                            color="text-status-info"
                          >
                            S/ 2700
                          </Box>
                        </Container>
                      </Grid>
                      <FormField label="Documento RD de cofinanciamiento">
                        <FileUpload {...propsRepetidas} value={[]} />
                      </FormField>
                      {type == "add" ? (
                        <ModalAddActividad
                          close={() => setType("")}
                          reload={getData}
                          id={data.datos.proyecto_id}
                        />
                      ) : type == "update" ? (
                        <ModalEditActividad
                          close={() => setType("")}
                          reload={getData}
                          item={collectionProps.selectedItems[0]}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeleteActividad
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