import {
  Alert,
  Badge,
  Box,
  Button,
  Form,
  FormField,
  Header,
  SpaceBetween,
  Table,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import ModalSolicitarTransferencia from "../components/modalSolicitarTransferencia";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../../api/axios";
import NotificationContext from "../../../../../../../providers/notificationProvider";

const columnDefinitions = [
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
    sortingField: "partida",
    minWidth: 200,
  },
  {
    id: "monto",
    header: "Presupuesto (S/)",
    cell: (item) =>
      item.partida == null ? "" : parseFloat(item.monto).toFixed(3),
    sortingField: "monto",
  },
  {
    id: "operacion",
    header: "Transferencia (S/)",
    cell: (item) =>
      item.monto_nuevo == null ? (
        ""
      ) : item.monto_nuevo > item.monto ? (
        <Badge color="blue">
          +{parseFloat(item.monto_nuevo - item.monto).toFixed(3)}
        </Badge>
      ) : item.monto_nuevo < item.monto ? (
        <Badge color="red">
          -{parseFloat(item.monto - item.monto_nuevo).toFixed(3)}
        </Badge>
      ) : (
        ""
      ),
    sortingField: "operacion",
  },
  {
    id: "monto_nuevo",
    header: "Nuevo presupuesto (S/)",
    cell: (item) =>
      item.monto_nuevo == null ? "" : parseFloat(item.monto_nuevo).toFixed(3),
    sortingField: "monto_nuevo",
  },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "partida", visible: true },
  { id: "monto", visible: true },
  { id: "operacion", visible: true },
  { id: "monto_nuevo", visible: true },
];

const initialForm = {
  justificacion: null,
};

const formRules = {
  justificacion: { required: true },
};

export default ({ data, loading, reload, disponible }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [visible, setVisible] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const solicitar = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const res = await axiosBase.post(
        "investigador/informes/informe_economico/solicitarTransferencia",
        {
          geco_proyecto_id: id,
          justificacion: formValues.justificacion,
        }
      );
      const data = res.data;
      setLoadingBtn(false);
      pushNotification(data.detail, data.message, notifications.length);
      reload();
    }
  };

  return (
    <SpaceBetween size="m">
      {!loading && !disponible && (
        <Alert header="Tiene una transferencia solicitada pendiente de revisión, por lo que no puede solicitar otra de momento." />
      )}
      <Table
        trackBy="tipo"
        items={data}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        wrapLines
        expandedItems={[
          { tipo: "Bienes" },
          { tipo: "Servicios" },
          { tipo: "Otros" },
        ]}
        expandableRows={{
          getItemChildren: (item) => item.children,
          isItemExpandable: (item) => Boolean(item.children),
          expandedItems: [
            { tipo: "Bienes" },
            { tipo: "Servicios" },
            { tipo: "Otros" },
          ],
        }}
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <Button
                variant="primary"
                iconName="add-plus"
                disabled={!disponible}
                onClick={() => setVisible(true)}
              >
                Agregar movimiento
              </Button>
            }
          >
            Listado de partidas
          </Header>
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
      <Form
        actions={
          <Button
            onClick={solicitar}
            disabled={!disponible}
            loading={loadingBtn}
          >
            Solicitar transferencia
          </Button>
        }
      >
        <FormField
          label="Justificación"
          stretch
          errorText={formErrors.justificacion}
        >
          <Textarea
            placeholder="Escriba su justificación para transferencia"
            value={formValues.justificacion}
            onChange={({ detail }) =>
              handleChange("justificacion", detail.value)
            }
          />
        </FormField>
      </Form>
      {visible && (
        <ModalSolicitarTransferencia
          id={id}
          setVisible={setVisible}
          reload={reload}
        />
      )}
    </SpaceBetween>
  );
};
