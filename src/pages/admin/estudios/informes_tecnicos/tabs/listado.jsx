import {
  Badge,
  Box,
  FormField,
  Header,
  Pagination,
  PropertyFilter,
  Select,
  SpaceBetween,
  Table,
  Button,
  ButtonDropdown,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import queryString from "query-string";
import ModalAudit from "../components/modalAudit";
import ModalEliminarInforme from "../components/modalEliminarInforme";
import NotificationContext from "../../../../../providers/notificationProvider";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Deuda",
    key: "deuda",
    groupValuesLabel: "Deudas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de deuda",
    key: "tipo_deuda",
    groupValuesLabel: "Tipos de deuda",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° de informes",
    key: "cantidad_informes",
    groupValuesLabel: "N° de informes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
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
    id: "informe_id",
    header: "N° de informes",
    cell: (item) => item.informe_id,
    sortingField: "informes.length",
    minWidth: 150,
  },
  {
    id: "fecha_envio",
    header: "Fecha de envío",
    cell: (item) => item.fecha_envio,
    sortingField: "fecha_envio",
    minWidth: 150,
  },
  {
    id: "fecha_registro_dgitt",
    header: "Fecha de registro DGITT",
    cell: (item) => item.fecha_registro_dgitt,
    sortingField: "fecha_registro_dgitt",
    minWidth: 150,
  },
  {
    id: "created_at",
    header: "Fecha de creación",
    cell: (item) => item.created_at,
    sortingField: "created_at",
    minWidth: 150,
  },
  {
    id: "updated_at",
    header: "Fecha de modificación",
    cell: (item) => item.updated_at,
    sortingField: "updated_at",
    minWidth: 150,
  },
  {
    id: "tipo_informe",
    header: "Tipo de informe",
    cell: (item) => item.tipo_informe,
    sortingField: "tipo_informe",
    minWidth: 150,
  },
  {
    id: "observaciones_investigador",
    header: "Observaciones del investigador",
    cell: (item) => item.observaciones_investigador,
    sortingField: "observaciones_investigador",
    minWidth: 250,
  },
  {
    id: "observaciones_admin",
    header: "Observaciones del administrador",
    cell: (item) => item.observaciones_admin,
    sortingField: "observaciones_admin",
    minWidth: 250,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
    minWidth: 250,
  },
  {
    id: "deuda",
    header: "Deuda",
    cell: (item) => (
      <Badge color={item.deuda == "Sí" || item.deuda == "SI" ? "red" : "green"}>
        {item.deuda}
      </Badge>
    ),
    sortingField: "deuda",
    minWidth: 150,
  },
  {
    id: "tipo_deuda",
    header: "Tipo de deuda",
    cell: (item) => item.tipo_deuda,
    sortingField: "tipo_deuda",
    minWidth: 150,
  },
  {
    id: "cantidad_informes",
    header: "N° informes",
    cell: (item) => item.cantidad_informes,
    sortingField: "cantidad_informes",
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: 200,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 150,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "No tiene informe"
            ? "grey"
            : item.estado == "En proceso"
            ? "blue"
            : item.estado == "Aprobado"
            ? "green"
            : item.estado == "Presentado"
            ? "blue"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
    minWidth: 120,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "deuda", visible: true },
  { id: "tipo_deuda", visible: true },
  { id: "cantidad_informes", visible: true },
  { id: "responsable", visible: true },
  { id: "facultad", visible: true },
  { id: "periodo", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingInformes, setLoadingInformes] = useState(false);
  const [informes, setInformes] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loadingReport, setLoadingReport] = useState(false);
  const [modal, setModal] = useState("");
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
    allPageItems,
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
    sorting: {
      defaultState: { sortingColumn: columnDefinitions[0], isDescending: true },
    },
    selection: {},
  });
  const [selectedOption, setSelectedOption] = useState({
    value: "nuevos",
    label: "Nuevos (2017 en adelante)",
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/proyectosListado",
      {
        params: {
          lista: selectedOption.value,
        },
      }
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const getInformes = async () => {
    setLoadingInformes(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/informes",
      {
        params: {
          proyecto_id: collectionProps.selectedItems[0]?.id,
          tabla: selectedOption.value,
        },
      }
    );
    const data = res.data;
    setInformes(data);
    setLoadingInformes(false);
  };

  const reporteExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const filteredItems = allPageItems.map((item) => ({ ...item }));

      setLoadingReport(true);
      const res = await axiosBase.post(
        "admin/estudios/informesTecnicos/excel",
        filteredItems,
        {
          responseType: "blob",
        }
      );
      const blob = await res.data;
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setLoadingReport(false);
    }
  };

  //  Effects
  useEffect(() => {
    setInformes([]);
    getData();
  }, [selectedOption]);

  useEffect(() => {
    if (collectionProps.selectedItems.length > 0) {
      getInformes();
    }
  }, [collectionProps.selectedItems]);

  return (
    <SpaceBetween size="l">
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        enableKeyboardNavigation
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        wrapLines
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="m">
                <FormField label="Reporte" stretch>
                  <Button
                    disabled={loading}
                    loading={loadingReport}
                    onClick={reporteExcel}
                  >
                    Excel
                  </Button>
                </FormField>

                <FormField label="Proyectos" stretch>
                  <Select
                    disabled={loading}
                    expandToViewport
                    selectedOption={selectedOption}
                    onChange={({ detail }) => {
                      setSelectedOption(detail.selectedOption);
                      setSelectedItems([]);
                    }}
                    options={[
                      { value: "nuevos", label: "Nuevos (2017 en adelante)" },
                      {
                        value: "antiguos",
                        label: "Antiguos (2016 y anteriores)",
                      },
                    ]}
                  />
                </FormField>
              </SpaceBetween>
            }
          >
            Listado de proyectos
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar grupo"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
            virtualScroll
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
      <Table
        columnDefinitions={[
          {
            id: "id",
            header: "Id",
            cell: (item) => item.id,
          },
          {
            id: "informe",
            header: "Informe",
            cell: (item) => item.informe,
            minWidth: 120,
          },
          {
            id: "fecha_envio",
            header: "Fecha de envío",
            cell: (item) => item.fecha_envio,
            minWidth: 120,
          },
          {
            id: "estado",
            header: "Estado",
            cell: (item) => (
              <Badge
                color={
                  item.estado == 1
                    ? "green"
                    : item.estado == 2
                    ? "blue"
                    : item.estado == 3
                    ? "red"
                    : "grey"
                }
              >
                {item.estado == 1
                  ? "Aprobado"
                  : item.estado == 2
                  ? "Presentado"
                  : item.estado == 3
                  ? "Observado"
                  : "En proceso"}
              </Badge>
            ),
            minWidth: 120,
          },
          {
            id: "created_at",
            header: "Fecha de creación",
            cell: (item) => item.created_at,
            minWidth: 120,
          },
          {
            id: "updated_at",
            header: "Fecha de actualización",
            cell: (item) => item.updated_at,
            minWidth: 120,
          },
        ]}
        columnDisplay={[
          { id: "id", visible: true },
          { id: "informe", visible: true },
          { id: "fecha_envio", visible: true },
          { id: "estado", visible: true },
          { id: "created_at", visible: true },
          { id: "updated_at", visible: true },
        ]}
        enableKeyboardNavigation
        items={informes}
        loadingText="Cargando datos"
        loading={loadingInformes}
        wrapLines
        selectionType="single"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        onRowClick={({ detail }) => setSelectedItems([detail.item])}
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  disabled={
                    selectedOption.value != "antiguos" ||
                    !collectionProps.selectedItems.length
                  }
                  onClick={() => {
                    const query = queryString.stringify({
                      proyecto_id: collectionProps.selectedItems[0]["id"],
                      tipo_proyecto:
                        collectionProps.selectedItems[0].tipo_proyecto,
                    });
                    window.open(
                      "informes_tecnicos/presentarAntiguo?" + query,
                      "_blank"
                    );
                  }}
                >
                  Presentar informe
                </Button>
                <ButtonDropdown
                  items={[
                    {
                      id: "action_3_1",
                      text: "Auditoría",
                    },
                    {
                      id: "action_3_2",
                      text: "Eliminar",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_3_1") {
                      setModal("audit");
                    } else if (detail.id == "action_3_2") {
                      setModal("delete");
                    }
                  }}
                  disabled={!selectedItems.length}
                >
                  Acciones
                </ButtonDropdown>
                <Button
                  variant="primary"
                  disabled={selectedItems.length == 0}
                  onClick={() => {
                    const query = queryString.stringify({
                      id: selectedItems[0]["id"],
                      tipo_proyecto:
                        collectionProps.selectedItems[0].tipo_proyecto,
                      tipo_informe: selectedItems[0]["informe"],
                    });
                    if (selectedOption.value == "nuevos") {
                      window.open(
                        "informes_tecnicos/detalle?" + query,
                        "_blank"
                      );
                    }
                    if (selectedOption.value == "antiguos") {
                      window.open(
                        "informes_tecnicos/detalleAntiguo?" + query,
                        "_blank"
                      );
                    }
                  }}
                >
                  Editar informe
                </Button>
              </SpaceBetween>
            }
          >
            Informes
          </Header>
        }
      />
      {modal == "audit" ? (
        <ModalAudit close={() => setModal("")} id={selectedItems[0].id} />
      ) : (
        modal == "delete" && (
          <ModalEliminarInforme
            id={selectedItems[0].id}
            tabla={selectedOption.value}
            close={() => setModal("")}
            reload={getData}
          />
        )
      )}
    </SpaceBetween>
  );
};
