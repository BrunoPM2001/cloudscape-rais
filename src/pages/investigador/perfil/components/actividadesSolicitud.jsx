import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Header,
  Select,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { useState } from "react";
import axiosBase from "../../../../api/axios";

const initialForm = {
  opcion: null,
  file: [],
};

const formRules = {
  opcion: { required: true },
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ data, antiguo, proyectos }) => {
  //  States
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [newData, setNewData] = useState([]);
  const [useData, setUseData] = useState(true);
  const [alert, setAlert] = useState("");

  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("investigador/perfil/actividadesExtra");
    const data = res.data;
    setUseData(false);
    setNewData(data);
    setLoadingData(false);
  };

  const cargar = async () => {
    if (validateForm()) {
      setLoading(true);
      setAlert("");
      let formulario = new FormData();
      formulario.append("tipo", formValues.opcion.label);
      formulario.append("categoria_id", formValues.opcion.value);
      formulario.append("file", formValues.file[0]);
      await axiosBase.post("investigador/perfil/addActividad", formulario);
      setLoading(false);
      handleChange("opcion", null);
      handleChange("file", []);
      getData();
      setAlert("Actividad cargada correctamente");
    }
  };

  const deleteActividad = async (id) => {
    setLoadingData(true);
    setAlert("");
    await axiosBase.delete("investigador/perfil/deleteActividad", {
      params: {
        id,
      },
    });
    getData();
    setAlert("Actividad eliminada");
  };

  return (
    <Container>
      {proyectos.length > 0 && (
        <SpaceBetween size="m">
          <Header variant="h3">
            2. Actividades de Investigación Registradas en el RAIS
            <ColumnLayout columns={1}>
              <Table
                wrapLines
                columnDefinitions={[
                  {
                    id: "periodo",
                    header: "Periodo",
                    cell: (item) => item.periodo, // ✅ CORRECTO
                    isRowHeader: true,
                  },
                  {
                    id: "categoria",
                    header: "Tipo de actividad",
                    cell: (item) => item.categoria, // ✅ CORRECTO
                  },
                  {
                    id: "sub_categoria",
                    header: "Sub tipo",
                    cell: (item) => item.sub_categoria,
                  },
                  {
                    id: "tipo_proyecto",
                    header: "Programa",
                    cell: (item) => item.tipo_proyecto,
                  },
                  {
                    id: "codigo_proyecto",
                    header: "Código",
                    cell: (item) => item.codigo_proyecto,
                  },
                  {
                    id: "name",
                    header: "Condición",
                    cell: (item) => item.name || "Sin condición",
                  },
                ]}
                items={proyectos || []} // Asegura que la tabla no falle si proyectos es undefined
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
            </ColumnLayout>
          </Header>
        </SpaceBetween>
      )}
      <SpaceBetween size="m">
        <Header
          variant="h3"
          description="
            Agregar actividad en caso usted considere que no cumple con, al
            menos, dos (2) tipos de actividades diferentes durante los últimos
            dos (2) años, de acuerdo al ítem c. del artículo 10 de la
            Directiva para Docente Investigador.
          "
          actions={
            <Button variant="primary" onClick={cargar} loading={loading}>
              Cargar actividad
            </Button>
          }
        >
          {proyectos.length > 0
            ? "3. Actividades Extras (Opcional)"
            : "2. Actividades Extras (Obligatorio)"}
        </Header>
        <ColumnLayout columns={2}>
          <FormField label="Tipo de actividad" errorText={formErrors.opcion}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.opcion}
              onChange={({ detail }) =>
                handleChange("opcion", detail.selectedOption)
              }
              options={
                antiguo == 1
                  ? [
                      {
                        value: 1,
                        label:
                          "A. Proyectos de investigación con financiamiento Institucional",
                      },
                      {
                        value: 4,
                        label:
                          "B. Proyectos de investigación con financiamiento externo",
                      },
                      {
                        value: 6,
                        label:
                          "C. Asesoría de trabajo de investigación o tesis",
                      },
                      {
                        value: 8,
                        label:
                          "D. Labor editorial de las publicaciones científicas",
                      },
                      {
                        value: 10,
                        label: "E. Comisiones en actividades de investigación",
                      },
                    ]
                  : [
                      {
                        value: 6,
                        label:
                          "C. Asesoría de trabajo de investigación o tesis",
                      },
                      {
                        value: 8,
                        label:
                          "D. Labor editorial de las publicaciones científicas",
                      },
                      {
                        value: 10,
                        label: "E. Comisiones en actividades de investigación",
                      },
                    ]
              }
            />
          </FormField>
          <FormField label="Documento de prueba" errorText={formErrors.file}>
            <FileUpload
              value={formValues.file}
              onChange={({ detail }) => handleChange("file", detail.value)}
              ref={(ref) => registerFileInput("file", ref)}
              showFileLastModified
              showFileSize
              showFileThumbnail
              constraintText="El archivo cargado no debe superar los 6 MB"
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
              accept=".pdf"
            />
          </FormField>
        </ColumnLayout>
        {alert != "" && (
          <Alert dismissible onDismiss={() => setAlert("")}>
            {alert}
          </Alert>
        )}
        <Table
          trackBy="id"
          wrapLines
          columnDefinitions={[
            {
              id: "tipo",
              header: "Tipo",
              cell: (item) => item.tipo,
              isRowHeader: true,
            },
            {
              id: "ver",
              header: "Ver",
              cell: (item) => (
                <Button
                  iconName="download"
                  variant="inline-icon"
                  href={item.url}
                  target="_blank"
                />
              ),
            },
            {
              id: "eliminar",
              header: "Eliminar",
              cell: (item) => (
                <Button
                  iconName="delete-marker"
                  variant="inline-icon"
                  onClick={() => deleteActividad(item.id)}
                />
              ),
            },
          ]}
          columnDisplay={[
            { id: "tipo", visible: true },
            { id: "ver", visible: true },
            { id: "eliminar", visible: true },
          ]}
          loading={loadingData}
          loadingText="Cargando datos"
          items={useData ? data : newData}
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
        />
      </SpaceBetween>
    </Container>
  );
};
