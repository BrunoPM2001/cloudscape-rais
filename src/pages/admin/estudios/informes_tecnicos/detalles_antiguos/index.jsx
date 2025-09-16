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
import Anexos from "./tabs/anexos";

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

const opts = [
  { value: 0, label: "En proceso" },
  { value: 1, label: "Aprobado" },
  { value: 2, label: "Presentado" },
  { value: 3, label: "Observado" },
];

const initialForm = {
  tipo_informe: null,
  status: null,
  fecha_presentacion: null,
  registro_nro_vri: null,
  registro_fecha_csi: null,
  observaciones: null,
  observaciones_admin: null,
  file1: [],
};

const formRules = {
  tipo_informe: { required: true },
  status: { required: true },
  registro_fecha_csi: { required: true },
  file1: { required: false, isFile: true },
};

export default function Detalle_informe_tecnico_antiguo() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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
      "admin/estudios/informesTecnicos/getDataInformeAntiguo",
      {
        params: {
          id,
        },
      }
    );
    setData(res.data);
    setFormValues({
      ...res.data.detalles,
      tipo_informe: { value: res.data.detalles.tipo_informe },
      status: opts.find((opt) => opt.value == res.data.detalles.status),
      file1: [],
    });
    setLoading(false);
  };

  const updateInforme = async () => {
    if (validateForm()) {
      setUpdating(true);
      let formData = new FormData();
      formData.append("id", id);
      formData.append("tipo_informe", formValues.tipo_informe.value);
      formData.append("status", formValues.status.value);
      formData.append(
        "fecha_presentacion",
        formValues.fecha_presentacion ?? ""
      );
      formData.append("registro_nro_vri", formValues.registro_nro_vri ?? "");
      formData.append(
        "registro_fecha_csi",
        formValues.registro_fecha_csi ?? ""
      );
      formData.append("observaciones", formValues.observaciones ?? "");
      formData.append(
        "observaciones_admin",
        formValues.observaciones_admin ?? ""
      );
      formData.append("file1", formValues.file1[0]);
      const res = await axiosBase.post(
        "admin/estudios/informesTecnicos/updateInformeAntiguo",
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
              proyecto={data.proyecto}
              formValues={formValues}
              formErrors={formErrors}
              handleChange={handleChange}
              loading={loading}
              updating={updating}
              updateInforme={updateInforme}
              opts={opts}
            />
            <Tabs
              tabs={[
                {
                  id: "info",
                  label: "Info general",
                  content: <Info proyecto={data.proyecto} />,
                },
                {
                  id: "anexo",
                  label: "Anexo",
                  content: (
                    <Anexos
                      value1={formValues?.file1}
                      handleChange={handleChange}
                    />
                  ),
                },
              ]}
            />
          </>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
