import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Select,
  Spinner,
  Alert,
  Link,
  FileUpload,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ id, visible, setVisible, reload, existingStudents }) => {
  const { notifications, pushNotification } = useContext(NotificationContext);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [adherentes, setAdherentes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formValues, setFormValues] = useState({ carta: []});
  const [formErrors, setFormErrors] = useState({});

  const getAdherentes = async () => {
    setLoadingData(true);
    try {
      const res = await axiosBase.get("investigador/convocatorias/pro-ctie/listarAdherentes", {
        params: { proyecto_id: id },
      });
      const data = res.data;
      const filtrados = data.filter(adherente =>
        !existingStudents.some(est =>
          est.doc_numero === adherente.doc_numero || est.investigador_id === adherente.investigador_id
        )
      );

      setAdherentes(
        filtrados.map(item => ({
          label: `${item.apellidos}, ${item.nombres} (${item.doc_numero})`,
          value: item.id,
          ...item
        }))                 
      );
    } catch (err) {} finally {
      setLoadingData(false);
    }
  };

  const handleChange = (key, value) => {
    setFormValues(prev => ({ ...prev, [key]: value}));
    setFormErrors(prev => ({ ...prev, [key]: null }));
    };

  const validateForm = () => {
    const errors = {};
    const carta = formValues.carta?.[0];
    if (!carta) {
        errors.carta = "Debe subir la carta de compromiso.";
    } else if (carta.size > 6 * 1024 * 1024) {
        errors.carta = "El archivo supera los 6 MB.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
    };

  const agregarAdherente = async () => {
    if (!selected) {
      pushNotification("Seleccione un adherente para agregar.", "warning", notifications.length + 1);
      return;
    }
    setLoadingAdd(true);
    try {
      if (!validateForm()) return;

      let data = new FormData();
      data.append("proyecto_id", id);
      data.append("investigador_id", selected.investigador_id);
      data.append("file", formValues.carta[0]);

      const res = await axiosBase.postForm("investigador/convocatorias/pro-ctie/agregarAdherente", data);
      pushNotification(res.data.detail, res.data.message, notifications.length + 1);
      reload();
      setVisible(false);
    } catch (err) {
      pushNotification("Error al agregar adherente.", "error", notifications.length + 1);
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    if (visible) {
      getAdherentes();
    }
  }, [visible]);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      header="Agregar adherente"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregarAdherente}
              disabled={!selected}
              loading={loadingAdd}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Form>
        <FormField label="Seleccione un adherente disponible">
          {loadingData ? (
            <Spinner />
          ) : (
            <>
                <Select
                selectedOption={selected}
                onChange={({ detail }) => setSelected(detail.selectedOption)}
                options={adherentes}
                placeholder="Seleccione un adherente"
                empty="No hay adherentes disponibles"
                />
                {selected && (
                    <Box margin={{ top: "m" }}>
                        <Alert header="Datos del adherente seleccionado" type="info">
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                            default: "1fr",
                            xs: "1fr",
                            s: "1fr 1fr",
                            m: "1fr 1fr 1fr",
                            }}
                            gap="l"
                            padding="s"
                        >
                            <div>
                            <strong>Apellidos y nombres:</strong><br />
                            {selected.apellidos}, {selected.nombres}
                            </div>
                            <div>
                            <strong>DNI:</strong><br />
                            {selected.doc_numero}
                            </div>
                            <div>
                            <strong>Código:</strong><br />
                            {selected.codigo || "No disponible"}
                            </div>
                            <div>
                            <strong>Facultad:</strong><br />
                            {selected.facultad || "No disponible"}
                            </div>
                            <div>
                            <strong>Permanencia:</strong><br />
                            {selected.permanencia || "Activo"}
                            </div>
                            <div>
                            <strong>Correo:</strong><br />
                            {selected.email1 || "No disponible"}
                            </div>
                        </Box>
                        </Alert>
                        <Box margin={{ top: "l" }}>
                            <FormField
                                label="Carta de compromiso"
                                description={
                                <>
                                    Puede descargar la plantilla en{" "}
                                    <Link
                                    href="/minio/templates/compromiso-confidencialidad.docx"
                                    external
                                    variant="primary"
                                    fontSize="body-s"
                                    >
                                    este enlace
                                    </Link>.
                                </>
                                }
                                errorText={formErrors.carta}
                            >
                                <FileUpload
                                value={formValues.carta}
                                onChange={({ detail }) => handleChange("carta", detail.value)}
                                showFileLastModified
                                showFileSize
                                showFileThumbnail
                                constraintText="Archivo máximo 6 MB. Formatos permitidos: .docx, .pdf"
                                accept=".docx,.doc,.pdf"
                                i18nStrings={{
                                    uploadButtonText: (e) => e ? "Cargar archivos" : "Cargar archivo",
                                    dropzoneText: (e) => e ? "Arrastre los archivos para cargarlos" : "Arrastre el archivo para cargarlo",
                                    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
                                    errorIconAriaLabel: "Error",
                                }}
                                />
                            </FormField>
                        </Box>
                    </Box>
                    )}
            </>
          )}
        </FormField>
      </Form>
    </Modal>
  );
};
