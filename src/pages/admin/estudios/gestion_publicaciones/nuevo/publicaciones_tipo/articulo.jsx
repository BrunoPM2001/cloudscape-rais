import {
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  Container,
  DatePicker,
  FormField,
  Header,
  Input,
  Multiselect,
  Select,
  SpaceBetween,
  StatusIndicator,
  Textarea,
  TokenGroup,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  doi: "",
  art_tipo: null,
  titulo: "",
  palabras_clave_input: "",
  palabras_clave: [],
  pagina_inicial: "",
  pagina_final: "",
  fecha_publicacion: "",
  publicacion_nombre: "",
  issn: "",
  issn_e: "",
  volumen: "",
  edicion: "",
  indexada: [],
  wos: [],
  url: "",
  resumen: "",
};

const formRules = {
  doi: { required: false },
  art_tipo: { required: true },
  titulo: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  pagina_inicial: { required: true },
  pagina_final: { required: true },
  fecha_publicacion: { required: true },
  publicacion_nombre: { required: true },
  issn: { required: true },
  issn_e: { required: false },
  volumen: { required: true },
  edicion: { required: true },
  indexada: { required: false },
  url: { required: false },
};

export default function ({ data }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [revistasIndexadas, setRevistasIndexadas] = useState([]);
  const [wos, setWos] = useState([]);
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/publicaciones/searchRevista");

  const getData = () => {
    setRevistasIndexadas(data.revistas);
    setWos(data.wos);
  };

  const guardarData = async () => {
    if (validateForm()) {
      setLoadingGuardar(true);
      const res = await axiosBase.post("admin/estudios/publicaciones/paso1", {
        ...formValues,
        tipo: "articulo",
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoadingGuardar(false);
      if (data.message == "success") {
        const query = queryString.stringify({
          id: data.id,
        });
        window.location.href = "detalle?" + query;
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Header
            actions={
              <Button
                variant="primary"
                loading={loadingGuardar}
                onClick={guardarData}
              >
                Guardar datos
              </Button>
            }
          >
            Datos del artículo
          </Header>
        }
      >
        <SpaceBetween size="m">
          <ColumnLayout columns={2}>
            <FormField
              label="DOI"
              stretch
              info={
                <Button
                  iconName="external"
                  variant="inline-icon"
                  target="_blank"
                  href={`https://doi.org/${formValues.doi ?? ""}`}
                />
              }
              errorText={formErrors.doi}
            >
              <Input
                placeholder="Escriba el doi"
                value={formValues.doi}
                onChange={({ detail }) => handleChange("doi", detail.value)}
              />
            </FormField>
            <FormField
              label="Tipo de artículo"
              stretch
              errorText={formErrors.art_tipo}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.art_tipo}
                onChange={({ detail }) => {
                  handleChange("art_tipo", detail.selectedOption);
                }}
                options={[
                  { value: "Artículo original" },
                  { value: "Artículo de revisión" },
                  { value: "Comunicación o nota corta" },
                ]}
              />
            </FormField>
          </ColumnLayout>
          <FormField label="Título" stretch errorText={formErrors.titulo}>
            <Input
              placeholder="Escriba el título de la publicación"
              value={formValues.titulo}
              onChange={({ detail }) => handleChange("titulo", detail.value)}
            />
          </FormField>
          <ColumnLayout columns={3}>
            <FormField
              label="Página inicio"
              stretch
              errorText={formErrors.pagina_inicial}
            >
              <Input
                placeholder="N° de la pág. inicial"
                value={formValues.pagina_inicial}
                onChange={({ detail }) =>
                  handleChange("pagina_inicial", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Página final"
              stretch
              errorText={formErrors.pagina_final}
            >
              <Input
                placeholder="N° de la pág. final"
                value={formValues.pagina_final}
                onChange={({ detail }) =>
                  handleChange("pagina_final", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha de publicación"
              constraintText="En caso no tenga la fecha exacta coloque 1ero de enero del año de publicación"
              stretch
              errorText={formErrors.fecha_publicacion}
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_publicacion}
                onChange={({ detail }) =>
                  handleChange("fecha_publicacion", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField
            label="URL de la publicación"
            stretch
            info={
              <Button
                iconName="external"
                variant="inline-icon"
                target="_blank"
                href={formValues.url ?? ""}
              />
            }
            errorText={formErrors.url}
          >
            <Input
              placeholder="Escriba la URL de su publicación"
              value={formValues.url}
              onChange={({ detail }) => handleChange("url", detail.value)}
            />
          </FormField>
          <FormField
            label="Resumen / Abstract"
            stretch
            errorText={formErrors.resumen}
          >
            <Textarea
              placeholder="Resumen del artículo"
              value={formValues.resumen}
              onChange={({ detail }) => handleChange("resumen", detail.value)}
            />
          </FormField>
          <FormField
            label="Palabras clave"
            description={
              <StatusIndicator type="warning">
                <Box
                  variant="strong"
                  color="text-status-warning"
                  fontSize="body-s"
                >
                  Presionar la tecla de enter para añadir una palabra
                </Box>
              </StatusIndicator>
            }
            stretch
            errorText={formErrors.palabras_clave}
          >
            <Input
              placeholder="Escriba las palabras clave de su publicación"
              value={formValues.palabras_clave_input}
              onChange={({ detail }) => {
                handleChange("palabras_clave_input", detail.value);
              }}
              onKeyDown={({ detail }) => {
                if (
                  detail.key == "Enter" &&
                  formValues.palabras_clave_input != ""
                ) {
                  handleChange("palabras_clave", [
                    ...formValues.palabras_clave,
                    { label: formValues.palabras_clave_input },
                  ]);
                  handleChange("palabras_clave_input", "");
                }
              }}
            />
            <TokenGroup
              items={formValues.palabras_clave}
              onDismiss={({ detail: { itemIndex } }) => {
                handleChange("palabras_clave", [
                  ...formValues.palabras_clave.slice(0, itemIndex),
                  ...formValues.palabras_clave.slice(itemIndex + 1),
                ]);
              }}
            />
          </FormField>
        </SpaceBetween>
      </Container>
      <Container header={<Header>Datos de la revista</Header>}>
        <SpaceBetween size="m">
          <FormField
            label="Revista"
            stretch
            errorText={formErrors.publicacion_nombre}
          >
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                handleChange("publicacion_nombre", detail.value);
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.value != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  handleChange("publicacion_nombre", rest.revista);
                  handleChange("issn", rest.issn);
                  handleChange("issn_e", rest.issne);
                  setAvoidSelect(false);
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="Issn, issn-e o nombre de la revista"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados"
            />
          </FormField>
          <ColumnLayout columns={4}>
            <FormField
              label="ISSN"
              stretch
              info={
                <Button
                  iconName="external"
                  variant="inline-icon"
                  target="_blank"
                  href={`https://portal.issn.org/resource/ISSN/${
                    formValues.issn ?? ""
                  }`}
                />
              }
              errorText={formErrors.issn}
            >
              <Input
                placeholder="Escriba el ISSN"
                value={formValues.issn}
                onChange={({ detail }) => handleChange("issn", detail.value)}
              />
            </FormField>
            <FormField
              label="ISSN-E"
              stretch
              info={
                <Button
                  iconName="external"
                  variant="inline-icon"
                  target="_blank"
                  href={`https://portal.issn.org/resource/ISSN/${
                    formValues.issn_e ?? ""
                  }`}
                />
              }
              errorText={formErrors.issn_e}
            >
              <Input
                placeholder="Escriba el ISSN-E"
                value={formValues.issn_e}
                onChange={({ detail }) => handleChange("issn_e", detail.value)}
              />
            </FormField>
            <FormField label="Volumen" stretch errorText={formErrors.volumen}>
              <Input
                placeholder="Escriba el volumen de su publicación"
                value={formValues.volumen}
                onChange={({ detail }) => handleChange("volumen", detail.value)}
              />
            </FormField>
            <FormField label="Número" stretch errorText={formErrors.edicion}>
              <Input
                placeholder="Escriba el nro de su publicación"
                value={formValues.edicion}
                onChange={({ detail }) => handleChange("edicion", detail.value)}
              />
            </FormField>
          </ColumnLayout>
          <Container>
            <FormField
              label="Publicación indexada en"
              stretch
              errorText={formErrors.indexada}
            >
              <SpaceBetween size="m">
                <Multiselect
                  statusType="finished"
                  virtualScroll
                  filteringType="auto"
                  placeholder="Escoga las revistas"
                  empty="No hay revistas"
                  selectedOptions={formValues.indexada}
                  onChange={({ detail }) =>
                    handleChange("indexada", detail.selectedOptions)
                  }
                  options={[
                    {
                      label: "Grupo de revistas",
                      options: revistasIndexadas,
                    },
                  ]}
                />
              </SpaceBetween>
            </FormField>
          </Container>
          <Container>
            <FormField
              label="Base de datos de la colección principal WOS"
              stretch
            >
              <SpaceBetween size="m">
                <Multiselect
                  statusType="finished"
                  virtualScroll
                  filteringType="auto"
                  placeholder="Escoga las revistas"
                  selectedOptions={formValues.wos}
                  onChange={({ detail }) =>
                    handleChange("wos", detail.selectedOptions)
                  }
                  options={wos}
                />
              </SpaceBetween>
            </FormField>
          </Container>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
