import {
    Badge,
    Box,
    Button,
    Header,
    Pagination,
    PropertyFilter,
    SpaceBetween,
    Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
    {
        propertyLabel: "Código de Registro",
        key: "codigo_registro",
        groupValuesLabel: "Códigos de Registro",
        operators: stringOperators,
    },
    {
        propertyLabel: "Título",
        key: "titulo",
        groupValuesLabel: "Títulos",
        operators: stringOperators,
    },
    {
        propertyLabel: "Estado",
        key: "estado",
        groupValuesLabel: "Estados",
        operators: stringOperators,
    },
    {
        propertyLabel: "Año de Publicación",
        key: "año_publicacion",
        groupValuesLabel: "Años de Publicación",
        operators: stringOperators,
    },
    {
        propertyLabel: "Fecha de Inscripción",
        key: "fecha_inscripcion",
        groupValuesLabel: "Fechas de Inscripción",
        operators: stringOperators,
    },
    {
        propertyLabel: "ISBN",
        key: "isbn",
        groupValuesLabel: "ISBN",
        operators: stringOperators,
    },
    {
        propertyLabel: "ISSN",
        key: "issn",
        groupValuesLabel: "ISSN",
        operators: stringOperators,
    },
];

const columnDefinitions = [
    {
        id: "id",
        header: "ID",
        cell: (item) => item.id,
        sortingField: "id",
        width: "100px",
    },
    {
        id: "codigo_registro",
        header: "Código de Registro",
        cell: (item) => item.codigo_registro,
        sortingField: "codigo_registro",
        width: "150px",
    },
    {
        id: "tipo_publicacion",
        header: "Tipo de Publicación",
        cell: (item) => item.tipo_publicacion,
        sortingField: "tipo_publicacion",
        width: "200px",
    },
    {
        id: "titulo",
        header: "Título",
        cell: (item) => item.titulo,
        sortingField: "titulo",
        width: "400px",
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
                        item.estado === "Registrado"
                            ? "#4CAF50"         // Verde no tan claro
                            : item.estado === "Observado"
                                ? "#FAAD14"         // Amarillo
                                : item.estado === "Enviado"
                                    ? "#1890FF"         // Azul no tan claro
                                    : item.estado === "En proceso"
                                        ? "#B7B7B7"         // Plomo no tan claro
                                        : item.estado === "Anulado"
                                            ? "#FF4D4F"         // Rojo
                                            : item.estado === "No Registrado"
                                                ? "#FF6A00"         // Naranja
                                                : item.estado === "Reg. Duplicado"
                                                    ? "#595959"         // Gris oscuro
                                                    : "#D9D9D9"         // Color por defecto (gris claro)
                }}
            >
                {item.estado}
            </span>
        ),
        sortingField: "estado",
        width: "150px",
    },


    {
        id: "año_publicacion",
        header: "Año de Publicación",
        cell: (item) => item.year_publicacion,
        sortingField: "año_publicacion",
        width: "150px",
    },
    {
        id: "fecha_inscripcion",
        header: "Fecha de Inscripción",
        cell: (item) => item.fecha_inscripcion,
        sortingField: "fecha_inscripcion",
        width: "150px",
    },
    {
        id: "isbn",
        header: "ISBN",
        cell: (item) => item.isbn,
        sortingField: "isbn",
        width: "150px",
    },
    {
        id: "issn",
        header: "ISSN",
        cell: (item) => item.issn,
        sortingField: "issn",
        width: "150px",
    },
];

const columnDisplay = [
    { id: "id", visible: true },
    { id: "codigo_registro", visible: true },
    { id: "tipo_publicacion", visible: true },
    { id: "titulo", visible: true },
    { id: "estado", visible: true },
    { id: "año_publicacion", visible: true },
    { id: "fecha_inscripcion", visible: true },
    { id: "isbn", visible: true },
    { id: "issn", visible: true },
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
        const res = await axiosBase.get("facultad/listado/publicaciones/");
        setDistribution(res.data.publicaciones);

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
            resizableColumns
            enableKeyboardNavigation
            selectionType="single"
            wrapLines

            filter={
                <PropertyFilter
                    {...propertyFilterProps}
                    filteringPlaceholder="Buscar publicaciones..."
                    countText={`${filteredItemsCount} coincidencias`}
                    expandToViewport
                />
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
