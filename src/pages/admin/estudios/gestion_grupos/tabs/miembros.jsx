import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import Pagination from "@cloudscape-design/components/pagination";
import { useEffect, useState } from "react";

const FILTER_PROPS = [
  {
    propertyLabel: "Condicion",
    key: "condicionF",
    groupValuesLabel: "Condiciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Cargo",
    key: "cargoF",
    groupValuesLabel: "Cargos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Número de documento",
    key: "doc_numeroF",
    groupValuesLabel: "Documentos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Orcid",
    key: "codigo_orcid",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
];

export default () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [enableBtn, setEnableBtn] = useState(false);

  //  Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/admin/estudios/grupos/miembros/257/1"
        );
        if (!res.ok) {
          setItems([]);
          setLoading(!loading);
          throw new Error("Error in fetch");
        } else {
          const data = await res.json();
          setItems(data.data);
          setLoading(!loading);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  //  Items seleccionados
  useEffect(() => {
    if (selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [selectedItems]);

  return (
    <Table
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? "item" : "items"
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) => item.name,
      }}
      columnDefinitions={[
        {
          id: "condicion",
          header: "Condicion",
          cell: (item) => item.condicion,
          sortingField: "condicion",
          isRowHeader: true,
        },
        {
          id: "cargo",
          header: "Cargo",
          cell: (item) => item.cargo,
          sortingField: "cargo",
        },
        {
          id: "doc_numero",
          header: "Documento de identidad",
          cell: (item) => item.doc_numero,
          sortingField: "doc_numero",
        },
        {
          id: "nombres",
          header: "Nombres",
          cell: (item) => item.nombres,
          sortingField: "nombres",
        },
        {
          id: "codigo_orcid",
          header: "Código orcid",
          cell: (item) => item.codigo_orcid,
          sortingField: "codigo_orcid",
        },
        {
          id: "google_scholar",
          header: "Google Scholar",
          cell: (item) => item.google_scholar,
          sortingField: "google_scholar",
        },
        {
          id: "cti_vitae",
          header: "CTI Vitae",
          cell: (item) => item.cti_vitae,
          sortingField: "cti_vitae",
        },
        {
          id: "tipo",
          header: "Tipo",
          cell: (item) => item.tipo,
          sortingField: "tipo",
        },
        {
          id: "facultad",
          header: "Facultad",
          cell: (item) => item.facultad,
          sortingField: "facultad",
        },
        {
          id: "tesista",
          header: "Tesista",
          cell: (item) => item.tesista,
          sortingField: "tesista",
        },
        {
          id: "proyectos",
          header: "Proyectos en ejecución",
          cell: (item) => item.proyectos,
          sortingField: "proyectos",
        },
        {
          id: "fecha_inclusion",
          header: "Fecha de inclusión",
          cell: (item) => item.fecha_inclusion,
          sortingField: "fecha_inclusion",
        },
        {
          id: "fecha_exclusion",
          header: "Fecha de exclusión",
          cell: (item) => item.fecha_exclusion,
          sortingField: "fecha_exclusion",
        },
      ]}
      columnDisplay={[
        { id: "condicion", visible: true },
        { id: "cargo", visible: true },
        { id: "doc_numero", visible: true },
        { id: "nombres", visible: true },
        { id: "codigo_orcid", visible: true },
        { id: "google_scholar", visible: true },
        { id: "cti_vitae", visible: true },
        { id: "tipo", visible: true },
        { id: "facultad", visible: true },
        { id: "tesista", visible: true },
        { id: "proyectos", visible: true },
        { id: "fecha_inclusion", visible: true },
        { id: "fecha_exclusion", visible: true },
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Cargando datos"
      loading={loading}
      resizableColumns
      selectionType="multi"
      trackBy="id"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      // filter={
      //   <TextFilter
      //     filteringPlaceholder="Buscar..."
      //     filteringText={searchTable}
      //     onChange={({ detail }) => setSearchTable(detail.filteringText)}
      //   />
      // }
      header={
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/" + items.length + ")"
              : "(" + items.length + ")"
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                items={[
                  {
                    text: "Incluir titular UNMSM",
                    id: "action_1_1",
                    disabled: false,
                  },
                  {
                    text: "Incluir adherente",
                    id: "action_1_2",
                    disabled: false,
                  },
                ]}
              >
                Acciones para el grupo
              </ButtonDropdown>
              <ButtonDropdown
                disabled={!enableBtn}
                variant="primary"
                items={[
                  {
                    text: "Excluir",
                    id: "action_2_1",
                    disabled: false,
                  },
                  {
                    text: "Visualizar",
                    id: "action_2_2",
                    disabled: false,
                  },
                  {
                    text: "Editar",
                    id: "action_2_3",
                    disabled: false,
                  },
                  {
                    text: "Cambiar condición",
                    id: "action_2_4",
                    disabled: false,
                  },
                  {
                    text: "Cambiar cargo",
                    id: "action_2_5",
                    disabled: false,
                  },
                ]}
              >
                Acciones para miembros
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Miembros del grupo
        </Header>
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={4} />}
    />
  );
};
