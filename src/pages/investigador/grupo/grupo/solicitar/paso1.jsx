import {
  Container,
  Form,
  FormField,
  Input,
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
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  grupo_nombre: "",
  grupo_nombre_corto: "",
};

const formRules = {
  grupo_nombre: { required: true, regex: /^([A-ZÁÉÍÓÚÜÑ]+(\s+|$)){1,20}$/ },
  grupo_nombre_corto: { required: true, regex: /^[a-zA-Z]{0,8}$/ },
};

export default forwardRef(function (props, ref) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [loadingData, setLoadingData] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Function
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/dataPaso1");
    const data = res.data;
    if (data?.message == "error") {
      pushNotification(data.detail, data.message, notifications.length + 1);
    } else {
      setFormValues(data);
      setLoadingData(false);
    }
  };

  const registrar = async () => {
    if (validateForm()) {
      const res = await axiosBase.post(
        "investigador/grupo/solicitar/paso1",
        formValues
      );
      const data = res.data;
      if (data.message == "error") {
        pushNotification(data.detail, data.message, notifications.length + 1);
        setTimeout(() => {
          window.location.href = "/investigador";
        }, 3000);
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <Container>
      <Form>
        {loadingData ? (
          <>
            <Spinner /> Cargando datos
          </>
        ) : (
          <SpaceBetween size="s">
            <FormField
              label="Nombre"
              description="Máximo 20 palabras"
              errorText={formErrors.grupo_nombre}
              stretch
            >
              <Input
                placeholder="Escriba el nombre de su grupo"
                value={formValues.grupo_nombre}
                onChange={({ detail }) =>
                  handleChange("grupo_nombre", detail.value.toUpperCase())
                }
              />
            </FormField>
            <FormField
              label="Nombre corto"
              description="Máximo 8 letras"
              errorText={formErrors.grupo_nombre_corto}
              stretch
            >
              <Input
                placeholder="Escriba el nombre corto de su grupo"
                value={formValues.grupo_nombre_corto}
                onChange={({ detail }) =>
                  handleChange("grupo_nombre_corto", detail.value.toUpperCase())
                }
              />
            </FormField>
          </SpaceBetween>
        )}
      </Form>
    </Container>
  );
});
