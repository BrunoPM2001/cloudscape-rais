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
  plan_manejo: "",
};

const formRules = {
  plan_manejo: { required: true, limitWords: 100 },
};

const INV_MIN = 1;
const PLAN_MIN = 1;
const USO_MIN = 1;

export default function Registro_eci_6() {
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
      "investigador/convocatorias/eci/verificar6",
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
        handleChange("plan_manejo", info.data.descripcion?.plan_manejo);
      }
      setData(info.data.documentos);
    }
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    const query = queryString.stringify({
      id,
    });
    if (index < 6) {
      window.location.href = "paso" + (index + 1) + "?" + query;
    } else {
      if (validateForm()) {
        let tempErrors = [...errors];
        if (
          data.filter((item) => item.nombre == "uso en investigación").length <
          INV_MIN
        ) {
          tempErrors.push(
            "Necesita registrar al menos " + INV_MIN + " uso en investigación"
          );
        }

        if (
          data.filter((item) => item.nombre == "plan de uso compartido")
            .length < PLAN_MIN
        ) {
          tempErrors.push(
            "Necesita registrar al menos " +
              PLAN_MIN +
              " plan de uso compartido"
          );
        }

        if (
          data.filter((item) => item.nombre == "uso en desarrollo de tesis")
            .length < USO_MIN
        ) {
          tempErrors.push(
            "Necesita registrar al menos " +
              USO_MIN +
              " uso en desarrollo de tesis"
          );
        }

        setAlert(tempErrors);
        if (tempErrors.length == 0) {
          setLoadingForm(true);
          const res = await axiosBase.post(
            "investigador/convocatorias/eci/registrar6",
            {
              ...formValues,
              id,
            }
          );
          const data = res.data;
          pushNotification(data.detail, data.message, notifications.length + 1);
          if (data.message == "success") {
            window.location.href = "paso7?" + query;
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
              activeStepIndex={5}
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
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <FormField
                          label="Plan de manejo de residuos/efluentes o emisiones si corresponde (máximo 100 palabras)"
                          errorText={formErrors.plan_manejo}
                          stretch
                        >
                          <Textarea
                            value={formValues.plan_manejo}
                            onChange={({ detail }) =>
                              handleChange("plan_manejo", detail.value)
                            }
                          />
                        </FormField>
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
                                      setType("add1");
                                    } else if (detail.id == "action_2_2") {
                                      setType("add2");
                                    } else if (detail.id == "action_2_3") {
                                      setType("add3");
                                    }
                                  }}
                                  items={[
                                    {
                                      text: "Uso en investigación",
                                      id: "action_2_1",
                                      disabled:
                                        data.filter(
                                          (item) =>
                                            item.nombre ==
                                            "uso en investigación"
                                        ).length == 1,
                                    },
                                    {
                                      text: "Plan de uso compartido",
                                      id: "action_2_2",
                                      disabled:
                                        data.filter(
                                          (item) =>
                                            item.nombre ==
                                            "plan de uso compartido"
                                        ).length == 1,
                                    },
                                    {
                                      text: "Uso en desarrollo de tesis",
                                      id: "action_2_3",
                                      disabled:
                                        data.filter(
                                          (item) =>
                                            item.nombre ==
                                            "uso en desarrollo de tesis"
                                        ).length == 1,
                                    },
                                  ]}
                                >
                                  Agregar documento
                                </ButtonDropdown>
                              </SpaceBetween>
                            }
                          >
                            Plan de uso compartido con grupos colaborativos y
                            docencia
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
                        footer={
                          <>
                            <li>
                              Formato para uso en investigación{" "}
                              <Link {...propsEnlaces} href="#" external>
                                aquí.
                              </Link>
                            </li>
                            <li>
                              Formato para plan de uso compartido{" "}
                              <Link {...propsEnlaces} href="#" external>
                                aquí.
                              </Link>
                            </li>
                            <li>
                              Formato para uso en desarrollo de tesis{" "}
                              <Link {...propsEnlaces} href="#" external>
                                aquí.
                              </Link>
                            </li>
                          </>
                        }
                      />
                      {type == "add1" ? (
                        <ModalAddDoc
                          close={() => {
                            setType("");
                            setAlert([]);
                          }}
                          tipo={9}
                          categoria="sutento"
                          nombre="uso en investigación"
                          reload={getData}
                          id={id}
                        />
                      ) : type == "add2" ? (
                        <ModalAddDoc
                          close={() => {
                            setType("");
                            setAlert([]);
                          }}
                          tipo={11}
                          categoria="sutento"
                          nombre="plan de uso compartido"
                          reload={getData}
                          id={id}
                        />
                      ) : type == "add3" ? (
                        <ModalAddDoc
                          close={() => {
                            setType("");
                            setAlert([]);
                          }}
                          tipo={8}
                          categoria="sutento"
                          nombre="uso en desarrollo de tesis"
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
