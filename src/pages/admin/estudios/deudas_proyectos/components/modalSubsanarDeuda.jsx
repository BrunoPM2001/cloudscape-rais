import {
  Box,
  Button,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
  Textarea,
  Container,
  Select,
  ColumnLayout,
  Spinner,
  Alert,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useContext } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  subsanar_academica: null,
  subsanar_economica: null,
  fecha_subsanar: "",
  detalle_deuda: "",
  comentario_deuda: "",
};

const formRules = {
  subsanar_academica: { required: false },
  subsanar_economica: { required: false },
  fecha_subsanar: { required: true },
  detalle_deuda: { required: false },
  comentario_deuda: { required: false },
};

export default ({ close, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [proyectoDeuda, setProyectoDeuda] = useState([]);
  const [deudaAcademica, setDeudaAcademica] = useState([]);
  const [deudaEconomica, setDeudaEconomica] = useState([]);
  const [tipoDeuda, setTipoDeuda] = useState();
  const [alert, setAlert] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const getProyectoDeuda = async () => {
    setLoading(true);
    const response = await axiosBase.get(
      "admin/estudios/deudaProyecto/proyectoDeuda",
      {
        params: {
          proyecto_id: item[0].proyecto_id,
          proyecto_origen: item[0].proyecto_origen,
          tipo_proyecto: item[0].tipo_proyecto,
        },
      }
    );

    // Access the 'deuda' data from the response
    const proyectoDeuda = response.data.deuda;
    const deudaAcademica = response.data.deuda_academica;
    const deudaEconomica = response.data.deuda_economica;

    // Actualizar formValues con los datos recibidos
    handleChange("detalle_deuda", proyectoDeuda.informe || "");
    handleChange("comentario_deuda", proyectoDeuda.detalle || "");
    setProyectoDeuda(proyectoDeuda); // Set the state with the received data
    setDeudaAcademica(deudaAcademica);
    setDeudaEconomica(deudaEconomica);
    setLoading(false);
  };

  const sendSubsanar = async () => {
    if (validateForm()) {
      if (
        ((tipoDeuda === 1 ||
          tipoDeuda === 3 ||
          tipoDeuda === 4 ||
          tipoDeuda === 5 ||
          tipoDeuda === 7 ||
          tipoDeuda === 8) &&
          !formValues.subsanar_academica) ||
        ((tipoDeuda === 2 || tipoDeuda === 3 || tipoDeuda === 8) &&
          !formValues.subsanar_economica)
      ) {
        setAlert("Necesita escoger una opción para subsanar deuda");
      } else {
        setLoading(true);
        const res = await axiosBase.post(
          "admin/estudios/deudaProyecto/subsanarDeuda",
          {
            proyecto_id: item[0].proyecto_id,
            proyecto_origen: item[0].proyecto_origen,
            tipo_proyecto: item[0].tipo_proyecto,
            subsanar_academica: formValues.subsanar_academica,
            subsanar_economica: formValues.subsanar_economica,
            fecha_subsanar: formValues.fecha_subsanar,
            comentario_deuda: formValues.comentario_deuda,
            detalle_deuda: formValues.detalle_deuda,
          }
        );
        const data = res.data;
        pushNotification(data.detail, data.message, notifications.length + 1);
        reload();
        setLoading(false);
        close();
      }
    }
  };

  const getTipoDeuda = async () => {
    setLoading(true);
    const response = await axiosBase.get(
      "admin/estudios/deudaProyecto/getTipoDeuda",
      {
        params: {
          proyecto_id: item[0].proyecto_id,
          tipo_proyecto: item[0].tipo_proyecto,
          proyecto_origen: item[0].proyecto_origen,
        },
      }
    );

    const data = response.data;
    setTipoDeuda(data); // Actualizamos el estado con el tipo de deuda recibido
    setLoading(false);
  };

  // sendDeuda();
  useEffect(() => {
    getTipoDeuda();
    getProyectoDeuda();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={close}>
              Cerrar
            </Button>
            <Button variant="primary" loading={loading} onClick={sendSubsanar}>
              Subsanar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Subsanar Deuda"
    >
      <SpaceBetween direction="vertical" size="l">
        {alert != "" && (
          <Alert
            header="Advertencia"
            type="warning"
            dismissible
            onDismiss={() => setAlert("")}
          >
            {alert}
          </Alert>
        )}
        <ColumnLayout columns={2}>
          <Container header={<Header variant="h3">Deuda</Header>} fitHeight>
            <SpaceBetween direction="vertical" size="m">
              <FormField label="Deuda académica">
                <Input value={deudaAcademica} disabled />
              </FormField>
              <FormField label="Deuda económica">
                <Input value={deudaEconomica} disabled />
              </FormField>
              <FormField label="Fecha de la deuda">
                <Input value={proyectoDeuda.fecha_deuda} disabled />
              </FormField>
            </SpaceBetween>
          </Container>
          <Container
            header={<Header variant="h3">Subsanación</Header>}
            fitHeight
          >
            <SpaceBetween direction="vertical" size="m">
              {/* Mostrar solo si el tipo de deuda es 1 o 3 */}
              {tipoDeuda ? (
                <>
                  {(tipoDeuda === 1 ||
                    tipoDeuda === 3 ||
                    tipoDeuda === 4 ||
                    tipoDeuda === 5 ||
                    tipoDeuda === 7 ||
                    tipoDeuda === 8) && (
                    <FormField label="Subsanar deuda académica">
                      <Select
                        placeholder="-- Seleccione una opción --"
                        options={[
                          { label: "Presentó informe de avance", value: 5 },
                          {
                            label: "Presentó informe de avance final",
                            value: 7,
                          },
                          { label: "Presentó informe académico", value: 4 },
                        ]}
                        selectedOption={formValues.subsanar_academica}
                        onChange={({ detail }) =>
                          handleChange(
                            "subsanar_academica",
                            detail.selectedOption
                          )
                        }
                        expandToViewport
                      />
                    </FormField>
                  )}
                  {/* Mostrar solo si el tipo de deuda es 1 o 3 */}
                  {(tipoDeuda === 2 || tipoDeuda === 3 || tipoDeuda === 8) && (
                    <FormField label="Subsanar deuda económica">
                      <Select
                        placeholder="-- Seleccione una opción --"
                        options={[
                          { label: "Deuda económica subsanada", value: 8 },
                        ]}
                        selectedOption={formValues.subsanar_economica}
                        onChange={({ detail }) =>
                          handleChange(
                            "subsanar_economica",
                            detail.selectedOption
                          )
                        }
                        expandToViewport
                      />
                    </FormField>
                  )}
                </>
              ) : (
                <div>
                  <Spinner /> Cargando información
                </div>
              )}
              <FormField
                label="Fecha de subsanacion"
                errorText={formErrors.fecha_subsanar}
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_subsanar}
                  onChange={({ detail }) =>
                    handleChange("fecha_subsanar", detail.value)
                  }
                  expandToViewport
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </ColumnLayout>
        <Container header={<Header variant="h3">Detalle</Header>}>
          <SpaceBetween direction="vertical" size="m">
            <FormField
              label="Detalle de la deuda"
              stretch
              errorText={formErrors.detalle_deuda}
            >
              <Textarea
                value={formValues.detalle_deuda} // Vinculado a formValues
                onChange={({ detail }) =>
                  handleChange("detalle_deuda", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Comentarios del proyecto"
              stretch
              errorText={formErrors.comentario_deuda}
            >
              <Textarea
                value={formValues.comentario_deuda} // Vinculado a formValues
                onChange={({ detail }) =>
                  handleChange("comentario_deuda", detail.value)
                }
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </Modal>
  );
};
