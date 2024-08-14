import {
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const initialForm = {
  issn: null,
  issne: null,
  revista: null,
  casa: null,
  isi: null,
  pais: null,
  cobertura: null,
};

const formRules = {
  revista: { required: true },
  isi: { required: true },
  pais: { required: true },
};

const opt_isi = [
  {
    value: 1,
    label: "Sí",
  },
  {
    value: 0,
    label: "No",
  },
];

export default ({ close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [paises, setPaises] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/publicaciones/getPaises");
    const data = res.data;
    setPaises(data);
  };

  const agregar = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "admin/estudios/publicaciones/agregarRevistaPublicacion",
        formValues
      );
      const data = res.data;
      setLoadingCreate(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      close();
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
      header="Agregar revista"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loadingCreate} onClick={agregar}>
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <FormField label="ISSN" stretch>
          <Input
            value={formValues.issn}
            onChange={({ detail }) => handleChange("issn", detail.value)}
          />
        </FormField>
        <FormField label="ISSN-E" stretch>
          <Input
            value={formValues.issne}
            onChange={({ detail }) => handleChange("issne", detail.value)}
          />
        </FormField>
        <FormField label="Revista" errorText={formErrors.revista} stretch>
          <Input
            value={formValues.revista}
            onChange={({ detail }) => handleChange("revista", detail.value)}
          />
        </FormField>
        <FormField label="Casa" stretch>
          <Input
            value={formValues.casa}
            onChange={({ detail }) => handleChange("casa", detail.value)}
          />
        </FormField>
        <ColumnLayout columns={2}>
          <FormField label="ISI" errorText={formErrors.isi} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.isi}
              onChange={({ detail }) =>
                handleChange("isi", detail.selectedOption)
              }
              options={opt_isi}
            />
          </FormField>
          <FormField label="País" errorText={formErrors.pais} stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.pais}
              onChange={({ detail }) =>
                handleChange("pais", detail.selectedOption)
              }
              loadingText="Cargando datos"
              statusType={paises.length == 0 ? "loading" : "finished"}
              options={paises}
            />
          </FormField>
        </ColumnLayout>
        <FormField label="Cobertura" stretch>
          <Input
            value={formValues.cobertura}
            onChange={({ detail }) => handleChange("cobertura", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
