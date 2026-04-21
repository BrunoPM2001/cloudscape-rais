import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
  Button,
  ButtonDropdown,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosBase from "../../../../../../api/axios";
import ModalLineasInactivas from "../components/modalLineasInactivas";
import ModalAgregarLinea from "../components/modalAgregarLinea";
import ModalRetirarLinea from "../components/modalRetirarLinea";

export default ({ facultad_id }) => {
  //  State
  const [loading, setLoading] = useState(true);
  const [modalInactivas, setModalInactivas] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalRetirar, setModalRetirar] = useState(false);
  const [items, setItems] = useState([]);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Data
  useEffect(() => {
    const getData = async () => {
      const res = await axiosBase.get("admin/estudios/grupos/lineas", {
        params: {
          grupo_id: id,
        },
      });
      const data = res.data;
      setItems(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Table
        columnDefinitions={[
          {
            id: "codigo",
            header: "Código",
            cell: (item) => item.codigo,
          },
          {
            id: "nombre",
            header: "Nombre",
            cell: (item) => item.nombre,
          },
        ]}
        columnDisplay={[
          { id: "codigo", visible: true },
          { id: "nombre", visible: true },
        ]}
        enableKeyboardNavigation
        items={items}
        loadingText="Cargando datos"
        loading={loading}
        resizableColumns
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
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                onClick={() => setModalInactivas(true)}
              >
                Líneas inactivas
              </Button>
              <ButtonDropdown
                variant="primary"
                items={[
                  { id: "agregar", text: "Agregar líneas" },
                  { id: "retirar", text: "Retirar líneas" },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id === "agregar") {
                    setModalAgregar(true);
                  }

                  if (detail.id === "retirar") {
                    setModalRetirar(true);
                  }
                }}
              >
                Opciones
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Lineas
        </Header>
        }
      />
      {modalInactivas && (
        <ModalLineasInactivas
          close={() => setModalInactivas(false)}
          grupo_id={id}
        />
      )}
      {modalAgregar && (
        <ModalAgregarLinea
          close={() => setModalAgregar(false)}
          grupo_id={id}
          facultad_id={facultad_id}
          lineasActuales={items}
          reload={() => window.location.reload()}
        />
      )}
      {modalRetirar && (
        <ModalRetirarLinea
          close={() => setModalRetirar(false)}
          grupo_id={id}
          lineasActuales={items}
          reload={() => window.location.reload()}
        />
      )}
    </>
)};
