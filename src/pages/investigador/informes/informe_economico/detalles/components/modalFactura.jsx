import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FileUpload,
  Form,
  FormField,
  Input,
  Link,
  Modal,
  Select,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import PartidasEditor from "./partidasEditor";

const initialForm = {
  razon_social: "",
  ruc: "",
  numero: "",
  fecha: "",
  retencion: null,
  partidas: [{}],
  file: [],
};

const formRules = {
  razon_social: { required: true },
  ruc: { required: true, regex: /^(10|15|17|20)\d{9}$/ },
  numero: { required: true },
  fecha: { required: true },
  retencion: { required: true },
  partidas: { required: true, noEmpty: true },
  file: { required: true, isFile: true, maxSize: 4 * 1024 * 1024 },
};

export default ({
  visible,
  setVisible,
  item,
  edit,
  geco_proyecto_id,
  type,
  reload,
}) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [opts, setOpts] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, {
      ...formRules,
      file: {
        required: item == null ? true : false,
        isFile: true,
        maxSize: 4 * 1024 * 1024,
      },
    });

  //  Functions
  const handlePartidaChange = (index, field, value) => {
    const newPartidas = [...formValues.partidas];
    newPartidas[index] = {
      ...newPartidas[index],
      [field]: value,
    };
    setFormValues({
      ...formValues,
      partidas: newPartidas,
    });
  };

  const getPartidas = async () => {
    if (edit) {
      const res = await axiosBase(
        "investigador/informes/informe_economico/dataComprobante",
        {
          params: {
            geco_proyecto_id,
            id: item.id,
            tipo: item.tipo,
          },
        }
      );
      const data = res.data;
      setFormValues({
        ...formValues,
        ...data.documento,
        partidas: data.partidas,
      });
      setOpts(data.lista);
    } else {
      const res = await axiosBase(
        "investigador/informes/informe_economico/listarPartidas",
        {
          params: {
            geco_proyecto_id,
            tipo: type,
          },
        }
      );
      const data = res.data;
      setOpts(data);
    }
  };

  const subirComprobante = async () => {
    if (
      validateForm() &&
      formValues.partidas.every(
        (obj) => obj.hasOwnProperty("partida") && obj.hasOwnProperty("monto")
      )
    ) {
      setLoading(true);
      let formData = new FormData();
      formData.append("tipo", type);
      formData.append("geco_proyecto_id", geco_proyecto_id);
      formData.append("geco_documento_id", item?.id ?? "");
      formData.append("razon_social", formValues.razon_social);
      formData.append("ruc", formValues.ruc);
      formData.append("numero", formValues.numero);
      formData.append("fecha", formValues.fecha);
      formData.append("retencion", formValues.retencion.value);
      formData.append("partidas", JSON.stringify(formValues.partidas));
      formData.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/informes/informe_economico/subirComprobante",
        formData
      );
      const data = res.data;
      setLoading(false);
      setVisible(false);
      pushNotification(data.detail, data.message, notifications.length);
      reload();
    }
  };

  const anularComprobante = async () => {
    setLoading(true);
    const res = await axiosBase.put(
      "investigador/informes/informe_economico/anularComprobante",
      {
        geco_documento_id: item?.id,
        geco_proyecto_id,
      }
    );
    setLoading(false);
    setVisible(false);
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length);
    reload();
  };

  useEffect(() => {
    getPartidas();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <>
          <Box float="left">
            <Button
              variant="normal"
              disabled={loading || !edit}
              iconName="delete-marker"
              onClick={anularComprobante}
            >
              Anular
            </Button>
          </Box>
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="normal"
                disabled={loading}
                onClick={() => setVisible(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                iconName="check"
                disabled={loading}
                onClick={subirComprobante}
              >
                Enviar
              </Button>
            </SpaceBetween>
          </Box>
        </>
      }
      header="Factura"
    >
      {opts.length == 0 ? (
        <SpaceBetween size="xs" direction="horizontal">
          <Spinner /> Cargando data
        </SpaceBetween>
      ) : (
        <Form>
          <SpaceBetween size="m">
            <ColumnLayout columns={2}>
              <SpaceBetween size="m">
                <FormField
                  label="Razón social"
                  stretch
                  errorText={formErrors.razon_social}
                >
                  <Input
                    placeholder="Ingrese la razón social"
                    value={formValues.razon_social}
                    onChange={({ detail }) =>
                      handleChange("razon_social", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Serie + N° comprobante"
                  stretch
                  errorText={formErrors.numero}
                >
                  <Input
                    placeholder="N° de comprobante"
                    value={formValues.numero}
                    onChange={({ detail }) =>
                      handleChange("numero", detail.value)
                    }
                  />
                </FormField>
              </SpaceBetween>
              <SpaceBetween size="m">
                <FormField
                  label="RUC del emisor"
                  stretch
                  errorText={formErrors.ruc}
                >
                  <Input
                    placeholder="N° de ruc"
                    value={formValues.ruc}
                    onChange={({ detail }) => handleChange("ruc", detail.value)}
                  />
                </FormField>
                <FormField label="Fecha" stretch errorText={formErrors.fecha}>
                  <DatePicker
                    placeholder="YYYY-MM-DD"
                    value={formValues.fecha}
                    onChange={({ detail }) =>
                      handleChange("fecha", detail.value)
                    }
                  />
                </FormField>
              </SpaceBetween>
            </ColumnLayout>
            <FormField
              label="Comprobante sujeto a"
              stretch
              errorText={formErrors.retencion}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.retencion}
                onChange={({ detail }) =>
                  handleChange("retencion", detail.selectedOption)
                }
                options={[
                  {
                    value: 0,
                    label: "No afecta",
                  },
                  {
                    value: 1,
                    label: "Retención",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="Archivo"
              description={
                "El archivo cargado no debe superar los 4 MB (solo se aceptan los formatos jpg, jpeg y pdf)"
              }
              errorText={formErrors.file}
            >
              <FileUpload
                value={formValues.file}
                onChange={({ detail }) => handleChange("file", detail.value)}
                showFileLastModified
                showFileSize
                showFileThumbnail
                constraintText={
                  item != null ? (
                    <Link
                      href={item.url}
                      external="true"
                      variant="primary"
                      fontSize="body-s"
                      target="_blank"
                    >
                      Ya ha cargado un comprobante con anterioridad.
                    </Link>
                  ) : (
                    <></>
                  )
                }
                i18nStrings={{
                  uploadButtonText: (e) =>
                    e ? "Cargar archivos" : "Cargar archivo",
                  dropzoneText: (e) =>
                    e
                      ? "Arrastre los archivos para cargarlos"
                      : "Arrastre el archivo para cargarlo",
                  removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
                  errorIconAriaLabel: "Error",
                }}
                accept=".jpg, .jpeg,  .pdf"
              />
            </FormField>
            <FormField
              label="Partidas del comprobante"
              description={`Incluir al menos 1 partida (puede incluír como máximo ${opts.length} partidas)`}
              stretch
              errorText={formErrors.partidas}
            >
              <PartidasEditor
                handleChange={handleChange}
                opts={opts}
                partidas={formValues.partidas}
                handlePartidaChange={handlePartidaChange}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      )}
    </Modal>
  );
};
