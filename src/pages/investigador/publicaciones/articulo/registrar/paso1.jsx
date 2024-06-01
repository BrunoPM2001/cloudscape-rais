import {
  ColumnLayout,
  Container,
  FileUpload,
  Form,
  FormField,
  Header,
  Input,
  Multiselect,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  doi: "",
  tipo: null,
  titulo: "",
  palabras_clave: "",
  pagina_inicio: "",
  pagina_fin: "",
  año_publicacion: "",
  revista: "",
  issn: "",
  issne: "",
  volumen: "",
  numero: "",
  indexada: [],
  url: "",
  anexo: [],
};

const formRules = {
  doi: { required: false },
  tipo: { required: true },
  titulo: { required: true },
  palabras_clave: { required: false },
  pagina_inicio: { required: true },
  pagina_fin: { required: true },
  año_publicacion: { required: true },
  revista: { required: true },
  issn: { required: false },
  issne: { required: false },
  volumen: { required: false },
  numero: { required: false },
  indexada: { required: false },
  url: { required: false },
  anexo: { required: false },
};

export default function ({ index }) {
  //  State
  const [loading, setLoading] = useState("loading");
  const [revistasIndexadas, setRevistasIndexadas] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Function
  const listaRevistasIndexadas = async () => {
    setLoading("loading");
    const res = await axiosBase.get(
      "investigador/publicaciones/listadoRevistasIndexadas"
    );
    const data = res.data;
    setRevistasIndexadas(data);
    setLoading("finished");
  };

  const registrar = async () => {
    if (validateForm()) {
      console.log("Done!");
    }
  };

  //  Effect
  useEffect(() => {
    listaRevistasIndexadas();
  }, []);

  useEffect(() => {
    registrar();
  }, [index]);

  return (
    <Container>
      <SpaceBetween size="l">
        <Form variant="embedded" header={<Header>Datos del artículo</Header>}>
          <SpaceBetween direction="vertical" size="s">
            <ColumnLayout columns={2}>
              <FormField label="DOI" stretch errorText={formErrors.doi}>
                <Input
                  value={formValues.doi}
                  onChange={({ detail }) => handleChange("doi", detail.value)}
                />
              </FormField>
              <FormField
                label="Tipo de artículo"
                stretch
                errorText={formErrors.tipo}
              >
                <Select
                  selectedOption={formValues.tipo}
                  onChange={({ detail }) => {
                    handleChange("tipo", detail.value);
                  }}
                  options={[
                    { label: "Artículo original", value: "1" },
                    { label: "Artículo de revisión", value: "2" },
                    {
                      label: "Comunicación o nota corta",
                      value: "3",
                    },
                  ]}
                ></Select>
              </FormField>
            </ColumnLayout>
            <FormField label="Título" stretch errorText={formErrors.titulo}>
              <Input
                value={formValues.titulo}
                onChange={({ detail }) => handleChange("titulo", detail.value)}
              />
            </FormField>
            <FormField
              label="Palabras clave"
              stretch
              errorText={formErrors.palabras_clave}
            >
              <Input
                value={formValues.palabras_clave}
                onChange={({ detail }) =>
                  handleChange("palabras_clave", detail.value)
                }
              />
            </FormField>
            <ColumnLayout columns={3}>
              <FormField
                label="Página inicio"
                stretch
                errorText={formErrors.pagina_inicio}
              >
                <Input
                  inputMode="numeric"
                  value={formValues.pagina_inicio}
                  onChange={({ detail }) =>
                    handleChange("pagina_inicio", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Página final"
                stretch
                errorText={formErrors.pagina_fin}
              >
                <Input
                  inputMode="numeric"
                  value={formValues.pagina_fin}
                  onChange={({ detail }) =>
                    handleChange("pagina_fin", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Año de publicación"
                stretch
                errorText={formErrors.año_publicacion}
              >
                <Input
                  inputMode="numeric"
                  value={formValues.año_publicacion}
                  onChange={({ detail }) =>
                    handleChange("año_publicacion", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <Header>Datos de la revista</Header>
            <FormField label="Revista" stretch errorText={formErrors.revista}>
              <Input
                value={formValues.revista}
                onChange={({ detail }) => handleChange("revista", detail.value)}
              />
            </FormField>
            <ColumnLayout columns={4}>
              <FormField label="ISSN" stretch errorText={formErrors.issn}>
                <Input
                  value={formValues.issn}
                  onChange={({ detail }) => handleChange("issn", detail.value)}
                />
              </FormField>
              <FormField label="ISSN-E" stretch errorText={formErrors.issne}>
                <Input
                  value={formValues.issne}
                  onChange={({ detail }) => handleChange("issne", detail.value)}
                />
              </FormField>
              <FormField label="Volumen" stretch errorText={formErrors.volumen}>
                <Input
                  value={formValues.volumen}
                  onChange={({ detail }) =>
                    handleChange("volumen", detail.value)
                  }
                />
              </FormField>
              <FormField label="Número" stretch errorText={formErrors.numero}>
                <Input
                  value={formValues.numero}
                  onChange={({ detail }) =>
                    handleChange("numero", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <FormField
              label="Publicación indexada en"
              stretch
              errorText={formErrors.indexada}
            >
              <Multiselect
                statusType={loading}
                filteringType="auto"
                placeholder="Escoga las revistas"
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
              ></Multiselect>
            </FormField>
            <FormField
              label="URL de la publicación"
              stretch
              errorText={formErrors.url}
            >
              <Input
                value={formValues.url}
                onChange={({ detail }) => handleChange("url", detail.value)}
              />
            </FormField>
            <FormField label="Anexo">
              <FileUpload
                value={formValues.anexo}
                onChange={({ detail }) => handleChange("anexo", detail.value)}
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
                accept=".jpeg, .jpg, .png,  .pdf"
                fileErrors={["This is an error message related to this file"]}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </SpaceBetween>
    </Container>
  );
}
