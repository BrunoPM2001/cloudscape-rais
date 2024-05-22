import {
  ColumnLayout,
  FileUpload,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const options = [
  {
    value: 1,
    label: "Externo",
  },
  {
    value: 2,
    label: "Estudiante UNMSM",
  },
  {
    value: 3,
    label: "Egresado UNMSM",
  },
];

const initialForm = {
  orcid: "",
  apellido1: "",
  apellido2: "",
  nombres: "",
  sexo: "",
  institucion: "",
  pais: "",
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
  orcid: { required: true },
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

export default () => {
  //  States
  const [selectedOption, setSelectedOption] = useState(null);

  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  return (
    <Form variant="embedded">
      <SpaceBetween direction="vertical" size="s">
        <FormField label="Tipo de investigador adherente" stretch>
          <Select
            controlId="opcion"
            placeholder="Escoga un tipo de investigador"
            options={options}
            selectedOption={selectedOption}
            onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
          />
        </FormField>
        {selectedOption ? (
          selectedOption.value == 1 ? (
            <Form
              header={<Header>Registrar investigador externo</Header>}
              variant="embedded"
            >
              <SpaceBetween size="xs">
                <FormField label="Código ORCID" stretch>
                  <Input />
                </FormField>
                <ColumnLayout columns={3}>
                  <FormField label="Apellido paterno" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Apellido materno" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Nombres" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Sexo" stretch>
                    <Select
                      controlId="sexo"
                      placeholder="Escoga una opción"
                      selectedOption={selectedOption}
                      onChange={({ detail }) => {
                        setSelectedOption(detail.selectedOption);
                        setForm((prev) => ({
                          ...prev,
                          sexo: detail.selectedOption.value,
                        }));
                      }}
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
                  <FormField label="Institución" stretch>
                    <Input />
                  </FormField>
                  <FormField label="País" stretch>
                    <Select
                      controlId="pais"
                      placeholder="Escoga una opción"
                      selectedOption={selectedOption}
                      onChange={({ detail }) => {
                        setSelectedOption(detail.selectedOption);
                        setForm((prev) => ({
                          ...prev,
                          sexo: detail.selectedOption.value,
                        }));
                      }}
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
                  <FormField label="Correo principal" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Tipo doc." stretch>
                    <Select
                      controlId="tipo_doc"
                      placeholder="Escoga una opción"
                      selectedOption={selectedOption}
                      onChange={({ detail }) => {
                        setSelectedOption(detail.selectedOption);
                        setForm((prev) => ({
                          ...prev,
                          sexo: detail.selectedOption.value,
                        }));
                      }}
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
                  <FormField label="N° documento" stretch>
                    <Input />
                  </FormField>
                  <FormField label="N° celular" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Título profesional" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Grado académico" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Especialidad" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Researcher ID" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Scopus ID" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Sitio web" stretch>
                    <Input />
                  </FormField>
                  <FormField label="Posición en la UNMSM" stretch>
                    <Input />
                  </FormField>
                </ColumnLayout>
                <FormField label="Perfil de investigador" stretch>
                  <Textarea />
                </FormField>
                <FormField label="Observación / Comentario" stretch>
                  <Textarea />
                </FormField>
                <FormField label="Formato de adhesión">
                  <FileUpload
                    value={formValues.file}
                    onChange={({ detail }) =>
                      handleChange("file", detail.value)
                    }
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
          ) : selectedOption.value == 2 ? (
            <div>Tipo 2</div>
          ) : (
            <div>Tipo 3</div>
          )
        ) : null}
      </SpaceBetween>
    </Form>
  );
};
