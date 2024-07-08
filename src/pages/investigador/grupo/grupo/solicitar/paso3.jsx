import {
  Alert,
  Box,
  ButtonDropdown,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalIncluirTitular from "./components/modalIncluirTitular";
import ModalIncluirExterno from "./components/modalIncluirExterno";
import ModalIncluirEstudiante from "./components/modalIncluirEstudiante";
import ModalIncluirEgresado from "./components/modalIncluirEgresado";

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
];

export default function ({ requisitos, loading, setLoading }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [grupo_id, setGrupo_id] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [distributions, setDistribution] = useState([]);
  const { items, collectionProps, paginationProps } = useCollection(
    distributions,
    {
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/dataPaso3");
    const data = res.data;
    if (data?.message == "error") {
      pushNotification(data.detail, data.message, notifications.length + 1);
    } else {
      setDistribution(data.integrantes);
      setGrupo_id(data.grupo_id);
      setLoading(false);
    }
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  return (
    <SpaceBetween size="m">
      {requisitos && (
        <Alert
          type="warning"
          header="Su grupo debe cumplir con los siguientes requisitos"
        >
          <li>3 investigadores titulares</li>
          <li>1 adherente externo</li>
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
        resizableColumns
        enableKeyboardNavigation
        selectionType="single"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={loading < 0}
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
                      setTypeModal("Titular");
                    } else if (detail.id == "action_1_2_1") {
                      setTypeModal("Externo");
                    } else if (detail.id == "action_1_2_2") {
                      setTypeModal("Estudiante");
                    } else if (detail.id == "action_1_2_3") {
                      setTypeModal("Egresado");
                    }
                  }}
                >
                  Acciones para el grupo
                </ButtonDropdown>
                <ButtonDropdown
                  disabled={collectionProps.selectedItems.length == 0}
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
                      text: "Cambiar condición",
                      id: "action_2_3",
                      disabled: false,
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
                    if (detail.id == "action_2_1") {
                      setTypeModal("Excluir");
                    } else if (detail.id == "action_2_2") {
                      setTypeModal("Visualizar");
                    } else if (detail.id == "action_2_3") {
                      setTypeModal("Condicion");
                    } else if (detail.id == "action_2_4") {
                      setTypeModal("Cargo");
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
      {typeModal == "Titular" ? (
        <ModalIncluirTitular
          close={() => setTypeModal("")}
          reload={getData}
          grupo_id={grupo_id}
        />
      ) : typeModal == "Externo" ? (
        <ModalIncluirExterno
          close={() => setTypeModal("")}
          reload={getData}
          grupo_id={grupo_id}
        />
      ) : typeModal == "Estudiante" ? (
        <ModalIncluirEstudiante
          close={() => setTypeModal("")}
          reload={getData}
          grupo_id={grupo_id}
        />
      ) : typeModal == "Egresado" ? (
        <ModalIncluirEgresado
          close={() => setTypeModal("")}
          reload={getData}
          grupo_id={grupo_id}
        />
      ) : (
        <></>
      )}
    </SpaceBetween>
  );
}
