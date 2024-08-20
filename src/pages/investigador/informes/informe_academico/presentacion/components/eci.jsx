import {
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  SpaceBetween,
  Wizard,
} from "@cloudscape-design/components";
import { useState } from "react";
import Tiptap from "../../../../components/tiptap";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  estado: null,
  fecha_presentacion: null,
  registro_nro_vrip: null,
  fecha_registro_csi: null,
  observaciones: null,
  observaciones_admin: null,
  resumen_ejecutivo: null,
  palabras_clave: null,
  fecha_evento: null,
  fecha_informe_tecnico: null,
  objetivos_taller: null,
  resultados_taller: null,
  propuestas_taller: null,
  conclusion_taller: null,
  recomendacion_taller: null,
  asistencia_taller: null,
  infinal1: null,
  infinal2: null,
  infinal3: null,
  infinal4: null,
  infinal5: null,
  infinal6: null,
  infinal7: null,
  infinal8: null,
  infinal9: null,
  infinal10: null,
  infinal11: null,
  estado_trabajo: null,
  file1: [],
  file2: [],
  file3: [],
  file4: [],
  file5: [],
  file6: [],
};

const formRules = {
  file1: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
  file2: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
  file3: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
  file4: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
  file5: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
  file6: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  constraintText: "El archivo cargado no debe superar los 6 MB",
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

export default () => {
  //  States
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions

  const getData = async () => {
    const res = await axiosBase.get(
      "investigador/informes/informe_academico/getData"
    );
    //  Setear la variable files para obtener las keys y buckets si es que hubiera archivos cargados
  };

  return (
    <Wizard
      onNavigate={({ detail }) => setStep(detail.requestedStepIndex)}
      activeStepIndex={step}
      onCancel={() => {
        window.location.href = "../informeAcademico";
      }}
      i18nStrings={{
        optional: "",
      }}
      allowSkipTo
      steps={[
        {
          title: "Información",
          description:
            "Programa de equipamiento científico para investigación de la UNMSM",
          content: (
            <Container>
              <SpaceBetween size="m">
                <div>
                  <Box variant="awsui-key-label">Título</Box>
                  <Box>
                    Equipo para creación de filamentos para impresión 3D a nivel
                    de laboratorio para la innovación de materiales compuestos y
                    poliméricos tipo PLA, ABS, TPU, TPE, PET, PEEK, PETG y PEKK
                  </Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Código</Box>
                  <Box>C230710043e</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Resolución</Box>
                  <Box>010099-R-23</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Año</Box>
                  <Box>2023</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Grupo </Box>
                  <Box>
                    QUIMICA CUANTICA Y NUEVOS MATERIALES PARA LA INNOVACION
                    TECNOLOGICA
                  </Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Facultad</Box>
                  <Box>Química e Ingeniería Química</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Coordinador</Box>
                  <Box>GUZMAN DUXTAN ALDO JAVIER</Box>
                </div>
              </SpaceBetween>
            </Container>
          ),
        },
        {
          title: "Resumen",
          description: "Breve descripción de los equipos/gabinete adquiridos",
          content: (
            <Tiptap
              value={formValues.resumen_ejecutivo}
              handleChange={handleChange}
              name="resumen_ejecutivo"
            />
          ),
          isOptional: true,
        },
        {
          title: "Proceso de instalación",
          description:
            "Se expone todo el proceso de instalación del equipo/gabinete",
          content: (
            <Tiptap
              value={formValues.infinal1}
              handleChange={handleChange}
              name="infinal1"
            />
          ),
          isOptional: true,
        },
        {
          title: "Funcionamiento",
          description: "Describir la situación actual del funcionamiento",
          content: (
            <Tiptap
              value={formValues.infinal2}
              handleChange={handleChange}
              name="infinal2"
            />
          ),
          isOptional: true,
        },
        {
          title: "Gestión de uso",
          description: "Describir la situación actual del funcionamiento",
          content: (
            <Tiptap
              value={formValues.infinal3}
              handleChange={handleChange}
              name="infinal3"
            />
          ),
          isOptional: true,
        },
        {
          title: "Aplicación práctica e impacto",
          description:
            "Señale las aplicaciones prácticas más importantes, el aporte o conclusión principal e impacto para la sociedad",
          content: (
            <Tiptap
              value={formValues.infinal4}
              handleChange={handleChange}
              name="infinal4"
            />
          ),
          isOptional: true,
        },
        {
          title: "Impacto - uso",
          description:
            "Indicar los resultados del uso del equipo/gabinete como: publicación, tesis o patente, incluir usos en colaboración y/o compartido",
          content: (
            <Tiptap
              value={formValues.infinal5}
              handleChange={handleChange}
              name="infinal5"
            />
          ),
          isOptional: true,
        },
        {
          title: "Documentos adjuntos",
          description: "Archivos adjuntos",
          content: (
            <Container>
              <ColumnLayout columns={2}>
                <FormField
                  label="Documento de conformidad firmada por el coordinador del GI"
                  // description={
                  //   files.find((opt) => opt.categoria == "anexo1") ? (
                  //     <>
                  //       Cargado el{" "}
                  //       {files.find((opt) => opt.categoria == "anexo1").comentario},{" "}
                  //       <Link
                  //         href={files.find((opt) => opt.categoria == "anexo1").url}
                  //         external="true"
                  //         variant="primary"
                  //         fontSize="body-s"
                  //         target="_blank"
                  //       >
                  //         descargar archivo.
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <></>
                  //   )
                  // }
                  stretch
                  errorText={formErrors.file1}
                >
                  <FileUpload
                    {...propsRepetidas}
                    value={formValues.file1}
                    onChange={({ detail }) => {
                      handleChange("file1", detail.value);
                    }}
                  />
                </FormField>
                <FormField
                  label="Imágenes del equipo/gabinete instalado"
                  // description={
                  //   files.find((opt) => opt.categoria == "anexo2") ? (
                  //     <>
                  //       Cargado el{" "}
                  //       {
                  //         files.find((opt) => opt.categoria == "anexo2")
                  //           .comentario
                  //       }
                  //       ,{" "}
                  //       <Link
                  //         href={
                  //           files.find((opt) => opt.categoria == "anexo2").url
                  //         }
                  //         external="true"
                  //         variant="primary"
                  //         fontSize="body-s"
                  //         target="_blank"
                  //       >
                  //         descargar archivo.
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <></>
                  //   )
                  // }
                  stretch
                  errorText={formErrors.file2}
                >
                  <FileUpload
                    {...propsRepetidas}
                    value={formValues.file2}
                    onChange={({ detail }) => {
                      handleChange("file2", detail.value);
                    }}
                  />
                </FormField>
                <FormField
                  label="Imágenes de equipos complementarios al equipo/gabinete instalado"
                  // description={
                  //   files.find((opt) => opt.categoria == "anexo3") ? (
                  //     <>
                  //       Cargado el{" "}
                  //       {
                  //         files.find((opt) => opt.categoria == "anexo3")
                  //           .comentario
                  //       }
                  //       ,{" "}
                  //       <Link
                  //         href={
                  //           files.find((opt) => opt.categoria == "anexo3").url
                  //         }
                  //         external="true"
                  //         variant="primary"
                  //         fontSize="body-s"
                  //         target="_blank"
                  //       >
                  //         descargar archivo.
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <></>
                  //   )
                  // }
                  stretch
                  errorText={formErrors.file3}
                >
                  <FileUpload
                    {...propsRepetidas}
                    value={formValues.file3}
                    onChange={({ detail }) => {
                      handleChange("file3", detail.value);
                    }}
                  />
                </FormField>
                <FormField
                  label="Formato de control del uso del equipo, incluir uso compartido"
                  // description={
                  //   files.find((opt) => opt.categoria == "anexo4") ? (
                  //     <>
                  //       Cargado el{" "}
                  //       {
                  //         files.find((opt) => opt.categoria == "anexo4")
                  //           .comentario
                  //       }
                  //       ,{" "}
                  //       <Link
                  //         href={
                  //           files.find((opt) => opt.categoria == "anexo4").url
                  //         }
                  //         external="true"
                  //         variant="primary"
                  //         fontSize="body-s"
                  //         target="_blank"
                  //       >
                  //         descargar archivo.
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <></>
                  //   )
                  // }
                  stretch
                  errorText={formErrors.file4}
                >
                  <FileUpload
                    {...propsRepetidas}
                    value={formValues.file4}
                    onChange={({ detail }) => {
                      handleChange("file4", detail.value);
                    }}
                  />
                </FormField>
                <FormField
                  label="Plan de manejo de residuos, efluentes y/o emisiones"
                  // description={
                  //   files.find((opt) => opt.categoria == "anexo5") ? (
                  //     <>
                  //       Cargado el{" "}
                  //       {
                  //         files.find((opt) => opt.categoria == "anexo5")
                  //           .comentario
                  //       }
                  //       ,{" "}
                  //       <Link
                  //         href={
                  //           files.find((opt) => opt.categoria == "anexo5").url
                  //         }
                  //         external="true"
                  //         variant="primary"
                  //         fontSize="body-s"
                  //         target="_blank"
                  //       >
                  //         descargar archivo.
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <>Solo si es que corresponde</>
                  //   )
                  // }
                  stretch
                  errorText={formErrors.file5}
                >
                  <FileUpload
                    {...propsRepetidas}
                    value={formValues.file5}
                    onChange={({ detail }) => {
                      handleChange("file5", detail.value);
                    }}
                  />
                </FormField>
                <FormField
                  label="Otros documentos"
                  // description={
                  //   files.find((opt) => opt.categoria == "anexo6") ? (
                  //     <>
                  //       Cargado el{" "}
                  //       {
                  //         files.find((opt) => opt.categoria == "anexo6")
                  //           .comentario
                  //       }
                  //       ,{" "}
                  //       <Link
                  //         href={
                  //           files.find((opt) => opt.categoria == "anexo6").url
                  //         }
                  //         external="true"
                  //         variant="primary"
                  //         fontSize="body-s"
                  //         target="_blank"
                  //       >
                  //         descargar archivo.
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <>Si fueran necesarios</>
                  //   )
                  // }
                  stretch
                  errorText={formErrors.file6}
                >
                  <FileUpload
                    {...propsRepetidas}
                    value={formValues.file6}
                    onChange={({ detail }) => {
                      handleChange("file6", detail.value);
                    }}
                  />
                </FormField>
              </ColumnLayout>
            </Container>
          ),
          isOptional: true,
        },
        {
          title: "Dificultades",
          description: "Dificultades encontradas",
          content: (
            <Tiptap
              value={formValues.infinal6}
              handleChange={handleChange}
              name="infinal6"
            />
          ),
          isOptional: true,
        },
      ]}
    />
  );
};
