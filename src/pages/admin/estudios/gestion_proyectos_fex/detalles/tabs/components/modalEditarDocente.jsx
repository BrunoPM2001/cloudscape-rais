import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../../api/axios";

const initialForm = {
  condicion: null,
  responsabilidad: "",
  nombres: "",
  codigo: "",
  doc_numero: "",
  categoria: "",
  dependencia: "",
  facultad: "",
  cti_vitae: "",
  especialidad: "",
  titulo_profesional: "",
  grado: null,
  instituto: null,
  codigo_orcid: "",
  email3: "",
  telefono_casa: "",
  telefono_trabajo: "",
  telefono_movil: "",
};

const formRules = {
  condicion: { required: true },
  email3: { required: true },
};

const opt_grados = [
  { value: "Bachiller" },
  { value: "Maestro" },
  { value: "Doctor" },
  { value: "Msci" },
  { value: "Phd" },
];

const opt_condicion = [
  { value: 44, label: "Coordinador general" },
  { value: 45, label: "Investigador principal" },
  { value: 46, label: "Co-Investigador" },
  { value: 48, label: "Otros" },
  { value: 49, label: "Cordinador administrativo" },
  { value: 91, label: "Responsable Técnico" },
];

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [institutos, setInstitutos] = useState([]);
  const [alert, setAlert] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/proyectosFEX/getEditDocente",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setFormValues({
      ...data.docente,
      id,
      condicion: opt_condicion.find(
        (opt) => opt.value == data.docente.proyecto_integrante_tipo_id
      ),
      grado: { value: data.docente.grado },
      instituto: data.institutos.find(
        (opt) => opt.value == data.docente.instituto_id
      ),
    });
    setInstitutos(data.institutos);
    setLoading(false);
  };

  const editar = async () => {
    if (validateForm()) {
      if (
        formValues?.condicion?.value == 48 &&
        (formValues.responsabilidad == "" || formValues.responsabilidad == null)
      ) {
        setAlert(true);
      } else {
        setCreating(true);
        const res = await axiosBase.put(
          "admin/estudios/proyectosFEX/editarDocente",
          { ...formValues, id }
        );
        const data = res.data;
        setCreating(false);
        pushNotification(data.detail, data.message, notifications.length + 1);
        close();
        reload();
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Editar miembro docente"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={editar} loading={creating}>
              Editar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        {loading ? (
          <SpaceBetween size="xs" direction="horizontal">
            <Spinner /> Cargando información
          </SpaceBetween>
        ) : (
          <SpaceBetween size="m">
            <Alert>
              <div>
                <Box variant="awsui-key-label">Apellidos y nombres</Box>
                <div>{`${formValues?.apellido1} ${formValues?.apellido2}, ${formValues?.nombres}`}</div>
              </div>
              <ColumnLayout columns={2} disableGutters>
                <div>
                  <Box variant="awsui-key-label">Código docente</Box>
                  <div>{formValues?.codigo}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">N° de documento</Box>
                  <div>{formValues?.doc_numero}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Dependencia</Box>
                  <div>{formValues?.dependencia}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Facultad</Box>
                  <div>{formValues?.facultad}</div>
                </div>
              </ColumnLayout>
            </Alert>
            {alert && (
              <Alert
                header="Necesita determinar el detalle de la otra condición"
                type="warning"
              />
            )}
            <FormField
              label="Condición"
              errorText={formErrors.condicion}
              stretch
            >
              <Select
                selectedOption={formValues.condicion}
                onChange={({ detail }) =>
                  handleChange("condicion", detail.selectedOption)
                }
                placeholder="Escoja una opción"
                options={opt_condicion}
              />
            </FormField>
            {formValues?.condicion?.value == 48 && (
              <FormField
                label="Otra condición"
                stretch
                errorText={formErrors.responsabilidad}
              >
                <Input
                  value={formValues.responsabilidad}
                  onChange={({ detail }) =>
                    handleChange("responsabilidad", detail.value)
                  }
                />
              </FormField>
            )}
            <ColumnLayout columns={2}>
              <FormField
                label="Cti vitae"
                errorText={formErrors.cti_vitae}
                stretch
              >
                <Input
                  value={formValues.cti_vitae}
                  onChange={({ detail }) =>
                    handleChange("cti_vitae", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Especialidad"
                errorText={formErrors.especialidad}
                stretch
              >
                <Input
                  value={formValues.especialidad}
                  onChange={({ detail }) =>
                    handleChange("especialidad", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Título profesional"
                errorText={formErrors.titulo_profesional}
                stretch
              >
                <Input
                  value={formValues.titulo_profesional}
                  onChange={({ detail }) =>
                    handleChange("titulo_profesional", detail.value)
                  }
                />
              </FormField>
              <FormField label="Grado" errorText={formErrors.grado} stretch>
                <Select
                  selectedOption={formValues.grado}
                  onChange={({ detail }) =>
                    handleChange("grado", detail.selectedOption)
                  }
                  placeholder="Escoja una opción"
                  options={opt_grados}
                />
              </FormField>
              <FormField
                label="Instituto"
                errorText={formErrors.instituto}
                stretch
              >
                <Select
                  selectedOption={formValues.instituto}
                  onChange={({ detail }) =>
                    handleChange("instituto", detail.selectedOption)
                  }
                  placeholder="Escoja una opción"
                  options={institutos}
                />
              </FormField>
              <FormField
                label="Código orcid"
                errorText={formErrors.codigo_orcid}
                stretch
              >
                <Input
                  value={formValues.codigo_orcid}
                  onChange={({ detail }) =>
                    handleChange("codigo_orcid", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Correo institucional"
                errorText={formErrors.email3}
                stretch
              >
                <Input
                  value={formValues.email3}
                  onChange={({ detail }) =>
                    handleChange("email3", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono de casa"
                errorText={formErrors.telefono_casa}
                stretch
              >
                <Input
                  value={formValues.telefono_casa}
                  onChange={({ detail }) =>
                    handleChange("telefono_casa", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono de trabajo"
                errorText={formErrors.telefono_trabajo}
                stretch
              >
                <Input
                  value={formValues.telefono_trabajo}
                  onChange={({ detail }) =>
                    handleChange("telefono_trabajo", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Teléfono celular"
                errorText={formErrors.telefono_movil}
                stretch
              >
                <Input
                  value={formValues.telefono_movil}
                  onChange={({ detail }) =>
                    handleChange("telefono_movil", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Modal>
  );
};
