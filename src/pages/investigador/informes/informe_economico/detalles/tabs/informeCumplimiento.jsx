import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Header,
  Link,
  Popover,
  SpaceBetween,
  Spinner,
  Table,
  Textarea,
} from "@cloudscape-design/components";
import axiosBase from "../../../../../../api/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const columnDisplay = [
  { id: "nombres", visible: true },
  { id: "cumplimiento", visible: true },
  { id: "actividad", visible: true },
];

export default ({ data, loading }) => {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [listado, setListado] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Functions
  const handleCheckboxChange = (id) => {
    setListado((prevListado) =>
      prevListado.map((item) =>
        item.id === id ? { ...item, cumplimiento: !item.cumplimiento } : item
      )
    );
  };

  const handleTextareaChange = (id, value) => {
    setListado((prevListado) =>
      prevListado.map((item) =>
        item.id === id ? { ...item, actividad: value } : item
      )
    );
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_economico/reportePresupuesto",
      {
        params: {
          id: id,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  useEffect(() => {
    if (!loading) {
      setListado(
        data.listado.map((item) => {
          return {
            id: item.id,
            nombres: item.nombres,
            cumplimiento: false,
            actividad: null,
          };
        })
      );
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : (
        <>
          {data.estado == 0 ? (
            <Table
              trackBy="id"
              items={listado}
              columnDefinitions={[
                {
                  id: "nombres",
                  header: "Docente investigador participante",
                  cell: (item) => item.nombres,
                },
                {
                  id: "cumplimiento",
                  header: "Cumplimiento",
                  cell: (item) => (
                    <Checkbox
                      checked={item.cumplimiento}
                      onChange={() => handleCheckboxChange(item.id)}
                    ></Checkbox>
                  ),
                  width: 100,
                },
                {
                  id: "actividad",
                  header: "Actividad",
                  cell: (item) => (
                    <Textarea
                      value={item.actividad}
                      onChange={({ detail }) =>
                        handleTextareaChange(item.id, detail.value)
                      }
                    />
                  ),
                },
              ]}
              columnDisplay={columnDisplay}
              loading={loading}
              loadingText="Cargando datos"
              wrapLines
              header={
                <Header
                  counter={"(" + listado.length + ")"}
                  actions={
                    <Button
                      variant="primary"
                      onClick={reporte}
                      loading={loadingBtn}
                      disabled={loading}
                    >
                      Enviar
                    </Button>
                  }
                  info={
                    <Popover
                      triggerType="custom"
                      content="Marcar solo en caso de que el docente haya cumplido su actividad correspondiente"
                    >
                      <Link>Info</Link>
                    </Popover>
                  }
                >
                  Docentes
                </Header>
              }
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
          ) : data.estado == 1 ? (
            <Alert
              header="Informe sobre las actividades de los docentes investigadores
                  de mi proyecto"
              action={
                <SpaceBetween size="xs" direction="horizontal">
                  <Button>Ver</Button>
                  <Button variant="primary">Imprimir</Button>
                </SpaceBetween>
              }
            >
              <ul>
                <li>
                  Procedimiento para acceder al programa de proyectos de
                  Investigación para Grupos de Investigación - Artículo 11°
                  Asignación del fondo; c. <br />
                  El incentivo será pagado previo informe del responsable sobre
                  el cumplimiento de cada investigador del proyecto.
                </li>
                <li>
                  Directiva para la rendición económica de los fondos otorgados
                  por la UNMSM a las actividades de investigación 2018
                </li>
              </ul>
            </Alert>
          ) : (
            <Alert type="warning" header="Aún no puede presentar su informe">
              Necesita rendir el 100% de su presupuesto para poder registrar su
              informe
            </Alert>
          )}
        </>
      )}
    </>
  );
};
