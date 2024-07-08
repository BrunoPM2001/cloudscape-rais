import {
  Box,
  ColumnLayout,
  Container,
  Form,
  FormField,
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
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  nombre: "",
  doc_numero: "",
  codigo: "",
  tipo: "",
  dependencia: "",
  cti_vitae: "",
  google_scholar: "",
  codigo_orcid: "",
  //  Editable
  grado: null,
  titulo_profesional: "",
  especialidad: "",
  instituto_id: null,
  email3: "",
  telefono_casa: "",
  telefono_trabajo: "",
  telefono_movil: "",
};

const formRules = {
  grado: { required: true },
  titulo_profesional: { required: true },
  especialidad: { required: true },
  instituto_id: { required: true },
  email3: { required: true },
  telefono_casa: { required: true },
  telefono_trabajo: { required: true },
};

const optsGrado = [
  { value: "Bachiller" },
  { value: "Maestro" },
  { value: "Doctor" },
  { value: "Msci" },
  { value: "Phd" },
];

export default forwardRef(function (props, ref) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [loadingData, setLoadingData] = useState(false);
  const [institutos, setInstitutos] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Function
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/dataPaso2");
    const data = res.data;
    if (data?.message == "error") {
      pushNotification(data.detail, data.message, notifications.length + 1);
    } else {
      setLoadingData(false);
      setInstitutos(data.institutos);
      setFormValues({
        ...data.data,
        grado: { value: data.data.grado },
        instituto_id: data.institutos.find(
          (opt) => data.data.instituto_id == opt.value
        ),
      });
    }
  };

  const registrar = async () => {
    if (validateForm()) {
      const res = await axiosBase.put(
        "investigador/grupo/solicitar/paso2",
        formValues
      );
      const data = res.data;
      return { isValid: true, res_grupo_id: data.grupo_id };
    } else {
      return { isValid: false };
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
            <Container>
              <ColumnLayout columns={3} borders="vertical">
                <div>
                  <Box variant="awsui-key-label">Nombres y apellidos</Box>
                  <div>{formValues.nombre}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">N° de documento</Box>
                  <div>{formValues.doc_numero}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Código</Box>
                  <div>{formValues.codigo}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Categoría</Box>
                  <div>{formValues.tipo}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Dependencia</Box>
                  <div>{formValues.dependencia}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Puntaje desde el 2017</Box>
                  <div>{formValues.puntaje}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">CTI Vitae</Box>
                  <div>{formValues.cti_vitae}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Google Scholar</Box>
                  <div>{formValues.google_scholar}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Código orcid</Box>
                  <div>{formValues.codigo_orcid}</div>
                </div>
              </ColumnLayout>
            </Container>
            <ColumnLayout columns={2}>
              <FormField label="Grado" errorText={formErrors.grado} stretch>
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.grado}
                  onChange={({ detail }) =>
                    handleChange("grado", detail.selectedOption)
                  }
                  options={optsGrado}
                />
              </FormField>
              <FormField
                label="Título profesional"
                errorText={formErrors.titulo_profesional}
                stretch
              >
                <Input
                  value={formValues.titulo_profesional}
                  onChange={({ detail }) =>
                    handleChange("titulo_profesional", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Especialidad"
                errorText={formErrors.especialidad}
                stretch
              >
                <Input
                  value={formValues.especialidad}
                  onChange={({ detail }) =>
                    handleChange("especialidad", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Instituto de investigación"
                errorText={formErrors.instituto_id}
                stretch
              >
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.instituto_id}
                  onChange={({ detail }) =>
                    handleChange("instituto_id", detail.selectedOption)
                  }
                  options={institutos}
                />
              </FormField>
              <FormField
                label="Correo institucional"
                constraintText="La dirección de correo debe terminar en @unmsm.edu.pe, por ejemplo: investigador@unmsm.edu.pe"
                errorText={formErrors.email3}
                stretch
              >
                <Input
                  value={formValues.email3}
                  onChange={({ detail }) =>
                    handleChange("email3", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono de casa"
                errorText={formErrors.telefono_casa}
                stretch
              >
                <Input
                  value={formValues.telefono_casa}
                  onChange={({ detail }) =>
                    handleChange("telefono_casa", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono movil"
                errorText={formErrors.telefono_movil}
                stretch
              >
                <Input
                  value={formValues.telefono_movil}
                  onChange={({ detail }) =>
                    handleChange("telefono_movil", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono de trabajo"
                errorText={formErrors.telefono_trabajo}
                stretch
              >
                <Input
                  value={formValues.telefono_trabajo}
                  onChange={({ detail }) =>
                    handleChange("telefono_trabajo", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </Form>
    </Container>
  );
});
