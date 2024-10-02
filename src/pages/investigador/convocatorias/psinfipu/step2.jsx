import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Input,
  Link,
  Select,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";
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
    text: "Proyecto de publicación académica",
  },
];

const initialForm = {
  file1: [],
  file2: [],
  proyecto: null,
  editorial: "",
  editorial_url: "",
  tipo_publicacion: null,
};

const formRules = {
  file1: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file2: { isFile: true, maxSize: 6 * 1024 * 1024 },
  editorial: { required: true },
  editorial_url: { required: true },
  tipo_publicacion: { required: true },
};

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
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

const opt_publicacion = [
  { value: "Libro" },
  { value: "Capitulo de libro" },
  { value: "Artículo científico" },
];

export default function Registro_psinfipu_2() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({
    opt_proyectos: [],
  });

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/psinfipu/verificar2",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    setData(info);
    if (!info.estado) {
      setErrors(info.errores);
    } else {
      if (info.descripcion.length != 0) {
        handleChange("editorial", info.descripcion.publicacion_editorial);
        handleChange("editorial_url", info.descripcion.publicacion_url);
        handleChange("tipo_publicacion", {
          value: info.descripcion.publicacion_tipo,
        });
        if (info.descripcion.investigacion_base) {
          handleChange(
            "proyecto",
            info.opt_proyectos.find(
              (item) =>
                item.value == info.descripcion.investigacion_base.split("-")[0]
            )
          );
        }
      }
    }
    setLoading(false);
  };

  const eliminarArchivo = async (tesis) => {
    await axiosBase.delete(
      "investigador/convocatorias/psinfipu/eliminarArchivo",
      {
        params: {
          id,
          tesis,
        },
      }
    );
    pushNotification("Archivo eliminado", "info", notifications.length + 1);
    getData();
  };

  const handleNavigate = async (index) => {
    if (index == 2) {
      if (validateForm()) {
        if (
          formValues.file1[0] ||
          formValues.file2[0] ||
          formValues.proyecto ||
          data.archivos.doctorado ||
          data.archivos.maestria
        ) {
          setLoadingBtn(true);
          const form = new FormData();
          form.append("id", id);
          form.append("editorial", formValues.editorial);
          form.append("editorial_url", formValues.editorial_url);
          form.append("tipo_publicacion", formValues.tipo_publicacion.value);
          form.append("file1", formValues.file1[0]);
          form.append("file2", formValues.file2[0]);
          if (formValues.proyecto) {
            form.append("proyecto", formValues.proyecto.value + "-PB");
          }
          const res = await axiosBase.post(
            "investigador/convocatorias/psinfipu/registrar2",
            form
          );
          const info = res.data;
          if (info.message == "success") {
            const query = queryString.stringify({
              id,
            });
            window.location.href = "paso3?" + query;
          } else {
            pushNotification(
              info.detail,
              info.message,
              notifications.length + 1
            );
          }
          setLoadingBtn(false);
        } else {
          pushNotification(
            "Necesita cumplir con los requisitos detallados en el cuadro",
            "warning",
            notifications.length + 1
          );
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
              activeStepIndex={1}
              isLoadingNextStep={loadingBtn}
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
                  content: (
                    <SpaceBetween size="l">
                      <Alert header="La propuesta tiene que cumplir uno de los siguientes requisitos">
                        <li>
                          Subir un documento sustentatorio de una tesis doctoral
                          aprobada
                        </li>
                        <li>
                          Subir un documento sustentatorio de una tesis de
                          maestria aprobada
                        </li>
                        <li>
                          Escoger proyecto de San Marcos(UNMSM) realizado de los
                          últimos 7 años
                        </li>
                      </Alert>
                      <Container>
                        <Box variant="awsui-key-label">Título</Box>
                        <Box>{data.proyecto.titulo}</Box>
                      </Container>
                      <Container>
                        <SpaceBetween size="m">
                          <ColumnLayout columns={2}>
                            <FormField
                              label="Tesis doctoral aprobada"
                              stretch
                              constraintText={
                                data.archivos.doctorado != null ? (
                                  <>
                                    Puede{" "}
                                    <Link
                                      href={data.archivos.doctorado}
                                      variant="primary"
                                      fontSize="body-s"
                                      target="_blank"
                                    >
                                      descargar el archivo
                                    </Link>
                                    {" cargado o "}
                                    <Link
                                      onClick={() =>
                                        eliminarArchivo("Tesis Doctoral")
                                      }
                                      href="#"
                                      variant="primary"
                                      fontSize="body-s"
                                    >
                                      eliminarlo.
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    No se cargó ningún archivo (Pdf, máx. 6MB)
                                  </>
                                )
                              }
                            >
                              <FileUpload
                                {...propsRepetidas}
                                value={formValues.file1}
                                onChange={({ detail }) =>
                                  handleChange("file1", detail.value)
                                }
                              />
                            </FormField>
                            <FormField
                              label="Tesis de maestría aprobada"
                              stretch
                              constraintText={
                                data.archivos.maestria != null ? (
                                  <>
                                    Puede{" "}
                                    <Link
                                      href={data.archivos.maestria}
                                      variant="primary"
                                      fontSize="body-s"
                                      target="_blank"
                                    >
                                      descargar el archivo
                                    </Link>
                                    {" cargado o "}
                                    <Link
                                      onClick={() =>
                                        eliminarArchivo("Tesis Maestría")
                                      }
                                      href="#"
                                      variant="primary"
                                      fontSize="body-s"
                                    >
                                      eliminarlo.
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    No se cargó ningún archivo (Pdf, máx. 6MB)
                                  </>
                                )
                              }
                            >
                              <FileUpload
                                {...propsRepetidas}
                                value={formValues.file2}
                                onChange={({ detail }) =>
                                  handleChange("file2", detail.value)
                                }
                              />
                            </FormField>
                          </ColumnLayout>
                          <FormField
                            label="Proyecto de los últimos 7 años"
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              selectedOption={formValues.proyecto}
                              onChange={({ detail }) =>
                                handleChange("proyecto", detail.selectedOption)
                              }
                              options={data.opt_proyectos}
                            />
                          </FormField>
                        </SpaceBetween>
                      </Container>
                      <Container fitHeight>
                        <ColumnLayout columns={3}>
                          <FormField
                            label="Editorial o revista en la que se publicará"
                            errorText={formErrors.editorial}
                            stretch
                          >
                            <Input
                              value={formValues.editorial}
                              onChange={({ detail }) =>
                                handleChange("editorial", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Url de la editorial o revista en la que se publicará"
                            errorText={formErrors.editorial_url}
                            stretch
                          >
                            <Input
                              value={formValues.editorial_url}
                              onChange={({ detail }) =>
                                handleChange("editorial_url", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Tipo de publicación que se realizará"
                            errorText={formErrors.tipo_publicacion}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              selectedOption={formValues.tipo_publicacion}
                              onChange={({ detail }) =>
                                handleChange(
                                  "tipo_publicacion",
                                  detail.selectedOption
                                )
                              }
                              expandToViewport
                              options={opt_publicacion}
                            />
                          </FormField>
                        </ColumnLayout>
                      </Container>
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades junto al responsable",
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
