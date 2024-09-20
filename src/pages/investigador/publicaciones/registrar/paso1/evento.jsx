import {
  Autosuggest,
  ColumnLayout,
  Container,
  DatePicker,
  Form,
  FormField,
  Input,
  Select,
  SpaceBetween,
  Spinner,
  TokenGroup,
} from "@cloudscape-design/components";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import ModalIncluirmeAutor from "../components/modalIncluirmeAutor";

const initialForm = {
  titulo: "",
  tipo_presentacion: null,
  palabras_clave_input: "",
  palabras_clave: [],
  publicacion_nombre: "",
  isbn: "",
  editorial: "",
  volumen: "",
  ciudad_edicion: "",
  issn: "",
  issn_e: "",
  pagina_inicial: "",
  pagina_final: "",
  fecha_publicacion: "",
  evento_nombre: "",
  fecha_inicio: "",
  fecha_fin: "",
  ciudad: "",
  pais: null,
  url: "",
};

const formRules = {
  titulo: { required: true },
  tipo_presentacion: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  publicacion_nombre: { required: true },
  volumen: { required: true },
  pagina_inicial: { required: true },
  pagina_final: { required: true },
  fecha_publicacion: { required: true },
  fecha_inicio: { required: true },
  fecha_fin: { required: true },
  pais: { required: true },
};

const groupRules = [
  {
    mode: "oneOfAllRequired",
    inputs: ["isbn", "issn", "issn_e"],
  },
];

const optsPresentacion = [
  { value: "Conferencista" },
  { value: "Invitado" },
  { value: "Oral" },
  { value: "Poster" },
];

export default forwardRef(function (props, ref) {
  //  State
  const [loadingData, setLoadingData] = useState(false);
  const [paises, setPaises] = useState([]);
  const [publicacion, setPublicacion] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules, groupRules);

  const {
    loading: loading1,
    options: options1,
    setOptions: setOptions1,
    value: value1,
    setValue: setValue1,
    setAvoidSelect: setAvoidSelect1,
  } = useAutosuggest("investigador/publicaciones/eventos/searchTitulo");

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
      "investigador/publicaciones/eventos/datosPaso1",
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
      tipo_presentacion: { value: data.data.tipo_presentacion },
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
          "investigador/publicaciones/eventos/registrarPaso1",
          { ...formValues, publicacion_id: props.publicacion_id }
        );
        return { isValid: true, res_publicacion_id: null };
      } else {
        const res = await axiosBase.post(
          "investigador/publicaciones/eventos/registrarPaso1",
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
    <Form>
      {loadingData ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <SpaceBetween size="m">
          <Container>
            <SpaceBetween size="s">
              <FormField
                label="Título de la publicación"
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
              <FormField
                label="Tipo de presentación"
                stretch
                errorText={formErrors.tipo_presentacion}
              >
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.tipo_presentacion}
                  onChange={({ detail }) =>
                    handleChange("tipo_presentacion", detail.selectedOption)
                  }
                  options={optsPresentacion}
                />
              </FormField>
              <FormField
                label="Palabras clave"
                description="Presionar la tecla de enter para añadir una palabra"
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
            </SpaceBetween>
          </Container>
          <Container>
            <SpaceBetween size="s">
              <FormField
                label="Nombre del libro de resumen de actas / revista"
                stretch
                errorText={formErrors.publicacion_nombre}
              >
                <Input
                  placeholder="Escriba el nombre en caso lo tenga como dato"
                  value={formValues.publicacion_nombre}
                  onChange={({ detail }) =>
                    handleChange("publicacion_nombre", detail.value)
                  }
                />
              </FormField>
              <ColumnLayout columns={4}>
                <FormField label="ISBN" stretch errorText={formErrors.isbn}>
                  <Input
                    placeholder="Escriba el isbn"
                    value={formValues.isbn}
                    onChange={({ detail }) =>
                      handleChange("isbn", detail.value)
                    }
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
                <FormField
                  label="Volumen / tomo"
                  stretch
                  errorText={formErrors.volumen}
                >
                  <Input
                    placeholder="Escriba el volumen de su publicación"
                    value={formValues.volumen}
                    onChange={({ detail }) =>
                      handleChange("volumen", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Ciudad de edición"
                  stretch
                  errorText={formErrors.ciudad_edicion}
                >
                  <Input
                    placeholder="Escriba el nombre de la ciudad de edición"
                    value={formValues.ciudad_edicion}
                    onChange={({ detail }) =>
                      handleChange("ciudad_edicion", detail.value)
                    }
                  />
                </FormField>
                <FormField label="ISSN" stretch errorText={formErrors.issn}>
                  <Input
                    placeholder="Escriba el issn"
                    value={formValues.issn}
                    onChange={({ detail }) =>
                      handleChange("issn", detail.value)
                    }
                  />
                </FormField>
                <FormField label="ISSN-E" stretch errorText={formErrors.issn_e}>
                  <Input
                    placeholder="Escriba el issn-e"
                    value={formValues.issn_e}
                    onChange={({ detail }) =>
                      handleChange("issn_e", detail.value)
                    }
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
            </SpaceBetween>
          </Container>
          <Container>
            <SpaceBetween size="s">
              <FormField
                label="Nombre del evento"
                stretch
                errorText={formErrors.evento_nombre}
              >
                <Input
                  placeholder="Escriba el nombre del evento"
                  value={formValues.evento_nombre}
                  onChange={({ detail }) =>
                    handleChange("evento_nombre", detail.value)
                  }
                />
              </FormField>
              <ColumnLayout columns={4}>
                <FormField
                  label="Fecha de inicio"
                  stretch
                  errorText={formErrors.fecha_inicio}
                >
                  <DatePicker
                    placeholder="YYYY-MM-DD"
                    value={formValues?.fecha_inicio ?? ""}
                    onChange={({ detail }) =>
                      handleChange("fecha_inicio", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Fecha de fin"
                  stretch
                  errorText={formErrors.fecha_fin}
                >
                  <DatePicker
                    placeholder="YYYY-MM-DD"
                    value={formValues?.fecha_fin ?? ""}
                    onChange={({ detail }) =>
                      handleChange("fecha_fin", detail.value)
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
          </Container>
          {publicacion?.id && (
            <ModalIncluirmeAutor
              id={publicacion.id}
              close={() => {
                setPublicacion({});
                setValue1("");
              }}
            />
          )}
        </SpaceBetween>
      )}
    </Form>
  );
});
