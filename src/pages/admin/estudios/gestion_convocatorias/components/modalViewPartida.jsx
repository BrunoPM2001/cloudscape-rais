import {
  Box,
  Button,
  ColumnLayout,
  Form,
  FormField,
  Header,
  Modal,
  Pagination,
  PropertyFilter,
  Select,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import axiosBase from "../../../../../api/axios";
import { useContext, useEffect, useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import ModalAddPartida from "./modalAddPartida";
import ModalDeletePartida from "./modalDeletePartida";
import NotificationContext from "../../../../../providers/notificationProvider";

const tipo_proyectos = [
  { value: "ECI" },
  { value: "PCONFIGI" },
  { value: "PCONFIGI-INV" },
  { value: "PEVENTO" },
  { value: "PINTERDIS" },
  { value: "PINVPOS" },
  { value: "PMULTI" },
  { value: "PRO-CTIE" },
  { value: "PSINFINV" },
  { value: "PSINFIPU" },
  { value: "PTPBACHILLER" },
  { value: "PTPDOCTO" },
  { value: "PTPGRADO" },
  { value: "PTPMAEST" },
  { value: "RFPLU" },
  { value: "SPINOFF" },
  { value: "GRUPO" },
  { value: "PICV" },
];

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Partida",
    key: "partida",
    groupValuesLabel: "Partidas",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    isRowHeader: true,
  },
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
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
];

const tipos_partida = [
  { value: "Bienes", label: "Bienes" },
  { value: "Servicios", label: "Servicios" },
];

const periodos = [
  { value: 2023, label: "2023" },
  { value: 2024, label: "2024" },
  { value: 2025, label: "2025" },
  { value: 2026, label: "2026" },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo", visible: true },
  { id: "partida", visible: true },
  { id: "periodo", visible: true},
];

const initialForm = {
  tipo_partida: null,
  tipo_proyecto: null,
  periodo: null,
};

const formRules = {
  tipo_partida: { required: true },
  tipo_proyecto: { required: true },
  periodo: { required: true },
};

export default ({ item, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const [modal, setModal] = useState("");

  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(distributions, {
    propertyFiltering: {
      filteringProperties: FILTER_PROPS,
      empty: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      ),
      noMatch: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay coincidencias</b>
          </SpaceBetween>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/dataGrupoPartidas",
      {
        params: {
          id: item.id,
        },
      }
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const update = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.put("admin/estudios/convocatorias/saveGrupo", {
      id: item.id,
      tipo_partida: formValues.tipo_partida.value,
      periodo: formValues.periodo.value,
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
    setLoadingBtn(false);
  };

  //  Effects
  useEffect(() => {
    handleChange("tipo_partida", tipos_partida.find((opt) => opt.value == item.tipo_partida));
    handleChange("tipo_proyecto", tipo_proyectos.find((opt) => opt.value == item.tipo_proyecto));
    handleChange("periodo", periodos.find((opt) => opt.value == item.periodo));
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loadingBtn} onClick={update}>
              Guardar datos básicos
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar grupo de partidas"
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={3}>
          <FormField label="Tipo de proyecto" errorText={formErrors.tipo_proyecto} stretch>
            <Select
              disabled
              selectedOption={formValues.tipo_proyecto}
              onChange={({ detail }) =>
                handleChange("tipo_proyecto", detail.selectedOption)
              }
              options={tipo_proyectos}
            />
          </FormField>
          <FormField label="Tipo de partida" errorText={formErrors.tipo_partida} stretch>
            <Select
              placeholder="Seleccione un tipo de partida"
              selectedOption={formValues.tipo_partida}
              onChange={({ detail }) =>
                handleChange("tipo_partida", detail.selectedOption)
              }
              options={tipos_partida}
            />
          </FormField>
          <FormField label="Periodo" errorText={formErrors.periodo} stretch>
            <Select
              placeholder="Seleccione un periodo"
              selectedOption={formValues.periodo}
              onChange={({ detail }) =>
                handleChange("periodo", detail.selectedOption)
              }
              options={periodos}
            />
          </FormField>
        </ColumnLayout>
        <Table
          {...collectionProps}
          trackBy="id"
          variant="embedded"
          items={items}
          columnDefinitions={columnDefinitions}
          columnDisplay={columnDisplay}
          loading={loading}
          loadingText="Cargando datos"
          wrapLines
          enableKeyboardNavigation
          selectionType="single"
          onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
          header={
            <Header
              counter={"(" + items.length + ")"}
              actions={
                <SpaceBetween size="xs" direction="horizontal">
                  <Button
                    iconName="delete-marker"
                    disabled={!collectionProps.selectedItems.length}
                    onClick={() => setModal("delete")}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="primary"
                    iconName="add-plus"
                    disabled={loading}
                    onClick={() => setModal("add")}
                  >
                    Agregar
                  </Button>
                </SpaceBetween>
              }
            >
              Partidas
            </Header>
          }
          filter={
            <PropertyFilter
              {...propertyFilterProps}
              filteringPlaceholder="Buscar grupo"
              countText={`${filteredItemsCount} coincidencias`}
              expandToViewport
            />
          }
          pagination={<Pagination {...paginationProps} />}
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
        />
      </SpaceBetween>
      {modal == "add" ? (
        <ModalAddPartida
          close={() => setModal("")}
          item={item}
          reload={getData}
        />
      ) : (
        modal == "delete" && (
          <ModalDeletePartida
            id={collectionProps.selectedItems[0].id}
            close={() => setModal("")}
            reload={getData}
          />
        )
      )}
    </Modal>
  );
};
