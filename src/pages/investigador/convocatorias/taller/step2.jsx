import {
  Modal,
  Button,
  Alert,
  Box,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
  Pagination,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalDeleteIntegrante from "./components/modalDeleteIntegrante.jsx"; // Asegúrate de que la ruta sea correcta
import ModalAddIntegrante from "./components/modalAddIntegrante.jsx";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { getAdapter } from "axios";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Talleres de Investigación y Posgrado",
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "Id",
    cell: (item) => item.id,
  },
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
  },
  {
    id: "apellido1",
    header: "Apellido paterno",
    cell: (item) => item.apellido1,
  },
  {
    id: "apellido2",
    header: "Apellido materno",
    cell: (item) => item.apellido2,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "doc_numero",
    header: "Dni",
    cell: (item) => item.doc_numero,
  },
  {
    id: "codigo",
    header: "Código docente",
    cell: (item) => item.codigo,
  },
  {
    id: "email3",
    header: "Correo institucional",
    cell: (item) => item.email3,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
  },
  {
    id: "cargo",
    header: "Cargo",
    cell: (item) => item.cargo,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "condicion", visible: true },
  { id: "apellido1", visible: true },
  { id: "apellido2", visible: true },
  { id: "nombres", visible: true },
  { id: "doc_numero", visible: true },
  { id: "codigo", visible: true },
  { id: "email3", visible: true },
  { id: "facultad", visible: true },
  { id: "cargo", visible: true },
];

export default function Convocatoria_registro_taller_2() {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [verificationData, setVerificationData] = useState(null);
  const [modalAction, setModalAction] = useState(''); // Para gestionar la acción del modal (add o delete)

    //  Hooks
  const { items, actions, collectionProps, paginationProps } = useCollection(
      data,
      {
        pagination: { pageSize: 10 },
        sorting: {},
        selection: {},
      }
    );

  
    // Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search); 
    if (proyecto_id == null) {
    window.location.href = "paso1";
  }
  
  const getVerificationData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/convocatorias/pinvpos/verificar2")
    const info = res.data;
    setVerificationData(info);
    setLoading(false);
  };

  const getIntegrantesData = async () => {
    const res = await axiosBase.get("investigador/convocatorias/pinvpos/listarIntegrantes", {
      params: {
        proyecto_id
      }
    })
    const integrantes = res.data; 
    setData(integrantes);
  };

  const handleNavigate = (index) => {
    window.location.href = "paso" + (index + 1);
  };

  useEffect(() => {
    getVerificationData()
    getIntegrantesData()
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro a la convocatoria vigente"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {verificationData.estado ? (
            <>     
            <Wizard
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={1}
              isLoadingNextStep={loading}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general del taller",
                  description: "Información general",
                },
                {
                  title: "Comité organizador del taller",
                  description: "Listado de integrantes para el taller",
                  content: (
                    <SpaceBetween size="m">
                      <Table
                        {...collectionProps}
                        trackBy="id"                   
                        items={items}
                        selectionType="single"
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        variant="embedded"
                        enableKeyboardNavigation
                        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])} // Selecciona la fila
                        header={
                          <Header
                            counter={"(" + data.length + ")"}
                            actions={
                              <SpaceBetween direction="horizontal" size="xs">
                                <Button
                                  disabled={
                                    collectionProps.selectedItems.length === 0 || 
                                    collectionProps.selectedItems[0]?.condicion === "Responsable"
                                  }
                                  variant="normal"
                                  onClick={() => setModalAction("delete")}                                >
                                  Eliminar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => setModalAction("add")}
                                >
                                  Agregar
                                </Button>
                              </SpaceBetween>
                            }
                          >
                            Integrantes del proyecto
                          </Header>
                        }
                        pagination={<Pagination {...paginationProps} />}
                        empty={
                          <Box
                            margin={{ vertical: "xs" }}
                            textAlign="center"
                            color="inherit"
                          >
                            <SpaceBetween size="m">
                              <b>No hay registros...</b>
                            </SpaceBetween>
                          </Box>
                        }
                      />
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
                },
                {
                  title: "Programa del taller",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Financiamiento",
                  description: "Montos y partidas",
                },
                {
                  title: "Instrucciones finales",
                  description: "Reporte y envío de la propuesta",
                },
              ]}
            />
            </>
          ) : (
              <Alert header="No puede registrarse en esta convocatoria"type="warning"/>
          )}

            {modalAction == 'add' ? (
              <ModalAddIntegrante
                id={proyecto_id}
                close={() => setModalAction("")}
                reload={getIntegrantesData}
              />
            ) : modalAction == 'delete' && (
              <ModalDeleteIntegrante
                id={collectionProps.selectedItems[0].id}
                close={() => setModalAction("")}
                reload={getIntegrantesData}
              />
            )}
        </>
      )}
    </BaseLayout>
  );
}
