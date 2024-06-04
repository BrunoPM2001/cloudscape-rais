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
import axiosBase from "../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalRegistrado from "./components/modalRegistrado";
import ModalNoRegistrado from "./components/modalNoRegistrado";

const columnDefinitions = [
  {
    id: "presentado",
    header: "Presentado",
    cell: (item) => item.presentado,
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.categoria,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "filiacion",
    header: "Filiación",
    cell: (item) => item.filiacion,
  },
];

const columnDisplay = [
  { id: "presentado", visible: true },
  { id: "categoria", visible: true },
  { id: "nombres", visible: true },
  { id: "tipo", visible: true },
  { id: "filiacion", visible: true },
];

export default function () {
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

  //  Url
  const location = useLocation();
  const { publicacion_id } = queryString.parse(location.search);

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/listarAutores",
      {
        params: {
          publicacion_id: publicacion_id,
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
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      setTypeModal("registrado");
                      setVisible(true);
                    } else if (detail.id == "action_1_2") {
                      setTypeModal("no_registrado");
                      setVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Editar",
                      id: "action_1_1",
                    },
                    {
                      text: "Eliminar",
                      id: "action_1_2",
                    },
                    {
                      text: "Externo",
                      id: "action_2",
                    },
                  ]}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setTypeModal("registrado");
                      setVisible(true);
                    } else if (detail.id == "action_2") {
                      setTypeModal("no_registrado");
                      setVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Docente",
                      id: "action_1",
                    },
                    {
                      text: "Estudiante",
                      id: "action_2",
                    },
                    {
                      text: "Externo",
                      id: "action_2",
                    },
                  ]}
                >
                  Agregar autor
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Autores de la publicación
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
      {visible && typeModal == "registrado" && (
        <ModalRegistrado
          id={publicacion_id}
          reload={getData}
          setVisible={setVisible}
          visible={visible}
        />
      )}
      {visible && typeModal == "no_registrado" && (
        <ModalNoRegistrado
          id={publicacion_id}
          reload={getData}
          setVisible={setVisible}
          visible={visible}
        />
      )}
    </Container>
  );
}
