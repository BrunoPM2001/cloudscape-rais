import {
  AttributeEditor,
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FileUpload,
  Form,
  FormField,
  Header,
  Input,
  Link,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  razon_social: "",
  ruc: "",
  numero: "",
  fecha: "",
  partidas: [],
  file: [],
};

const formRules = {
  razon_social: { required: true },
  ruc: { required: true },
  numero: { required: false },
  fecha: { required: false },
  partidas: { required: true, noEmpty: true },
  file: { required: true, isFile: true, maxSize: 2 * 1024 * 1024 },
};

export default ({ visible, setVisible, item }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(
      {
        ...initialForm,
        ...item,
      },
      {
        ...formRules,
        file: {
          required: item == null ? true : false,
          isFile: true,
          maxSize: 2 * 1024 * 1024,
        },
      }
    );

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

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <>
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="normal" onClick={() => setVisible(false)}>
                Cancelar
              </Button>
              <Button variant="primary" iconName="check" loading={loading}>
                Enviar
              </Button>
            </SpaceBetween>
          </Box>
          <Box float="left">
            <Button variant="normal" iconName="delete-marker">
              Anular
            </Button>
          </Box>
        </>
      }
      header="Boleta de venta"
    >
      <Form variant="embedded">
        <SpaceBetween size="m">
          <ColumnLayout columns={3}>
            <SpaceBetween size="m">
              <FormField
                label="Razón social"
                stretch
                errorText={formErrors.razon_social}
              >
                <Input
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
                  value={formValues.ruc}
                  onChange={({ detail }) => handleChange("ruc", detail.value)}
                />
              </FormField>
              <FormField label="Fecha" stretch errorText={formErrors.fecha}>
                <DatePicker
                  placeholder="YYYY-MM-DD"
                  value={formValues.fecha}
                  onChange={({ detail }) => handleChange("fecha", detail.value)}
                />
              </FormField>
            </SpaceBetween>
            <FormField
              label="Archivo"
              description={
                item != null ? (
                  <>
                    Cargado el {item.comentario},{" "}
                    <Link
                      href={item.file}
                      external="true"
                      variant="primary"
                      fontSize="body-s"
                      target="_blank"
                    >
                      descargar archivo.
                    </Link>
                  </>
                ) : (
                  <></>
                )
              }
              errorText={formErrors.file}
            >
              <FileUpload
                value={formValues.file}
                onChange={({ detail }) => handleChange("file", detail.value)}
                showFileLastModified
                showFileSize
                showFileThumbnail
                constraintText="El archivo cargado no debe superar los 4 MB (solo se aceptan los formatos jpg, jpeg y pdf)"
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
          </ColumnLayout>
          <Header variant="h3">Partidas del comprobante</Header>
          <AttributeEditor
            onAddButtonClick={() =>
              handleChange("partidas", [...formValues.partidas, {}])
            }
            onRemoveButtonClick={({ detail: { itemIndex } }) => {
              const tmpItems = [...formValues.partidas];
              tmpItems.splice(itemIndex, 1);
              handleChange("partidas", tmpItems);
            }}
            items={formValues.partidas}
            addButtonText="Agregar partida"
            definition={[
              {
                label: "Partida",
                control: (item, index) => (
                  <Select
                    selectedOption={item.type}
                    onChange={({ detail }) =>
                      handlePartidaChange(index, "type", detail.selectedOption)
                    }
                    options={[
                      { label: "Partida1", value: "0" },
                      { label: "Type 2", value: "1" },
                    ]}
                  />
                ),
                errorText: (item, index) =>
                  index === 1 ? "Error message" : null,
              },
              {
                label: "Monto",
                control: (item, index) => (
                  <Input
                    value={item.value}
                    placeholder="Ingresa un monto"
                    onChange={({ detail }) =>
                      handlePartidaChange(index, "value", detail.value)
                    }
                  />
                ),
                warningText: (item, index) =>
                  index === 1 ? "Warning message" : null,
              },
            ]}
          />
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
