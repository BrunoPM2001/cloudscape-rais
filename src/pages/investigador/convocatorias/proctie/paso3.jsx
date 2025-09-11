import {
  Box,
  Button,
  ButtonDropdown,
  Container,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddEstudiante from "./components/modals/modalAddEstudiante";
import ModalAddEstudiante_externo from "./components/modals/modalAddEstudiante_externo";
import ModalAddAdherente from "./components/modals/modalAddAdherente";
import ModalDeleteEstudiante from "./components/modals/modalDeleteEstudiante";

const CANTIDAD_MINIMA = 2;

const columnDefinitions = [
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
  },
  {
    id: "tipo_integrante",
    header: "Tipo de integrante",
    cell: (item) => item.tipo_integrante,
  },
  {
    id: "nombre",
    header: "Nombre",
    cell: (item) => item.nombre,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
  },
  {
    id: "url",
    header: "Carta de compromiso",
    cell: (item) => (
      <Button
        variant="inline-icon"
        href={item.url}
        target="_blank"
        iconName="file"
      />
    ),
  },
];

const columnDisplay = [
  { id: "condicion", visible: true },
  { id: "tipo_integrante", visible: true },
  { id: "nombre", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "url", visible: true },
];

export default function ({ proyecto_id, setRequisitos, loading, setLoading }) {
  //  State
  const [distributions, setDistribution] = useState([]);
  const [typeModal, setTypeModal] = useState("");

  //  Hooks
  const { items, collectionProps, paginationProps, actions } = useCollection(
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
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/listarIntegrantes",
      {
        params: {
          proyecto_id: proyecto_id,
        },
      }
    );
    const data = res.data;
    setRequisitos(
      CANTIDAD_MINIMA <=
        data.filter((item) => item.condicion == "Colaborador").length
        ? true
        : false
    );
    setDistribution(data);
    setLoading(false);
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
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
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        variant="embedded"
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={
                    collectionProps.selectedItems.length > 0 ? false : true
                  }
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_2") {
                      setTypeModal("delete");
                      setVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Eliminar",
                      id: "action_1_2",
                      disabled:
                        collectionProps.selectedItems[0]?.tipo_integrante ==
                        "Asesor",
                    },
                  ]}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      setTypeModal("add_estudiante");
                    } else if (detail.id == "action_2_2") {
                      setTypeModal("add_estudiante_externo");
                    } else if (detail.id == "action_2_3") {
                      setTypeModal("add_adherente");
                    }
                  }}
                  items={[
                    {
                      text: "Estudiante",
                      id: "action_2_1",
                    },
                    {
                      text: "Estudiante externo",
                      id: "action_2_2",
                    },
                    {
                      text: "Adherente",
                      id: "action_2_3",
                    },
                  ]}
                >
                  Agregar integrante
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Integrantes del proyecto
          </Header>
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
      {typeModal == "add_estudiante" ? (
        <ModalAddEstudiante
          id={proyecto_id}
          close={() => setTypeModal("")}
          reload={getData}
        />
      ) : typeModal == "add_estudiante_externo" ? (
        <ModalAddEstudiante_externo
          id={proyecto_id}
          close={() => setTypeModal("")}
          reload={getData}
        />
      ) : typeModal == "add_adherente" ? (
        <ModalAddAdherente
          id={proyecto_id}
          close={() => setTypeModal("")}
          reload={getData}
        />
      ) : (
        typeModal == "delete" && (
          <ModalDeleteEstudiante
            id={collectionProps.selectedItems[0].id}
            close={() => setTypeModal("")}
            reload={getData}
          />
        )
      )}
    </Container>
  );
}
