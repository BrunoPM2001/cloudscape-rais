import {
  Alert,
  Autosuggest,
  Box,
  ColumnLayout,
  Container,
  DatePicker,
  FileUpload,
  FormField,
  Input,
  Link,
  Select,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation.js";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalIncluirmeAutor from "../../registrar/components/modalIncluirmeAutor.jsx";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest.js";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Patentes",
  },
  {
    text: "Registrar",
  },
];

const fileProps = {
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
  titulo: "",
  nro_registro: "",
  tipo: null,
  nro_expediente: "",
  fecha_presentacion: "",
  oficina_presentacion: "",
  enlace: "",
  file: [],
};

const formRules = {
  titulo: { required: true },
  nro_registro: { required: true },
  tipo: { required: true },
  fecha_presentacion: { required: true },
};

export default function Registrar_patente_1() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [publicacion, setPublicacion] = useState({});
  const [url, setUrl] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);
  const {
    loading: loading1,
    options: options1,
    setOptions: setOptions1,
    value: value1,
    setValue: setValue1,
    setAvoidSelect: setAvoidSelect1,
  } = useAutosuggest("investigador/publicaciones/utils/listadoTitulos");

  //  Functions
  const getData = async () => {
    if (id) {
      setLoading(true);
      const res = await axiosBase.get(
        "investigador/publicaciones/propiedadInt/verificar1",
        {
          params: {
            id,
          },
        }
      );
      const data = res.data;
      handleChange("titulo", data.titulo);
      handleChange("nro_registro", data.nro_registro);
      handleChange("tipo", { value: data.tipo });
      handleChange("nro_expediente", data.nro_expediente);
      handleChange("fecha_presentacion", data.fecha_presentacion);
      handleChange("oficina_presentacion", data.oficina_presentacion);
      handleChange("enlace", data.enlace);
      if (data.url) {
        setUrl(data.url);
      }
      setValue1(data.titulo);
      handleChange("id", id);
    }
    setLoading(false);
  };

  const siguiente = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const form = new FormData();
      form.append("titulo", formValues.titulo);
      form.append("nro_registro", formValues.nro_registro);
      form.append("tipo", formValues.tipo["value"]);
      form.append("nro_expediente", formValues.nro_expediente);
      form.append("fecha_presentacion", formValues.fecha_presentacion);
      form.append("oficina_presentacion", formValues.oficina_presentacion);
      form.append("enlace", formValues.enlace);
      form.append("file", formValues.file[0]);
      if (id) {
        form.append("id", id);
      }
      const res = await axiosBase.post(
        "investigador/publicaciones/propiedadInt/registrar1",
        form
      );
      const info = res.data;
      if (info.message == "success") {
        const query = queryString.stringify({
          id: info.id,
        });
        window.location.href = "paso2?" + query;
      } else {
        pushNotification(info.detail, info.message, notifications.length + 1);
      }
      setLoadingBtn(false);
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
        <Wizard
          onNavigate={siguiente}
          activeStepIndex={0}
          isLoadingNextStep={loadingBtn}
          onCancel={() => {
            window.location.href = ".";
          }}
          steps={[
            {
              title: "Descripción de la propiedad intelectual",
              description: "Metadata de la patente",
              content: (
                <Container>
                  <SpaceBetween direction="vertical" size="s">
                    <FormField
                      label="Título"
                      stretch
                      errorText={formErrors.titulo}
                    >
                      <Autosuggest
                        onChange={({ detail }) => {
                          handleChange("titulo", detail.value);
                          setOptions1([]);
                          setValue1(detail.value);
                          if (detail.value == "") {
                            setPublicacion({});
                          }
                        }}
                        onSelect={({ detail }) => {
                          handleChange("titulo", detail.value);
                          if (detail.selectedOption?.id != undefined) {
                            const { value, ...rest } = detail.selectedOption;
                            setPublicacion(rest);
                            setAvoidSelect1(false);
                          }
                        }}
                        value={value1}
                        options={options1}
                        loadingText="Cargando data"
                        placeholder="Título de la publicación"
                        statusType={loading1 ? "loading" : "finished"}
                        empty="No se encontraron resultados"
                      />
                    </FormField>
                    <ColumnLayout columns={4} minColumnWidth={180}>
                      <FormField
                        label="Número de registro"
                        stretch
                        errorText={formErrors.nro_registro}
                      >
                        <Input
                          value={formValues.nro_registro}
                          onChange={({ detail }) =>
                            handleChange("nro_registro", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Tipo"
                        stretch
                        errorText={formErrors.tipo}
                      >
                        <Select
                          placeholder="Escoja una opción"
                          selectedOption={formValues.tipo}
                          onChange={({ detail }) =>
                            handleChange("tipo", detail.selectedOption)
                          }
                          options={[
                            { value: "Patente de invención" },
                            { value: "Modelo de utilidad" },
                            { value: "Certificado de obtentor" },
                          ]}
                        />
                      </FormField>
                      <FormField
                        label="Número de expediente"
                        stretch
                        errorText={formErrors.nro_expediente}
                      >
                        <Input
                          value={formValues.nro_expediente}
                          onChange={({ detail }) =>
                            handleChange("nro_expediente", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Fecha de presentación"
                        stretch
                        errorText={formErrors.fecha_presentacion}
                      >
                        <DatePicker
                          value={formValues.fecha_presentacion}
                          onChange={({ detail }) =>
                            handleChange("fecha_presentacion", detail.value)
                          }
                        />
                      </FormField>
                    </ColumnLayout>
                    <ColumnLayout columns={2}>
                      <FormField
                        label="Oficina de presentación"
                        stretch
                        errorText={formErrors.oficina_presentacion}
                      >
                        <Input
                          value={formValues.oficina_presentacion}
                          onChange={({ detail }) =>
                            handleChange("oficina_presentacion", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Enlace de la patente"
                        stretch
                        errorText={formErrors.enlace}
                      >
                        <Input
                          value={formValues.enlace}
                          onChange={({ detail }) =>
                            handleChange("enlace", detail.value)
                          }
                        />
                      </FormField>
                    </ColumnLayout>
                    <FormField
                      label="Certificado emitido"
                      description={
                        url && (
                          <>
                            Ya ha cargado un{" "}
                            <Link href={url} external fontSize="body-s">
                              archivo.
                            </Link>
                          </>
                        )
                      }
                      stretch
                    >
                      <FileUpload
                        {...fileProps}
                        value={formValues.file}
                        onChange={({ detail }) =>
                          handleChange("file", detail.value)
                        }
                      />
                    </FormField>
                  </SpaceBetween>
                  {publicacion?.id && (
                    <ModalIncluirmeAutor
                      id={publicacion.id}
                      close={() => {
                        setPublicacion({});
                        setValue1("");
                      }}
                    />
                  )}
                </Container>
              ),
            },
            {
              title: "Manejo de titulares",
              description: "Listado de titulares",
            },
            {
              title: "Autores de la patente",
              description: "Listado de autores de esta patente",
            },
            {
              title: "Envío de patente",
              description: "Opciones finales",
            },
          ]}
        />
      )}
    </BaseLayout>
  );
}
