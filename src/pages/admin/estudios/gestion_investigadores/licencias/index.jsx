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
import BaseLayout from "../../../components/baseLayout";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAdd from "./components/modalAdd";
import ModalUpdate from "./components/modalUpdate";
import ModalDelete from "./components/modalDelete";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de investigadores",
    href: "/admin/estudios/gestion_investigadores",
  },
  {
    text: "Licencias",
  },
];

const columnDefinitions = [
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
    sortingField: "fecha_inicio",
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
  },
  {
    id: "comentario",
    header: "Comentario",
    cell: (item) => item.comentario,
    sortingField: "comentario",
  },
  {
    id: "documento",
    header: "Documento",
    cell: (item) => item.documento,
    sortingField: "documento",
  },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "comentario", visible: true },
  { id: "documento", visible: true },
];

export default function Licencias_investigador() {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
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

  //  Url
  const location = useLocation();
  const { investigador_id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/investigadores/getLicencias",
      {
        params: {
          investigador_id: investigador_id,
        },
      }
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Licencias de investigador:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
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
                      collectionProps.selectedItems.length == 0 ? true : false
                    }
                    onItemClick={({ detail }) => {
                      if (detail.id == "action_1") {
                        setVisible(true);
                        setTypeModal("update");
                      } else if (detail.id == "action_2") {
                        setVisible(true);
                        setTypeModal("delete");
                      }
                    }}
                    items={[
                      {
                        text: "Editar",
                        id: "action_1",
                        disabled: false,
                      },
                      {
                        text: "Eliminar",
                        id: "action_2",
                        disabled: false,
                      },
                    ]}
                  >
                    Acciones para licencia
                  </ButtonDropdown>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setVisible(true);
                      setTypeModal("add");
                    }}
                  >
                    Agregar
                  </Button>
                </SpaceBetween>
              }
            >
              Licencias del investigador
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
      </Container>
      {visible &&
        (typeModal == "add" ? (
          <ModalAdd
            visible={visible}
            setVisible={setVisible}
            id={investigador_id}
            reload={getData}
          />
        ) : typeModal == "update" ? (
          <ModalUpdate
            visible={visible}
            setVisible={setVisible}
            item={collectionProps.selectedItems[0]}
            reload={getData}
          />
        ) : (
          <ModalDelete
            visible={visible}
            setVisible={setVisible}
            id={collectionProps.selectedItems[0].id}
            reload={getData}
          />
        ))}
    </BaseLayout>
  );
}
