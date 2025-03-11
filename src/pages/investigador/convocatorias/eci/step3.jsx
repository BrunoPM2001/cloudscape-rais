import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
  Container,
  FormField,
  Header,
  Input,
  Link,
  Pagination,
  SpaceBetween,
  Spinner,
  Table,
  Textarea,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import ModalDeleteDoc from "../pmulti/components/modalDeleteDoc.jsx";
import ModalAddDoc from "./components/modalAddDoc.jsx";
import NotificationContext from "../../../../providers/notificationProvider.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de equipamiento científico",
  },
];

const propsEnlaces = {
  external: "true",
  variant: "primary",
  target: "_blank",
};

const columnDefinitions = [
  {
    id: "nombre",
    header: "Nombre del documento",
    cell: (item) => item.nombre,
  },
  {
    id: "comentario",
    header: "Comentario",
    cell: (item) => item.comentario,
  },
  {
    id: "url",
    header: "Archivo",
    cell: (item) => (
      <Box textAlign="center">
        <Button
          iconName="download"
          variant="inline-icon"
          href={item.url}
          target="_blank"
        />
      </Box>
    ),
    minWidth: 95,
  },
];

const columnDisplay = [
  { id: "nombre", visible: true },
  { id: "comentario", visible: true },
  { id: "url", visible: true },
];

const initialForm = {
  nombre_equipo: "",
  desc_equipo: "",
};

const formRules = {
  nombre_equipo: { required: true },
  desc_equipo: { required: true },
};

const ESPECIFICACION_MIN = 1;
const COTIZACIONES_MIN = 2;

export default function Registro_eci_3() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [notReload, setNotReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [alert, setAlert] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data,
    {
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/eci/verificar3",
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
      if (notReload) {
        setNotReload(false);
        handleChange("nombre_equipo", info.data.descripcion?.nombre_equipo);
        handleChange("desc_equipo", info.data.descripcion?.desc_equipo);
      }
      setData(info.data.documentos);
    }
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    const query = queryString.stringify({
      id,
    });
    if (index < 3) {
      window.location.href = "paso" + (index + 1) + "?" + query;
    } else {
      if (validateForm()) {
        let tempErrors = [...errors];
        if (
          data.filter(
            (item) =>
              item.nombre == "especificaciones técnicas de acuerdo al formato"
          ).length < ESPECIFICACION_MIN
        ) {
          tempErrors.push(
            "Necesita registrar al menos " +
              ESPECIFICACION_MIN +
              " especificación técnica"
          );
        }

        if (
          data.filter((item) => item.nombre == "cotización").length <
          COTIZACIONES_MIN
        ) {
          tempErrors.push(
            "Necesita registrar al menos " + COTIZACIONES_MIN + " cotizaciones"
          );
        }

        setAlert(tempErrors);
        if (tempErrors.length == 0) {
          setLoadingForm(true);
          const res = await axiosBase.post(
            "investigador/convocatorias/eci/registrar3",
            {
              ...formValues,
              id,
            }
          );
          const data = res.data;
          pushNotification(data.detail, data.message, notifications.length + 1);
          if (data.message == "success") {
            window.location.href = "paso4?" + query;
          }
          setLoadingForm(false);
        }
      }
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
      contentType="table"
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
              isLoadingNextStep={loadingForm}
              steps={[
                {
                  title: "Información del grupo de investigación",
                  description: "Información general",
                },
                {
                  title: "Datos generales",
                  description: "Datos del proyecto",
                },
                {
                  title: "Equipamiento",
                  description:
                    "Datos de equipamiento y documentos relacionados",
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <SpaceBetween size="s">
                          <FormField
                            label="Nombre del equipo"
                            errorText={formErrors.nombre_equipo}
                            stretch
                          >
                            <Input
                              value={formValues.nombre_equipo}
                              onChange={({ detail }) =>
                                handleChange("nombre_equipo", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Descripción del equipo"
                            errorText={formErrors.desc_equipo}
                            stretch
                          >
                            <Textarea
                              value={formValues.desc_equipo}
                              onChange={({ detail }) =>
                                handleChange("desc_equipo", detail.value)
                              }
                            />
                          </FormField>
                        </SpaceBetween>
                      </Container>
                      {alert.length > 0 && (
                        <Alert
                          type="warning"
                          header="Tiene que cumplir los siguientes requisitos"
                          dismissible
                          onDismiss={() => setAlert([])}
                        >
                          {alert.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </Alert>
                      )}
                      <Table
                        {...collectionProps}
                        trackBy="id"
                        items={items}
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        enableKeyboardNavigation
                        selectionType="single"
                        onRowClick={({ detail }) =>
                          actions.setSelectedItems([detail.item])
                        }
                        header={
                          <Header
                            counter={"(" + data.length + ")"}
                            description={
                              <>
                                Formato para las especificaciones técnicas{" "}
                                <Link
                                  {...propsEnlaces}
                                  href="/minio/templates/Eci_formato_especificaciones_tecnicas.docx"
                                  external
                                >
                                  aquí.
                                </Link>
                              </>
                            }
                            actions={
                              <SpaceBetween direction="horizontal" size="xs">
                                <Button
                                  disabled={
                                    !collectionProps.selectedItems.length
                                  }
                                  variant="normal"
                                  onClick={() => setType("delete")}
                                >
                                  Eliminar
                                </Button>
                                <ButtonDropdown
                                  variant="primary"
                                  onItemClick={({ detail }) => {
                                    if (detail.id == "action_2_1") {
                                      setType("addEs");
                                    } else if (detail.id == "action_2_2") {
                                      setType("addCo");
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Especificaciones técnicas de acuerdo al formato",
                                      id: "action_2_1",
                                    },
                                    {
                                      text: "Cotización",
                                      id: "action_2_2",
                                    },
                                  ]}
                                >
                                  Agregar documento
                                </ButtonDropdown>
                              </SpaceBetween>
                            }
                          >
                            Especificaciones técnicas y cotizaciones
                          </Header>
                        }
                        pagination={<Pagination {...paginationProps} />}
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
                      {type == "addEs" ? (
                        <ModalAddDoc
                          close={() => {
                            setType("");
                            setAlert([]);
                          }}
                          tipo={7}
                          categoria="especificaciones-tecnicas"
                          nombre="especificaciones técnicas de acuerdo al formato"
                          reload={getData}
                          id={id}
                        />
                      ) : type == "addCo" ? (
                        <ModalAddDoc
                          close={() => {
                            setType("");
                            setAlert([]);
                          }}
                          tipo={10}
                          categoria="cotizacion-equipo"
                          nombre="cotización"
                          reload={getData}
                          id={id}
                        />
                      ) : (
                        type == "delete" && (
                          <ModalDeleteDoc
                            close={() => {
                              setType("");
                              setAlert([]);
                            }}
                            reload={getData}
                            id={collectionProps.selectedItems[0].id}
                          />
                        )
                      )}
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Impacto",
                  description:
                    "Impacto de la propuesta y documentos relacionados",
                },
                {
                  title: "Administración de equipamiento solicitado",
                  description:
                    "Administración de equipamiento solicitado y documentos relacionados",
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
