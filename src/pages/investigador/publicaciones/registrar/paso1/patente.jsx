import {
  Alert,
  Autosuggest,
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
  titulo: "",
  nro_registro: "",
  tipo: null,
  nro_expediente: "",
  fecha_presentacion: "",
  oficina_presentacion: "",
  enlace: "",
};

const formRules = {
  titulo: { required: true },
  nro_registro: { required: true },
  tipo: { required: true },
  fecha_presentacion: { required: true },
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
                errorText={formErrors.nro_registro}
              >
                <Input
                  value={formValues.nro_registro}
                  onChange={({ detail }) =>
                    handleChange("nro_registro", detail.value)
                  }
                />
              </FormField>
              <FormField label="Tipo" stretch errorText={formErrors.tipo}>
                <Select
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
          }}
        />
      )}
    </Container>
  );
});
