import {
  Autosuggest,
  Box,
  ColumnLayout,
  Container,
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
  pais: { required: true },
  edicion: { required: true },
  volumen: { required: true },
  pagina_total: { required: true },
  fecha_publicacion: { required: true },
  palabras_clave: { required: true, noEmpty: true },
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
  } = useAutosuggest("investigador/publicaciones/libros/searchTitulo");
  const {
    loading: loading2,
    options: options2,
    setOptions: setOptions2,
    value: value2,
    setValue: setValue2,
    setAvoidSelect: setAvoidSelect2,
  } = useAutosuggest("investigador/publicaciones/libros/searchIsbn");

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
      "investigador/publicaciones/libros/datosPaso1",
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
      categoria_autor: { value: data.data.categoria },
      palabras_clave: data.palabras_clave,
      pais: { value: data.data.pais },
    });
    setValue1(data.data.titulo);
    setValue2(data.data.isbn);
    setLoadingData(false);
  };

  const registrar = async () => {
    if (validateForm()) {
      if (props.publicacion_id != null) {
        await axiosBase.post(
          "investigador/publicaciones/libros/registrarPaso1",
          { ...formValues, publicacion_id: props.publicacion_id }
        );
        return { isValid: true, res_publicacion_id: null };
      } else {
        const res = await axiosBase.post(
          "investigador/publicaciones/libros/registrarPaso1",
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
            <ColumnLayout columns={2}>
              <FormField
                label="Categoría de autor"
                stretch
                errorText={formErrors.categoria_autor}
              >
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.categoria_autor}
                  onChange={({ detail }) => {
                    handleChange("categoria_autor", detail.selectedOption);
                  }}
                  options={[{ value: "Autor" }, { value: "Editor" }]}
                />
              </FormField>
              <FormField label="ISBN" stretch errorText={formErrors.isbn}>
                <Autosuggest
                  onChange={({ detail }) => {
                    handleChange("isbn", detail.value);
                    setOptions2([]);
                    setValue2(detail.value);
                    if (detail.value == "") {
                      setPublicacion({});
                    }
                  }}
                  onSelect={({ detail }) => {
                    handleChange("isbn", detail.value);
                    if (detail.selectedOption?.id != undefined) {
                      const { value, ...rest } = detail.selectedOption;
                      setPublicacion(rest);
                      setAvoidSelect2(false);
                    }
                  }}
                  value={value2}
                  options={options2}
                  loadingText="Cargando data"
                  placeholder="Isbn de la publicación"
                  statusType={loading2 ? "loading" : "finished"}
                  empty="No se encontraron resultados"
                />
              </FormField>
            </ColumnLayout>
            <FormField label="Título" stretch errorText={formErrors.titulo}>
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
            <Header>Datos de edición</Header>
            <ColumnLayout columns={3}>
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
            <ColumnLayout columns={4}>
              <FormField label="Edición" stretch errorText={formErrors.edicion}>
                <Input
                  placeholder="Escriba el n° de edicion"
                  value={formValues.edicion}
                  onChange={({ detail }) =>
                    handleChange("edicion", detail.value)
                  }
                />
              </FormField>
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
          </SpaceBetween>
        )}
      </Form>
      {publicacion?.id && (
        <ModalIncluirmeAutor
          id={publicacion.id}
          close={() => {
            setPublicacion({});
            setValue1("");
            setValue2("");
          }}
        />
      )}
    </Container>
  );
});
