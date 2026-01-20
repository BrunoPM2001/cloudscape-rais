import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  ColumnLayout,
  FileUpload,
  Link,
  Input,
  Select,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  codigo_orcid: "",
  apellido1: "",
  apellido2: "",
  nombres: "",
  sexo: null,
  institucion: "",
  pais: null,
  direccion1: "",
  doc_tipo: null,
  doc_numero: "",
  telefono_movil: "",
  carta: [],
};

const formRules = {
  codigo_orcid: { required: true, regex: /^(\d{4}-){3}\d{3}[\dX]$/ },
  apellido1: { required: true },
  apellido2: { required: true },
  nombres: { required: true },
  sexo: { required: true },
  institucion: { required: true },
  pais: { required: true },
  direccion1: { required: true, regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  doc_tipo: { required: true },
  doc_numero: { required: true },
  telefono_movil: { required: false },
  carta: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Functions
  const agregarIntegrante = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      let formData = new FormData();
      formData.append("proyecto_id", id);
      formData.append("codigo_orcid", formValues.codigo_orcid);
      formData.append("apellido1", formValues.apellido1);
      formData.append("apellido2", formValues.apellido2);
      formData.append("nombres", formValues.nombres);
      formData.append("sexo", formValues.sexo.value);
      formData.append("institucion", formValues.institucion);
      formData.append("pais", formValues.pais.value);
      formData.append("direccion1", formValues.direccion1);
      formData.append("doc_tipo", formValues.doc_tipo.value);
      formData.append("doc_numero", formValues.doc_numero);
      formData.append("telefono_movil", formValues.telefono_movil);
      formData.append("file", formValues.carta[0]);
      const res = await axiosBase.postForm(
        "investigador/convocatorias/agregarIntegranteExterno",
        formData
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregarIntegrante}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir estudiante externo al proyecto"
    >
      <Form>
        <SpaceBetween size="xs">
          <FormField
            label="Código ORCID"
            stretch
            errorText={formErrors.codigo_orcid}
          >
            <Input
              value={formValues.codigo_orcid}
              onChange={({ detail }) =>
                handleChange("codigo_orcid", detail.value)
              }
            />
          </FormField>
          <ColumnLayout columns={3}>
            <FormField
              label="Apellido paterno"
              stretch
              errorText={formErrors.apellido1}
            >
              <Input
                value={formValues.apellido1}
                onChange={({ detail }) =>
                  handleChange("apellido1", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Apellido materno"
              stretch
              errorText={formErrors.apellido2}
            >
              <Input
                value={formValues.apellido2}
                onChange={({ detail }) =>
                  handleChange("apellido2", detail.value)
                }
              />
            </FormField>
            <FormField label="Nombres" stretch errorText={formErrors.nombres}>
              <Input
                value={formValues.nombres}
                onChange={({ detail }) => handleChange("nombres", detail.value)}
              />
            </FormField>
            <FormField label="Sexo" stretch errorText={formErrors.sexo}>
              <Select
                controlId="sexo"
                placeholder="Escoga una opción"
                selectedOption={formValues.sexo}
                onChange={({ detail }) =>
                  handleChange("sexo", detail.selectedOption)
                }
                options={[
                  {
                    label: "Masculino",
                    value: "M",
                  },
                  {
                    label: "Femenino",
                    value: "F",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="Universidad de origen"
              stretch
              errorText={formErrors.institucion}
            >
              <Input
                value={formValues.institucion}
                onChange={({ detail }) =>
                  handleChange("institucion", detail.value)
                }
              />
            </FormField>
            <FormField label="País" stretch errorText={formErrors.pais}>
              <Select
                controlId="pais"
                placeholder="Escoga una opción"
                selectedOption={formValues.pais}
                onChange={({ detail }) =>
                  handleChange("pais", detail.selectedOption)
                }
                options={[
                  {
                    value: "Perú",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="Correo principal"
              stretch
              errorText={formErrors.direccion1}
            >
              <Input
                value={formValues.direccion1}
                onChange={({ detail }) =>
                  handleChange("direccion1", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Tipo doc."
              stretch
              errorText={formErrors.doc_tipo}
            >
              <Select
                placeholder="Escoga una opción"
                selectedOption={formValues.doc_tipo}
                onChange={({ detail }) =>
                  handleChange("doc_tipo", detail.selectedOption)
                }
                options={[
                  {
                    label: "DNI",
                    value: "DNI",
                  },
                  {
                    label: "Carné de extranjería",
                    value: "CEX",
                  },
                  {
                    label: "Pasaporte",
                    value: "PASAPORTE",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="N° documento"
              stretch
              errorText={formErrors.doc_numero}
            >
              <Input
                value={formValues.doc_numero}
                onChange={({ detail }) =>
                  handleChange("doc_numero", detail.value)
                }
              />
            </FormField>
            <FormField
              label="N° celular"
              stretch
              errorText={formErrors.telefono_movil}
            >
              <Input
                value={formValues.telefono_movil}
                onChange={({ detail }) =>
                  handleChange("telefono_movil", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField
            label="Carta de compromiso"
            description={
              <>
                Puede descargar la plantilla de carta de compromiso en{" "}
                <Link
                  href="/minio/templates/compromiso-confidencialidad.docx"
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  este enlace.
                </Link>
              </>
            }
            errorText={formErrors.carta}
          >
            <FileUpload
              value={formValues.carta}
              onChange={({ detail }) => handleChange("carta", detail.value)}
              ref={(ref) => registerFileInput("carta", ref)}
              showFileLastModified
              showFileSize
              showFileThumbnail
              constraintText="El archivo cargado no debe superar los 6 MB"
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
              accept=".docx, .doc,  .pdf"
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
