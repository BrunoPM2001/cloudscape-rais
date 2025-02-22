import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Autosuggest,
  Alert,
  Select,
  Input,
  ColumnLayout,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  apellido1: "",
  apellido2: "",
  nombres: "",
  sexo: null,
  institucion: "",
  pais: null,
  email1: "",
  doc_tipo: null,
  doc_numero: "",
};

const formRules = {
  apellido1: { required: true },
  apellido2: { required: true },
  nombres: { required: true },
  sexo: { required: true },
  institucion: { required: false },
  pais: { required: true },
  doc_tipo: { required: true },
  doc_numero: { required: true },
};

export default ({ close, reload, id, reset }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [enableCreate, setEnableCreate] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [paises, setPaises] = useState([]);
  const [form, setForm] = useState({});
  const [nuevo, setNuevo] = useState(false);

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/convocatorias/pmulti/listadoGestor");
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarMiembro = async () => {
    if (nuevo) {
      if (validateForm()) {
        setLoadingCreate(true);
        const form = new FormData();
        form.append("proyecto_id", id);
        form.append("apellido1", formValues.apellido1);
        form.append("apellido2", formValues.apellido2);
        form.append("nombres", formValues.nombres);
        form.append("sexo", formValues.sexo.value);
        form.append("institucion", formValues.institucion);
        form.append("pais", formValues.pais.value);
        form.append("email1", formValues.email1);
        form.append("doc_tipo", formValues.doc_tipo.value);
        form.append("doc_numero", formValues.doc_numero);
        form.append("tipo", "Nuevo");
        const res = await axiosBase.post(
          "investigador/convocatorias/pmulti/agregarGestor",
          form
        );
        const data = res.data;
        setLoadingCreate(false);
        close();
        reset();
        reload();
        pushNotification(data.detail, data.message, notifications.length + 1);
      }
    } else {
      setLoadingCreate(true);
      const form1 = new FormData();
      form1.append("proyecto_id", id);
      form1.append("tipo", "Antiguo");
      form1.append("investigador_id", form.investigador_id);
      const res = await axiosBase.post(
        "investigador/convocatorias/pmulti/agregarGestor",
        form1
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reset();
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
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              disabled={!enableCreate}
              variant="primary"
              onClick={agregarMiembro}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir integrante al proyecto"
    >
      <SpaceBetween size="m">
        <Alert header="Acerca de este integrante">
          <li>
            Corresponde al perfil <strong>Externo</strong>
          </li>
          <li>
            Está bajo las condiciones de <strong>Externo</strong>
          </li>
        </Alert>
        <Alert>
          En caso no encuentre los datos de su externo presione la opción de
          "Utilizar: ..."
        </Alert>
        <FormField label="Buscar investigador" stretch>
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
                setAvoidSelect(false);
                setEnableCreate(true);
                setNuevo(true);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Nombre del gestor"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        {nuevo ? (
          <>
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
                errorText={formErrors.email1}
              >
                <Input
                  value={formValues.email1}
                  onChange={({ detail }) =>
                    handleChange("email1", detail.value)
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
            </ColumnLayout>
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
