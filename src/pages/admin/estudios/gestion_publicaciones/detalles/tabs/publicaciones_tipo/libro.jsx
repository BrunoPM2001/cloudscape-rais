import {
  Box,
  Button,
  ColumnLayout,
  Container,
  FormField,
  Header,
  Input,
  Link,
  Select,
  SpaceBetween,
  StatusIndicator,
  TokenGroup,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../../api/axios";
import NotificationContext from "../../../../../../../providers/notificationProvider";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const initialForm = {
  categoria_autor: null,
  isbn: "",
  titulo: "",
  editorial: "",
  ciudad: "",
  pais: null,
  edicion: "",
  volumen: "",
  pagina_total: "",
  fecha_publicacion: "",
  palabras_clave_input: "",
  palabras_clave: [],
  url: "",
};

const formRules = {
  categoria_autor: { required: true },
  isbn: { required: true },
  titulo: { required: true },
  editorial: { required: true },
  ciudad: { required: true },
  pais: { required: true },
  edicion: { required: true },
  volumen: { required: true },
  pagina_total: { required: true },
  fecha_publicacion: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  url: { required: true },
};

export default function ({ data, setData }) {
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
  const getData = async () => {
    setPaises(data.paises);
    setFormValues({
      ...initialForm,
      ...data.data,
      categoria_autor: { value: data.data.categoria },
      palabras_clave: data.palabras_clave,
      pais: { value: data.data.pais },
    });
  };

  const guardarData = async () => {
    if (validateForm()) {
      setLoadingGuardar(true);
      const res = await axiosBase.post("admin/estudios/publicaciones/paso1", {
        ...formValues,
        id,
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoadingGuardar(false);
    }
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
          Datos del libro
        </Header>
      }
    >
      <SpaceBetween direction="vertical" size="s">
        <FormField
          label="ISBN"
          stretch
          info={
            <SpaceBetween size="xs" direction="horizontal">
              <Link
                external
                target="_blank"
                href={`http://isbn.bnp.gob.pe/catalogo.php?mode=resultados_rapidos&palabra=${
                  formValues.isbn ?? ""
                }`}
              >
                BNP
              </Link>
              <Link
                external
                target="_blank"
                href={`https://www.bookfinder.com/?isbn=${
                  formValues.isbn ?? ""
                }`}
              >
                BF
              </Link>
            </SpaceBetween>
          }
          errorText={formErrors.isbn}
        >
          <Input
            placeholder="Escriba el isbn"
            value={formValues.isbn}
            onChange={({ detail }) => {
              handleChange("isbn", detail.value);
              setData({
                ...data,
                data: {
                  ...data.data,
                  isbn: detail.value,
                },
              });
            }}
          />
        </FormField>
        <FormField label="Título" stretch errorText={formErrors.titulo}>
          <Input
            placeholder="Escriba el título de la publicación"
            value={formValues.titulo}
            onChange={({ detail }) => {
              handleChange("titulo", detail.value);
              setData({
                ...data,
                data: {
                  ...data.data,
                  titulo: detail.value,
                },
              });
            }}
          />
        </FormField>
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
            placeholder="Escriba las palabras clave de su publicación"
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
                setData({
                  ...data,
                  palabras_clave: [
                    ...formValues.palabras_clave,
                    { label: formValues.palabras_clave_input },
                  ],
                });
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
        <FormField
          label="URL de la publicación"
          stretch
          info={
            <Button
              iconName="external"
              variant="inline-icon"
              target="_blank"
              href={formValues.url ?? ""}
            />
          }
          errorText={formErrors.url}
        >
          <Input
            placeholder="Escriba la URL de su publicación"
            value={formValues.url}
            onChange={({ detail }) => {
              handleChange("url", detail.value);
              setData({
                ...data,
                data: {
                  ...data.data,
                  url: detail.value,
                },
              });
            }}
          />
        </FormField>
        <Header>Datos de edición</Header>
        <ColumnLayout columns={3}>
          <FormField label="Editorial" stretch errorText={formErrors.editorial}>
            <Input
              placeholder="Escriba el nombre de la editorial"
              value={formValues.editorial}
              onChange={({ detail }) => {
                handleChange("editorial", detail.value);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    editorial: detail.value,
                  },
                });
              }}
            />
          </FormField>
          <FormField label="Ciudad" stretch errorText={formErrors.ciudad}>
            <Input
              placeholder="Escriba el nombre de la ciudad"
              value={formValues.ciudad}
              onChange={({ detail }) => {
                handleChange("ciudad", detail.value);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    ciudad: detail.value,
                  },
                });
              }}
            />
          </FormField>
          <FormField label="País" stretch errorText={formErrors.pais}>
            <Select
              statusType={paises.length == 0 ? "loading" : "finished"}
              loadingText="Cargando"
              placeholder="Escoja una opción"
              selectedOption={formValues.pais}
              onChange={({ detail }) => {
                handleChange("pais", detail.selectedOption);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    pais: detail.selectedOption.value,
                  },
                });
              }}
              options={paises}
            />
          </FormField>
        </ColumnLayout>
        <ColumnLayout columns={4}>
          <FormField label="Edición" stretch errorText={formErrors.edicion}>
            <Input
              placeholder="Escriba el n° de edicion"
              value={formValues.edicion}
              onChange={({ detail }) => {
                handleChange("edicion", detail.value);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    edicion: detail.value,
                  },
                });
              }}
            />
          </FormField>
          <FormField label="Volumen" stretch errorText={formErrors.volumen}>
            <Input
              placeholder="Escriba el volumen de su publicación"
              value={formValues.volumen}
              onChange={({ detail }) => {
                handleChange("volumen", detail.value);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    volumen: detail.value,
                  },
                });
              }}
            />
          </FormField>
          <FormField
            label="Total de páginas"
            stretch
            errorText={formErrors.pagina_total}
          >
            <Input
              placeholder="Escriba el total de páginas"
              type="number"
              value={formValues.pagina_total}
              onChange={({ detail }) => {
                handleChange("pagina_total", detail.value);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    pagina_total: detail.value,
                  },
                });
              }}
            />
          </FormField>
          <FormField
            label="Fecha de publicación"
            stretch
            errorText={formErrors.fecha_publicacion}
          >
            <Input
              placeholder="Escriba la fecha de publicación"
              value={formValues.fecha_publicacion}
              onChange={({ detail }) => {
                handleChange("fecha_publicacion", detail.value);
                setData({
                  ...data,
                  data: {
                    ...data.data,
                    fecha_publicacion: detail.value,
                  },
                });
              }}
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
