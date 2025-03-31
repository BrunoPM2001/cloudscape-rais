import {
  Autosuggest,
  Button,
  Container,
  Form,
  FormField,
  Header,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../api/axios";
import BaseLayout from "../../components/baseLayout.jsx";
import { useAutosuggest } from "../../../../hooks/useAutosuggest.js";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Constancias",
  },
  {
    text: "Reporte de constancias",
  },
];

const initialForm = {
  reporte: null,
};

const formRules = {
  reporte: { required: true },
};

const opt_constancias = [
  {
    label: "Estudios de Investigación",
    value: "1",
  },
  {
    label: "Grupo de Investigación",
    value: "2",
  },
  {
    label: "Registro de Publicaciones",
    value: "3",
  },
  {
    label: "Puntaje de Publicaciones",
    value: "4",
  },
  // {
  //   label: "Proyectos Multidisciplinarios",
  //   value: "5",
  // },
  {
    label: "Capitulo de Libro",
    value: "6",
  },
  {
    label: "Proyectos Equipamiento Científico",
    value: "7",
  },
  // {
  //   label: "Evaluador de Proyectos",
  //   value: "8",
  // },
  // {
  //   label: "Eventos UNMSM",
  //   value: "9",
  // },
  // {
  //   label: "No adeudar Informes",
  //   value: "10",
  // },
  {
    label: "Asesor de Tésis",
    value: "11",
  },
  // {
  //   label: "Participante Tesista",
  //   value: "12",
  // },
  // {
  //   label: "Asesor de Grupo",
  //   value: "13",
  // },
  // {
  //   label: "Miembro de Grupo",
  //   value: "14",
  // },
];

export default function Reporte_constancias() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [previsualizar, setPrevisualizar] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const reporte = async () => {
    if (validateForm()) {
      setLoadingReporte(true);
      let tipoConst;
      if (formValues.reporte.value == 4) {
        tipoConst = "getConstanciaPuntajePublicaciones";
      } else if (formValues.reporte.value == 3) {
        tipoConst = "getConstanciaPublicacionesCientificas";
      } else if (formValues.reporte.value == 2) {
        tipoConst = "getConstanciaGrupoInvestigacion";
      } else if (formValues.reporte.value == 1) {
        tipoConst = "getConstanciaEstudiosInvestigacion";
      } else if (formValues.reporte.value == 7) {
        tipoConst = "getConstanciaEquipamientoCientifico";
      } else if (formValues.reporte.value == 6) {
        tipoConst = "getConstanciaCapituloLibro";
      } else if (formValues.reporte.value == 10) {
        tipoConst = "getConstanciaNoDeuda";
      } else if (formValues.reporte.value == 11) {
        tipoConst = "getConstanciaTesisAsesoria";
      }
      const res = await axiosBase.get("investigador/constancias/" + tipoConst, {
        responseType: "blob",
      });
      setPrevisualizar(true);
      setLoadingReporte(false);
      const blob = await res.data;
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  };

  const solicitar = async () => {
    if (validateForm()) {
      setLoadingReporte(true);
      const res = await axiosBase.post(
        "investigador/constancias/solicitarConstancia",
        {
          tipo: formValues.reporte.value,
          tipo_desc: formValues.reporte.label,
        }
      );
      setLoadingReporte(false);
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Emisión de constancias sin valor legal"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Container>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="normal"
                loading={loadingReporte}
                onClick={reporte}
              >
                Previsualizar
              </Button>
              <Button
                variant="primary"
                loading={loadingReporte}
                onClick={solicitar}
                disabled={!previsualizar}
              >
                Solicitar constancia
              </Button>
            </SpaceBetween>
          }
          header={<Header variant="h2">Opciones del reporte</Header>}
        >
          <FormField
            label="Tipo de constancia"
            errorText={formErrors.reporte}
            stretch
          >
            <Select
              placeholder="Escoga un tipo de constancia"
              selectedOption={formValues.reporte}
              onChange={({ detail }) => {
                setPrevisualizar(false);
                handleChange("reporte", detail.selectedOption);
              }}
              options={opt_constancias}
            />
          </FormField>
        </Form>
      </Container>
    </BaseLayout>
  );
}
