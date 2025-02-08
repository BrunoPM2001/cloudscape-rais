import {
  Alert,
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../../../hooks/useAutosuggest";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../../api/axios";

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
  biografia: { required: false },
  observacion: { required: false },
};

export default ({ close, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);
  const [paises, setPaises] = useState([]);
  const [form, setForm] = useState({});
  const [nuevo, setNuevo] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/proyectosFEX/searchExterno");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarMiembro = async () => {
    if (nuevo) {
      if (validateForm()) {
        setLoadingCreate(true);
        const form = new FormData();
        form.append("id", id);
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
        form.append("tipo", "Nuevo");
        const res = await axiosBase.post(
          "admin/estudios/proyectosFEX/agregarExterno",
          form
        );
        const data = res.data;
        setLoadingCreate(false);
        close();
        reload();
        pushNotification(data.detail, data.message, notifications.length + 1);
      }
    } else {
      setLoadingCreate(true);
      const form1 = new FormData();
      form1.append("id", id);
      form1.append("tipo", "Antiguo");
      form1.append("investigador_id", form.investigador_id);
      const res = await axiosBase.post(
        "admin/estudios/proyectosFEX/agregarExterno",
        form1
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  const getPaises = async () => {
    const res = await axiosBase.get("admin/estudios/publicaciones/getPaises");
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
              disabled={!enableCreate}
              onClick={agregarMiembro}
              loading={loadingCreate}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar externo"
    >
      <SpaceBetween size="s">
        <Alert>
          En caso no encuentre los datos de su externo presione la opción de
          "Utilizar: ..."
        </Alert>
        <FormField label="Buscar externo registrado" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
              if (detail.value == "") {
                setForm({});
                setEnableCreate(false);
                setNuevo(false);
              }
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setForm(rest);
                setEnableCreate(true);
                setAvoidSelect(false);
                setNuevo(false);
              } else {
                handleChange("doc_numero", detail.value);
                setAvoidSelect(false);
                setEnableCreate(true);
                setNuevo(true);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Buscar con DNI"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        {nuevo ? (
          <>
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
                  onChange={({ detail }) =>
                    handleChange("nombres", detail.value)
                  }
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
              errorText={formErrors.biografia}
            >
              <Textarea
                value={formValues.biografia}
                onChange={({ detail }) =>
                  handleChange("biografia", detail.value)
                }
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
          </>
        ) : (
          <>
            {enableCreate && (
              <Alert>
                <ColumnLayout columns={2} variant="text-grid">
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Apellido paterno:</Box>
                      <>{form.apellido1}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Apellido materno:</Box>
                      <>{form.apellido2}</>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Nombres:</Box>
                      <>{form.nombres}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">N° de documento:</Box>
                      <>{form.doc_numero}</>
                    </div>
                  </SpaceBetween>
                </ColumnLayout>
              </Alert>
            )}
          </>
        )}
      </SpaceBetween>
    </Modal>
  );
};
