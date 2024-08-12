import {
  Box,
  Button,
  ColumnLayout,
  Container,
  DateInput,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  StatusIndicator,
  TokenGroup,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../../providers/notificationProvider";

const initialForm = {
  titulo: "",
  url: "",
  tipo_tesis: null,
  fecha_publicacion: "",
  pagina_total: "",
  universidad: "",
  lugar_publicacion: "",
  pais: null,
  palabras_clave_input: "",
  palabras_clave: [],
};

const formRules = {
  titulo: { required: true },
  url: { required: true },
  tipo_tesis: { required: true },
  fecha_publicacion: { required: true },
  pagina_total: { required: true },
  universidad: { required: true },
  lugar_publicacion: { required: true },
  pais: { required: true },
  palabras_clave: { required: true, noEmpty: true },
};

const tipo_tesis = [
  { value: "Licenciatura" },
  { value: "Maestría" },
  { value: "Doctorado" },
];

export default function ({ data }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [paises, setPaises] = useState([]);
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Function
  const getData = () => {
    setPaises(data.paises);
    setFormValues({
      ...initialForm,
      ...data.data,
      tipo_tesis: { value: data.data.tipo_tesis },
      pais: { value: data.data.pais },
      palabras_clave: data.palabras_clave,
    });
  };

  const guardarData = async () => {
    setLoadingGuardar(true);
    const res = await axiosBase.post("admin/estudios/publicaciones/paso1", {
      ...formValues,
      id,
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingGuardar(false);
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      header={
        <Header
          actions={
            <Button loading={loadingGuardar} onClick={guardarData}>
              Actualizar datos
            </Button>
          }
        >
          Datos de la tesis
        </Header>
      }
    >
      <SpaceBetween direction="vertical" size="s">
        <FormField label="Título" stretch errorText={formErrors.titulo}>
          <Input
            placeholder="Escriba el título de la tesis"
            value={formValues.titulo}
            onChange={({ detail }) => handleChange("titulo", detail.value)}
          />
        </FormField>
        <FormField
          label="Repositorio de la tesis (link)"
          stretch
          errorText={formErrors.url}
        >
          <Input
            placeholder="Escriba la URL de su tesis"
            value={formValues.url}
            onChange={({ detail }) => handleChange("url", detail.value)}
          />
        </FormField>
        <ColumnLayout columns={3}>
          <FormField
            label="Tipo de tesis"
            stretch
            errorText={formErrors.tipo_tesis}
          >
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.tipo_tesis}
              onChange={({ detail }) => {
                handleChange("tipo_tesis", detail.selectedOption);
              }}
              options={tipo_tesis}
            />
          </FormField>
          <FormField
            label="Fecha de publicación"
            stretch
            errorText={formErrors.fecha_publicacion}
          >
            <DateInput
              placeholder="YYYY-MM-DD"
              value={formValues.fecha_publicacion}
              onChange={({ detail }) =>
                handleChange("fecha_publicacion", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Total de páginas"
            stretch
            errorText={formErrors.pagina_total}
          >
            <Input
              placeholder="Cantidad de páginas"
              type="number"
              value={formValues.pagina_total}
              onChange={({ detail }) =>
                handleChange("pagina_total", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Universidad"
            stretch
            errorText={formErrors.universidad}
          >
            <Input
              placeholder="Universidad en la que se presentó la tesis"
              value={formValues.universidad}
              onChange={({ detail }) =>
                handleChange("universidad", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Ciudad"
            stretch
            errorText={formErrors.lugar_publicacion}
          >
            <Input
              placeholder="Lugar de la publicación"
              value={formValues.lugar_publicacion}
              onChange={({ detail }) =>
                handleChange("lugar_publicacion", detail.value)
              }
            />
          </FormField>
          <FormField label="País" stretch errorText={formErrors.pais}>
            <Select
              statusType={paises.length == 0 ? "loading" : "finished"}
              loadingText="Cargando listado de países"
              placeholder="Escoja una opción"
              selectedOption={formValues.pais}
              onChange={({ detail }) => {
                handleChange("pais", detail.selectedOption);
              }}
              options={paises}
            />
          </FormField>
        </ColumnLayout>
        <FormField
          label="Palabras clave"
          description={
            <StatusIndicator type="warning">
              <Box
                variant="strong"
                color="text-status-warning"
                fontSize="body-s"
              >
                Presionar la tecla de enter para añadir una palabra
              </Box>
            </StatusIndicator>
          }
          stretch
          errorText={formErrors.palabras_clave}
        >
          <Input
            placeholder="Escriba las palabras clave"
            value={formValues.palabras_clave_input}
            onChange={({ detail }) => {
              handleChange("palabras_clave_input", detail.value);
            }}
            onKeyDown={({ detail }) => {
              if (
                detail.key == "Enter" &&
                formValues.palabras_clave_input != ""
              ) {
                handleChange("palabras_clave", [
                  ...formValues.palabras_clave,
                  { label: formValues.palabras_clave_input },
                ]);
                handleChange("palabras_clave_input", "");
              }
            }}
          />
          <TokenGroup
            items={formValues.palabras_clave}
            onDismiss={({ detail: { itemIndex } }) => {
              handleChange("palabras_clave", [
                ...formValues.palabras_clave.slice(0, itemIndex),
                ...formValues.palabras_clave.slice(itemIndex + 1),
              ]);
            }}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
}
