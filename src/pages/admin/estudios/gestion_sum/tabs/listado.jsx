import {
  Box,
  Button,
  Header,
  Input,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import usePaginatedData from "../../../../../hooks/usePaginatedData";
import { useState } from "react";

const columnDefinitions = [
  {
    id: "codigo_alumno",
    header: "Código",
    cell: (item) => item.codigo_alumno,
    isRowHeader: true,
  },
  {
    id: "nombres",
    header: "Nombre",
    cell: (item) => item.nombres,
  },
  {
    id: "apellido_paterno",
    header: "Ap. Paterno",
    cell: (item) => item.apellido_paterno,
  },
  {
    id: "apellido_materno",
    header: "Ap. Materno",
    cell: (item) => item.apellido_materno,
  },
  {
    id: "dni",
    header: "Dni",
    cell: (item) => item.dni,
  },
  {
    id: "sexo",
    header: "Sexo",
    cell: (item) => item.sexo,
  },
  {
    id: "fecha_nacimiento",
    header: "Fecha de nacimiento",
    cell: (item) => item.fecha_nacimiento,
  },
  {
    id: "lugar_nacimiento",
    header: "Lugar de nacimiento",
    cell: (item) => item.lugar_nacimiento,
  },
  {
    id: "telefono",
    header: "Teléfono",
    cell: (item) => item.telefono,
  },
  {
    id: "telefono_personal",
    header: "Teléfono personal",
    cell: (item) => item.telefono_personal,
  },
  {
    id: "correo_electronico",
    header: "Correo electrónico",
    cell: (item) => item.correo_electronico,
  },
  {
    id: "correo_electronico_personal",
    header: "Correo electrónico personal",
    cell: (item) => item.correo_electronico_personal,
  },
  {
    id: "domicilio",
    header: "Domicilio",
    cell: (item) => item.domicilio,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
  },
  {
    id: "programa",
    header: "Programa",
    cell: (item) => item.programa,
  },
  {
    id: "año_ciclo_estudio",
    header: "Año / ciclo de estudio",
    cell: (item) => item.año_ciclo_estudio,
  },
  {
    id: "num_periodo_acad_matric",
    header: "N° de matrículas",
    cell: (item) => item.num_periodo_acad_matric,
  },
  {
    id: "situacion_academica",
    header: "Situación Académica",
    cell: (item) => item.situacion_academica,
  },
  {
    id: "ultimo_periodo_matriculado",
    header: "Última matrícula",
    cell: (item) => item.ultimo_periodo_matriculado,
  },
];

const columnDisplay = [
  { id: "codigo_alumno", visible: true },
  { id: "apellido_paterno", visible: true },
  { id: "apellido_materno", visible: true },
  { id: "nombres", visible: true },
  { id: "dni", visible: true },
  { id: "sexo", visible: true },
  { id: "fecha_nacimiento", visible: true },
  { id: "lugar_nacimiento", visible: true },
  { id: "telefono", visible: true },
  { id: "telefono_personal", visible: true },
  { id: "correo_electronico", visible: true },
  { id: "correo_electronico_personal", visible: true },
  { id: "domicilio", visible: true },
  { id: "facultad", visible: true },
  { id: "programa", visible: true },
  { id: "año_ciclo_estudio", visible: true },
  { id: "num_periodo_acad_matric", visible: true },
  { id: "situacion_academica", visible: true },
  { id: "ultimo_periodo_matriculado", visible: true },
];

export default () => {
  //  States
  const [input, setInput] = useState("");

  //  Hooks
  const {
    loadingData,
    data,
    page,
    totalRecords,
    totalPages,
    setPage,
    handleSearch,
  } = usePaginatedData(10, "");

  //  Functions
  const handlePageChange = ({ detail }) => {
    setPage(detail.currentPageIndex);
  };

  return (
    <Table
      trackBy="codigo_alumno"
      items={data}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loadingData}
      loadingText="Cargando datos"
      resizableColumns
      enableKeyboardNavigation
      header={
        <Header
          counter={"(" + totalRecords + ")"}
          actions={
            <Button
              variant="primary"
              loading={loadingData}
              onClick={() => handleSearch(input)}
            >
              Buscar
            </Button>
          }
        >
          Estudiantes registrados
        </Header>
      }
      filter={
        <Input
          type="search"
          placeholder="Buscar por dni, código o nombres"
          value={input}
          onChange={({ detail }) => setInput(detail.value)}
        />
      }
      pagination={
        <Pagination
          currentPageIndex={page}
          pagesCount={totalPages}
          onChange={handlePageChange}
        />
      }
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
    />
  );
};
