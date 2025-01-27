import {
  Alert,
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  FileUpload,
  FormField,
  Header,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../../api/axios";
import NotificationContext from "../../../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../../../hooks/useAutosuggest";

const initialForm = {
  nombres: "",
  codigo: "",
  doc_numero: "",
  categoria: "",
  dependencia: "",
  facultad: "",
  condicion: null,
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

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [enableCreate, setEnableCreate] = useState(false);
  const [institutos, setInstitutos] = useState([]);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/proyectosFEX/searchDocenteRrhh");
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/estudios/proyectosFEX/getInstitutos"
    );
    const data = res.data;
    setInstitutos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Agregar miembro docente"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              // onClick={!agregar}
              loading={creating}
              disabled={!enableCreate}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField label="Buscar docente investigador" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
              if (detail.value == "") {
                setEnableCreate(false);
              }
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setFormValues({
                  ...rest,
                  condicion: null,
                  grado: opt_grados.find((opt) => opt.value == rest.grado),
                  instituto: institutos.find(
                    (opt) => opt.value == rest.instituto_id
                  ),
                });
                setEnableCreate(true);
                setAvoidSelect(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Dni, código o nombres de docente"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        {enableCreate && (
          <SpaceBetween size="m">
            <Alert>
              <ColumnLayout columns={2}>
                <div>
                  <Box variant="awsui-key-label">Apellidos y nombres</Box>
                  <div>{formValues?.nombres}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Código docente</Box>
                  <div>{formValues?.codigo}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">N° de documento</Box>
                  <div>{formValues?.doc_numero}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Categoria / Clase</Box>
                  <div>{formValues?.categoria}</div>
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
                options={[
                  { value: "Investigador principal" },
                  { value: "Co-Investigador" },
                  { value: "Otros" },
                  { value: "Cordinador administrativo" },
                  { value: "Responsable Técnico" },
                ]}
              />
            </FormField>
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
