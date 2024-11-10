import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
  Button,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosBase from "../../../../../../api/axios";
import ModalAgregarLab from "../components/modalAgregarLab";

export default () => {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState("");

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/laboratorios", {
      params: {
        grupo_id: id,
      },
    });
    const data = res.data;
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table
        columnDefinitions={[
          {
            id: "codigo",
            header: "Código",
            cell: (item) => <Link href="#">{item.codigo}</Link>,
          },
          {
            id: "laboratorio",
            header: "Laboratorio",
            cell: (item) => item.laboratorio,
          },
          {
            id: "ubicacion",
            header: "Ubicación",
            cell: (item) => item.ubicacion,
          },
          {
            id: "responsable",
            header: "Responsable",
            cell: (item) => item.responsable,
          },
        ]}
        columnDisplay={[
          { id: "codigo", visible: true },
          { id: "laboratorio", visible: true },
          { id: "ubicacion", visible: true },
          { id: "responsable", visible: true },
        ]}
        enableKeyboardNavigation
        items={items}
        loadingText="Cargando datos"
        loading={loading}
        wrapLines
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            actions={
              <Button
                disabled={loading}
                variant="primary"
                onClick={() => setModal("add")}
              >
                Agregar
              </Button>
            }
          >
            Laboratorios
          </Header>
        }
      />
      {modal == "add" && (
        <ModalAgregarLab
          close={() => setModal("")}
          grupo_id={id}
          reload={getData}
        />
      )}
    </>
  );
};
