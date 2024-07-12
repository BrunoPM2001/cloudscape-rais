import {
  Container,
  FormField,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import Criterios from "./criterios";
import VisorHtml from "./visorHtml";

const breadcrumbs = [
  {
    text: "Evaluador",
    href: "/evaluador",
  },
  {
    text: "Evaluaciones",
  },
  {
    text: "Proyectos",
  },
];

const initialForm = {
  comentario: "",
};

export default function Evaluador_proyecto() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange } = useFormValidation(
    initialForm,
    {}
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "evaluador/evaluaciones/criteriosEvaluacion",
      {
        params: {
          proyecto_id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
    handleChange("comentario", data.comentario.comentario);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Evaluar proyecto"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="m">
        <Criterios
          cerrado={data.cerrado}
          data={data.criterios}
          loading={loading}
          proyecto_id={proyecto_id}
          reload={getData}
          comentario={formValues.comentario}
        />
        <Container>
          {loading ? (
            <>
              <Spinner /> Cargando datos
            </>
          ) : (
            <FormField
              label="Comentarios"
              stretch
              errorText={formErrors.comentario}
            >
              <Textarea
                disabled={data.cerrado}
                placeholder="Comentarios de la evaluación"
                rows={4}
                value={formValues.comentario}
                onChange={({ detail }) =>
                  handleChange("comentario", detail.value)
                }
              />
            </FormField>
          )}
        </Container>
        <VisorHtml />
      </SpaceBetween>
    </BaseLayout>
  );
}
