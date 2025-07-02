import {
  Badge,
  Box,
  Button,
  Grid,
  Header,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import PdfViewer from "./pdfViewer";
import DatosComprobante from "./datosComprobante";

const initialForm = {
  estado: null,
  observacion: "",
};

const formRules = {
  estado: { required: true },
};

const optsEstado = [
  {
    value: 1,
    label: "Aprobado",
  },
  {
    value: 2,
    label: "Rechazado",
  },
  {
    value: 3,
    label: "Observado",
  },
  {
    value: 5,
    label: "Anulado",
  },
  {
    value: 6,
    label: "Aprobado V.B",
  },
];

export default ({ close, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const [url, setUrl] = useState("");
  const [datos, setDatos] = useState({});

  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/listadoPartidasComprobante",
      {
        params: {
          geco_documento_id: item.id,
        },
      }
    );
    const data = res.data;
    setDistribution(data.partidas);
    setUrl(data.comprobante);
    setDatos(data.datos);
    setLoading(false);
  };

  const updateComprobante = async () => {
    if (validateForm()) {
      setLoading(true);
      let date = new Date();

      let obs = JSON.parse(item.observacion);
      obs.unshift({
        fecha:
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1) +
          "-" +
          String(date.getDate()),
        observacion: formValues.observacion,
      });
      const res = await axiosBase.put(
        "admin/economia/comprobantes/updateEstadoComprobante",
        {
          ...formValues,
          observacion: JSON.stringify(obs),
          geco_documento_id: item.id,
        }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      reload();
      close();
    }
  };

  //  Effects
  useEffect(() => {
    handleChange(
      "estado",
      item.estado == 4
        ? null
        : optsEstado.find((opt) => opt.value == item.estado)
    );
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="max"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={updateComprobante}
            >
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header
          info={
            <Badge
              color={
                item.estado == 1
                  ? "green"
                  : item.estado == 2
                  ? "red"
                  : item.estado == 3
                  ? "grey"
                  : item.estado == 4
                  ? "blue"
                  : item.estado == 5
                  ? "red"
                  : item.estado == 6
                  ? "severity-low"
                  : "red"
              }
            >
              {item.estado == 1
                ? "Aprobado"
                : item.estado == 2
                ? "Rechazado"
                : item.estado == 3
                ? "Observado"
                : item.estado == 4
                ? "Enviado"
                : item.estado == 5
                ? "Anulado"
                : item.estado == 6
                ? "Aprobado V.B"
                : "Error"}
            </Badge>
          }
        >
          Revisión de comprobante
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          {
            colspan: {
              default: 12,
              xl: 6,
              l: 6,
              m: 6,
              s: 6,
              xs: 6,
            },
          },
          {
            colspan: {
              default: 12,
              xl: 6,
              l: 6,
              m: 6,
              s: 6,
              xs: 6,
            },
          },
        ]}
      >
        <DatosComprobante
          item={item}
          datos={datos}
          loading={loading}
          distributions={distributions}
          formValues={formValues}
          formErrors={formErrors}
          handleChange={handleChange}
          optsEstado={optsEstado}
        />
        <PdfViewer url={url} />
      </Grid>
    </Modal>
  );
};
