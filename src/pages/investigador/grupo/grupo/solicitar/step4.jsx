import {
  Alert,
  Box,
  Button,
  Container,
  FormField,
  Header,
  Pagination,
  SpaceBetween,
  Spinner,
  Table,
  Textarea,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAgregarLinea from "./components/modalAgregarLinea.jsx";
import ModalEliminarLinea from "./components/modalEliminarLinea.jsx";
import { useFormValidation } from "../../../../../hooks/useFormValidation.js";

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
  presentacion: "",
  objetivos: "",
  servicios: "",
};

const formRules = {
  presentacion: { required: true, limitWords: 200 },
  objetivos: { required: true, limitWords: 100 },
  servicios: { required: true, limitWords: 100 },
};

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    isRowHeader: true,
  },
  {
    id: "nombre",
    header: "Línea",
    cell: (item) => item.nombre,
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "nombre", visible: true },
];

const LINEAS_MINIMO = 1;

export default function Solicitar_grupo4() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({ lineas: [] });
  const [typeModal, setTypeModal] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data.lineas ?? [],
    {
      pagination: { pageSize: 10 },
      selection: {},
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar4", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    if (data.datos) {
      handleChange("presentacion", data.datos.presentacion ?? "");
      handleChange("objetivos", data.datos.objetivos ?? "");
      handleChange("servicios", data.datos.servicios ?? "");
      handleChange("id", id);
    }
    setLoading(false);
  };

  const siguiente = async (index) => {
    if (index == 4) {
      let tempErrors = [...errors];

      if (data.lineas.length < LINEAS_MINIMO) {
        tempErrors.push(
          "Su grupo necesita tener al menos " +
            LINEAS_MINIMO +
            " línea de investigación"
        );
      }
      setErrors(tempErrors);
      if (validateForm()) {
        if (tempErrors.length == 0) {
          setLoadingBtn(true);
          const res = await axiosBase.post(
            "investigador/grupo/solicitar/registrar4",
            formValues
          );
          const info = res.data;
          if (info.message == "success") {
            const query = queryString.stringify({
              id,
            });
            window.location.href = "paso5?" + query;
          } else {
            pushNotification(
              info.detail,
              info.message,
              notifications.length + 1
            );
          }
          setLoadingBtn(false);
        }
      }
    } else {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
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
              activeStepIndex={3}
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
                  content: (
                    <SpaceBetween size="l">
                      {errors.length > 0 && (
                        <Alert
                          type="warning"
                          header="Su grupo debe cumplir con los siguientes requisitos"
                          dismissible
                          onDismiss={() => setErrors([])}
                        >
                          {errors.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </Alert>
                      )}
                      <Container>
                        <SpaceBetween size="s">
                          <FormField
                            label="Presentación"
                            description={
                              "Máximo 200 palabras (" +
                              (formValues.presentacion == ""
                                ? 0
                                : formValues.presentacion.trim().split(/\s+/)
                                    .length) +
                              "/200)"
                            }
                            errorText={formErrors.presentacion}
                            stretch
                          >
                            <Textarea
                              placeholder="Escriba la presentación de su grupo"
                              value={formValues.presentacion}
                              onChange={({ detail }) =>
                                handleChange("presentacion", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Objetivos"
                            description={
                              "Máximo 100 palabras (" +
                              (formValues.objetivos == ""
                                ? 0
                                : formValues.objetivos.trim().split(/\s+/)
                                    .length) +
                              "/100)"
                            }
                            errorText={formErrors.objetivos}
                            stretch
                          >
                            <Textarea
                              placeholder="Escriba los objetivos de su grupo"
                              value={formValues.objetivos}
                              onChange={({ detail }) =>
                                handleChange("objetivos", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Servicios"
                            description={
                              "Máximo 100 palabras (" +
                              (formValues.servicios == ""
                                ? 0
                                : formValues.servicios.trim().split(/\s+/)
                                    .length) +
                              "/100)"
                            }
                            errorText={formErrors.servicios}
                            stretch
                          >
                            <Textarea
                              placeholder="Escriba los servicios ofrecidos por su grupo"
                              value={formValues.servicios}
                              onChange={({ detail }) =>
                                handleChange("servicios", detail.value)
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
                            counter={"(" + data.lineas.length + "/3)"}
                            actions={
                              <SpaceBetween direction="horizontal" size="xs">
                                <Button
                                  disabled={
                                    collectionProps.selectedItems.length == 0
                                  }
                                  onClick={() => setTypeModal("delete_linea")}
                                >
                                  Eliminar
                                </Button>
                                <Button
                                  variant="primary"
                                  disabled={items.length == 3}
                                  onClick={() => setTypeModal("add_linea")}
                                >
                                  Agregar
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Líneas
                          </Header>
                        }
                        pagination={<Pagination {...paginationProps} />}
                      />
                      {typeModal == "add_linea" ? (
                        <ModalAgregarLinea
                          listado={data.listado}
                          reload={getData}
                          close={() => setTypeModal("")}
                          grupo_id={id}
                        />
                      ) : typeModal == "delete_linea" ? (
                        <ModalEliminarLinea
                          id={collectionProps.selectedItems[0].id}
                          reload={getData}
                          close={() => setTypeModal("")}
                          grupo_id={id}
                        />
                      ) : (
                        <></>
                      )}
                    </SpaceBetween>
                  ),
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
                },
                {
                  title: "Datos de contacto",
                  description: "Deben corresponder al grupo",
                },
                {
                  title: "Envío de solicitud",
                  description: "Previsualización de solicitud",
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
