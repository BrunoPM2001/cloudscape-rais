import {
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Link,
} from "@cloudscape-design/components";

export default ({
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  handleChange,
  files,
}) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <FormField
          label="Documento de conformidad firmada por el coordinador del GI"
          description={
            files.find((opt) => opt.categoria == "anexo1") ? (
              <>
                Cargado el{" "}
                {files.find((opt) => opt.categoria == "anexo1").comentario},{" "}
                <Link
                  href={files.find((opt) => opt.categoria == "anexo1").url}
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  descargar archivo.
                </Link>
              </>
            ) : (
              <></>
            )
          }
          stretch
        >
          <FileUpload
            value={value1}
            onChange={({ detail }) => {
              handleChange("file1", detail.value);
            }}
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
          />
        </FormField>
        <FormField
          label="Imágenes del equipo/gabinete instalado"
          description={
            files.find((opt) => opt.categoria == "anexo2") ? (
              <>
                Cargado el{" "}
                {files.find((opt) => opt.categoria == "anexo2").comentario},{" "}
                <Link
                  href={files.find((opt) => opt.categoria == "anexo2").url}
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  descargar archivo.
                </Link>
              </>
            ) : (
              <></>
            )
          }
          stretch
        >
          <FileUpload
            value={value2}
            onChange={({ detail }) => {
              handleChange("file2", detail.value);
            }}
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
          />
        </FormField>
        <FormField
          label="Imágenes de equipos complementarios al equipo/gabinete instalado"
          description={
            files.find((opt) => opt.categoria == "anexo3") ? (
              <>
                Cargado el{" "}
                {files.find((opt) => opt.categoria == "anexo3").comentario},{" "}
                <Link
                  href={files.find((opt) => opt.categoria == "anexo3").url}
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  descargar archivo.
                </Link>
              </>
            ) : (
              <></>
            )
          }
          stretch
        >
          <FileUpload
            value={value3}
            onChange={({ detail }) => {
              handleChange("file3", detail.value);
            }}
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
          />
        </FormField>
        <FormField
          label="Formato de control del uso del equipo, incluir uso compartido"
          description={
            files.find((opt) => opt.categoria == "anexo4") ? (
              <>
                Cargado el{" "}
                {files.find((opt) => opt.categoria == "anexo4").comentario},{" "}
                <Link
                  href={files.find((opt) => opt.categoria == "anexo4").url}
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  descargar archivo.
                </Link>
              </>
            ) : (
              <></>
            )
          }
          stretch
        >
          <FileUpload
            value={value4}
            onChange={({ detail }) => {
              handleChange("file4", detail.value);
            }}
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
          />
        </FormField>
        <FormField
          label="Plan de manejo de residuos, efluentes y/o emisiones"
          description={
            files.find((opt) => opt.categoria == "anexo5") ? (
              <>
                Cargado el{" "}
                {files.find((opt) => opt.categoria == "anexo5").comentario},{" "}
                <Link
                  href={files.find((opt) => opt.categoria == "anexo5").url}
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  descargar archivo.
                </Link>
              </>
            ) : (
              <>Solo si es que corresponde</>
            )
          }
          stretch
        >
          <FileUpload
            value={value5}
            onChange={({ detail }) => {
              handleChange("file5", detail.value);
            }}
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
          />
        </FormField>
        <FormField
          label="Otros documentos"
          description={
            files.find((opt) => opt.categoria == "anexo6") ? (
              <>
                Cargado el{" "}
                {files.find((opt) => opt.categoria == "anexo6").comentario},{" "}
                <Link
                  href={files.find((opt) => opt.categoria == "anexo6").url}
                  external="true"
                  variant="primary"
                  fontSize="body-s"
                  target="_blank"
                >
                  descargar archivo.
                </Link>
              </>
            ) : (
              <>Si fueran necesarios</>
            )
          }
          stretch
        >
          <FileUpload
            value={value6}
            onChange={({ detail }) => {
              handleChange("file6", detail.value);
            }}
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
          />
        </FormField>
      </ColumnLayout>
    </Container>
  );
};
