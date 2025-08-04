  import {
    Modal,
    FormField,
    Box,
    SpaceBetween,
    Form,
    Button,
    ColumnLayout,
    FileUpload,
    Link,
    Input,
    Select,
  } from "@cloudscape-design/components";
  import { useContext, useEffect, useState } from "react";
  import { useFormValidation } from "../../../../../../hooks/useFormValidation";
  import axiosBase from "../../../../../../api/axios";
  import NotificationContext from "../../../../../../providers/notificationProvider";
import { use } from "react";

  const initialForm = {
    codigo_orcid: "",
    apellido1: "",
    apellido2: "",
    nombres: "",
    sexo: null,
    institucion: "",
    pais: null,
    direccion1: "",
    doc_tipo: null,
    doc_numero: "",
    telefono_movil: "",
    carta: [],
  };

  const formRules = {
    codigo_orcid: { required: true, regex: /^(\d{4}-){3}\d{3}[\dX]$/ },
    apellido1: { required: true },
    apellido2: { required: true },
    nombres: { required: true },
    sexo: { required: true },
    institucion: { required: true },
    pais: { required: true },
    direccion1: { required: true, regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    doc_tipo: { required: true },
    doc_numero: { required: true },
    telefono_movil: { required: false },
    carta: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
  };

  export default ({ id, visible, setVisible, reload, existingStudents }) => {
    const [paises, setPaises] = useState([]);
    //  Context
    const { notifications, pushNotification } = useContext(NotificationContext);

    //  States
    const [loadingCreate, setLoadingCreate] = useState(false);

    //  Hooks
    const {
      formValues,
      formErrors,
      handleChange,
      validateForm,
      registerFileInput,
    } = useFormValidation(initialForm, formRules);

    const verificarDuplicadoEnBackend = async () => {
      try {
        const res = await axiosBase.post(
          "investigador/convocatorias/pro-ctie/verificarEstudianteExterno",
          {
            proyecto_id: id,
            apellido1: formValues.apellido1,
            apellido2: formValues.apellido2,
            nombres: formValues.nombres,
            doc_numero: formValues.doc_numero,
          }
        );
        return res.data; // { status: 'ok' } o { status: 'duplicate', field, message }
      } catch (error) {
        console.error("Error al verificar en backend:", error);
        return { status: 'error', message: 'No se pudo verificar duplicados.' };
      }
    };


    // Unir apellidos y nombres
    const getFullName = (apellido1, apellido2, nombres) => {
      return `${apellido1.toUpperCase()} ${apellido2.toUpperCase()}, ${nombres.toUpperCase()}`;
    };

    // Verificar si el estudiante ya existe en el sistema
    const checkIfStudentExists = (studentData) => {
      const studentFullName = getFullName(
        studentData.apellido1,
        studentData.apellido2,
        studentData.nombres
      );
      //console.log("Datos del estudiante que intenta agregar: ", studentData);
      //console.log("Lista de estudiantes existentes: ", existingStudents);
      // Revision de datos para ver si existe el estudiante
      const exists = existingStudents.some((student) => {
   
          const [apellidos, nombres] = student.nombre.split(", "); // 'NUÑEZ CANTO, LUIS ALBERTO'
          const [apellido1, apellido2] = apellidos.split(" "); // 'NUÑEZ CANTO'
          const existingFullName = getFullName(apellido1, apellido2, nombres); // 'NUÑEZ CANTO, LUIS ALBERTO'

        //console.log(
        //`Comparando: ${studentFullName} (nuevo estudiante) === ${existingFullName} (estudiante existente)`
        //);
        return (
          existingFullName === studentFullName ||
          student.dni === studentData.doc_numero ||
          student.correo_electronico === studentData.direccion1
        );
          //(student.dni && student.dni === studentData.doc_numero) ||
          //(student.correo_electronico && student.correo_electronico === studentData.direccion1)
        }
      );
      //console.log("¿El estudiante ya existe?", exists);
      return exists;
    };

    //  Functions
    const agregarIntegrante = async () => {
      if (checkIfStudentExists(formValues)) {
        pushNotification("Este estudiante ya esta agregado.", "warning", notifications.length +1 );
        return;
      }

      if (validateForm()) {
        setLoadingCreate(true);

        const validacion = await verificarDuplicadoEnBackend();

        if(validacion.status === "duplicate") {
          pushNotification(validacion.message, "warning", notifications.length + 1);
          setLoadingCreate(false);
          return;
        }

        if (validacion.status === "error") {
          pushNotification("Error al verificar duplicados", "error", notifications.length + 1);
          setLoadingCreate(false);
          return;
        }

        let formData = new FormData();
        formData.append("proyecto_id", id);
        formData.append("codigo_orcid", formValues.codigo_orcid);
        formData.append("apellido1", formValues.apellido1);
        formData.append("apellido2", formValues.apellido2);
        formData.append("nombres", formValues.nombres);
        formData.append("sexo", formValues.sexo.value);
        formData.append("institucion", formValues.institucion);
        formData.append("pais", formValues.pais.value);
        formData.append("direccion1", formValues.direccion1);
        formData.append("doc_tipo", formValues.doc_tipo.value);
        formData.append("doc_numero", formValues.doc_numero);
        formData.append("telefono_movil", formValues.telefono_movil);
        formData.append("file", formValues.carta[0]);

        try {
          const res = await axiosBase.postForm(
            "investigador/convocatorias/pro-ctie/agregarIntegranteExterno",
            formData
        );
        const data = res.data;
        pushNotification(data.detail, data.message, notifications.length + 1);
        setVisible(false);
        reload();
        } catch (error) {
          console.error("Error al registrar estudiante: ", error);
          pushNotification("Error al registrar estudiante.", "error", notifications.length + 1);
        }

        setLoadingCreate(false);
      }
    };
    
    useEffect(() => {
    axiosBase.get('investigador/convocatorias/pro-ctie/listarpaises')
    .then(res => setPaises(res.data))
    .catch(err => console.error("Error al cargar países", err));
    }, []);

    // Efecto para obtener los datos del estudiante
    useEffect(() => {
      if (Object.keys(formValues).length !== 0) {
        //console.log("Obteniendo datos del estudiante:", formValues);
      }
    }, [formValues]);

    return (
      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        size="large"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="normal" onClick={() => setVisible(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={agregarIntegrante}
                loading={loadingCreate}
              >
                Incluir miembro
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Incluir estudiante externo al proyecto"
      >
        <Form>
          <SpaceBetween size="xs">
            <FormField
              label="Código ORCID"
              stretch
              errorText={formErrors.codigo_orcid}
            >
              <Input
                value={formValues.codigo_orcid}
                onChange={({ detail }) =>
                  handleChange("codigo_orcid", detail.value)
                }
              />
            </FormField>
            <ColumnLayout columns={3}>
              <FormField
                label="Apellido paterno"
                stretch
                errorText={formErrors.apellido1}
              >
                <Input
                  value={formValues.apellido1}
                  onChange={({ detail }) =>
                    handleChange("apellido1", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Apellido materno"
                stretch
                errorText={formErrors.apellido2}
              >
                <Input
                  value={formValues.apellido2}
                  onChange={({ detail }) =>
                    handleChange("apellido2", detail.value)
                  }
                />
              </FormField>
              <FormField label="Nombres" stretch errorText={formErrors.nombres}>
                <Input
                  value={formValues.nombres}
                  onChange={({ detail }) => handleChange("nombres", detail.value)}
                />
              </FormField>
              <FormField label="Sexo" stretch errorText={formErrors.sexo}>
                <Select
                  controlId="sexo"
                  placeholder="Escoga una opción"
                  selectedOption={formValues.sexo}
                  onChange={({ detail }) =>
                    handleChange("sexo", detail.selectedOption)
                  }
                  options={[
                    {
                      label: "Masculino",
                      value: "M",
                    },
                    {
                      label: "Femenino",
                      value: "F",
                    },
                  ]}
                />
              </FormField>
              <FormField
                label="Universidad de origen"
                stretch
                errorText={formErrors.institucion}
              >
                <Input
                  value={formValues.institucion}
                  onChange={({ detail }) =>
                    handleChange("institucion", detail.value)
                  }
                />
              </FormField>
              <FormField label="País" stretch errorText={formErrors.pais}>
                <Select
                  controlId="pais"
                  placeholder="Escoga una opción"
                  selectedOption={formValues.pais}
                  onChange={({ detail }) =>
                    handleChange("pais", detail.selectedOption)
                  }
                  options={paises}
                />
              </FormField>
              <FormField
                label="Correo principal"
                stretch
                errorText={formErrors.direccion1}
              >
                <Input
                  value={formValues.direccion1}
                  onChange={({ detail }) =>
                    handleChange("direccion1", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Tipo doc."
                stretch
                errorText={formErrors.doc_tipo}
              >
                <Select
                  placeholder="Escoga una opción"
                  selectedOption={formValues.doc_tipo}
                  onChange={({ detail }) =>
                    handleChange("doc_tipo", detail.selectedOption)
                  }
                  options={[
                    {
                      label: "DNI",
                      value: "DNI",
                    },
                    {
                      label: "Carné de extranjería",
                      value: "CEX",
                    },
                    {
                      label: "Pasaporte",
                      value: "PASAPORTE",
                    },
                  ]}
                />
              </FormField>
              <FormField
                label="N° documento"
                stretch
                errorText={formErrors.doc_numero}
              >
                <Input
                  value={formValues.doc_numero}
                  onChange={({ detail }) =>
                    handleChange("doc_numero", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="N° celular"
                stretch
                errorText={formErrors.telefono_movil}
              >
                <Input
                  value={formValues.telefono_movil}
                  onChange={({ detail }) =>
                    handleChange("telefono_movil", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <FormField
              label="Carta de compromiso"
              description={
                <>
                  Puede descargar la plantilla de carta de compromiso en{" "}
                  <Link
                    href="/minio/templates/compromiso-confidencialidad.docx"
                    external="true"
                    variant="primary"
                    fontSize="body-s"
                    target="_blank"
                  >
                    este enlace.
                  </Link>
                </>
              }
              errorText={formErrors.carta}
            >
              <FileUpload
                value={formValues.carta}
                onChange={({ detail }) => handleChange("carta", detail.value)}
                ref={(ref) => registerFileInput("carta", ref)}
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
                accept=".docx, .doc,  .pdf"
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </Modal>
    );
  };
