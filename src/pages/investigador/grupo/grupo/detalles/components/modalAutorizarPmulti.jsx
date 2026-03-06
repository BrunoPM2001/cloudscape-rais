import {
  Alert,
  Box,
  Button,
  Checkbox,
  ColumnLayout,
  Modal,
  SpaceBetween,
  Table,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useContext, useState, useEffect } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

export default ({ close, item, reload }) => {
  // Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  // States
  const [loading, setLoading] = useState(false);
  const [grupos, setGrupos] = useState(item?.grupos ?? []);

  // Hooks
  const { formValues, handleChange } = useFormValidation(
    {
      check: false,
    },
    {}
  );

  // Functions
  const guardar = async () => {
    setLoading(true);

    const res = await axiosBase.put(
      "investigador/grupo/autorizarPmulti",
      {
        id: item.id,
        autorizacion_grupo: formValues.check,
      }
    );

    const data = res.data;

    const gruposActualizados = await axiosBase.get(
        "investigador/grupo/obtenergruposPmulti",
        {
          params: { id: item.id }
        }
    );

    setGrupos(gruposActualizados.data.grupos);
    handleChange("check", gruposActualizados.data.mi_autorizacion == 1);
    setLoading(false);
    reload();
    close();

    pushNotification(
      data.detail,
      data.message,
      notifications.length + 1
    );
  };

    useEffect(() => {
    const cargarGrupos = async () => {
    const res = await axiosBase.get(
    "investigador/grupo/obtenergruposPmulti",
        {
        params: { id: item.id}
        }
    );

    setGrupos(res.data.grupos);
    handleChange("check", res.data.mi_autorizacion == 1);
    };

    cargarGrupos();
    }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={guardar}
            >
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Autorizar proyecto"
    >
      <SpaceBetween size="l">

        {/* Información básica */}
        <div>
          <Box variant="awsui-key-label">Título del proyecto</Box>
          <div>{item.titulo}</div>
        </div>

        <div>
          <Box variant="awsui-key-label">Responsable</Box>
          <div>{item.responsable}</div>
        </div>

        {/* Checkbox de autorización */}
        <Alert header="Autorización">
          <Checkbox
            disabled={loading}
            checked={formValues.check}
            description="Al marcar esto autoriza al responsable del proyecto el envío del mismo"
            onChange={({ detail }) =>
              handleChange("check", detail.checked)
            }
          >
            Autorizar
          </Checkbox>
        </Alert>

        {/* Tabla de grupos participantes */}
        <div>
          <Box variant="awsui-key-label">
            Estado de autorización de los grupos
          </Box>

          <Table
            variant="embedded"
            columnDefinitions={[
              {
                id: "grupo_nombre_corto",
                header: "Nombre corto",
                cell: (item) => item.grupo_nombre_corto,
              },
              {
                id: "grupo_categoria",
                header: "Categoría",
                cell: (item) => item.grupo_categoria,
              },
              {
                id: "autorizado",
                header: "Autorizado",
                cell: (item) => (
                  <StatusIndicator
                    type={
                      item.autorizado == "SÍ"
                        ? "success"
                        : item.autorizado == "NO"
                        ? "error"
                        : "pending"
                    }
                  >
                    {item.autorizado}
                  </StatusIndicator>
                ),
              },
            ]}
            columnDisplay={[
              { id: "grupo_nombre_corto", visible: true },
              { id: "grupo_categoria", visible: true },
              { id: "autorizado", visible: true },
            ]}
            items={grupos}
            loading={loading}
            loadingText="Cargando datos"
            empty="No hay grupos registrados"
          />
        </div>

      </SpaceBetween>
    </Modal>
  );
};