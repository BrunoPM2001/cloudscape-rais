import {
  Autosuggest,
  Badge,
  Box,
  ButtonDropdown,
  FormField,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  CollectionPreferences,
  Button,
  Link,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import queryString from "query-string";
import ModalAudit from "../components/modalAudit";
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
    propertyLabel: "Año de publicación",
    key: "periodo",
    groupValuesLabel: "Años",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código de registro",
    key: "codigo_registro",
    groupValuesLabel: "Códigos de registro",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de patente",
    key: "tipo_patente",
    groupValuesLabel: "Tipos de patente",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Área",
    key: "area",
    groupValuesLabel: "Áreas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Isbn",
    key: "isbn",
    groupValuesLabel: "Isbns",
    operators: stringOperators,
  },
  {
    propertyLabel: "Issn",
    key: "issn",
    groupValuesLabel: "Issns",
    operators: stringOperators,
  },
  {
    propertyLabel: "Revista",
    key: "revista",
    groupValuesLabel: "Revistas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Editorial",
    key: "editorial",
    groupValuesLabel: "Editoriales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre de evento",
    key: "evento_nombre",
    groupValuesLabel: "Nombres de eventos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Presentador",
    key: "presentador",
    groupValuesLabel: "Presentadores",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Doi",
    key: "doi",
    groupValuesLabel: "Doi",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de publicación",
    key: "fecha_publicacion",
    groupValuesLabel: "Fechas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de creación",
    key: "created_at",
    groupValuesLabel: "Fechas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de actualización",
    key: "updated_at",
    groupValuesLabel: "Fechas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Procedencia",
    key: "procedencia",
    groupValuesLabel: "Procedencias",
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
    maxWidth: 100,
  },
  {
    id: "codigo_registro",
    header: "Código de registro",
    cell: (item) => item.codigo_registro,
    sortingField: "codigo_registro",
    minWidth: 130,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
    minWidth: 120,
  },
  {
    id: "tipo_patente",
    header: "Tipo de patente",
    cell: (item) => item.tipo_patente,
    sortingField: "tipo_patente",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    minWidth: 400,
    sortingField: "titulo",
  },
  {
    id: "presentador",
    header: "Presentador",
    cell: (item) => item.presentador,
    minWidth: 200,
    sortingField: "presentador",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    minWidth: 200,
    sortingField: "facultad",
  },
  {
    id: "area",
    header: "Área",
    cell: (item) => item.area,
    minWidth: 200,
    sortingField: "area",
  },
  {
    id: "doi",
    header: "DOI",
    cell: (item) => item.doi,
    minWidth: 200,
    sortingField: "doi",
  },
  {
    id: "url",
    header: "Url",
    cell: (item) => (
      <Link href={item.url} target="_blank">
        {item.url}
      </Link>
    ),
    minWidth: 200,
    sortingField: "url",
  },
  {
    id: "isbn",
    header: "Isbn",
    cell: (item) => item.isbn,
    sortingField: "isbn",
  },
  {
    id: "issn",
    header: "Issn",
    cell: (item) => item.issn,
    sortingField: "issn",
  },
  {
    id: "revista",
    header: "Revista",
    cell: (item) => item.revista,
    sortingField: "revista",
  },
  {
    id: "editorial",
    header: "Editorial",
    cell: (item) => item.editorial,
    sortingField: "editorial",
  },
  {
    id: "evento_nombre",
    header: "Nombre de evento",
    cell: (item) => item.evento_nombre,
    sortingField: "evento_nombre",
  },
  {
    id: "fecha_publicacion",
    header: "Fecha de publicación",
    cell: (item) => item.fecha_publicacion,
    sortingField: "fecha_publicacion",
  },
  {
    id: "periodo",
    header: "Año de publicación",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "created_at",
    header: "Fecha de creación",
    cell: (item) => item.created_at,
    sortingField: "created_at",
  },
  {
    id: "updated_at",
    header: "Fecha de actualización",
    cell: (item) => item.updated_at,
    sortingField: "updated_at",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "Registrado"
            ? "green"
            : item.estado == "Observado"
            ? "red"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "severity-low"
            : item.estado == "Anulado"
            ? "red"
            : item.estado == "No registrado"
            ? "grey"
            : item.estado == "Duplicado"
            ? "red"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
  {
    id: "procedencia",
    header: "Procedencia",
    cell: (item) => item.procedencia,
    sortingField: "procedencia",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo_registro", visible: true },
  { id: "tipo", visible: true },
  { id: "tipo_patente", visible: true },
  { id: "titulo", visible: true },
  { id: "presentador", visible: true },
  { id: "facultad", visible: true },
  { id: "area", visible: true },
  { id: "doi", visible: true },
  { id: "url", visible: true },
  { id: "isbn", visible: true },
  { id: "issn", visible: true },
  { id: "revista", visible: true },
  { id: "editorial", visible: true },
  { id: "evento_nombre", visible: true },
  { id: "fecha_publicacion", visible: true },
  { id: "periodo", visible: true },
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
  { id: "estado", visible: true },
  { id: "procedencia", visible: true },
];

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [form, setForm] = useState({});
  const [distributions, setDistribution] = useState([]);
  const [type, setType] = useState("");
  const [preferences, setPreferences] = useState({
    pageSize: 10,
    contentDisplay: columnDisplay,
    stripedRows: false,
    contentDensity: "comfortable",
    stickyColumns: {
      first: 0,
      last: 0,
    },
  });

  //  Hooks
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
    pagination: { pageSize: preferences.pageSize },
    sorting: {},
    selection: {},
  });
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/admin/usuarios/searchInvestigadorBy");

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/listado", {
      params: {
        investigador_id: form.investigador_id,
      },
    });
    const data = res.data;
    setDistribution(data);
    setLoadingData(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/reporte", {
      params: {
        id: collectionProps.selectedItems[0].id,
        tipo: collectionProps.selectedItems[0].tipo_publicacion,
      },
      responseType: "blob",
    });
    setLoadingBtn(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const reporteExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const visibleColumns = preferences.contentDisplay
        .filter((item) => item.visible)
        .map((item) => item.id);
      const filteredItems = allPageItems.map((item) =>
        Object.fromEntries(
          Object.entries(item).filter(([key]) => visibleColumns.includes(key))
        )
      );

      setLoadingReport(true);
      const res = await axiosBase.post(
        "admin/estudios/publicaciones/excel",
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
    getData();
  }, []);

  useEffect(() => {
    if (Object.keys(form).length != 0) {
      getData();
    }
  }, [form]);

  return (
    <>
      <Table
        {...collectionProps}
        stickyHeader
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={preferences.contentDisplay}
        loading={loadingData}
        loadingText="Cargando datos"
        enableKeyboardNavigation
        stripedRows={preferences.stripedRows}
        contentDensity={preferences.contentDensity}
        stickyColumns={preferences.stickyColumns}
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        wrapLines
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  onClick={reporteExcel}
                  disabled={loadingData}
                  loading={loadingReport}
                >
                  Excel
                </Button>
                <ButtonDropdown
                  disabled={!collectionProps.selectedItems.length}
                  items={[
                    {
                      id: "action_1_1",
                      text: "Editar",
                      iconName: "edit",
                    },
                    {
                      id: "action_1_2",
                      text: "Reporte",
                      iconName: "file",
                    },
                    {
                      id: "action_1_3",
                      text: "Auditoría",
                      iconName: "check",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      const query = queryString.stringify({
                        id: collectionProps.selectedItems[0]["id"],
                      });
                      //  Redirigir a patentes
                      if (
                        collectionProps.selectedItems[0]["tipo"] ==
                        "Propiedad intelectual"
                      ) {
                        window.location.href =
                          "gestion_publicaciones/patente?" + query;
                      } else {
                        window.location.href =
                          "gestion_publicaciones/detalle?" + query;
                      }
                    } else if (detail.id == "action_1_2") {
                      reporte();
                    } else if (detail.id == "action_1_3") {
                      setType("audit");
                    }
                  }}
                  loading={loadingBtn}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  items={[
                    {
                      text: "Artículo de revista",
                      id: "articulo",
                      disabled: false,
                    },
                    {
                      text: "Capítulo de libro",
                      id: "capitulo",
                      disabled: false,
                    },
                    {
                      text: "Libro",
                      id: "libro",
                      disabled: false,
                    },
                    {
                      text: "Evento científico",
                      id: "evento",
                      disabled: false,
                    },
                    {
                      text: "Tesis propia",
                      id: "tesis",
                      disabled: false,
                    },
                    {
                      text: "Tesis asesoría",
                      id: "tesis-asesoria",
                      disabled: false,
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    window.location.href =
                      "gestion_publicaciones/nuevo?tipo=" + detail.id;
                  }}
                >
                  Nuevo
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Publicaciones
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar publicación"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
            virtualScroll
            customControl={
              <FormField label="Buscar por investigador" stretch>
                <Autosuggest
                  onChange={({ detail }) => {
                    setOptions([]);
                    setValue(detail.value);
                    if (detail.value == "") {
                      setForm({});
                    }
                  }}
                  onSelect={({ detail }) => {
                    if (detail.selectedOption.investigador_id != undefined) {
                      setAvoidSelect(false);
                      const { value, ...rest } = detail.selectedOption;
                      setForm(rest);
                    }
                  }}
                  value={value}
                  options={options}
                  loadingText="Cargando data"
                  placeholder="Código, dni o nombre del investigador"
                  statusType={loading ? "loading" : "finished"}
                  empty="No se encontraron resultados"
                />
              </FormField>
            }
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
        preferences={
          <CollectionPreferences
            title="Preferencias de tabla"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}
            stripedRowsPreference
            contentDensityPreference
            contentDisplayPreference={{
              options: columnDefinitions.map((item) => ({
                id: item.id,
                label: item.header,
              })),
            }}
            pageSizePreference={{
              options: [
                { value: 10, label: "10 filas" },
                { value: 20, label: "20 filas" },
                { value: 25, label: "25 filas" },
                { value: 50, label: "50 filas" },
              ],
            }}
            stickyColumnsPreference={{
              firstColumns: {
                title: "Fijar primera(s) columna(s)",
                description:
                  "Mantén visible las primeras columnas al deslizar el contenido de la tabla de forma horizontal.",
                options: [
                  { label: "Ninguna", value: 0 },
                  { label: "Primera columna", value: 1 },
                  { label: "Primeras 2 columnas", value: 2 },
                ],
              },
              lastColumns: {
                title: "Fijar última columna",
                description:
                  "Mantén visible la última columna al deslizar el contenido de la tabla de forma horizontal.",
                options: [
                  { label: "Ninguna", value: 0 },
                  { label: "Última columna", value: 1 },
                ],
              },
            }}
          />
        }
      />
      {type == "audit" && (
        <ModalAudit
          close={() => setType("")}
          item={collectionProps.selectedItems[0]}
        />
      )}
    </>
  );
};
