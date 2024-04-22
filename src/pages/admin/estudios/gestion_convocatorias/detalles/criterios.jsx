import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Button,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  //  State
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/admin/estudios/convocatorias/verCriteriosEvaluacion/" +
            id,
          {
            headers: {
              Authorization: localStorage.getItem("Auth"),
            },
          }
        );
        if (!res.ok) {
          setItems([]);
          setLoading(!loading);
          throw new Error("Error in fetch");
        } else {
          const data = await res.json();
          setItems(data.criterios);
          setLoading(!loading);
        }
      } catch (error) {
        setItems([]);
        setLoading(!loading);
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Table
      columnDefinitions={[
        {
          id: "opcion",
          header: "Criterio de evaluación",
          cell: (item) => (
            <div dangerouslySetInnerHTML={{ __html: item.opcion }}></div>
          ),
        },
        {
          id: "puntaje_max",
          header: "Puntaje máximo",
          cell: (item) => item.puntaje_max,
        },
        {
          id: "editable",
          header: "Editable",
          cell: (item) => item.editable,
        },
        {
          id: "otipo",
          header: "Tipo de restricción",
          cell: (item) => item.otipo,
        },
        {
          id: "puntos_adicionales",
          header: "Puntos adicionales",
          cell: (item) => item.puntos_adicionales,
        },
      ]}
      columnDisplay={[
        { id: "opcion", visible: true },
        { id: "puntaje_max", visible: true },
        { id: "editable", visible: true },
        { id: "otipo", visible: true },
        { id: "puntos_adicionales", visible: true },
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Cargando datos"
      loading={loading}
      resizableColumns
      trackBy="id"
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
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
            <SpaceBetween size="s">
              <Button disabled variant="primary">
                Editar
              </Button>
            </SpaceBetween>
          }
        >
          Criterios de evaluación
        </Header>
      }
    />
  );
};
