import {
  Box,
  ColumnLayout,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useCollection } from "@cloudscape-design/collection-hooks";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  estado: null,
};

const formRules = {
  estado: { required: true },
};

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
    isRowHeader: true,
    width: "25%",
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
    sortingField: "partida",
    width: "55%",
  },
  {
    id: "total",
    header: "Monto",
    cell: (item) => item.total,
    sortingField: "total",
    width: "20%",
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "partida", visible: true },
  { id: "total", visible: true },
];

const optsEstado = [
  {
    value: 1,
    label: "Aprobado",
  },
  {
    value: 2,
    label: "Rechazado",
  },
  {
    value: 3,
    label: "Observado",
  },
  {
    value: 5,
    label: "Anulado",
  },
];

export default ({ item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [distributions, setDistribution] = useState([]);

  //  Hooks
  const { items, collectionProps } = useCollection(distributions, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
  });
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/economia/listadoPartidasComprobante",
      {
        params: {
          geco_documento_id: item.id,
        },
      }
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    handleChange("estado", () => {
      if (item.estado == 4) {
        return null;
      } else {
        return optsEstado.find((opt) => opt.value == item.estado);
      }
    });
    getData();
  }, []);

  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={2}>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Razón social</Box>
            <div>{item.razon_social}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Ruc del emisor</Box>
            <div>{item.ruc}</div>
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Serie + N° comprobante</Box>
            <div>{item.numero}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha</Box>
            <div>{item.fecha}</div>
          </div>
        </SpaceBetween>
      </ColumnLayout>
      <Table
        {...collectionProps}
        // variant="embedded"
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        enableKeyboardNavigation
        header={<Header variant="h3">Partidas</Header>}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </SpaceBetween>
  );
};
