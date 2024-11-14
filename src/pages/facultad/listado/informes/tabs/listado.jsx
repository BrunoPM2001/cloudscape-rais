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
        key: "codigo",
        groupValuesLabel: "Códigos",
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
        propertyLabel: "Fecha de Inscripción",
        key: "fecha_inscripcion",
        groupValuesLabel: "Fechas de Inscripción",
        operators: stringOperators,
    },
    {
        propertyLabel: "N° de Informe",
        key: "nro_informe",
        groupValuesLabel: "Números de Informe",
        operators: stringOperators,
    },
    {
        propertyLabel: "N° de Informe P",
        key: "nro_informe_p",
        groupValuesLabel: "Números de Informe P",
        operators: stringOperators,
    },
    {
        propertyLabel: "Responsable",
        key: "responsable",
        groupValuesLabel: "Responsables",
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
        id: "codigo",
        header: "Código",
        cell: (item) => item.codigo,
        sortingField: "codigo",
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
                        item.estado === "En proceso"
                            ? "#B7B7B7" // Gris
                            : item.estado === "Aprobado"
                            ? "#4CAF50" // Verde
                            : item.estado === "Presentado"
                            ? "#1890FF" // Azul
                            : item.estado === "Observado"
                            ? "#FAAD14" // Amarillo
                            : item.estado === "No tiene informe"
                            ? "#FF4D4F" // Rojo
                            : "#D9D9D9"  // Gris claro (default)
                }}
            >
                {item.estado}
            </span>
        ),
        
        sortingField: "estado",
        minWidth: "150px",
    },
    {
        id: "responsable",
        header: "Responsable",
        cell: (item) => item.responsable,
        sortingField: "responsable",
        minWidth: "300px",
    },
    {
        id: "titulo",
        header: "Título",
        cell: (item) => item.titulo,
        sortingField: "titulo",
        minWidth: "400px",
    },
    {
        id: "fecha_inscripcion",
        header: "Fecha de Inscripción",
        cell: (item) => item.fecha_inscripcion,
        sortingField: "fecha_inscripcion",
        minWidth: "150px",
    },
    {
        id: "nro_informe",
        header: "N° de Informe",
        cell: (item) => item.nro_informe,
        sortingField: "nro_informe",
        minWidth: "100px",
    },
    {
        id: "nro_informe_p",
        header: "N° de Informe P",
        cell: (item) => item.nro_informe_p,
        sortingField: "nro_informe_p",
        minWidth: "100px",
    },
   
    
];

const columnDisplay = [
    { id: "id", visible: true },
    { id: "tipo", visible: true },
    { id: "codigo", visible: true },
    { id: "estado", visible: true },
    { id: "responsable", visible: true },
    { id: "titulo", visible: true },
    { id: "fecha_inscripcion", visible: true },
    { id: "nro_informe", visible: true },
    { id: "nro_informe_p", visible: true },
    
    
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
        const res = await axiosBase.get("facultad/listado/informes/");
        setDistribution(res.data.informes);
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
                    filteringPlaceholder="Buscar Informe Académico ..."
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
                   Informes Académicos
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
