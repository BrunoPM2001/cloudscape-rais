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
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  tipo: null,
  titulo: "",
};

const formRules = {
  tipo: { required: true },
  titulo: { required: true },
};

const opt_grado = [
  { value: "Licenciatura o Segunda Especialidad" },
  { value: "Maestría" },
  { value: "Doctorado" },
];

export default ({ close, reload, id, reset }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [enableCreate, setEnableCreate] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form, setForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest(
      "investigador/convocatorias/pmulti/listadoTesistas?id=" + id
    );
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarIntegrante = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      let formulario = new FormData();
      formulario.append("id", id);
      formulario.append("investigador_id", form.investigador_id);
      formulario.append("grupo_id", form.grupo_id);
      formulario.append("grupo_integrante_id", form.grupo_integrante_id);
      formulario.append("proyecto_integrante_tipo_id", 59);
      formulario.append("tipo", formValues.tipo.value);
      formulario.append("titulo", formValues.titulo);
      const res = await axiosBase.post(
        "investigador/convocatorias/pmulti/agregarIntegrante",
        formulario
      );
      const data = res.data;
      setLoadingCreate(false);
      reset();
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      close();
    }
  };

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
              disabled={enableCreate}
              variant="primary"
              onClick={agregarIntegrante}
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
            Corresponde al perfil <strong>Estudiante</strong>
          </li>
          <li>
            Está bajo las condiciones de <strong>Adherente</strong>
          </li>
        </Alert>
        <FormField label="Buscar investigador" stretch>
          <Autosuggest
            onChange={({ detail }) => {
              setOptions([]);
              setValue(detail.value);
              if (detail.value == "") {
                setForm({});
              }
              setEnableCreate(true);
            }}
            onSelect={({ detail }) => {
              if (detail.selectedOption.investigador_id != undefined) {
                const { value, ...rest } = detail.selectedOption;
                setForm(rest);
                setAvoidSelect(false);
                setEnableCreate(false);
              }
            }}
            value={value}
            options={options}
            loadingText="Cargando data"
            placeholder="Nombre del miembro de grupo"
            statusType={loading ? "loading" : "finished"}
            empty="No se encontraron resultados"
          />
        </FormField>
        <FormField label="Tipo de tesis" stretch errorText={formErrors.tipo}>
          <Select
            selectedOption={formValues.tipo}
            onChange={({ detail }) => {
              handleChange("tipo", detail.selectedOption);
            }}
            placeholder="Escoja una opción"
            options={
              form?.tipo_programa
                ? [opt_grado.find((opt) => opt.value == form.tipo_programa)]
                : opt_grado
            }
          />
        </FormField>
        <FormField
          label="Título de tesis"
          stretch
          errorText={formErrors.titulo}
        >
          <Input
            placeholder="Escriba el título de la tesis"
            value={formValues.titulo}
            onChange={({ detail }) => {
              handleChange("titulo", detail.value);
            }}
          />
        </FormField>
        <Alert>
          <Box fontSize="body-s">
            El tesista bajo declaración jurada afirma que no tiene o no recibe
            ninguna subvención o financiamiento por la UNMSM para desarrollar
            una tesis de pregrado, maestría o doctorado. Si el VRIP detecta que
            está infringiendo la declaración jurada lo separará inmediatamente
            del proyecto y el responsable del proyecto de investigación debe
            sustituir al tesista en un plazo no mayor de 72 horas.
          </Box>
        </Alert>
      </SpaceBetween>
    </Modal>
  );
};
