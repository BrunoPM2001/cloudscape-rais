import {
  Button,
  Form,
  FormField,
  Grid,
  Select,
  SpaceBetween,
  Tabs,
  Textarea,
} from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import queryString from "query-string";
import Detalle from "./detalle";
import Metas from "./metas";
import Publicaciones from "./tabs/publicaciones";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Monitoreo",
    href: "../monitoreo",
  },
  {
    text: "Detalle",
  },
];

const gridDefinition = [
  {
    colspan: {
      default: 12,
      l: 7,
      m: 7,
      s: 7,
    },
  },
  {
    colspan: {
      default: 12,
      l: 5,
      m: 5,
      s: 5,
    },
  },
];

const initialForm = {
  descripcion: "",
  estado: null,
  observacion: "",
};

const opt_estado = [
  { value: 0, label: "No aprobado" },
  { value: 1, label: "Aprobado" },
  { value: 2, label: "Observado" },
  { value: 5, label: "Enviado" },
  { value: 6, label: "En proceso" },
];

export default function Monitoreo_detalles() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, {});

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/monitoreo/detalles", {
      params: {
        id,
      },
    });
    const data = res.data;
    handleChange("descripcion", res.data.datos.descripcion);
    handleChange("observacion", res.data.datos.observacion);
    handleChange(
      "estado",
      opt_estado.find((opt) => opt.label == res.data.datos.estado_meta)
    );
    setData(data);
    setLoading(false);
  };

  const remitir = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.post(
      "investigador/informes/monitoreo/remitir",
      {
        proyecto_id: id,
        descripcion: formValues.descripcion,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    getData();
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("admin/estudios/monitoreo/reporte", {
      params: {
        id,
      },
      responseType: "blob",
    });
    setLoadingBtn(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const guardar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.put("admin/estudios/monitoreo/guardar", {
      proyecto_id: id,
      observacion: formValues.observacion,
      estado: formValues.estado.value,
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    getData();
  };

  //  Tabs
  const tabs = [
    {
      id: "publicaciones",
      label: "Publicaciones",
      content: (
        <Publicaciones
          data={data.publicaciones ?? []}
          loading={loading}
          reload={getData}
          disabledBtn={data?.datos?.estado_meta == "Enviado"}
        />
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle"
      helpInfo="Resumen general del informe económico de un proyecto."
    >
      <SpaceBetween size="m">
        <Grid gridDefinition={gridDefinition}>
          <Detalle loading={loading} data={data.datos} />
          <Metas loading={loading} data={data.metas} />
        </Grid>
        <Tabs tabs={tabs} />
        <Form
          actions={
            <>
              {data?.datos?.estado_meta == "Por presentar" ? (
                <Button
                  variant="primary"
                  onClick={remitir}
                  loading={loadingBtn}
                >
                  Remitir monitoreo
                </Button>
              ) : (
                data?.datos?.estado_meta != "Por presentar" && (
                  <SpaceBetween size="xs" direction="horizontal">
                    <Button onClick={reporte} loading={loadingBtn}>
                      Reporte
                    </Button>
                    <Button
                      variant="primary"
                      onClick={guardar}
                      loading={loadingBtn}
                    >
                      Guardar monitoreo
                    </Button>
                  </SpaceBetween>
                )
              )}
            </>
          }
        >
          <SpaceBetween size="m">
            <FormField label="Descripción o comentarios del monitoreo" stretch>
              <Textarea
                readOnly={data?.datos?.estado_meta == "Enviado"}
                value={formValues.descripcion}
                disabled={loading}
                loading={loadingBtn}
                onChange={({ detail }) =>
                  handleChange("descripcion", detail.value)
                }
              />
            </FormField>
            {data?.datos?.estado_meta != "Por presentar" && (
              <FormField label="Evaluación del monitoreo" stretch>
                <Select
                  placeholder="Escoja una opción"
                  selectedOption={formValues.estado}
                  onChange={({ detail }) =>
                    handleChange("estado", detail.selectedOption)
                  }
                  options={opt_estado}
                />
              </FormField>
            )}
            {formValues.estado?.label == "Observado" && (
              <FormField label="Observación" stretch>
                <Textarea
                  value={formValues.observacion}
                  loading={loadingBtn}
                  onChange={({ detail }) =>
                    handleChange("observacion", detail.value)
                  }
                />
              </FormField>
            )}
          </SpaceBetween>
        </Form>
      </SpaceBetween>
    </BaseLayout>
  );
}
