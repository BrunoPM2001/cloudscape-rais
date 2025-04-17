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
  Alert,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalIncluirExterno from "../components/modalIncluirExterno";
import ModalIncluirEstudiante from "../components/modalIncluirEstudiante";
import ModalIncluirEgresado from "../components/modalIncluirEgresado";
import ModalExcluirMiembro from "../components/modalExcluirMiembro";
import ModalInformacionMiembro from "../components/modalInformacionMiembro";
import axiosBase from "../../../../../../api/axios";

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
    id: "cargo",
    header: "Cargo",
    cell: (item) => item.cargo,
    sortingField: "cargo",
    minWidth: 150,
  },
  {
    id: "condicion",
    header: "Condicion",
    cell: (item) => item.condicion,
    sortingField: "condicion",
    minWidth: 150,
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
    minWidth: 300,
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
    minWidth: 150,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
    minWidth: 200,
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
  { id: "cargo", visible: true },
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
  const [coordinador, setCoordinador] = useState(null);
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
    const res = await axiosBase.get("investigador/grupo/listarMiembros", {
      params: {
        grupo_id: id,
        estado: tipoMiembros.value,
      },
    });
    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);

    //  Filtro de data
    const result = data.data.some(
      (item) =>
        item.cargo == "Coordinador" &&
        item.nombres == localStorage.getItem("User")
    );
    console.log(data.data);
    setCoordinador(result ? true : false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, [tipoMiembros]);

  return (
    <SpaceBetween size="l">
      {!coordinador && !loading && (
        <Alert header="Información Importante">
          LOS GRUPOS DE INVESTIGACION DE LA UNIVERSIDAD NACIONAL MAYOR DE SAN
          MARCOS" (RR.N° 014914-2024-R/UNMSM) en su subtítulo VII. Aspectos
          específicos en su punto 3 La inclusión o exclusión de miembros del GI.
          Inciso a , c y d, especifica que la inclusión debe ser solicitado por
          el Coordinador del GI
        </Alert>
      )}
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
                  disabled={
                    loading ||
                    !collectionProps.selectedItems ||
                    grupo_estado < 0 ||
                    !coordinador
                  }
                  expandableGroups
                  items={[
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
                    if (detail.id == "action_1_2_1") {
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
                    loading ||
                    !collectionProps.selectedItems.length ||
                    grupo_estado < 0 ||
                    !coordinador
                  }
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
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      setModal("Excluir");
                    } else if (detail.id == "action_2_2") {
                      setModal("Visualizar");
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
      {modal == "Externo" ? (
        <ModalIncluirExterno close={() => setModal("")} reload={getData} />
      ) : modal == "Estudiante" ? (
        <ModalIncluirEstudiante close={() => setModal("")} reload={getData} />
      ) : modal == "Egresado" ? (
        <ModalIncluirEgresado close={() => setModal("")} reload={getData} />
      ) : modal == "Excluir" ? (
        <ModalExcluirMiembro
          close={() => setModal("")}
          reload={getData}
          item={collectionProps.selectedItems[0]}
        />
      ) : (
        modal == "Visualizar" && (
          <ModalInformacionMiembro
            close={() => setModal("")}
            id={collectionProps.selectedItems[0].id}
          />
        )
      )}
    </SpaceBetween>
  );
};
