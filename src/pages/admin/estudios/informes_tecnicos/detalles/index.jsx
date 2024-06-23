import {
  Container,
  SpaceBetween,
  Spinner,
  Tabs,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Detalles from "./detalles";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import Pinvpos from "./tabs/tabs";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
    href: "#",
  },
  {
    text: "Informes técnicos",
    href: "../informes_tecnicos",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

const initialForm = {
  estado: null,
  fecha_presentacion: null,
  registro_nro_vrip: null,
  fecha_registro_csi: null,
  observaciones: null,
  observaciones_admin: null,
  fecha_envio: null,
  resumen_ejecutivo: null,
  palabras_clave: null,
  fecha_evento: null,
  fecha_informe_tecnico: null,
  objetivos_taller: null,
  resultados_taller: null,
  propuestas_taller: null,
  conclusion_taller: null,
  recomendacion_taller: null,
  asistencia_taller: null,
  infinal1: null,
  infinal2: null,
  infinal3: null,
  infinal4: null,
  infinal5: null,
  infinal6: null,
  infinal7: null,
  infinal8: null,
  infinal9: null,
  infinal10: null,
  infinal11: null,
  estado_trabajo: null,
};

const formRules = {};

export default function Detalle_informe_tecnico() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { id, tipo_proyecto } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/getDataInforme",
      {
        params: {
          informe_tecnico_id: id,
        },
      }
    );
    const data = res.data;
    const stateKeys = Object.keys(formValues);

    // Crear un nuevo objeto solo con las propiedades de DATA que están en el estado
    const updatedState = stateKeys.reduce((acc, key) => {
      if (data.hasOwnProperty(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    setFormValues((prev) => ({
      ...prev,
      ...updatedState,
    }));
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle del grupo de investigación:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        {loading ? (
          <Container>
            <Spinner /> Cargando
          </Container>
        ) : (
          <>
            <Detalles
              data={data}
              formValues={formValues}
              handleChange={handleChange}
              loading={loading}
            />
            <Pinvpos
              formValues={formValues}
              handleChange={handleChange}
              tipo_proyecto={data.tipo_proyecto}
              loading={loading}
            />
          </>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
