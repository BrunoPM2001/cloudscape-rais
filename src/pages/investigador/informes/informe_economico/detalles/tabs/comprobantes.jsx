import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useState } from "react";
import ModalBoleta from "../components/modalBoleta";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalFactura from "../components/modalFactura";
import ModalMovilidad from "../components/modalMovilidad";
import ModalRxH from "../components/modalRxH";
import ModalBoletaViaje from "../components/modalBoletaViaje";
import ModalLiquidacion from "../components/modalLiquidacion";
import ModalOtros from "../components/modalOtros";
import ModalReciboIngreso from "../components/modalReciboIngreso";
import ModalTicket from "../components/modalTicket";
import ModalReciboBanco from "../components/modalReciboBanco";
import ModalDeclaracionJurada from "../components/modalDeclaracionJurada";
import axiosBase from "../../../../../../api/axios";

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "numero",
    header: "N°",
    cell: (item) => item.numero,
    sortingField: "numero",
  },
  {
    id: "fecha",
    header: "Fecha",
    cell: (item) => item.fecha,
    sortingField: "fecha",
  },
  {
    id: "total_declarado",
    header: "Monto (S/)",
    cell: (item) => parseFloat(item.total_declarado).toFixed(3),
    sortingField: "total_declarado",
  },
  {
    id: "url",
    header: "Archivo",
    cell: (item) => (
      <Button
        variant="inline-icon"
        href={item.url}
        target="_blank"
        iconName="file-open"
      />
    ),
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Aprobado"
            ? "green"
            : item.estado == "Rechazado"
            ? "red"
            : item.estado == "Observado"
            ? "grey"
            : item.estado == "Enviado"
            ? "blue"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo", visible: true },
  { id: "numero", visible: true },
  { id: "fecha", visible: true },
  { id: "total_declarado", visible: true },
  { id: "url", visible: true },
  { id: "estado", visible: true },
];

export default ({ data, loading, reload }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [edit, setEdit] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, collectionProps } = useCollection(data, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  //  Function
  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_economico/detalleGasto",
      {
        params: {
          id: id,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        enableKeyboardNavigation
        selectionType="single"
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  disabled={loading}
                  loading={loadingBtn}
                  onClick={reporte}
                  iconName="file"
                >
                  Detalle del gasto
                </Button>
                <Button
                  disabled={
                    collectionProps.selectedItems.length == 0 ? true : false
                  }
                  onClick={() => {
                    setVisible(true);
                    setEdit(true);
                    setType(collectionProps.selectedItems[0].tipo);
                  }}
                  iconName="edit"
                >
                  Ver detalle
                </Button>
                <ButtonDropdown
                  variant="primary"
                  items={[
                    {
                      id: "BOLETA",
                      text: "Boleta de venta",
                    },
                    {
                      id: "FACTURA",
                      text: "Factura",
                    },
                    {
                      id: "RMOVILIDAD",
                      text: "Recibo de movilidad",
                    },
                    {
                      id: "RHONORARIOS",
                      text: "Recibo por honorarios",
                    },
                    {
                      id: "BVIAJE",
                      text: "Boleto de viaje",
                    },
                    {
                      id: "LCOMPRA",
                      text: "Liquidación de compra",
                    },
                    {
                      id: "OTROS",
                      text: "Otros",
                    },
                    {
                      id: "RINGRESO",
                      text: "Recibo de ingreso - UNMSM",
                    },
                    {
                      id: "TICKET",
                      text: "Ticket",
                    },
                    {
                      id: "RBANCO",
                      text: "Recibo de banco",
                    },
                    {
                      id: "DJURADA",
                      text: "Declaración jurada",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    setVisible(true);
                    setType(detail.id);
                    setEdit(false);
                  }}
                >
                  Agregar comprobante
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Listado de comprobantes
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
      {visible &&
        (type == "BOLETA" ? (
          <ModalBoleta
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "FACTURA" ? (
          <ModalFactura
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "RMOVILIDAD" ? (
          <ModalMovilidad
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "RHONORARIOS" ? (
          <ModalRxH
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "BVIAJE" ? (
          <ModalBoletaViaje
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "LCOMPRA" ? (
          <ModalLiquidacion
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "OTROS" ? (
          <ModalOtros
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "RINGRESO" ? (
          <ModalReciboIngreso
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "TICKET" ? (
          <ModalTicket
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "RBANCO" ? (
          <ModalReciboBanco
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : type == "DJURADA" ? (
          <ModalDeclaracionJurada
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0] ?? null}
            edit={edit}
            geco_proyecto_id={id}
            type={type}
            reload={reload}
          />
        ) : (
          <></>
        ))}
    </>
  );
};
