import {
  Header,
  Table,
  Box,
  SpaceBetween,
  Select,
  ButtonDropdown,
  Button,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import axiosBase from "../../../../../api/axios";
import ModalEditLinea from "../components/modalEditLinea";

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
    isRowHeader: true,
    width: "15%",
  },
  {
    id: "nombre",
    header: "Linea",
    cell: (item) => item.nombre,
    sortingField: "nombre",
    width: "60%",
  },
  {
    id: "resolucion",
    header: "Resolución rectoral",
    cell: (item) => item.resolucion,
    sortingField: "resolucion",
    width: "25%",
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "nombre", visible: true },
  { id: "resolucion", visible: true },
];

const flattenData = (data) => {
  let result = [];

  data.forEach((item) => {
    result.push({
      codigo: item.codigo,
      nombre: item.nombre,
      resolucion: item.resolucion,
    });

    if (item.hijos && item.hijos.length > 0) {
      result = result.concat(flattenData(item.hijos));
    }
  });

  return result;
};

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState("");
  const [items, setItems] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    label: "Medicina",
    value: "1",
  });
  const [estadoOption, setEstadoOption] = useState({
    label: "Activo",
    value: "1",
  });

  //  Functions
  const exportExcel = async () => {
    if (items.length > 15000) {
      alert("Demasiados registros, reduce la cantidad");
      return;
    }

    const flatItems = flattenData(items);

    setLoadingReport(true);

    const res = await axiosBase.post(
      "admin/admin/lineasInvestigacion/excel",
      flatItems,
      {
        responseType: "blob",
      }
    );

    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    setLoadingReport(false);
  };

  const exportPDF = async () => {
    if (items.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const flatItems = flattenData(items);

    setLoadingReport(true);

    const res = await axiosBase.post(
      "admin/admin/lineasInvestigacion/pdf",
      {
        items: flatItems,
        facultad: selectedOption.label,
      },
      {
        responseType: "blob",
      }
    );

    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    setLoadingReport(false);
  };

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/admin/lineasInvestigacion/getAllFacultad/" + selectedOption.value,
      {
        params: { estado: estadoOption.value,},
      }
    );
    const data = await res.data;
    setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [selectedOption, estadoOption]);

  return (
    <>
    <Table
      trackBy="codigo"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      enableKeyboardNavigation
      expandedItems={expandedItems}
      wrapLines
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
        <Header 
          counter={`(${items.length})`}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                loading={loadingReport}
                items={[
                  { id: "pdf", text: "PDF" },
                  { id: "excel", text: "Excel" },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id === "pdf") {
                    exportPDF();
                  } else if (detail.id === "excel") {
                    exportExcel();
                  }
                }}
              >
                Opciones
              </ButtonDropdown>
              <Button
                variant="primary"
                disabled={selectedItems.length === 0}
                onClick={() => {
                  setModal("edit");
                }}
              >
                Editar
              </Button>
            </SpaceBetween>
          }
          >
            Líneas de investigación
          </Header>
      }
      filter={
        <SpaceBetween direction="horizontal" size="s">
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
              { label: "Química e Ingeniería Química", value: "7" },
              { label: "Medicina Veterinaria", value: "8" },
              { label: "Ciencias Administrativas", value: "9" },
              { label: "Ciencias Biológicas", value: "10" },
              { label: "Ciencias Contables", value: "11" },
              { label: "Ciencias Económicas", value: "12" },
              { label: "Ciencias Físicas", value: "13" },
              { label: "Ciencias Matemáticas", value: "14" },
              { label: "Ciencias Sociales", value: "15" },
              { label: "Ingeniería Geológica, Minera, Metalúrgica y Geográfica", value: "16" },
              { label: "Ingeniería Industrial", value: "17" },
              { label: "Psicología", value: "18" },
              { label: "Ingeniería Electrónica y Eléctrica", value: "19" },
              { label: "Ingeniería de Sistemas e Informática", value: "20" },
            ]}
          />
          <Select
            selectedOption={estadoOption}
            onChange={({ detail }) => setEstadoOption(detail.selectedOption)}
            options={[
              { label: "Activo", value: "1" },
              { label: "Inactivo", value: "0" },
            ]}
          />
        </SpaceBetween>
      }
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
    />
    {modal === "edit" && (
    <ModalEditLinea
      close={() => setModal("")}
      item={selectedItems[0]}
      reload={getData}
    />
  )}
  </>
)};
