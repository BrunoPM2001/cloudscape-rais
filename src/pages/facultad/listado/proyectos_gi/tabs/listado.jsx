import {
    Badge,
    Box,
    Button,
    Header,
    Pagination,
    PropertyFilter,
    SpaceBetween,
    Table,
    ButtonDropdown,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
    {
        propertyLabel: "Código",
        key: "codigo_proyecto",
        groupValuesLabel: "Códigos",
        operators: stringOperators,
    },
    {
        propertyLabel: "Título del Proyecto",
        key: "titulo",
        groupValuesLabel: "Títulos de Proyecto",
        operators: stringOperators,
    },
    {
        propertyLabel: "Estado",
        key: "estado",
        groupValuesLabel: "Estados",
        operators: stringOperators,
    },
    {
        propertyLabel: "Fecha de Actualización",
        key: "fecha_actualizacion",
        groupValuesLabel: "Fechas de Actualización",
        operators: stringOperators,
    },
    {
        propertyLabel: "Facultad",
        key: "facultad",
        groupValuesLabel: "Facultades",
        operators: stringOperators,
    },
    {
        propertyLabel: "Responsable",
        key: "responsable",
        groupValuesLabel: "Responsables",
        operators: stringOperators,
    },
    {
        propertyLabel: "Tipo",
        key: "tipo",
        groupValuesLabel: "Tipos",
        operators: stringOperators,
    },
    {
        propertyLabel: "Grupo",
        key: "grupo",
        groupValuesLabel: "Grupos",
        operators: stringOperators,
    },
    {
        propertyLabel: "Programa",
        key: "programa",
        groupValuesLabel: "Programas",
        operators: stringOperators,
    },
    {
        propertyLabel: "Línea",
        key: "linea",
        groupValuesLabel: "Líneas",
        operators: stringOperators,
    },
    {
        propertyLabel: "Total",
        key: "total",
        groupValuesLabel: "Totales",
        operators: stringOperators,
    },
    {
        propertyLabel: "RR",
        key: "resolucion",
        groupValuesLabel: "RR",
        operators: stringOperators,
    },
];

const columnDefinitions = [
    {
        id: "proyecto_id",
        header: "proyecto_id",
        cell: (item) => item.proyecto_id,
        sortingField: "id",
        minWidth: "100px",
    },
    {
        id: "codigo",
        header: "Código",
        cell: (item) => item.codigo_proyecto,
        sortingField: "codigo",
        minWidth: "150px",
    },
    {
        id: "titulo_proyecto",
        header: "Título del Proyecto",
        cell: (item) => item.titulo,
        sortingField: "titulo_proyecto",
        minWidth: "400px",
    },
    {
        id: "estado",
        header: "Estado",
        cell: (item) => (
            <span
                style={{
                    display: "inline-block",
                    padding: "0.2em 0.5em",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor:
                        item.estado === "Eliminado"
                            ? "#FF4D4F"         // custom red
                            : item.estado === "No aprobado"
                                ? "#595959"         // dark grey
                                : item.estado === "Aprobado"
                                    ? "#4CAF50"         // green
                                    : item.estado === "En evaluación"
                                        ? "#1890FF"         // blue
                                        : item.estado === "Enviado"
                                            ? "#007ACC"        // light blue
                                            : item.estado === "En proceso"
                                                ? "#BFBFBF"         // light grey
                                                : item.estado === "Anulado"
                                                    ? "#A8071A"         // dark red
                                                    : item.estado === "Sustentado"
                                                        ? "#2F54EB"         // navy blue
                                                        : item.estado === "En ejecución"
                                                            ? "#13C2C2"         // teal
                                                            : item.estado === "Ejecutado"
                                                                ? "#237804"         // dark green
                                                                : item.estado === "Concluido"
                                                                    ? "#52C41A"         // emerald green
                                                                    : "#D9D9D9"         // default color
                }}
            >
                {item.estado}
            </span>
        ),
        sortingField: "estado",
        minWidth: "150px",
    },
    {
        id: "fecha_actualizacion",
        header: "Fecha de Actualización",
        cell: (item) => item.updated_at,
        sortingField: "fecha_actualizacion",
       minWidth: "200px",
    },
    {
        id: "facultad",
        header: "Facultad",
        cell: (item) => item.facultad,
        sortingField: "facultad",
        minWidth: "250px",
    },
    {
        id: "responsable",
        header: "Responsable",
        cell: (item) => item.responsable,
        sortingField: "responsable",
        minWidth: "250px",
    },
    {
        id: "tipo",
        header: "Tipo",
        cell: (item) => item.tipo_proyecto,
        sortingField: "tipo",
        minWidth: "150px",
    },
    {
        id: "grupo",
        header: "Grupo",
        cell: (item) => item.grupo_nombre,
        sortingField: "grupo",
        minWidth: "300px",
    },
    {
        id: "programa",
        header: "Programa",
        cell: (item) => item.programa,
        sortingField: "programa",
        width: "200px",
    },
    {
        id: "linea",
        header: "Línea",
        cell: (item) => item.linea,
        sortingField: "linea",
        minWidth: "300px",
    },
    {
        id: "total",
        header: "Total",
        cell: (item) => item.total,
        sortingField: "total",
        width: "130px",
    },
    {
        id: "rr",
        header: "Resolucion Rectoral",
        cell: (item) => item.resolucion,
        sortingField: "rr",
        minWidth: "250px",
    },
];

const columnDisplay = [
    { id: "proyecto_id", visible: false },
    { id: "codigo", visible: true },
    { id: "titulo_proyecto", visible: true },
    { id: "estado", visible: true },
    { id: "fecha_actualizacion", visible: true },
    { id: "facultad", visible: true },
    { id: "responsable", visible: true },
    { id: "tipo", visible: true },
    { id: "grupo", visible: true },
    { id: "programa", visible: false },
    { id: "linea", visible: true },
    { id: "total", visible: true },
    { id: "rr", visible: true },
];


const Listado = () => {
    const [loading, setLoading] = useState(true);
    const [distributions, setDistribution] = useState([]);
    const {
        items,
        filteredItemsCount,
        collectionProps,
        paginationProps,
        propertyFilterProps,
    } = useCollection(distributions, {
        propertyFiltering: {
            filteringProperties: FILTER_PROPS,
            empty: (
                <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                    <SpaceBetween size="m">
                        <b>No hay registros...</b>
                    </SpaceBetween>
                </Box>
            ),
            noMatch: (
                <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                    <SpaceBetween size="m">
                        <b>No hay coincidencias</b>
                    </SpaceBetween>
                </Box>
            ),
        },
        pagination: { pageSize: 10 },
        sorting: {},
        selection: {},
    });

    const getData = async () => {
        setLoading(true);
        const res = await axiosBase.get("facultad/listado/proyectos_gi/");
        setDistribution(res.data.proyectos); // Accede directamente al array de proyectos
        console.log(res.data.proyectos);
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <Table
            {...collectionProps}
            trackBy="proyecto_id"
            items={items}
            columnDefinitions={columnDefinitions}
            columnDisplay={columnDisplay}
            loading={loading}
            loadingText="Cargando datos"
            // resizableColumns
            enableKeyboardNavigation
            selectionType="single"
            wrapLines

            filter={
                <PropertyFilter
                    {...propertyFilterProps}
                    filteringPlaceholder="Buscar proyectos..."
                    countText={`${filteredItemsCount} coincidencias`}
                    expandToViewport
                />
            }
            header={
                <Header
                    // counter={"(" + distributions.length + ")"}
                    actions={
                        <SpaceBetween direction="horizontal" size="xs">

                            <ButtonDropdown
                                // disabled={!enableBtn || grupo_estado < 0}
                                variant="primary"
                                items={[
                                    {
                                        text: "Reporte en PDF",
                                        id: "action_2_1",
                                        disabled: false,
                                    },
                                    {
                                        text: "Reporte en Excel",
                                        id: "action_2_2",
                                        disabled: false,
                                    },

                                ]}
                            // onItemClick={({ detail }) => {
                            //     if (detail.id == "action_2_1") {
                            //         setIncluirVisible(true);
                            //         setTypeModal("Excluir");
                            //     } else if (detail.id == "action_2_2") {
                            //         setIncluirVisible(true);
                            //         setTypeModal("Visualizar");
                            //     } else if (detail.id == "action_2_3") {
                            //         setIncluirVisible(true);
                            //         setTypeModal("Condicion");
                            //     } else if (detail.id == "action_2_4") {
                            //         setIncluirVisible(true);
                            //         setTypeModal("Cargo");
                            //     }
                            // }}
                            >
                                Reportes
                            </ButtonDropdown>
                        </SpaceBetween>
                    }
                >
                    Proyectos de Investigación
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
    );
};

export default Listado;

