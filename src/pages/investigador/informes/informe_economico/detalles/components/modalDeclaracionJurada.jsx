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
  Select,
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
  viatico: "",
  ciudad_origen: "",
  fecha: "",
  integrante: null,
  partidas: [{}],
  file: [],
};

const formRules = {
  viatico: { required: true },
  ciudad_origen: { required: true },
  fecha: { required: true },
  integrante: { required: true },
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
  const [integrantes, setIntegrantes] = useState([]);
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
        integrante: data.integrantes.find(
          (opt) => opt.value == data.documento.investigador_id
        ),
        partidas: data.partidas,
      });
      setOpts(data.lista.partidas);
      setIntegrantes(data.integrantes);
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
      if (data.partidas.length == 0) {
        setLoading(true);
      }
      setOpts(data.partidas);
      setIntegrantes(data.integrantes);
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
      formData.append("investigador_id", formValues.integrante.value);
      formData.append("geco_proyecto_id", geco_proyecto_id);
      formData.append("geco_documento_id", item?.id ?? "");
      formData.append("viativo", formValues.viatico);
      formData.append("ciudad_origen", formValues.ciudad_origen);
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
      header="Declaración jurada"
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
                  label="Concepto de viático"
                  stretch
                  errorText={formErrors.viatico}
                >
                  <Input
                    disabled={justview}
                    placeholder="Ingrese el concepto de viático"
                    value={formValues.viatico}
                    onChange={({ detail }) =>
                      handleChange("viatico", detail.value)
                    }
                  />
                </FormField>
                <FormField
                  label="Ciudad origen del gasto"
                  stretch
                  errorText={formErrors.ciudad_origen}
                >
                  <Input
                    disabled={justview}
                    placeholder="Escriba la ciudad de origen"
                    value={formValues.ciudad_origen}
                    onChange={({ detail }) =>
                      handleChange("ciudad_origen", detail.value)
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
                  label="Integrante"
                  stretch
                  errorText={formErrors.integrante}
                >
                  <Select
                    disabled={justview}
                    placeholder="Escoja una opción"
                    selectedOption={formValues.integrante}
                    onChange={({ detail }) =>
                      handleChange("integrante", detail.selectedOption)
                    }
                    options={integrantes}
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
