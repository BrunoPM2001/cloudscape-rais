import {
  Alert,
  Button,
  Form,
  FormField,
  Grid,
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
import ModalObs from "./components/modalObs";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Informes",
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
  id: null,
  descripcion: "",
};

export default function Monitoreo_detalle() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [modal, setModal] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, {});

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/informes/monitoreo/detalles",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    handleChange("descripcion", res.data.datos.descripcion);
    handleChange("id", res.data.datos.id);
    setData(data);
    setLoading(false);
  };

  const remitir = async () => {
    if (
      data.publicaciones.filter((item) => item.estado != "Registrado").length >
      0
    ) {
      pushNotification(
        "Para remitir el monitoreo todas las publicaciones asociadas tienen que estar en estado Registrado",
        "warning",
        notifications.length + 1
      );
    } else {
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
    }
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("investigador/informes/monitoreo/reporte", {
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

  const actualizar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.put(
      "investigador/informes/monitoreo/actualizar",
      {
        id: formValues.id,
        descripcion: formValues.descripcion,
      }
    );
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
        {data?.datos?.estado_meta == "Observado" && !loading && (
          <Alert
            type="error"
            header="Observación"
            action={
              <Button variant="primary" onClick={() => setModal("obs")}>
                Historial
              </Button>
            }
          >
            {data?.observacion?.observacion}
          </Alert>
        )}
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
                  disabled={data.publicaciones.length == 0}
                  disabledReason="Necesita asociar al menos una publicación"
                >
                  Remitir monitoreo
                </Button>
              ) : data?.datos?.estado_meta == "Enviado" ? (
                <Button onClick={reporte} loading={loadingBtn}>
                  Reporte
                </Button>
              ) : (
                data?.datos?.estado_meta == "Observado" && (
                  <SpaceBetween size="xs" direction="horizontal">
                    <Button onClick={reporte} loading={loadingBtn}>
                      Reporte
                    </Button>
                    <Button
                      variant="primary"
                      onClick={actualizar}
                      loading={loadingBtn}
                    >
                      Actualizar
                    </Button>
                  </SpaceBetween>
                )
              )}
            </>
          }
        >
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
        </Form>
      </SpaceBetween>
      {modal == "obs" && (
        <ModalObs id={formValues.id} close={() => setModal("")} />
      )}
    </BaseLayout>
  );
}
