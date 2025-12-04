import { 
  Container,
  FileUpload, 
  FormField,  
  Link, 
} from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

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

const propsEnlaces = {
  external: "true",
  variant: "primary",
  fontSize: "body-s",
  target: "_blank",
};

export default ({ 
  value,
  value1,
  handleChange,
  files,
 }) => {
  return (
    <Container>
      <FormField
        label="Asistencia"
        description="Obligatoria para docentes a tiempo completo y dedicación exclusiva"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="asistencia_taller"
        />
      </FormField>
      <FormField
          label="Anexos"
          description={
            files["asistencia"] && (
              <>
                Ya ha cargado un{" "}
                <Link {...propsEnlaces} href={files["asistencia"].url}>
                  archivo
                </Link>{" "}
                el {files["asistencia"].fecha}
              </>
            )
          }
          stretch
        >
          <FileUpload
            {...propsRepetidas}
            value={value1}
            onChange={({ detail }) => {
              handleChange("file2", detail.value);
            }}
          />
        </FormField>
    </Container>
  );
};
