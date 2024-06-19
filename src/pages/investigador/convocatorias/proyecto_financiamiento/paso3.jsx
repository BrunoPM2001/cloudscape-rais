import {
  Box,
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
import ModalDeleteEstudiante from "./components/modals/modalDeleteEstudiante";

const columnDefinitions = [
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
    cell: (item) => item.url,
  },
];

const columnDisplay = [
  { id: "tipo_integrante", visible: true },
  { id: "nombre", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "carta", visible: true },
];

export default function ({ proyecto_id }) {
  //  State
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  //  Hooks
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
    const res = await axiosBase.get(
      "investigador/convocatorias/listarIntegrantes",
      {
        params: {
          proyecto_id: proyecto_id,
        },
      }
    );
    const data = res.data;
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
                      setVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Estudiante",
                      id: "action_2_1",
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
      {visible && typeModal == "add_estudiante" && (
        <ModalAddEstudiante
          id={proyecto_id}
          visible={visible}
          setVisible={setVisible}
          reload={getData}
        />
      )}
      {visible && typeModal == "delete" && (
        <ModalDeleteEstudiante
          id={collectionProps.selectedItems[0].id}
          visible={visible}
          setVisible={setVisible}
          reload={getData}
        />
      )}
    </Container>
  );
}
