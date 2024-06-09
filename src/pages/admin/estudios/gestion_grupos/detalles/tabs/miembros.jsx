import {
  Table,
  Box,
  SpaceBetween,
  PropertyFilter,
  Header,
  ButtonDropdown,
  Pagination,
  FormField,
  Select,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosBase from "../../../../../../api/axios";
import ModalIncluirTitular from "../components/modalIncluirTitular";
import ModalIncluirExterno from "../components/modalIncluirExterno";
import ModalIncluirEstudiante from "../components/modalIncluirEstudiante";
import ModalIncluirEgresado from "../components/modalIncluirEgresado";
import ModalExcluirMiembro from "../components/modalExcluirMiembro";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Condicion",
    key: "condicion",
    groupValuesLabel: "Condiciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Número de documento",
    key: "doc_numero",
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

const columnDefinitions = [
  {
    id: "condicion",
    header: "Condicion",
    cell: (item) => item.condicion,
    sortingField: "condicion",
    isRowHeader: true,
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
];

const columnDisplay = [
  { id: "condicion", visible: true },
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
];

export default ({ grupo_estado }) => {
  //  Data state
  const [incluirVisible, setIncluirVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [distributions, setDistribution] = useState([]);
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
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  const [enableBtn, setEnableBtn] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [tipoMiembros, setTipoMiembros] = useState({
    label: "Integrantes",
    value: 1,
  });

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase(
      "admin/estudios/grupos/miembros/" + id + "/" + tipoMiembros.value
    );
    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, [tipoMiembros]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [selectedItems]);

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
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => item.name,
        }}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar miembro"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
            customControl={
              <FormField label="Tipo">
                <Select
                  disabled={loading}
                  expandToViewport
                  selectedOption={tipoMiembros}
                  onChange={({ detail }) =>
                    setTipoMiembros(detail.selectedOption)
                  }
                  options={[
                    { label: "Integrantes", value: 1 },
                    { label: "Ex integrantes", value: 0 },
                  ]}
                />
              </FormField>
            }
          />
        }
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={loading || grupo_estado < 0}
                  expandableGroups
                  items={[
                    {
                      id: "action_1_1",
                      text: "Incluir titular UNMSM",
                    },
                    {
                      id: "action_1_2",
                      text: "Incluir adherente",
                      items: [
                        {
                          id: "action_1_2_1",
                          text: "Externo",
                        },
                        {
                          id: "action_1_2_2",
                          text: "Estudiante UNMSM",
                        },
                        {
                          id: "action_1_2_3",
                          text: "Egresado UNMSM",
                        },
                      ],
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      setIncluirVisible(true);
                      setTypeModal("Titular");
                    } else if (detail.id == "action_1_2_1") {
                      setIncluirVisible(true);
                      setTypeModal("Externo");
                    } else if (detail.id == "action_1_2_2") {
                      setIncluirVisible(true);
                      setTypeModal("Estudiante");
                    } else if (detail.id == "action_1_2_3") {
                      setIncluirVisible(true);
                      setTypeModal("Egresado");
                    }
                  }}
                >
                  Acciones para el grupo
                </ButtonDropdown>
                <ButtonDropdown
                  disabled={!enableBtn || grupo_estado < 0}
                  variant="primary"
                  items={[
                    {
                      text: "Excluir",
                      id: "action_2_1",
                      disabled: false,
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      setIncluirVisible(true);
                      setTypeModal("Excluir");
                    }
                  }}
                >
                  Acciones para miembros
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Miembros del grupo
          </Header>
        }
        pagination={<Pagination {...paginationProps} />}
      />
      {incluirVisible &&
        (typeModal == "Titular" ? (
          <ModalIncluirTitular
            visible={incluirVisible}
            setVisible={setIncluirVisible}
            reload={getData}
          />
        ) : typeModal == "Externo" ? (
          <ModalIncluirExterno
            visible={incluirVisible}
            setVisible={setIncluirVisible}
            reload={getData}
          />
        ) : typeModal == "Estudiante" ? (
          <ModalIncluirEstudiante
            visible={incluirVisible}
            setVisible={setIncluirVisible}
            reload={getData}
          />
        ) : typeModal == "Egresado" ? (
          <ModalIncluirEgresado
            visible={incluirVisible}
            setVisible={setIncluirVisible}
            reload={getData}
          />
        ) : (
          <ModalExcluirMiembro
            visible={incluirVisible}
            setVisible={setIncluirVisible}
            reload={getData}
            item={selectedItems}
          />
        ))}
    </>
  );
};
