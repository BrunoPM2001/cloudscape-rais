import {
  Alert,
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
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import PartidasEditor from "./partidasEditor";
import TablePartidas from "./tablePartidas";

const initialForm = {
  descripcion_compra: "",
  tipo_moneda: "",
  tipo_documento: "",
  pais_emisor: "",
  monto_exterior: "",
  fecha: "",
  partidas: [{}],
  file: [],
};

const formRules = {
  descripcion_compra: { required: true },
  tipo_moneda: { required: true },
  tipo_documento: {required: true},
  pais_emisor: { required: true },
  monto_exterior: { required: true },
  fecha: { required: true },
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
  const [opts, setOpts] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [justview, setJustview] = useState(false);

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
    updateErrorCount(newPartidas);
  };

  const updateErrorCount = (items) => {
    let count = 0;

    items.forEach((item) => {
      if (
        parseFloat(item.monto) <= 0 ||
        parseFloat(item.partida?.max).toFixed(3) < parseFloat(item.monto)
      ) {
        count++;
      }
    });

    setErrorCount(count);
  };

  const getPartidas = async () => {
    if (edit) {
      if (["Aprobado", "Rechazado", "Anulado"].includes(item.estado)) {
        setJustview(true);
      }
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
      formData.append("descripcion_compra", formValues.descripcion_compra);
      formData.append("tipo_moneda", formValues.tipo_moneda);
      formData.append("tipo_documento", formValues.tipo_documento);
      formData.append("pais_emisor", formValues.pais_emisor);
      formData.append("monto_exterior", formValues.monto_exterior);
      formData.append("fecha", formValues.fecha);
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
            {justview ? (
              <Button
                variant="normal"
                iconName="external"
                href={item.url}
                target="_blank"
              >
                Ver comprobante
              </Button>
            ) : (
              <Button
                variant="normal"
                disabled={loading || !edit}
                iconName="delete-marker"
                onClick={anularComprobante}
              >
                Anular
              </Button>
            )}
          </Box>
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="normal"
                disabled={loading || justview}
                onClick={() => setVisible(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                iconName="check"
                disabled={loading || justview}
                onClick={subirComprobante}
              >
                Enviar
              </Button>
            </SpaceBetween>
          </Box>
        </>
      }
      header="Otros"
    >
      {opts == null ? (
        <SpaceBetween size="xs" direction="horizontal">
          <Spinner /> Cargando data
        </SpaceBetween>
      ) : opts.length == 0 ? (
        <Alert
          header="No hay partidas disponibles para este tipo de comprobante"
          type="warning"
        />
      ) : (
        <Form>
          <SpaceBetween size="m">
            <ColumnLayout columns={2}>
              <SpaceBetween size="m">
                <FormField
                  label="Descripción de compra"
                  stretch
                  errorText={formErrors.descripcion_compra}
                >
                  <Input
                    disabled={justview}
                    placeholder="Escriba la descripción de compra"
                    value={formValues.descripcion_compra}
                    onChange={({ detail }) =>
                      handleChange("descripcion_compra", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Monto exterior"
                  stretch
                  errorText={formErrors.monto_exterior}
                >
                  <Input
                    disabled={justview}
                    placeholder="Escriba el monto"
                    value={formValues.monto_exterior}
                    onChange={({ detail }) =>
                      handleChange("monto_exterior", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="País"
                  stretch
                  errorText={formErrors.pais_emisor}
                >
                  <Input
                    disabled={justview}
                    placeholder="Escriba el país"
                    value={formValues.pais_emisor}
                    onChange={({ detail }) =>
                      handleChange("pais_emisor", detail.value)
                    }
                  />
                </FormField>
              </SpaceBetween>
              <SpaceBetween size="m">
                <FormField label="Fecha" stretch errorText={formErrors.fecha}>
                  <DatePicker
                    disabled={justview}
                    placeholder="YYYY-MM-DD"
                    value={formValues.fecha}
                    onChange={({ detail }) =>
                      handleChange("fecha", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Documento"
                  stretch
                  errorText={formErrors.tipo_documento}
                >
                  <Input
                    disabled={justview}
                    placeholder="Escriba el Documento"
                    value={formValues.tipo_documento}
                    onChange={({ detail }) =>
                      handleChange("tipo_documento", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Moneda"
                  stretch
                  errorText={formErrors.tipo_moneda}
                >
                  <Input
                    disabled={justview}
                    placeholder="Escriba la moneda"
                    value={formValues.tipo_moneda}
                    onChange={({ detail }) =>
                      handleChange("tipo_moneda", detail.value)
                    }
                  />
                </FormField>
              </SpaceBetween>
            </ColumnLayout>
            {!justview && (
              <FormField
                label="Archivo"
                description={
                  "El archivo cargado no debe superar los 4 MB (solo se aceptan PDFs)"
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
                    item != null && edit ? (
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
                  accept=".pdf"
                />
              </FormField>
            )}
            {errorCount > 0 && (
              <Alert type="warning" header="Monto por partida excedido">
                Si sobrepasa el monto establecido por partida usted tendrá que
                asumir el exceso o solicitar una trasnferencia.
              </Alert>
            )}
            {justview ? (
              <TablePartidas distributions={formValues.partidas} item={item} />
            ) : (
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
                  item={item}
                />
              </FormField>
            )}
          </SpaceBetween>
        </Form>
      )}
    </Modal>
  );
};
