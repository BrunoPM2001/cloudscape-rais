import {
  Box,
  Container,
  FormField,
  Input,
  Spinner,
  StatusIndicator,
  Tabs,
  TokenGroup,
} from "@cloudscape-design/components";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import axiosBase from "../../../../api/axios";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import NotificationContext from "../../../../providers/notificationProvider";
import Tiptap from "../../components/tiptap";

const initialForm = {
  resumen: "",
  palabras_clave_input: "",
  palabras_clave: [],
  antecedentes: "",
  justificacion: "",
  contribucion: "",
  hipotesis: "",
  objetivos: "",
  metodologia: "",
  referencias: "",
};

const formRules = {
  resumen: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  antecedentes: { required: true },
  justificacion: { required: true },
  contribucion: { required: true },
  hipotesis: { required: true },
  objetivos: { required: true },
  metodologia: { required: true },
  referencias: { required: true },
};

export default forwardRef(function ({ proyecto_id }, ref) {
  //  States
  const [loading, setLoading] = useState(true);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Tabs
  const tabs = [
    {
      id: "resumen_ejecutivo",
      label: "Resumen ejecutivo",
      content: (
        <FormField
          label="Indique los antecedentes del proyecto"
          stretch
          errorText={formErrors.resumen}
        >
          <Tiptap
            value={formValues.resumen}
            handleChange={handleChange}
            name="resumen"
            limitWords={1000}
          />
        </FormField>
      ),
    },
    {
      id: "palabras_clave",
      label: "Palabras clave",
      content: (
        <FormField
          label="Palabras clave"
          description={
            <StatusIndicator type="warning">
              <Box
                variant="strong"
                color="text-status-warning"
                fontSize="body-s"
              >
                Presionar la tecla de enter para añadir una palabra, máximo 5
                palabras
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
              if (!/.*\s.*/.test(detail.value)) {
                handleChange("palabras_clave_input", detail.value);
              }
            }}
            onKeyDown={({ detail }) => {
              if (
                detail.key == "Enter" &&
                formValues.palabras_clave_input != "" &&
                formValues.palabras_clave.length < 5
              ) {
                handleChange("palabras_clave", [
                  ...formValues.palabras_clave,
                  {
                    label: formValues.palabras_clave_input,
                  },
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
      ),
    },
    {
      id: "antecedentes",
      label: "Antecedentes, estado del arte y planteamiento del problema",
      content: (
        <FormField
          label="Indique los antecedentes del proyecto"
          stretch
          errorText={formErrors.antecedentes}
        >
          <Tiptap
            value={formValues.antecedentes}
            handleChange={handleChange}
            name="antecedentes"
            limitWords={1000}
          />
        </FormField>
      ),
    },
    {
      id: "justificacion",
      label: "Justificación",
      content: (
        <FormField
          label="Definir las razones del por qué se aborda la investigación y el aporte de los resultados para el beneficio de la sociedad, desarrollo científico ó tecnológico"
          stretch
          errorText={formErrors.justificacion}
        >
          <Tiptap
            value={formValues.justificacion}
            handleChange={handleChange}
            name="justificacion"
            limitWords={400}
          />
        </FormField>
      ),
    },
    {
      id: "contribucion_impacto",
      label: "Contribución e impacto",
      content: (
        <FormField
          label="Aporte científico que se espera obtener de la aplicación de los resultados de la investigación"
          stretch
          errorText={formErrors.contribucion}
        >
          <Tiptap
            value={formValues.contribucion}
            handleChange={handleChange}
            name="contribucion"
            limitWords={400}
          />
        </FormField>
      ),
    },
    {
      id: "hipotesis",
      label: "Hipótesis",
      content: (
        <FormField
          label="Clara y coherente con el problema central"
          stretch
          errorText={formErrors.hipotesis}
        >
          <Tiptap
            value={formValues.hipotesis}
            handleChange={handleChange}
            name="hipotesis"
            limitWords={200}
          />
        </FormField>
      ),
    },
    {
      id: "objetivos",
      label: "Objetivos",
      content: (
        <FormField
          label="Indique el objetivo general y los específicos que espera alcanzar"
          stretch
          errorText={formErrors.objetivos}
        >
          <Tiptap
            value={formValues.objetivos}
            handleChange={handleChange}
            name="objetivos"
            limitWords={200}
          />
        </FormField>
      ),
    },
    {
      id: "metodologia",
      label: "Metodología de trabajo",
      content: (
        <FormField
          label="Diseño de la investigación, método y técnicas a ser utilizadas, etapas del estudio"
          stretch
          errorText={formErrors.metodologia}
        >
          <Tiptap
            value={formValues.metodologia}
            handleChange={handleChange}
            name="metodologia"
            limitWords={1500}
          />
        </FormField>
      ),
    },
    {
      id: "referencias",
      label: "Referencias bibliográficas",
      content: (
        <FormField
          label="Ordenadas en función a algún sistema internacionalmente reconocido como: Vancouver, APA o Council of Science Editors (CSE)"
          stretch
          errorText={formErrors.referencias}
        >
          <Tiptap
            value={formValues.referencias}
            handleChange={handleChange}
            name="referencias"
            limitWords={1500}
          />
        </FormField>
      ),
    },
  ];

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/convocatorias/getDataPaso4", {
      params: {
        proyecto_id,
      },
    });
    const data = res.data;
    const detalles = data.detalles;
    if (data.palabras_claves != null) {
      let palabras = data.palabras_claves.split(",");
      setFormValues({
        palabras_clave: palabras.map((element) => ({ label: element })),
        resumen: detalles.find((opt) => opt.codigo == "resumen_ejecutivo")
          .detalle,
        antecedentes: detalles.find((opt) => opt.codigo == "antecedentes")
          .detalle,
        justificacion: data.detalles.find(
          (opt) => opt.codigo == "justificacion"
        ).detalle,
        contribucion: data.detalles.find(
          (opt) => opt.codigo == "contribucion_impacto"
        ).detalle,
        hipotesis: data.detalles.find((opt) => opt.codigo == "hipotesis")
          .detalle,
        objetivos: data.detalles.find((opt) => opt.codigo == "objetivos")
          .detalle,
        metodologia: data.detalles.find(
          (opt) => opt.codigo == "metodologia_trabajo"
        ).detalle,
        referencias: data.detalles.find(
          (opt) => opt.codigo == "referencias_bibliograficas"
        ).detalle,
      });
    }
    setLoading(false);
  };

  const registrar = async () => {
    if (validateForm()) {
      if (proyecto_id != null) {
        const res = await axiosBase.postForm(
          "investigador/convocatorias/registrarPaso4",
          { ...formValues, proyecto_id }
        );
        const data = res.data;
        pushNotification(data.detail, data.message, notifications.length + 1);
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
    <>
      {loading ? (
        <Container>
          <Spinner /> Cargando datos
        </Container>
      ) : (
        <Tabs tabs={tabs} ariaLabel="Descripción de proyecto" />
      )}
    </>
  );
});
