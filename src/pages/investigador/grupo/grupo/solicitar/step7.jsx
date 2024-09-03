import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
  Container,
  FileUpload,
  FormField,
  Header,
  Link,
  Pagination,
  SpaceBetween,
  Spinner,
  Table,
  Textarea,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useFormValidation } from "../../../../../hooks/useFormValidation.js";
import ModalEliminarLaboratorio from "./components/modalEliminarLaboratorio.jsx";
import ModalAgregarLaboratorio from "./components/modalAgregarLaboratorio.jsx";

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

const initialForm = {
  infraestructura_ambientes: "",
  file: [],
};

const formRules = {
  infraestructura_ambientes: { required: true, limitWords: 100 },
  file: { isFile: true, maxSize: 5 * 1024 * 1024 },
};

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
  },
  {
    id: "laboratorio",
    header: "Nombre",
    cell: (item) => item.laboratorio,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "laboratorio", visible: true },
  { id: "responsable", visible: true },
];

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  constraintText: "El archivo no debe superar los 5 MB (pdf, jpg o docx)",
  i18nStrings: {
    uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
    dropzoneText: (e) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
  },
  accept: ".pdf, .jpg, .docx",
};

export default function Solicitar_grupo7() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({ laboratorios: [] });
  const [typeModal, setTypeModal] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data.laboratorios ?? [],
    {
      pagination: { pageSize: 10 },
      selection: {},
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar7", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    if (data.datos) {
      handleChange(
        "infraestructura_ambientes",
        data.datos.infraestructura_ambientes ?? ""
      );
      handleChange("url", data.datos.url ?? "");
      handleChange("id", id);
    }
    setLoading(false);
  };

  const siguiente = async (index) => {
    if (index == 7) {
      if (validateForm()) {
        setLoadingBtn(true);
        const form = new FormData();
        form.append("id", id);
        form.append(
          "infraestructura_ambientes",
          formValues.infraestructura_ambientes
        );
        form.append("file", formValues.file[0]);
        const res = await axiosBase.post(
          "investigador/grupo/solicitar/registrar7",
          form
        );
        const info = res.data;
        if (info.message == "success") {
          const query = queryString.stringify({
            id,
          });
          window.location.href = "paso8?" + query;
        } else {
          pushNotification(info.detail, info.message, notifications.length + 1);
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
              activeStepIndex={6}
              isLoadingNextStep={loadingBtn}
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
                },
                {
                  title: "Infraestructura",
                  description: "Ambientes físicos y laboratorios",
                  content: (
                    <SpaceBetween size="l">
                      <Container>
                        <SpaceBetween size="s">
                          <FormField
                            label="Ambientes físicos"
                            description={
                              "Máximo 100 palabras (" +
                              (formValues.infraestructura_ambientes == ""
                                ? 0
                                : formValues.infraestructura_ambientes
                                    .trim()
                                    .split(/\s+/).length) +
                              "/100)"
                            }
                            errorText={formErrors.infraestructura_ambientes}
                            stretch
                          >
                            <Textarea
                              placeholder="Describa los ambientes físicos de su grupo"
                              value={formValues.infraestructura_ambientes}
                              onChange={({ detail }) =>
                                handleChange(
                                  "infraestructura_ambientes",
                                  detail.value
                                )
                              }
                            />
                          </FormField>
                          <FormField
                            label="Documentos sustentatorios, resoluciones decanales o constancias"
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
                            errorText={formErrors.file}
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
                        </SpaceBetween>
                      </Container>
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
                          <Header
                            variant="h3"
                            actions={
                              <SpaceBetween size="s" direction="horizontal">
                                <Button
                                  disabled={
                                    collectionProps.selectedItems.length == 0
                                  }
                                  onClick={() =>
                                    setTypeModal("delete_laboratorio")
                                  }
                                >
                                  Eliminar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    setTypeModal("add_laboratorio")
                                  }
                                >
                                  Agregar
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Laboratorios
                          </Header>
                        }
                        pagination={<Pagination {...paginationProps} />}
                      />
                      {typeModal == "add_laboratorio" ? (
                        <ModalAgregarLaboratorio
                          reload={getData}
                          close={() => setTypeModal("")}
                          grupo_id={id}
                        />
                      ) : (
                        typeModal == "delete_laboratorio" && (
                          <ModalEliminarLaboratorio
                            id={collectionProps.selectedItems[0].id}
                            reload={getData}
                            close={() => setTypeModal("")}
                            grupo_id={id}
                          />
                        )
                      )}
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Proyectos de investigación",
                  description:
                    "De los integrantes (proyectos de los últimos 7 años)",
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
