import {
  Box,
  Button,
  Container,
  FileUpload,
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
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAgregarLaboratorio from "./components/modalAgregarLaboratorio";
import ModalEliminarLaboratorio from "./components/modalEliminarLaboratorio";

const initialForm = {
  infraestructura_ambientes: "",
  file: [],
};

const formRules = {
  infraestructura_ambientes: { required: true },
  file: { required: true, isFile: true, maxSize: 5 * 1024 * 1024 },
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
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "nombre", visible: true },
  { id: "responsable", visible: true },
];

export default forwardRef(function ({ loading, setLoading }, ref) {
  //  State
  const [laboratorios, setLaboratorios] = useState([]);
  const [typeModal, setTypeModal] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const { items, collectionProps } = useCollection(laboratorios, {
    selection: {},
  });

  //  Function
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/dataPaso7");
    const data = res.data;
    if (data?.message == "error") {
      pushNotification(data.detail, data.message, notifications.length + 1);
    } else {
      setLoading(false);
      setLaboratorios(data.laboratorios);
      setFormValues({ ...data.info, file: [] });
    }
  };

  const registrar = async () => {
    if (validateForm()) {
      await axiosBase.put("investigador/grupo/solicitar/paso7", formValues);
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
              label="Ambientes físicos"
              description="Máximo 100 palabras"
              errorText={formErrors.infraestructura_ambientes}
              stretch
            >
              <Textarea
                placeholder="Describa los ambientes físicos de su grupo"
                value={formValues.infraestructura_ambientes}
                onChange={({ detail }) =>
                  handleChange("infraestructura_ambientes", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Documento sustentatorio"
              description={
                formValues.infraestructura_sgestion != null ? (
                  <>
                    Ya ha cargado un archivo, puede{" "}
                    <Link
                      href={
                        "/minio/grupo-infraestructura-sgestion/" +
                        formValues.infraestructura_sgestion
                      }
                      external="true"
                      variant="primary"
                      fontSize="body-s"
                      target="_blank"
                    >
                      descargarlo.
                    </Link>
                  </>
                ) : (
                  <>Ejemplo: Resoluciones decanales o constancias</>
                )
              }
              errorText={formErrors.file}
              stretch
            >
              <FileUpload
                value={formValues.file}
                onChange={({ detail }) => {
                  handleChange("file", detail.value);
                }}
                showFileLastModified
                showFileSize
                showFileThumbnail
                constraintText="El archivo cargado no debe superar los 5 MB"
                i18nStrings={{
                  uploadButtonText: (e) =>
                    e ? "Cargar archivos" : "Cargar archivo",
                  dropzoneText: (e) =>
                    e
                      ? "Arrastre los archivos para cargarlos"
                      : "Arrastre el archivo para cargarlo",
                  removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
                  errorIconAriaLabel: "Error",
                }}
                accept=".jpeg, .jpg, .png,  .pdf, .docx, .doc"
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
                      onClick={() => setTypeModal("delete_laboratorio")}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setTypeModal("add_laboratorio")}
                    >
                      Agregar
                    </Button>
                  </SpaceBetween>
                }
              >
                Laboratorios
              </Header>
            }
          />
          {typeModal == "add_laboratorio" ? (
            <ModalAgregarLaboratorio
              reload={getData}
              close={() => setTypeModal("")}
            />
          ) : typeModal == "delete_laboratorio" ? (
            <ModalEliminarLaboratorio
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
