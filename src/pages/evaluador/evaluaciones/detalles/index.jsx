import {
  Alert,
  Button,
  Container,
  FormField,
  SpaceBetween,
  Spinner,
  Textarea,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
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

const formRules = {
  comentario: { required: true },
};

export default function Evaluador_proyecto() {
  //  States
  const [data, setData] = useState([]);
  const [extra, setExtra] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingExtra, setLoadingExtra] = useState(true);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
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
    if (data.cerrado) {
      handleChange("comentario", data.comentario.comentario);
    }
  };

  const getMoreData = async () => {
    setLoadingExtra(true);
    const res = await axiosBase.get(
      "evaluador/evaluaciones/visualizarProyecto",
      {
        params: {
          proyecto_id,
        },
      }
    );
    const data = res.data;
    setExtra(data);
    setLoadingExtra(false);
  };

  //  Effects
  useEffect(() => {
    getData();
    getMoreData();
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
          setData={setData}
          ficha={data.comentario?.ficha}
          loading={loading}
          proyecto_id={proyecto_id}
          reload={getData}
          comentario={formValues.comentario}
          validateForm={validateForm}
          puntaje_total={data.total}
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
        <VisorHtml loading={loadingExtra} data={extra} />
      </SpaceBetween>
    </BaseLayout>
  );
}
