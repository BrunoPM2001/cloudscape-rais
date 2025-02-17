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
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const opt_isi = [
  { value: 0, label: "No" },
  { value: 1, label: "Sí" },
];

const initialForm = {
  issn: "",
  issne: "",
  revista: "",
  casa: "",
  isi: null,
  pais: null,
  cobertura: "",
};

const formRules = {
  issn: { required: true },
  issne: { required: true },
  revista: { required: true },
  isi: { required: true },
  pais: { required: true },
};

export default ({ item, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [paises, setPaises] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const update = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "admin/estudios/revistas/updateRevista",
        formValues
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      close();
      reload();
    }
  };

  const getPaises = async () => {
    handleChange("id", item.id);
    handleChange("issn", item.issn);
    handleChange("issne", item.issne);
    handleChange("revista", item.revista);
    handleChange("casa", item.casa);
    handleChange(
      "isi",
      opt_isi.find((opt) => opt.label == item.isi)
    );
    handleChange(
      "pais",
      item.pais == "" || item.pais == null ? null : { value: item.pais }
    );
    handleChange("cobertura", item.cobertura);
    const res = await axiosBase.get("admin/estudios/publicaciones/getPaises");
    const data = res.data;
    setPaises(data);
  };

  useEffect(() => {
    getPaises();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Actualizar revista"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loading} onClick={update}>
              Actualizar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField label="ISSN" errorText={formErrors.issn} stretch>
          <Input
            value={formValues.issn}
            onChange={({ detail }) => handleChange("issn", detail.value)}
          />
        </FormField>
        <FormField label="ISSNE" errorText={formErrors.issne} stretch>
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
        <FormField label="Casa" errorText={formErrors.casa} stretch>
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
              options={paises}
              statusType={paises.length == 0 ? "loading" : "finished"}
              loadingText="Cargando data"
            />
          </FormField>
        </ColumnLayout>
        <FormField label="Cobertura" errorText={formErrors.cobertura} stretch>
          <Input
            value={formValues.cobertura}
            onChange={({ detail }) => handleChange("cobertura", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
