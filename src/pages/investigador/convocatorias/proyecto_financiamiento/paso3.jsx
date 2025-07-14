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
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAddEstudiante from "./components/modals/modalAddEstudiante";
import ModalDeleteEstudiante from "./components/modals/modalDeleteEstudiante";
import ModalAddEstudiante_externo from "./components/modals/modalAddEstudiante_externo";
import NotificationContext from "../../../../providers/notificationProvider";

const CANTIDAD_MINIMA = 3;

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
    cell: (item) => (
      <Button
        variant="inline-icon"
        href={item.url}
        target="_blank"
        iconName="file"
      />
    ),
  },
];

const columnDisplay = [
  { id: "tipo_integrante", visible: true },
  { id: "nombre", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "url", visible: true },
];

export default function ({ proyecto_id, setRequisitos, loading, setLoading }) {
  // Context
  const {pushNotification, notifications} = useContext(NotificationContext);
  //  State
  const [distributions, setDistribution] = useState([]);
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [existingStudents, setExistingStudents] = useState([]);

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
      "investigador/convocatorias/pro-ctie/listarIntegrantes",
      {
        params: {
          proyecto_id: proyecto_id,
        },
      }
    );
    const data = res.data;

    const estudiantesNormales = data.filter(
      (student) => student.tipo_integrante === "Estudiante"
    );
    if (estudiantesNormales.length >= 2) {
      setRequisitos(true);
    } else {
      setRequisitos(false);
    }

    setDistribution(data);
    setExistingStudents(data);
    setLoading(false);
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

    // Function to check if a student already exists
  const checkIfStudentExists = (student) => {
    //console.log("Estudiantes existentes:", existingStudents);  // Ver lista de estudiantes
    //console.log("Estudiante que intenta agregar:", student);  // Datos del estudiante
    return existingStudents.some(
      (existingStudent) =>
        existingStudent.codigo_orcid === student.codigo_orcid || // Compara código ORCID
        existingStudent.dni === student.dni ||                  // Compara DNI
        existingStudent.correo_electronico === student.direccion1 // Compara correo electrónico
    );
  };

    // Agregar estudiante
  const handleItemClick = ({ detail }) => {
    if (detail.id == "action_2_1") {  // Si es un estudiante normal
      // Comprobamos si ya existen 2 estudiantes normales
      const estudiantesNormales = existingStudents.filter(
        (student) => student.tipo === "Estudiante"
      );
      if (estudiantesNormales.length >= 2) {
        pushNotification("Ya hay 2 estudiantes registrados. Solo puedes agregar estudiantes externos.", "warning", notifications.length + 1);
      } else {
        setTypeModal("add_estudiante");
        setVisible(true);
      }
    } else if (detail.id == "action_2_2") {  // Si es un estudiante externo
      setTypeModal("add_estudiante_externo");
      setVisible(true);
    }
  };

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
                  onItemClick={handleItemClick}
                  items={[
                    {
                      text: "Estudiante",
                      id: "action_2_1",
                    },
                    {
                      text: "Estudiante externo",
                      id: "action_2_2",
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
          existingStudents={existingStudents} //Pasa la función de verificación
        />
      )}
      {visible && typeModal == "add_estudiante_externo" && (
        <ModalAddEstudiante_externo
          id={proyecto_id}
          visible={visible}
          setVisible={setVisible}
          reload={getData}
          existingStudents={existingStudents} //Pasa la función de verificación
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
