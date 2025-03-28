import {
  Container,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Detalles from "./detalles";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import Tabs_custom from "./tabs/tabs";
import NotificationContext from "../../../../../providers/notificationProvider";

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
  file1: [],
  file2: [],
  file3: [],
  file4: [],
  file5: [],
  file6: [],
  file7: [],
  file8: [],
  file9: [],
  file10: [],
  file11: [],
  file12: [],
};

const formRules = {};

export default function Detalle_informe_tecnico() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [data, setData] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [miembros, setMiembros] = useState([]);
  const [urls, setUrls] = useState();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [actividades, setActividades] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { id, tipo_proyecto, tipo_informe } = queryString.parse(
    location.search
  );

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
    const data = res.data.detalles;
    setProyecto(res.data.proyecto);
    setMiembros(res.data.miembros);
    setUrls(res.data.archivos);
    setActividades(res.data.actividades);
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

  const updateInforme = async () => {
    setUpdating(true);
    let formData = new FormData();
    formData.append("tipo_proyecto", tipo_proyecto);
    formData.append("informe_tecnico_id", id);
    formData.append("estado", formValues.estado.value);
    formData.append("fecha_presentacion", formValues.fecha_presentacion);
    formData.append("registro_nro_vrip", formValues.registro_nro_vrip);
    formData.append("fecha_registro_csi", formValues.fecha_registro_csi);
    formData.append("observaciones", formValues.observaciones);
    formData.append("observaciones_admin", formValues.observaciones_admin);
    formData.append("resumen_ejecutivo", formValues.resumen_ejecutivo);
    formData.append("palabras_clave", formValues.palabras_clave);
    formData.append("fecha_evento", formValues.fecha_evento);
    formData.append("fecha_informe_tecnico", formValues.fecha_informe_tecnico);
    formData.append("objetivos_taller", formValues.objetivos_taller);
    formData.append("resultados_taller", formValues.resultados_taller);
    formData.append("propuestas_taller", formValues.propuestas_taller);
    formData.append("conclusion_taller", formValues.conclusion_taller);
    formData.append("recomendacion_taller", formValues.recomendacion_taller);
    formData.append("asistencia_taller", formValues.asistencia_taller);
    formData.append("infinal1", formValues.infinal1);
    formData.append("infinal2", formValues.infinal2);
    formData.append("infinal3", formValues.infinal3);
    formData.append("infinal4", formValues.infinal4);
    formData.append("infinal5", formValues.infinal5);
    formData.append("infinal6", formValues.infinal6);
    formData.append("infinal7", formValues.infinal7);
    formData.append("infinal8", formValues.infinal8);
    formData.append("infinal9", formValues.infinal9);
    formData.append("infinal10", formValues.infinal10);
    formData.append("infinal11", formValues.infinal11);
    formData.append("file1", formValues.file1[0]);
    formData.append("file2", formValues.file2[0]);
    formData.append("file3", formValues.file3[0]);
    formData.append("file4", formValues.file4[0]);
    formData.append("file5", formValues.file5[0]);
    formData.append("file6", formValues.file6[0]);
    formData.append("file7", formValues.file7[0]);
    formData.append("file8", formValues.file8[0]);
    formData.append("file9", formValues.file9[0]);
    formData.append("file10", formValues.file10[0]);
    formData.append("file11", formValues.file11[0]);
    formData.append("file12", formValues.file12[0]);
    formData.append("estado_trabajo", formValues.estado_trabajo?.value ?? null);
    const res = await axiosBase.post(
      "admin/estudios/informesTecnicos/updateInforme",
      formData
    );
    const data = res.data;
    setUpdating(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle del informe"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="table"
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
              updating={updating}
              updateInforme={updateInforme}
            />
            <Tabs_custom
              proyecto={proyecto}
              miembros={miembros}
              formValues={formValues}
              handleChange={handleChange}
              tipo_proyecto={tipo_proyecto}
              tipo_informe={tipo_informe}
              loading={loading}
              files={urls}
              actividades={actividades}
              reload={getData}
            />
          </>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
