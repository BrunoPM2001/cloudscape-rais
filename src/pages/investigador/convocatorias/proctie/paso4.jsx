import {
  Container,
  SpaceBetween,
  Spinner,
  Tabs,
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
import Resumen from "./components/tabs/resumen";
import Palabras_clave from "./components/tabs/palabras_clave";
import Antecedentes from "./components/tabs/antecedentes";
import Justificacion from "./components/tabs/justificacion";
import Contribucion from "./components/tabs/contribucion";
import Hipotesis from "./components/tabs/hipotesis";
import Objetivos from "./components/tabs/objetivos";
import Metodologia from "./components/tabs/metodologia";
import Referencias from "./components/tabs/referencias";

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
        <Resumen
          value={formValues.resumen}
          error={formErrors.resumen}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "palabras_clave",
      label: "Palabras clave",
      content: (
        <Palabras_clave
          value1={formValues.palabras_clave_input}
          value2={formValues.palabras_clave}
          error={formErrors.palabras_clave}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "antecedentes",
      label: "Antecedentes, estado del arte y planteamiento del problema",
      content: (
        <Antecedentes
          value={formValues.antecedentes}
          error={formErrors.antecedentes}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "justificacion",
      label: "Justificación",
      content: (
        <Justificacion
          value={formValues.justificacion}
          error={formErrors.justificacion}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "contribucion_impacto",
      label: "Contribución e impacto",
      content: (
        <Contribucion
          value={formValues.contribucion}
          error={formErrors.contribucion}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "hipotesis",
      label: "Hipótesis",
      content: (
        <Hipotesis
          value={formValues.hipotesis}
          error={formErrors.hipotesis}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "objetivos",
      label: "Objetivos",
      content: (
        <Objetivos
          value={formValues.objetivos}
          error={formErrors.objetivos}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "metodologia",
      label: "Metodología de trabajo",
      content: (
        <Metodologia
          value={formValues.metodologia}
          error={formErrors.metodologia}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "referencias",
      label: "Referencias bibliográficas",
      content: (
        <Referencias
          value={formValues.referencias}
          error={formErrors.referencias}
          handleChange={handleChange}
        />
      ),
    },
  ];

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/getDataPaso4",
      {
        params: {
          proyecto_id,
        },
      }
    );
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
          "investigador/convocatorias/pro-ctie/registrarPaso4",
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
