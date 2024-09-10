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
  Link,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddPartida from "./components/modalAddPartida.jsx";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import ModalDeletePartida from "./components/modalDeletePartida.jsx";
import NotificationContext from "../../../../providers/notificationProvider.jsx";
import ModalEditPartida from "./components/modalEditPartida.jsx";

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

const initialForm = {
  file: [],
};

const formRules = {
  file: { isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default function Convocatoria_registro_taller_5() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({
    presupuesto: [],
    partidas: [],
    montos: {},
  });
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);

  //  Hooks
  const { items, collectionProps, actions } = useCollection(data.presupuesto, {
    selection: {},
  });
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar5"
    );
    const data = res.data;
    handleChange("monto", data.datos.monto);
    setData(data);
    setErrors([]);
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    if (index == 5) {
      if (validateForm()) {
        setLoadingBtn(true);
        const form = new FormData();
        form.append("id", data.datos.proyecto_id);
        form.append("monto", formValues.monto);
        form.append("file", formValues.file[0]);
        const res = await axiosBase.post(
          "investigador/convocatorias/pinvpos/registrar5",
          form
        );
        const info = res.data;
        if (info.message == "error") {
          pushNotification(info.detail, info.message, notifications.length + 1);
        } else {
          window.location.href = "paso" + (index + 1);
        }
        setLoadingBtn(false);
      }
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
              isLoadingNextStep={loadingBtn}
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
                  info: (
                    <Badge color="blue">
                      Monto disponible: S/{" "}
                      {parseFloat(
                        data.montos.monto_coefinanciamiento +
                          data.montos.subvencion -
                          items.reduce(
                            (acc, curr) => acc + Number(curr.monto),
                            0
                          )
                      ).toFixed(2)}
                    </Badge>
                  ),
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
                                  disabled={
                                    data.montos.monto_coefinanciamiento +
                                      data.montos.subvencion ==
                                    items.reduce(
                                      (acc, curr) => acc + Number(curr.monto),
                                      0
                                    )
                                  }
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
                            label="Monto según el artículo 9, participación de facultad para cofinanciamiento"
                            stretch
                          >
                            <Input
                              value={data.montos.monto_coefinanciamiento}
                              type="number"
                              readOnly
                            />
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
                            S/ {data.montos.subvencion}
                          </Box>
                        </Container>
                      </Grid>
                      <FormField
                        label="Documento RD de cofinanciamiento"
                        errorText={formErrors.file}
                        description={
                          data.datos.url && (
                            <>
                              Ya ha cargado un{" "}
                              <Link
                                href={data.datos.url}
                                external
                                fontSize="body-s"
                              >
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file}
                          onChange={({ detail }) =>
                            handleChange("file", detail.value)
                          }
                        />
                      </FormField>
                      {type == "add" ? (
                        <ModalAddPartida
                          close={() => setType("")}
                          reload={getData}
                          id={data.datos.proyecto_id}
                          options={data.partidas}
                          limit={parseFloat(
                            data.montos.monto_coefinanciamiento +
                              data.montos.subvencion -
                              items.reduce(
                                (acc, curr) => acc + Number(curr.monto),
                                0
                              )
                          ).toFixed(2)}
                        />
                      ) : type == "update" ? (
                        <ModalEditPartida
                          close={() => setType("")}
                          reload={getData}
                          item={collectionProps.selectedItems[0]}
                          options={data.partidas}
                          limit={parseFloat(
                            data.montos.monto_coefinanciamiento +
                              data.montos.subvencion -
                              items.reduce(
                                (acc, curr) => acc + Number(curr.monto),
                                0
                              ) +
                              Number(collectionProps.selectedItems[0].monto)
                          ).toFixed(2)}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeletePartida
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
