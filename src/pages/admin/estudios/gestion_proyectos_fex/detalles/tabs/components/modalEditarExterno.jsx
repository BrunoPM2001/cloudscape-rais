import {
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../../providers/notificationProvider";
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
  posicion_unmsm: { required: true },
  biografia: { required: false },
  observacion: { required: false },
};

const opt_sexo = [
  {
    label: "Masculino",
    value: "M",
  },
  {
    label: "Femenino",
    value: "F",
  },
];

const opt_documento = [
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
];

export default ({ close, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paises, setPaises] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/proyectosFEX/getEditExterno",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setPaises(data.paises);
    setFormValues({
      ...data.externo,
      sexo: opt_sexo.find((opt) => opt.value == data.externo.sexo),
      pais: data.paises.find((opt) => opt.value == data.externo.pais),
      doc_tipo: opt_documento.find((opt) => opt.value == data.externo.doc_tipo),
    });
    setLoading(false);
  };

  const editar = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.put(
        "admin/estudios/proyectosFEX/editarExterno",
        formValues
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
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
            <Button variant="primary" onClick={editar} loading={loadingCreate}>
              Editar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar externo"
    >
      <SpaceBetween size="s">
        {loading ? (
          <SpaceBetween size="xs" direction="horizontal">
            <Spinner /> Cargando información
          </SpaceBetween>
        ) : (
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
                  options={opt_sexo}
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
                  options={opt_documento}
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
        )}
      </SpaceBetween>
    </Modal>
  );
};
