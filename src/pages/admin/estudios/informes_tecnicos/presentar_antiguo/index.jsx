import {
  Container,
  SpaceBetween,
  Spinner,
  Tabs,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Detalles from "./detalles";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";
import Info from "./tabs/info";

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
    text: "Presentar informe antiguo",
    href: "#",
  },
];

const initialForm = {
  tipo_informe: null,
  estado: null,
  fecha_presentacion: null,
  registro_nro_vrip: null,
  fecha_registro_csi: null,
  observaciones: null,
  observaciones_admin: null,
  file1: [],
};

const formRules = {
  tipo_informe: { required: true },
  estado: { required: true },
  fecha_registro_csi: { required: true },
  file1: { required: true, isFile: true },
};

export default function Detalle_informe_tecnico() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { proyecto_id, tipo_proyecto } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/getDataPresentarInformeAntiguo",
      {
        params: {
          proyecto_id,
        },
      }
    );
    const data = res.data;
    setProyecto(data);
    setLoading(false);
  };

  const updateInforme = async () => {
    if (validateForm()) {
      setUpdating(true);
      let formData = new FormData();
      formData.append("proyecto_id", proyecto_id);
      formData.append("tipo_proyecto", proyecto.tipo);
      formData.append("tipo_informe", formValues.tipo_informe.value);
      formData.append("estado", formValues.estado.value);
      formData.append(
        "fecha_presentacion",
        formValues.fecha_presentacion ?? ""
      );
      formData.append("registro_nro_vrip", formValues.registro_nro_vrip ?? "");
      formData.append(
        "fecha_registro_csi",
        formValues.fecha_registro_csi ?? ""
      );
      formData.append("observaciones", formValues.observaciones ?? "");
      formData.append(
        "observaciones_admin",
        formValues.observaciones_admin ?? ""
      );
      formData.append("file1", formValues.file1[0]);
      const res = await axiosBase.post(
        "admin/estudios/informesTecnicos/presentarInformeAntiguo",
        formData
      );
      const data = res.data;
      setUpdating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
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
              tipo_proyecto={tipo_proyecto}
              proyecto={proyecto}
              formValues={formValues}
              formErrors={formErrors}
              handleChange={handleChange}
              loading={loading}
              updating={updating}
              updateInforme={updateInforme}
            />
            <Tabs
              tabs={[
                {
                  id: "info",
                  label: "Info general",
                  content: <Info proyecto={proyecto} />,
                },
              ]}
            />
          </>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
