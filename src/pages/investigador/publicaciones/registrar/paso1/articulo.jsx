import {
  Alert,
  Autosuggest,
  Box,
  ColumnLayout,
  Container,
  DateInput,
  Form,
  FormField,
  Header,
  Input,
  Multiselect,
  Select,
  SpaceBetween,
  Spinner,
  StatusIndicator,
  TokenGroup,
} from "@cloudscape-design/components";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import ModalIncluirmeAutor from "../components/modalIncluirmeAutor";

const initialForm = {
  doi: "",
  art_tipo: null,
  titulo: "",
  palabras_clave_input: "",
  palabras_clave: [],
  pagina_inicial: "",
  pagina_final: "",
  fecha_publicacion: "",
  publicacion_nombre: "",
  issn: "",
  issn_e: "",
  volumen: "",
  edicion: "",
  indexada: [],
  url: "",
};

const formRules = {
  doi: { required: true },
  art_tipo: { required: true },
  titulo: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  pagina_inicial: { required: true },
  pagina_final: { required: true },
  fecha_publicacion: { required: true },
  publicacion_nombre: { required: true },
  volumen: { required: true },
  edicion: { required: true },
};

export default forwardRef(function (props, ref) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [loadingData, setLoadingData] = useState(false);
  const [revistasIndexadas, setRevistasIndexadas] = useState([]);
  const [publicacion, setPublicacion] = useState({});
  const [alert, setAlert] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, setFormValues, validateForm } =
    useFormValidation(initialForm, formRules);
  const {
    loading: loading1,
    options: options1,
    setOptions: setOptions1,
    value: value1,
    setValue: setValue1,
    setAvoidSelect: setAvoidSelect1,
  } = useAutosuggest("investigador/publicaciones/utils/listadoTitulos");
  const {
    loading: loading2,
    options: options2,
    setOptions: setOptions2,
    value: value2,
    setValue: setValue2,
    setAvoidSelect: setAvoidSelect2,
  } = useAutosuggest("investigador/publicaciones/utils/listadoDois");
  const {
    loading: loading3,
    options: options3,
    setOptions: setOptions3,
    value: value3,
    setValue: setValue3,
    setAvoidSelect: setAvoidSelect3,
  } = useAutosuggest("investigador/publicaciones/utils/listadoRevistas");

  //  Functions
  const listaRevistasIndexadas = async () => {
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/listadoRevistasIndexadas"
    );
    const data = res.data;
    setRevistasIndexadas(data);
  };

  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/articulos/datosPaso1",
      {
        params: {
          publicacion_id: props.publicacion_id,
        },
      }
    );
    const data = res.data;
    setRevistasIndexadas(data.revistas);
    setFormValues({
      ...initialForm,
      ...data.data,
      art_tipo: { value: data.data.art_tipo },
      palabras_clave: data.palabras_clave,
      indexada: data.indexada,
    });
    setValue1(data.data.titulo);
    setValue2(data.data.doi);
    setValue3(data.data.publicacion_nombre);
    setLoadingData(false);
  };

  const registrar = async () => {
    if (validateForm()) {
      if (formValues.issn != "" || formValues.issn_e != "") {
        if (props.publicacion_id != null) {
          const res = await axiosBase.post(
            "investigador/publicaciones/articulos/registrarPaso1",
            { ...formValues, publicacion_id: props.publicacion_id }
          );
          const data = res.data;
          if (data.message == "error") {
            pushNotification(
              data.detail,
              data.message,
              notifications.length + 1
            );
            setTimeout(() => {
              window.location.href = "/investigador";
            }, 3000);
          } else {
            return { isValid: true, res_publicacion_id: null };
          }
        } else {
          const res = await axiosBase.post(
            "investigador/publicaciones/articulos/registrarPaso1",
            formValues
          );
          const data = res.data;
          if (data.message == "error") {
            pushNotification(
              data.detail,
              data.message,
              notifications.length + 1
            );
            setTimeout(() => {
              window.location.href = "/investigador";
            }, 5000);
          } else {
            return { isValid: true, res_publicacion_id: data.publicacion_id };
          }
        }
      } else {
        setAlert("Necesita completar el campo de ISSN o el de ISSN-E");
        return { isValid: false };
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
      listaRevistasIndexadas();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <Container>
      <Form header={<Header>Datos del artículo</Header>}>
        {loadingData ? (
          <Spinner />
        ) : (
          <SpaceBetween direction="vertical" size="s">
            <ColumnLayout columns={2}>
              <FormField
                label="DOI"
                constraintText={
                  <>
                    <Box variant="small">Colocar solo el código, ejemplo: </Box>{" "}
                    <Box variant="small" color="text-status-info">
                      10.47366/sabia.v5n1a3
                    </Box>
                  </>
                }
                stretch
                errorText={formErrors.doi}
              >
                <Autosuggest
                  onChange={({ detail }) => {
                    handleChange("doi", detail.value);
                    setOptions2([]);
                    setValue2(detail.value);
                    if (detail.value == "") {
                      setPublicacion({});
                    }
                  }}
                  onSelect={({ detail }) => {
                    handleChange("doi", detail.value);
                    if (detail.selectedOption.id != undefined) {
                      const { value, ...rest } = detail.selectedOption;
                      setPublicacion(rest);
                      setAvoidSelect2(false);
                    }
                  }}
                  value={value2}
                  options={options2}
                  loadingText="Cargando data"
                  placeholder="Doi de la publicación"
                  statusType={loading2 ? "loading" : "finished"}
                  empty="No se encontraron resultados"
                />
              </FormField>
              <FormField
                label="Tipo de artículo"
                stretch
                errorText={formErrors.art_tipo}
              >
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.art_tipo}
                  onChange={({ detail }) => {
                    handleChange("art_tipo", detail.selectedOption);
                  }}
                  options={[
                    { value: "Artículo original" },
                    { value: "Artículo de revisión" },
                    { value: "Comunicación o nota corta" },
                  ]}
                ></Select>
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
                  if (detail.selectedOption.id != undefined) {
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
            <ColumnLayout columns={3}>
              <FormField
                label="Página inicio"
                stretch
                errorText={formErrors.pagina_inicial}
              >
                <Input
                  placeholder="N° de la pág. inicial"
                  type="number"
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
                  placeholder="N° de la pág. final"
                  type="number"
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
                <DateInput
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_publicacion}
                  onChange={({ detail }) =>
                    handleChange("fecha_publicacion", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <Header>Datos de la revista</Header>
            <FormField
              label="Revista"
              stretch
              errorText={formErrors.publicacion_nombre}
            >
              <Autosuggest
                onChange={({ detail }) => {
                  setOptions3([]);
                  setValue3(detail.value);
                }}
                onSelect={({ detail }) => {
                  if (detail.selectedOption.value != undefined) {
                    const { value, ...rest } = detail.selectedOption;
                    handleChange("publicacion_nombre", rest.revista);
                    handleChange("issn", rest.issn);
                    handleChange("issn_e", rest.issne);
                    setAvoidSelect3(false);
                  }
                }}
                value={value3}
                options={options3}
                loadingText="Cargando data"
                placeholder="Issn, issn-e o nombre de la revista"
                statusType={loading3 ? "loading" : "finished"}
                empty="No se encontraron resultados"
              />
            </FormField>
            <ColumnLayout columns={4}>
              <FormField label="ISSN" stretch errorText={formErrors.issn}>
                <Input
                  placeholder="Escriba el ISSN"
                  value={formValues.issn}
                  onChange={({ detail }) => handleChange("issn", detail.value)}
                />
              </FormField>
              <FormField label="ISSN-E" stretch errorText={formErrors.issn_e}>
                <Input
                  placeholder="Escriba el ISSN-E"
                  value={formValues.issn_e}
                  onChange={({ detail }) =>
                    handleChange("issn_e", detail.value)
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
              <FormField label="Número" stretch errorText={formErrors.edicion}>
                <Input
                  placeholder="Escriba el n° de su publicación"
                  value={formValues.edicion}
                  onChange={({ detail }) =>
                    handleChange("edicion", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <FormField
              label="Publicación indexada en"
              stretch
              errorText={formErrors.indexada}
            >
              <Multiselect
                statusType={
                  revistasIndexadas.length == 0 ? "loading" : "finished"
                }
                virtualScroll
                filteringType="auto"
                placeholder="Escoga las revistas"
                selectedOptions={formValues.indexada}
                onChange={({ detail }) =>
                  handleChange("indexada", detail.selectedOptions)
                }
                options={[
                  {
                    label: "Grupo de revistas",
                    options: revistasIndexadas,
                  },
                ]}
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
            {alert != "" && (
              <Alert
                header="Alerta"
                type="warning"
                dismissible
                onDismiss={() => setAlert("")}
              >
                {alert}
              </Alert>
            )}
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
