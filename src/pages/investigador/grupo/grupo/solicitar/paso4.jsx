import {
  Box,
  Button,
  Container,
  FormField,
  Header,
  SpaceBetween,
  Spinner,
  Table,
  Textarea,
} from "@cloudscape-design/components";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import ModalAgregarLinea from "./components/modalAgregarLinea";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalEliminarLinea from "./components/modalEliminarLinea";

const initialForm = {
  presentacion: "",
  objetivos: "",
  servicios: "",
};

const formRules = {
  presentacion: { required: true },
  objetivos: { required: true },
  servicios: { required: true },
};

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
  },
  {
    id: "nombre",
    header: "Nombre",
    cell: (item) => item.nombre,
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "nombre", visible: true },
];
export default forwardRef(function (
  { requisitos, setRequisitos, loading, setLoading },
  ref
) {
  //  State
  const [lineas, setLineas] = useState([]);
  const [listado, setListado] = useState([]);
  const [typeModal, setTypeModal] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const { items, collectionProps } = useCollection(lineas, {
    selection: {},
  });

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/dataPaso4");
    const data = res.data;
    if (data?.message == "error") {
      pushNotification(data.detail, data.message, notifications.length + 1);
    } else {
      setLoading(false);
      setLineas(data.lineas);
      setListado(data.listado);
      setFormValues(data.info);
      setRequisitos(data.requisito);
    }
  };

  const registrar = async () => {
    if (validateForm()) {
      await axiosBase.put("investigador/grupo/solicitar/paso4", formValues);
      return true;
    } else {
      return false;
    }
  };

  //  Effect
  useEffect(() => {
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <>
      {loading ? (
        <Container>
          <Spinner /> Cargando datos
        </Container>
      ) : (
        <SpaceBetween size="l">
          <SpaceBetween size="s">
            <FormField
              label="Presentación"
              description="Máximo 200 palabras"
              errorText={formErrors.presentacion}
              stretch
            >
              <Textarea
                placeholder="Escriba la presentación de su grupo"
                value={formValues.presentacion}
                onChange={({ detail }) =>
                  handleChange("presentacion", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Objetivos"
              description="Máximo 100 palabras"
              errorText={formErrors.objetivos}
              stretch
            >
              <Textarea
                placeholder="Escriba los objetivos de su grupo"
                value={formValues.objetivos}
                onChange={({ detail }) =>
                  handleChange("objetivos", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Servicios"
              description="Máximo 100 palabras"
              errorText={formErrors.servicios}
              stretch
            >
              <Textarea
                placeholder="Escriba los servicios ofrecidos por su grupo"
                value={formValues.servicios}
                onChange={({ detail }) =>
                  handleChange("servicios", detail.value)
                }
              />
            </FormField>
          </SpaceBetween>
          <Table
            {...collectionProps}
            trackBy="id"
            columnDefinitions={columnDefinitions}
            columnDisplay={columnDisplay}
            items={items}
            loadingText="Cargando datos"
            loading={loading}
            selectionType="single"
            enableKeyboardNavigation
            resizableColumns
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
            header={
              <Header
                variant="h3"
                actions={
                  <SpaceBetween size="s" direction="horizontal">
                    <Button
                      disabled={collectionProps.selectedItems.length == 0}
                      onClick={() => setTypeModal("delete_linea")}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="primary"
                      disabled={items.length == 3}
                      onClick={() => setTypeModal("add_linea")}
                    >
                      Agregar
                    </Button>
                  </SpaceBetween>
                }
              >
                Líneas de investigación
              </Header>
            }
          />
          {typeModal == "add_linea" ? (
            <ModalAgregarLinea
              listado={listado}
              reload={getData}
              close={() => setTypeModal("")}
            />
          ) : typeModal == "delete_linea" ? (
            <ModalEliminarLinea
              id={collectionProps.selectedItems[0].id}
              reload={getData}
              close={() => setTypeModal("")}
            />
          ) : (
            <></>
          )}
        </SpaceBetween>
      )}
    </>
  );
});
