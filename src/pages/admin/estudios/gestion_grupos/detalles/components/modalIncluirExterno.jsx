import {
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  FileUpload,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  codigo_orcid: "",
  apellido1: "",
  apellido2: "",
  nombres: "",
  sexo: null,
  institucion: "",
  pais: null,
  correo: "",
  tipo_doc: "",
  doc_numero: "",
  telefono: "",
  titulo: "",
  grado: "",
  especialidad: "",
  researcher_id: "",
  scopus_id: "",
  web: "",
  posicion_unmsm: "",
  perfil: "",
  observacion: "",
  file: [],
};

const formRules = {
  codigo_orcid: { required: true },
  apellido1: { required: true },
  apellido2: { required: true },
  nombres: { required: true },
  sexo: { required: true },
  institucion: { required: false },
  pais: { required: true },
  correo: { required: true },
  tipo_doc: { required: true },
  doc_numero: { required: true },
  telefono: { required: false },
  titulo: { required: true },
  grado: { required: true },
  especialidad: { required: false },
  researcher_id: { required: false },
  scopus_id: { required: false },
  web: { required: false },
  posicion_unmsm: { required: true },
  perfil: { required: false },
  observacion: { required: false },
  file: { required: true, isFile: true, maxSize: 2 * 1024 * 1024 },
};

export default ({ visible, setVisible, reload }) => {
  //  States
  const [loadingData, setLoadingData] = useState(false);
  const [enableCreate, setEnableCreate] = useState(true);
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
  const agregarMiembro = () => {
    if (validateForm()) {
      setLoadingCreate(true);
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification("info", "Mensaje de prueba", notifications.length + 1);
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
              disabled={!enableCreate}
              variant="primary"
              onClick={() => agregarMiembro()}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir miembro al grupo"
    >
      <Form
        header={<Header>Registrar investigador externo</Header>}
        variant="embedded"
      >
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
              label="Institución"
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
                    label: "Perú",
                    value: "M",
                  },
                  {
                    label: "Argentina",
                    value: "F",
                  },
                ]}
              />
            </FormField>
            <FormField
              label="Correo principal"
              stretch
              errorText={formErrors.correo}
            >
              <Input
                value={formValues.correo}
                onChange={({ detail }) => handleChange("correo", detail.value)}
              />
            </FormField>
            <FormField
              label="Tipo doc."
              stretch
              errorText={formErrors.tipo_doc}
            >
              <Select
                placeholder="Escoga una opción"
                selectedOption={formValues.tipo_doc}
                onChange={({ detail }) =>
                  handleChange("tipo_doc", detail.selectedOption)
                }
                options={[
                  {
                    label: "DNI",
                    value: "M",
                  },
                  {
                    label: "Argentina",
                    value: "F",
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
              errorText={formErrors.telefono}
            >
              <Input
                value={formValues.telefono}
                onChange={({ detail }) =>
                  handleChange("telefono", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Título profesional"
              stretch
              errorText={formErrors.titulo}
            >
              <Input
                value={formValues.titulo}
                onChange={({ detail }) => handleChange("titulo", detail.value)}
              />
            </FormField>
            <FormField
              label="Grado académico"
              stretch
              errorText={formErrors.grado}
            >
              <Input
                value={formValues.grado}
                onChange={({ detail }) => handleChange("grado", detail.value)}
              />
            </FormField>
            <FormField
              label="Especialidad"
              stretch
              errorText={formErrors.especialidad}
            >
              <Input
                value={formValues.especialidad}
                onChange={({ detail }) =>
                  handleChange("especialidad", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Researcher ID"
              stretch
              errorText={formErrors.researcher_id}
            >
              <Input
                value={formValues.researcher_id}
                onChange={({ detail }) =>
                  handleChange("researcher_id", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Scopus ID"
              stretch
              errorText={formErrors.scopus_id}
            >
              <Input
                value={formValues.scopus_id}
                onChange={({ detail }) =>
                  handleChange("scopus_id", detail.value)
                }
              />
            </FormField>
            <FormField label="Sitio web" stretch errorText={formErrors.web}>
              <Input
                value={formValues.web}
                onChange={({ detail }) => handleChange("web", detail.value)}
              />
            </FormField>
            <FormField
              label="Posición en la UNMSM"
              stretch
              errorText={formErrors.posicion_unmsm}
            >
              <Input
                value={formValues.posicion_unmsm}
                onChange={({ detail }) =>
                  handleChange("posicion_unmsm", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField
            label="Perfil de investigador"
            stretch
            errorText={formErrors.perfil}
          >
            <Textarea
              value={formValues.perfil}
              onChange={({ detail }) => handleChange("perfil", detail.value)}
            />
          </FormField>
          <FormField
            label="Observación / Comentario"
            stretch
            errorText={formErrors.observacion}
          >
            <Textarea
              value={formValues.observacion}
              onChange={({ detail }) =>
                handleChange("observacion", detail.value)
              }
            />
          </FormField>
          <FormField label="Formato de adhesión">
            <FileUpload
              value={formValues.file}
              onChange={({ detail }) => handleChange("file", detail.value)}
              ref={(ref) => registerFileInput("file", ref)}
              showFileLastModified
              showFileSize
              showFileThumbnail
              constraintText="El archivo cargado no debe superar los 2 MB"
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
              fileErrors={[formErrors.file ?? ""]}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
