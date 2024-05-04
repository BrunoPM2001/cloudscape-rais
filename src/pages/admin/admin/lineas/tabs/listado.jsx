import {
  Header,
  Table,
  Box,
  SpaceBetween,
  Select,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import axiosBase from "../../../../../api/axios";

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
    isRowHeader: true,
  },
  {
    id: "nombre",
    header: "Linea",
    cell: (item) => item.nombre,
    sortingField: "nombre",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad_id,
    sortingField: "facultad",
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "nombre", visible: true },
  { id: "facultad", visible: true },
];

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState();
  const [selectedOption, setSelectedOption] = useState({
    label: "Medicina",
    value: "1",
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/admin/lineasInvestigacion/getAllFacultad/" + selectedOption.value
    );
    const data = await res.data;
    setItems(data.data);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedOption]);

  return (
    <Table
      trackBy="codigo"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
      enableKeyboardNavigation
      expandedItems={expandedItems}
      expandableRows={{
        getItemChildren: (item) => item.hijos,
        isItemExpandable: (item) => Boolean(item.hijos),
        expandedItems: expandedItems,
        onExpandableItemToggle: ({ detail }) =>
          setExpandedItems((prev) => {
            const next = new Set((prev ?? []).map((item) => item.codigo));
            detail.expanded
              ? next.add(detail.item.codigo)
              : next.delete(detail.item.codigo);
            return [...next].map((codigo) => ({ codigo }));
          }),
      }}
      header={
        <Header counter={`(${items.length})`}>Líneas de investigación</Header>
      }
      filter={
        <Select
          selectedOption={selectedOption}
          onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
          options={[
            { label: "Medicina", value: "1" },
            { label: "Derecho y Ciencia Política", value: "2" },
            { label: "Letras y Ciencias Humanas", value: "3" },
            { label: "Farmacia y Bioquímica", value: "4" },
            { label: "Odontología", value: "5" },
            { label: "Educación", value: "6" },
            {
              label: "Química e Ingeniería Química",
              value: "7",
            },
            { label: "Medicina Veterinaria", value: "8" },
            { label: "Ciencias Administrativas", value: "9" },
            { label: "Ciencias Biológicas", value: "10" },
            { label: "Ciencias Contables", value: "11" },
            { label: "Ciencias Económicas", value: "12" },
            { label: "Ciencias Físicas", value: "13" },
            { label: "Ciencias Matemáticas", value: "14" },
            { label: "Ciencias Sociales", value: "15" },
            {
              label: "Ingeniería Geológica, Minera, Metalúrgica y Geográfica",
              value: "16",
            },
            { label: "Ingeniería Industrial", value: "17" },
            { label: "Psicología", value: "18" },
            {
              label: "Ingeniería Electrónica y Eléctrica",
              value: "19",
            },
            {
              label: "Ingeniería de Sistemas e Informática",
              value: "20",
            },
          ]}
        />
      }
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
    ></Table>
  );
};
