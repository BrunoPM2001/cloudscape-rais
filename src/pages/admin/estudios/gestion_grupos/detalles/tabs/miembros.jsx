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
  Link,
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
import ModalInformacionMiembro from "../components/modalInformacionMiembro";
import ModalCambiarCargo from "../components/modalCambiarCargo";
import ModalCambiarCondicion from "../components/modalCambiarCondicion";
import ModalEditarTitular from "../components/modalEditarTitular";
import ModalEditarAdherenteInterno from "../components/modalEditarAdherenteInterno";
import ModalEditarAdherenteExterno from "../components/modalEditarAdherenteExterno";

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
    minWidth: 150,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
    minWidth: 220,
  },
  {
    id: "codigo_orcid",
    header: "Código orcid",
    cell: (item) => (
      <Link href={`https://orcid.org/${item.codigo_orcid}`} target="_blank">
        {item.codigo_orcid}
      </Link>
    ),
    sortingField: "codigo_orcid",
    minWidth: 200,
  },
  {
    id: "google_scholar",
    header: "Google Scholar",
    cell: (item) => (
      <Link href={item.google_scholar} target="_blank">
        {item.google_scholar}
      </Link>
    ),
    sortingField: "google_scholar",
    minWidth: 200,
  },
  {
    id: "cti_vitae",
    header: "CTI Vitae",
    cell: (item) => (
      <Link
        href={`https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=${item.cti_vitae}`}
        target="_blank"
      >
        {item.cti_vitae}
      </Link>
    ),
    sortingField: "cti_vitae",
    minWidth: 120,
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
    minWidth: 150,
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
];

export default ({ grupo_estado }) => {
  //  Data state
  const [loading, setLoading] = useState(true);
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
    sorting: {},
    selection: {},
  });
  const [modal, setModal] = useState("");
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
        enableKeyboardNavigation
        selectionType="single"
        wrapLines
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
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
                      setModal("Titular");
                    } else if (detail.id == "action_1_2_1") {
                      setModal("Externo");
                    } else if (detail.id == "action_1_2_2") {
                      setModal("Estudiante");
                    } else if (detail.id == "action_1_2_3") {
                      setModal("Egresado");
                    }
                  }}
                >
                  Acciones para el grupo
                </ButtonDropdown>
                <ButtonDropdown
                  disabled={
                    collectionProps.selectedItems.length == 0 ||
                    grupo_estado < 0
                  }
                  variant="primary"
                  items={[
                    {
                      text: "Editar",
                      id: "action_2_0",
                    },
                    {
                      text: "Excluir",
                      id: "action_2_1",
                      disabled:
                        collectionProps.selectedItems[0]?.cargo ==
                          "Coordinador" ||
                        collectionProps.selectedItems[0]?.condicion.startsWith(
                          "Ex"
                        ),
                    },
                    {
                      text: "Visualizar",
                      id: "action_2_2",
                      disabled: false,
                    },
                    {
                      text: "Cambiar condición",
                      id: "action_2_3",
                      disabled:
                        collectionProps.selectedItems[0]?.condicion.startsWith(
                          "Ex"
                        ),
                    },
                    {
                      text: "Cambiar cargo",
                      id: "action_2_4",
                      disabled:
                        collectionProps.selectedItems[0]?.condicion != "Titular"
                          ? true
                          : false,
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_0") {
                      setModal("Editar");
                    } else if (detail.id == "action_2_1") {
                      setModal("Excluir");
                    } else if (detail.id == "action_2_2") {
                      setModal("Visualizar");
                    } else if (detail.id == "action_2_3") {
                      setModal("Condicion");
                    } else if (detail.id == "action_2_4") {
                      setModal("Cargo");
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
      {modal == "Titular" ? (
        <ModalIncluirTitular close={() => setModal("")} reload={getData} />
      ) : modal == "Externo" ? (
        <ModalIncluirExterno close={() => setModal("")} reload={getData} />
      ) : modal == "Estudiante" ? (
        <ModalIncluirEstudiante close={() => setModal("")} reload={getData} />
      ) : modal == "Egresado" ? (
        <ModalIncluirEgresado close={() => setModal("")} reload={getData} />
      ) : modal == "Excluir" ? (
        <ModalExcluirMiembro
          close={() => setModal("")}
          reload={getData}
          item={collectionProps.selectedItems}
        />
      ) : modal == "Visualizar" ? (
        <ModalInformacionMiembro
          close={() => setModal("")}
          id={collectionProps.selectedItems[0].id}
          tipo={collectionProps.selectedItems[0].condicion}
        />
      ) : modal == "Condicion" ? (
        <ModalCambiarCondicion
          close={() => setModal("")}
          reload={getData}
          id={collectionProps.selectedItems[0].id}
          current={collectionProps.selectedItems[0].condicion}
          nombres={collectionProps.selectedItems[0].nombres}
        />
      ) : modal == "Cargo" ? (
        <ModalCambiarCargo
          close={() => setModal("")}
          reload={getData}
          id={collectionProps.selectedItems[0].id}
          current={collectionProps.selectedItems[0].cargo}
          nombres={collectionProps.selectedItems[0].nombres}
        />
      ) : modal == "Editar" ? (
        <>
          {collectionProps.selectedItems[0].condicion == "Titular" ? (
            <ModalEditarTitular
              close={() => setModal("")}
              id={collectionProps.selectedItems[0].id}
            />
          ) : collectionProps.selectedItems[0].condicion == "Adherente" &&
            collectionProps.selectedItems[0].tipo != "Externo" ? (
            <ModalEditarAdherenteInterno
              close={() => setModal("")}
              id={collectionProps.selectedItems[0].id}
            />
          ) : (
            <ModalEditarAdherenteExterno
              close={() => setModal("")}
              id={collectionProps.selectedItems[0].id}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
