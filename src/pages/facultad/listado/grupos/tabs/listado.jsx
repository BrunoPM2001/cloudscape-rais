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
        key: "nombre_grupo",
        groupValuesLabel: "Grupos",
        operators: stringOperators,
    },
    {
        propertyLabel: "Categoría",
        key: "categoria",
        groupValuesLabel: "Categorías",
        operators: stringOperators,
    },
    {
        propertyLabel: "Total Integrantes",
        key: "num_integrantes",
        groupValuesLabel: "Totales",
        operators: stringOperators,
    },
    {
        propertyLabel: "Resolución",
        key: "resolucion",
        groupValuesLabel: "Resoluciones",
        operators: stringOperators,
    },
];

const columnDefinitions = [
    {
        id: "id",
        header: "ID",
        cell: (item) => item.id,
        sortingField: "id",
        minWidth: "100px",
    },
    {
        id: "tipo",
        header: "Tipo",
        cell: (item) => item.tipo,
        sortingField: "tipo",
        minWidth: "150px",
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
                        item.estado === "Disuelto"
                        ? "#FF4D4F"         // red
                        : item.estado === "Eliminado"
                        ? "#A8071A"         // dark red
                        : item.estado === "Reconocido"
                        ?  "#13C2C2"        // green
                        : item.estado === "Observado"
                        ? "#FAAD14"         // amber
                        : item.estado === "Registrado"
                        ? "#4CAF50"      // teal
                        : item.estado === "Enviado"
                        ? "#1E78D1"         // medium blue
                        : item.estado === "En proceso"
                        ? "#BFBFBF"         // light grey
                        : item.estado === "Reg. Observado"
                        ? "#FA8C16"         // orange
                        : "#D9D9D9"         // default grey
                }}
            >
                {item.estado}
            </span>
        ),
           sortingField: "estado",
    },
    {
        id: "observaciones",
        header: "Observaciones",
        cell: (item) => item.observaciones,
        sortingField: "observaciones",
        minWidth: "650px",
        textAlignment: "left",
    },
    {
        id: "nombre_grupo",
        header: "Nombre del Grupo",
        cell: (item) => item.grupo_nombre,
        sortingField: "nombre_grupo",
        minWidth: "400px",
    },
    {
        id: "nombre_corto",
        header: "Nombre Corto",
        cell: (item) => item.grupo_nombre_corto,
        sortingField: "nombre_corto",
        minWidth: "150px",
    },
    {
        id: "categoria",
        header: "Categoría",
        cell: (item) => item.grupo_categoria,
        sortingField: "categoria",
        minWidth: "150px",
    },
    {
        id: "coordinador",
        header: "Coordinador",
        cell: (item) => item.coordinador,
        sortingField: "coordinador",
        minWidth: "300px",
    },
    {
        id: "num_integrantes",
        header: "Total Integrantes",
        cell: (item) => item.total_integrantes,
        sortingField: "total_integrantes",
        minWidth: "150px",
    },
    {
        id: "facultad",
        header: "Facultad",
        cell: (item) => item.facultad,
        sortingField: "facultad",
        minWidth: "250px",
    },
    {
        id: "resolucion",
        header: "Resolución",
        cell: (item) => item.resolucion_rectoral,
        sortingField: "resolucion",
        minWidth: "150px",
    },
    {
        id: "fecha_actualizacion",
        header: "Fecha de Actualización",
        cell: (item) => item.updated_at,
        sortingField: "fecha_actualizacion",
        minWidth: "150px",
    },
    {
        id: "fecha_creacion",
        header: "Fecha de Creación",
        cell: (item) => item.created_at,
        sortingField: "fecha_creacion",
        minWidth: "150px",
    },
];

const columnDisplay = [
    { id: "id", visible: true },
    { id: "tipo", visible: true },
    { id: "estado", visible: true },
    { id: "observaciones", visible: true },
    { id: "nombre_grupo", visible: true },
    { id: "nombre_corto", visible: true },
    { id: "categoria", visible: true },
    { id: "coordinador", visible: true },
    { id: "num_integrantes", visible: true },
    { id: "facultad", visible: true },
    { id: "resolucion", visible: true },
    { id: "fecha_actualizacion", visible: true },
    { id: "fecha_creacion", visible: true },
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
        const res = await axiosBase.get("facultad/listado/grupos/");
        setDistribution(res.data.grupos);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Table
            {...collectionProps}
            trackBy="id"
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
                    Grupos de Investigación
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
