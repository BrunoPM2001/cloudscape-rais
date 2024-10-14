import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  Button,
  ButtonDropdown,
  FileUpload,
  FormField,
  Header,
  Modal,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../../../../hooks/useFormValidation";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosBase from "../../../../../../../../api/axios";
import NotificationContext from "../../../../../../../../providers/notificationProvider";

const columnDefinitions = [
  {
    id: "actividad",
    header: "Actividad",
    cell: (item) => item.actividad,
  },
  {
    id: "justificacion",
    header: "Justificación",
    cell: (item) => item.justificacion,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
  },
];

const columnDisplay = [
  { id: "actividad", visible: true },
  { id: "justificacion", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
];

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  i18nStrings: {
    uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
    dropzoneText: (e) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
  },
  accept: ".pdf",
};

const initialForm = {
  file: [],
};

const formRules = {
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ data, files }) => {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState(false);

  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data,
    {
      sorting: {},
      selection: {},
    }
  );

  const loadFile = async () => {
    if (validateForm()) {
      setLoading(true);
      const form = new FormData();
      form.append("informe_id", id);
      form.append("indice", collectionProps.selectedItems[0]?.indice);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "admin/estudios/informesTecnicos/loadActividad",
        form
      );
      const info = res.data;
      pushNotification(info.detail, info.message, notifications.length + 1);
      setLoading(false);
      setModal("");
    }
  };

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        enableKeyboardNavigation
        wrapLines
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <ButtonDropdown
                disabled={
                  collectionProps.selectedItems.length > 0 ? false : true
                }
                variant="normal"
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1_1") {
                    setModal("cargar");
                  } else if (detail.id == "action_1_2") {
                    window.open(
                      files[
                        "actividad" + collectionProps.selectedItems[0]?.indice
                      ],
                      "_blank"
                    );
                  }
                }}
                items={[
                  {
                    text: "Cargar archivo",
                    id: "action_1_1",
                  },
                  {
                    text: "Ver archivo cargado",
                    id: "action_1_2",
                    disabled:
                      !files[
                        "actividad" + collectionProps.selectedItems[0]?.indice
                      ],
                  },
                ]}
              >
                Acciones
              </ButtonDropdown>
            }
          >
            Actividades
          </Header>
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
      {modal == "cargar" && (
        <Modal
          visible
          size="medium"
          header="Cargar archivo para la actividad"
          onDismiss={() => setModal("")}
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="normal" onClick={() => setModal("")}>
                  Cancelar
                </Button>
                <Button variant="primary" loading={loading} onClick={loadFile}>
                  Cargar actividad
                </Button>
              </SpaceBetween>
            </Box>
          }
        >
          <FormField
            label="Archivo de actividad"
            description="No mayor a 6 MB y en formato pdf"
            errorText={formErrors.file}
          >
            <FileUpload
              {...propsRepetidas}
              value={formValues.file}
              onChange={({ detail }) => handleChange("file", detail.value)}
            />
          </FormField>
        </Modal>
      )}
    </>
  );
};
