import {
  Box,
  Button,
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
  // {
  //   id: "user_create",
  //   header: "Creada por",
  //   cell: (item) => item.user_create,
  //   sortingField: "user_create",
  // },
  // {
  //   id: "user_edit",
  //   header: "Editada por",
  //   cell: (item) => item.user_edit,
  //   sortingField: "user_edit",
  // },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "comentario", visible: true },
  { id: "documento", visible: true },
  // { id: "user_create", visible: true },
  // { id: "user_edit", visible: true },
];

export default function Licencias_investigador() {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const { items, collectionProps, paginationProps } = useCollection(
    distributions,
    {
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );
  const [addVisible, setAddVisible] = useState(false);

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
                  {/* <Button variant="normal">Editar</Button> */}
                  <Button variant="primary" onClick={() => setAddVisible(true)}>
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
      {addVisible && (
        <ModalAdd
          visible={addVisible}
          setVisible={setAddVisible}
          id={investigador_id}
          reload={getData}
        />
      )}
    </BaseLayout>
  );
}
