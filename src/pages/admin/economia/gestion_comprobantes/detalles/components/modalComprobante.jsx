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
];

export default ({ visible, setVisible, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [distributions, setDistribution] = useState([]);

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
    setDistribution(data);
    setLoading(false);
  };

  const updateComprobante = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "admin/economia/comprobantes/updateEstadoComprobante",
        {
          ...formValues,
          geco_documento_id: item.id,
        }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      setVisible(false);
      reload();
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
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="max"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
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
          loading={loading}
          distributions={distributions}
          formValues={formValues}
          formErrors={formErrors}
          handleChange={handleChange}
          optsEstado={optsEstado}
        />
        <PdfViewer />
      </Grid>
    </Modal>
  );
};
