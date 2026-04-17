import {
  Box,
  Button,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState, useEffect } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import ModalDeleteLinea from "./modalDeletLinea";

const estados = [
  { value: 1, label: "Activo" },
  { value: 0, label: "Inactivo" },
];

const initialForm = {
  codigo: "",
  nombre: "",
  estado: null,
  resolucion: "",
  padre: null,
};

const formRules = {
  codigo: { required: true },
  nombre: { required: true },
  estado: { required: true },
  resolucion: { required: false },
  padre: { required: false },
};

export default ({ close, item, reload }) => {
  // Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  // State
  const [loading, setLoading] = useState(false);
  const [optPadre, setOptPadre] = useState([]);
  const [loadingPadre, setLoadingPadre] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);

  // Hook
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        ...initialForm,
        ...item,
        estado: estados.find((e) => e.value == item.estado),
        padre: item.parent_id
            ? { 
                value: item.parent_id, 
                label: "Cargando...",
        }
            : null,
      },
      formRules
    );

    const editarLinea = async () => {
    if (validateForm()) {
        setLoading(true);

        const res = await axiosBase.put(
            "admin/admin/lineasInvestigacion/update",
            {
                id: item.id,
                codigo: formValues.codigo,
                nombre: formValues.nombre,
                estado: formValues.estado.value,
                resolucion: formValues.resolucion,
                parent_id: formValues.padre ? formValues.padre.value : null,
            }
        );

        const data = res.data;

        pushNotification(data.detail, data.message, notifications.length + 1);

        reload();
        setLoading(false);
        close();
    }
  };

  useEffect(() => {
    const fetchPadres = async () => {
        const res = await axiosBase.get(
        "admin/admin/lineasInvestigacion/getAll/" + item.facultad_id
        );

        const opciones = res.data.data.map((i) => ({
        label: i.codigo + " - " + i.nombre,
        value: i.id,
        }));

        setOptPadre(opciones);
        setLoadingPadre(false);
    };

    fetchPadres();
    }, []);

  return (
    <>
        <Modal
        visible
        size="medium"
        onDismiss={close}
        header="Editar línea de investigación"
        footer={
            <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
                <Button
                variant="danger"
                onClick={() => setModalDelete(true)}
                >
                Eliminar
                </Button>
                <Button 
                variant="normal" 
                onClick={close}
                >
                Cancelar
                </Button>
                <Button
                variant="primary"
                loading={loading}
                onClick={editarLinea}
                >
                Guardar
                </Button>
            </SpaceBetween>
            </Box>
        }
        >
        <SpaceBetween size="m">
            <FormField label="Código" errorText={formErrors.codigo}>
            <Input
                value={formValues.codigo}
                onChange={({ detail }) =>
                handleChange("codigo", detail.value)
                }
            />
            </FormField>
            <FormField label="Nombre" errorText={formErrors.nombre}>
            <Input
                value={formValues.nombre}
                onChange={({ detail }) =>
                handleChange("nombre", detail.value)
                }
            />
            </FormField>
            <FormField label="Estado" errorText={formErrors.estado}>
            <Select
                options={estados}
                selectedOption={formValues.estado}
                onChange={({ detail }) =>
                handleChange("estado", detail.selectedOption)
                }
            />
            </FormField>
            <FormField label="Resolución rectoral" errorText={formErrors.resolucion}>
                <Input
                    value={formValues.resolucion || ""}
                    onChange={({ detail }) =>
                    handleChange("resolucion", detail.value)
                    }
                />
            </FormField>
            <FormField label="Línea padre (opcional)" errorText={formErrors.padre}>
                <Select
                    placeholder="Sin padre"
                    options={optPadre}
                    selectedOption={formValues.padre}
                    loadingText="Cargando..."
                    statusType={loadingPadre ? "loading" : "finished"}
                    onChange={({ detail }) =>
                    handleChange("padre", detail.selectedOption)
                    }
                />
            </FormField>
        </SpaceBetween>
        </Modal>
        {modalDelete && (
          <ModalDeleteLinea
            close={() => setModalDelete(false)}
            item={item}
            reload={reload}
            closeParent={close}
          />
        )}
    </>
  );
};