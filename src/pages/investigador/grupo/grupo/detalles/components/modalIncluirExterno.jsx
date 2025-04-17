import {
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
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  apellido1: "",
  codigo_orcid: "",
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

export default ({ close, reload }) => {
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

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const agregarMiembro = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      let formData = new FormData();
      formData.append("apellido1", formValues.apellido1);
      formData.append("codigo_orcid", formValues.codigo_orcid);
      formData.append("apellido2", formValues.apellido2);
      formData.append("nombres", formValues.nombres);
      formData.append("sexo", formValues.sexo.value);
      formData.append("institucion", formValues.institucion);
      formData.append("pais", formValues.pais.value);
      formData.append("direccion1", formValues.direccion1);
      formData.append("doc_tipo", formValues.doc_tipo.value);
      formData.append("doc_numero", formValues.doc_numero);
      formData.append("telefono_movil", formValues.telefono_movil);
      formData.append("titulo_profesional", formValues.titulo_profesional);
      formData.append("grado", formValues.grado);
      formData.append("especialidad", formValues.especialidad);
      formData.append("researcher_id", formValues.researcher_id);
      formData.append("scopus_id", formValues.scopus_id);
      formData.append("link", formValues.link);
      formData.append("posicion_unmsm", formValues.posicion_unmsm);
      formData.append("biografia", formValues.biografia);
      formData.append("observacion", formValues.observacion);
      formData.append("tipo_registro", "externo");
      formData.append("grupo_id", id);
      formData.append("condicion", "Adherente");
      formData.append("tipo", "Externo");
      formData.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/grupo/agregarMiembro",
        formData
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  const getData = async () => {
    const res = await axiosBase.get("investigador/grupo/solicitar/getPaises");
    const data = res.data;
    setPaises(data);
  };

  useEffect(() => {
    getData();
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
                statusType={paises.length ? "finished" : "loading"}
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
                </Link>{" "}
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
              accept=".docx, .doc,  .pdf"
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
