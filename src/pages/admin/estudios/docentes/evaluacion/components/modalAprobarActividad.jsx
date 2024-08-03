import {
  Box,
  Button,
  DateInput,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  categoria: null,
  periodo: "",
  tipo: "",
  revista: "",
  rol: "",
  condicion: "",
  fecha: "",
  autor: "",
  estado: "",
  titulo: "",
  url: "",
  lugar_act: "",
  tipo_transf: "",
  aplicacion: "",
  beneficiario: "",
  num_documento: "",
};

const formRules = {
  categoria: { required: true },
  periodo: { required: true },
};

export default ({ data, close }) => {
  //  States
  const [opt_categoria, setOpt_categoria] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const listadoOpciones = async () => {
    const res = await axiosBase.get(
      "admin/estudios/docentes/opcionesSubCategorias"
    );
    const data = res.data;
    setOpt_categoria(data);
  };

  const aprobar = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "admin/estudios/docentes/aprobarActividad",
        {
          ...formValues,
          investigador_id: data.investigador_id,
          id: data.id,
        }
      );
      const info = res.data;
      setLoadingCreate(false);
      close();
    }
  };

  useEffect(() => {
    listadoOpciones();
  }, []);

  return (
    <Modal
      header="Registrar actividad extra"
      onDismiss={close}
      size="medium"
      visible
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cancelar</Button>
            <Button variant="primary" loading={loadingCreate} onClick={aprobar}>
              Guardar actividad
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <FormField label="Categoría">
          <Input value={data.tipo} disabled />
        </FormField>
        <FormField label="Sub categoría" errorText={formErrors.categoria}>
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.categoria}
            onChange={({ detail }) =>
              handleChange("categoria", detail.selectedOption)
            }
            loadingText="Cargando opciones"
            statusType={opt_categoria.length == 0 ? "loading" : "finished"}
            options={opt_categoria}
          />
        </FormField>
        <FormField label="Periodo" errorText={formErrors.periodo}>
          <Input
            value={formValues.periodo}
            onChange={({ detail }) => handleChange("periodo", detail.value)}
          />
        </FormField>
        <FormField label="Tipo" errorText={formErrors.tipo}>
          <Input
            value={formValues.tipo}
            onChange={({ detail }) => handleChange("tipo", detail.value)}
          />
        </FormField>
        <FormField label="Revista" errorText={formErrors.revista}>
          <Input
            value={formValues.revista}
            onChange={({ detail }) => handleChange("revista", detail.value)}
          />
        </FormField>
        <FormField label="Rol" errorText={formErrors.rol}>
          <Input
            value={formValues.rol}
            onChange={({ detail }) => handleChange("rol", detail.value)}
          />
        </FormField>
        <FormField label="Condición" errorText={formErrors.condicion}>
          <Input
            value={formValues.condicion}
            onChange={({ detail }) => handleChange("condicion", detail.value)}
          />
        </FormField>
        <FormField label="Fecha" errorText={formErrors.fecha}>
          <DateInput
            placeholder="YYYY/MM/DD"
            value={formValues.fecha}
            onChange={({ detail }) => handleChange("fecha", detail.value)}
          />
        </FormField>
        <FormField label="Autor" errorText={formErrors.autor}>
          <Input
            value={formValues.autor}
            onChange={({ detail }) => handleChange("autor", detail.value)}
          />
        </FormField>
        <FormField label="Estado" errorText={formErrors.estado}>
          <Input
            value={formValues.estado}
            onChange={({ detail }) => handleChange("estado", detail.value)}
          />
        </FormField>
        <FormField label="Título" errorText={formErrors.titulo}>
          <Input
            value={formValues.titulo}
            onChange={({ detail }) => handleChange("titulo", detail.value)}
          />
        </FormField>
        <FormField label="Url" errorText={formErrors.url}>
          <Input
            value={formValues.url}
            onChange={({ detail }) => handleChange("url", detail.value)}
          />
        </FormField>
        <FormField label="Lugar de actividad" errorText={formErrors.lugar_act}>
          <Input
            value={formValues.lugar_act}
            onChange={({ detail }) => handleChange("lugar_act", detail.value)}
          />
        </FormField>
        <FormField
          label="Tipo de transferencia"
          errorText={formErrors.tipo_transf}
        >
          <Input
            value={formValues.tipo_transf}
            onChange={({ detail }) => handleChange("tipo_transf", detail.value)}
          />
        </FormField>
        <FormField label="Aplicación" errorText={formErrors.aplicacion}>
          <Input
            value={formValues.aplicacion}
            onChange={({ detail }) => handleChange("aplicacion", detail.value)}
          />
        </FormField>
        <FormField label="Beneficiario" errorText={formErrors.beneficiario}>
          <Input
            value={formValues.beneficiario}
            onChange={({ detail }) =>
              handleChange("beneficiario", detail.value)
            }
          />
        </FormField>
        <FormField label="N° de documento" errorText={formErrors.num_documento}>
          <Input
            value={formValues.num_documento}
            onChange={({ detail }) =>
              handleChange("num_documento", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
