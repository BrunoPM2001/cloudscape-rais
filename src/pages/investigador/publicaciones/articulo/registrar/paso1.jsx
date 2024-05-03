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

export default function () {
  //  State
  const [loading, setLoading] = useState("loading");
  const [revistasIndexadas, setRevistasIndexadas] = useState([]);
  const [form, setForm] = useState({
    doi: "",
    tipo: "",
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
  });

  //  Function
  const listaRevistasIndexadas = async () => {
    try {
      setLoading("loading");
      const res = await fetch(
        "http://localhost:8000/api/investigador/publicaciones/listadoRevistasIndexadas",
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (!res.ok) {
        localStorage.clear();
        setLoading("error");
        setRevistasIndexadas([]);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setRevistasIndexadas(data);
        setLoading("finished");
      }
    } catch (error) {
      setRevistasIndexadas([]);
      setLoading("error");
      console.log(error);
    }
  };

  //  Effect
  useEffect(() => {
    listaRevistasIndexadas();
  }, []);

  return (
    <Container>
      <SpaceBetween size="l">
        <Form variant="embedded" header={<Header>Datos del artículo</Header>}>
          <SpaceBetween direction="vertical" size="s">
            <ColumnLayout columns={2}>
              <FormField label="DOI">
                <Input
                  inputMode="url"
                  value={form.doi}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      doi: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Tipo de artículo">
                <Select
                  selectedOption={form.tipo}
                  onChange={({ detail }) => {
                    setForm((prev) => ({
                      ...prev,
                      tipo: detail.selectedOption,
                    }));
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
            <FormField label="Título" stretch>
              <Input
                value={form.titulo}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    titulo: detail.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Palabras clave" stretch>
              <Input
                value={form.palabras_clave}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    palabras_clave: detail.value,
                  }))
                }
              />
            </FormField>
            <ColumnLayout columns={3}>
              <FormField label="Página inicio">
                <Input
                  inputMode="numeric"
                  value={form.pagina_inicio}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      pagina_inicio: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Página final">
                <Input
                  inputMode="numeric"
                  value={form.pagina_fin}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      pagina_fin: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Año de publicación">
                <Input
                  inputMode="numeric"
                  value={form.año_publicacion}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      año_publicacion: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </Form>
        <Form variant="embedded" header={<Header>Datos de la revista</Header>}>
          <SpaceBetween direction="vertical" size="s">
            <FormField label="Revista" stretch>
              <Input
                value={form.revista}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    revista: detail.value,
                  }))
                }
              />
            </FormField>
            <ColumnLayout columns={4}>
              <FormField label="ISSN">
                <Input
                  value={form.issn}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      issn: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="ISSN-E">
                <Input
                  value={form.issne}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      issne: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Volumen">
                <Input
                  value={form.volumen}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      volumen: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Número">
                <Input
                  value={form.numero}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      numero: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
            <FormField label="Publicación indexada en" stretch>
              <Multiselect
                statusType={loading}
                selectedOptions={form.indexada}
                filteringType="auto"
                placeholder="Escoga las revistas"
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    indexada: detail.selectedOptions,
                  }))
                }
                options={[
                  {
                    label: "Grupo de revistas",
                    options: revistasIndexadas,
                  },
                ]}
              ></Multiselect>
            </FormField>
            <FormField label="URL de la publicación" stretch>
              <Input
                inputMode="url"
                value={form.url}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    url: detail.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Anexo">
              <FileUpload
                value={form.anexo}
                onChange={({ detail }) =>
                  setForm((prev) => ({
                    ...prev,
                    anexo: detail.value,
                  }))
                }
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
