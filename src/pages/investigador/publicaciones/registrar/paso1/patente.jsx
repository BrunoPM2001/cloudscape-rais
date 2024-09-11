import {
  Alert,
  Autosuggest,
  Box,
  ColumnLayout,
  Container,
  DatePicker,
  Form,
  FormField,
  Grid,
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

  //  Functions
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
    setFormValues({
      ...initialForm,
      ...data.data,
    });
    setValue1(data.data.titulo);
    setLoadingData(false);
  };

  const registrar = async () => {
    if (validateForm()) {
      if (props.publicacion_id != null) {
        const res = await axiosBase.post(
          "investigador/publicaciones/articulos/registrarPaso1",
          { ...formValues, publicacion_id: props.publicacion_id }
        );
        const data = res.data;
        if (data.message == "error") {
          pushNotification(data.detail, data.message, notifications.length + 1);
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
          pushNotification(data.detail, data.message, notifications.length + 1);
          setTimeout(() => {
            window.location.href = "/investigador";
          }, 5000);
        } else {
          return { isValid: true, res_publicacion_id: data.publicacion_id };
        }
      }
    } else {
      return { isValid: false };
    }
  };

  //  Effect
  useEffect(() => {
    if (props.publicacion_id != null) {
      getData();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <Container>
      <Form header={<Header>Descripción de la propiedad intelectual</Header>}>
        {loadingData ? (
          <Spinner />
        ) : (
          <SpaceBetween direction="vertical" size="s">
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
            <ColumnLayout columns={4} minColumnWidth={180}>
              <FormField
                label="Número de registro"
                stretch
                errorText={formErrors.pagina_inicial}
              >
                <Input
                  value={formValues.pagina_inicial}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicial", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Tipo"
                stretch
                errorText={formErrors.pagina_inicial}
              >
                <Select
                  selectedOption={formValues.pagina_inicial}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicial", detail.selectedOption)
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
                errorText={formErrors.pagina_inicial}
              >
                <Input
                  value={formValues.pagina_inicial}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicial", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Fecha de presentación"
                stretch
                errorText={formErrors.fecha}
              >
                <DatePicker
                  value={formValues.fecha}
                  onChange={({ detail }) => handleChange("fecha", detail.value)}
                />
              </FormField>
            </ColumnLayout>
            <ColumnLayout columns={2}>
              <FormField
                label="Oficina de presentación"
                stretch
                errorText={formErrors.pagina_inicial}
              >
                <Input
                  value={formValues.pagina_inicial}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicial", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Número de expediente"
                stretch
                errorText={formErrors.pagina_inicial}
              >
                <Input
                  value={formValues.pagina_inicial}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicial", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
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
