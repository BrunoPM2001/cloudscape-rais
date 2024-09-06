import {
  Autosuggest,
  Box,
  ColumnLayout,
  Container,
  DateInput,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  Spinner,
  StatusIndicator,
  TokenGroup,
} from "@cloudscape-design/components";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import ModalIncluirmeAutor from "../components/modalIncluirmeAutor";

const initialForm = {
  titulo: "",
  doi: "",
  pagina_inicial: "",
  pagina_final: "",
  fecha_publicacion: "",
  palabras_clave_input: "",
  palabras_clave: [],
  publicacion_nombre: "",
  isbn: "",
  editorial: "",
  edicion: "",
  volumen: "",
  pagina_total: "",
  ciudad: "",
  pais: null,
  url: "",
};

const formRules = {
  titulo: { required: true },
  pagina_inicial: { required: true },
  pagina_final: { required: true },
  fecha_publicacion: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  publicacion_nombre: { required: true },
  isbn: { required: true },
  editorial: { required: true },
  pagina_total: { required: true },
  ciudad: { required: false },
  pais: { required: true },
};

export default forwardRef(function (props, ref) {
  //  State
  const [loadingData, setLoadingData] = useState(false);
  const [paises, setPaises] = useState([]);
  const [publicacion, setPublicacion] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const {
    loading: loading1,
    options: options1,
    setOptions: setOptions1,
    value: value1,
    setValue: setValue1,
    setAvoidSelect: setAvoidSelect1,
  } = useAutosuggest("investigador/publicaciones/capitulos/searchTitulo");

  //  Function
  const listaPaises = async () => {
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/getPaises"
    );
    const data = res.data;
    setPaises(data);
  };

  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/capitulos/datosPaso1",
      {
        params: {
          publicacion_id: props.publicacion_id,
        },
      }
    );
    const data = res.data;
    setPaises(data.paises);
    setFormValues({
      ...initialForm,
      ...data.data,
      art_tipo: { value: data.data.art_tipo },
      pais: { value: data.data.pais },
      palabras_clave: data.palabras_clave,
    });
    setValue1(data.data.titulo);
    setLoadingData(false);
  };

  const registrar = async () => {
    if (validateForm()) {
      if (props.publicacion_id != null) {
        await axiosBase.post(
          "investigador/publicaciones/capitulos/registrarPaso1",
          { ...formValues, publicacion_id: props.publicacion_id }
        );
        return { isValid: true, res_publicacion_id: null };
      } else {
        const res = await axiosBase.post(
          "investigador/publicaciones/capitulos/registrarPaso1",
          formValues
        );
        const data = res.data;
        return { isValid: true, res_publicacion_id: data.publicacion_id };
      }
    } else {
      return { isValid: false };
    }
  };

  //  Effect
  useEffect(() => {
    if (props.publicacion_id != null) {
      getData();
    } else {
      listaPaises();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <Container>
      <Form>
        {loadingData ? (
          <Spinner />
        ) : (
          <SpaceBetween direction="vertical" size="s">
            <FormField
              label="Título del capítulo"
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
            <ColumnLayout columns={4}>
              <FormField label="DOI" stretch errorText={formErrors.doi}>
                <Input
                  placeholder="Escriba el doi"
                  value={formValues.doi}
                  onChange={({ detail }) => handleChange("doi", detail.value)}
                />
              </FormField>
              <FormField
                label="Página inicial"
                stretch
                errorText={formErrors.pagina_inicial}
              >
                <Input
                  type="number"
                  placeholder="Escriba el n° de página inicial"
                  value={formValues.pagina_inicial}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicial", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Página final"
                stretch
                errorText={formErrors.pagina_final}
              >
                <Input
                  type="number"
                  placeholder="Escriba el n° de página final"
                  value={formValues.pagina_final}
                  onChange={({ detail }) =>
                    handleChange("pagina_final", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Fecha de publicación"
                constraintText="En caso no tenga la fecha exacta coloque 1ero de enero del año de publicación"
                stretch
                errorText={formErrors.fecha_publicacion}
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_publicacion}
                  onChange={({ detail }) =>
                    handleChange("fecha_publicacion", detail.value)
                  }
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
            <Header>Datos del libro</Header>
            <FormField
              label="Título del libro"
              stretch
              errorText={formErrors.publicacion_nombre}
            >
              <Input
                placeholder="Escriba el título del libro"
                value={formValues.publicacion_nombre}
                onChange={({ detail }) =>
                  handleChange("publicacion_nombre", detail.value)
                }
              />
            </FormField>
            <ColumnLayout columns={3}>
              <FormField label="ISBN" stretch errorText={formErrors.isbn}>
                <Input
                  placeholder="Escriba el ISBN de la publicación"
                  value={formValues.isbn}
                  onChange={({ detail }) => handleChange("isbn", detail.value)}
                />
              </FormField>
              <FormField
                label="Editorial"
                stretch
                errorText={formErrors.editorial}
              >
                <Input
                  placeholder="Escriba el nombre de la editorial"
                  value={formValues.editorial}
                  onChange={({ detail }) =>
                    handleChange("editorial", detail.value)
                  }
                />
              </FormField>
              <FormField label="Edición" stretch errorText={formErrors.edicion}>
                <Input
                  placeholder="Escriba el n° de edicion"
                  value={formValues.edicion}
                  onChange={({ detail }) =>
                    handleChange("edicion", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <ColumnLayout columns={4}>
              <FormField label="Volumen" stretch errorText={formErrors.volumen}>
                <Input
                  placeholder="Escriba el volumen de su publicación"
                  value={formValues.volumen}
                  onChange={({ detail }) =>
                    handleChange("volumen", detail.value)
                  }
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
                  onChange={({ detail }) =>
                    handleChange("pagina_total", detail.value)
                  }
                />
              </FormField>
              <FormField label="Ciudad" stretch errorText={formErrors.ciudad}>
                <Input
                  placeholder="Escriba el nombre de la ciudad"
                  value={formValues.ciudad}
                  onChange={({ detail }) =>
                    handleChange("ciudad", detail.value)
                  }
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
                  }}
                  options={paises}
                />
              </FormField>
            </ColumnLayout>
            <FormField
              label="URL de la publicación"
              stretch
              errorText={formErrors.url}
            >
              <Input
                placeholder="Escriba la URL de su publicación"
                value={formValues.url}
                onChange={({ detail }) => handleChange("url", detail.value)}
              />
            </FormField>
          </SpaceBetween>
        )}
      </Form>
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
  );
});
