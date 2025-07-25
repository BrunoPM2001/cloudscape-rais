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
  Link,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
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
  titulo_profesional: "",
  grado: "",
  especialidad: "",
  researcher_id: "",
  scopus_id: "",
  link: "",
  posicion_unmsm: "",
  biografia: "",
  observacion: "",
  file: [],
};

const formRules = {
  codigo_orcid: { required: true, regex: /^(\d{4}-){3}\d{3}[\dX]$/ },
  apellido1: { required: true },
  apellido2: { required: true },
  nombres: { required: true },
  sexo: { required: true },
  institucion: { required: false },
  pais: { required: true },
  direccion1: { required: true },
  doc_tipo: { required: true },
  doc_numero: { required: true },
  telefono_movil: { required: false },
  titulo_profesional: { required: true },
  grado: { required: true },
  especialidad: { required: false },
  researcher_id: { required: false },
  scopus_id: { required: false },
  link: { required: false },
  posicion_unmsm: { required: true },
  biografia: { required: false },
  observacion: { required: false },
  file: { required: true, isFile: true, maxSize: 2 * 1024 * 1024 },
};

export default ({ close, reload, grupo_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [paises, setPaises] = useState([]);

  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Functions
  const agregarMiembro = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const form = new FormData();
      form.append("codigo_orcid", formValues.codigo_orcid);
      form.append("apellido1", formValues.apellido1);
      form.append("apellido2", formValues.apellido2);
      form.append("nombres", formValues.nombres);
      form.append("sexo", formValues.sexo.value);
      form.append("institucion", formValues.institucion);
      form.append("pais", formValues.pais.value);
      form.append("direccion1", formValues.direccion1);
      form.append("doc_tipo", formValues.doc_tipo.value);
      form.append("doc_numero", formValues.doc_numero);
      form.append("telefono_movil", formValues.telefono_movil);
      form.append("titulo_profesional", formValues.titulo_profesional);
      form.append("grado", formValues.grado);
      form.append("especialidad", formValues.especialidad);
      form.append("researcher_id", formValues.researcher_id);
      form.append("scopus_id", formValues.scopus_id);
      form.append("link", formValues.link);
      form.append("posicion_unmsm", formValues.posicion_unmsm);
      form.append("biografia", formValues.biografia);
      form.append("observacion", formValues.observacion);
      form.append("file", formValues.file[0]);
      form.append("grupo_id", grupo_id);
      form.append("tipo_registro", "externo");
      form.append("condicion", "Adherente");
      form.append("tipo", "Externo");
      const res = await axiosBase.post(
        "investigador/grupo/solicitar/agregarMiembro",
        form
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  const getPaises = async () => {
    const res = await axiosBase.get("investigador/grupo/solicitar/getPaises");
    const data = res.data;
    setPaises(data);
  };

  useEffect(() => {
    getPaises();
  }, []);

  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregarMiembro}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir miembro al grupo"
    >
      <Form header={<Header>Registrar investigador externo</Header>}>
        <SpaceBetween size="xs">
          <FormField
            label="Código ORCID"
            constraintText="Ejemplo: 0123-0123-0123-0123"
            stretch
            errorText={formErrors.codigo_orcid}
          >
            <Input
              placeholder="Escriba el código orcid del integrante"
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
                statusType={paises.length == 0 ? "loading" : "finished"}
                loadingText="Cargando datos"
                options={paises}
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
            <FormField
              label="Título profesional"
              stretch
              errorText={formErrors.titulo_profesional}
            >
              <Input
                value={formValues.titulo_profesional}
                onChange={({ detail }) =>
                  handleChange("titulo_profesional", detail.value)
                }
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
            <FormField label="Sitio web" stretch errorText={formErrors.link}>
              <Input
                value={formValues.link}
                onChange={({ detail }) => handleChange("link", detail.value)}
              />
            </FormField>
            <FormField
              label="Posición en la institución"
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
            errorText={formErrors.biografia}
          >
            <Textarea
              value={formValues.biografia}
              onChange={({ detail }) => handleChange("biografia", detail.value)}
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
          <FormField
            label="Formato de adhesión"
            description={
              <>
                Puede descargar la plantilla de formato de adhesión en{" "}
                <Link
                  href="/minio/templates/formato-adhesion-gi-externo.docx"
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  este enlace.
                </Link>
              </>
            }
            errorText={formErrors.file}
          >
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
              accept=".pdf"
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
