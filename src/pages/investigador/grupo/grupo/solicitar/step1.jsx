import {
  Alert,
  Box,
  Container,
  FormField,
  Input,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation.js";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Solicitar",
  },
];

const initialForm = {
  grupo_nombre: "",
  grupo_nombre_corto: "",
};

const formRules = {
  grupo_nombre: { required: true, limitWords: 20 },
  grupo_nombre_corto: { required: true, limitLetters: 8 },
};

export default function Solicitar_grupo1() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState();

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar1", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    if (data.datos) {
      handleChange("grupo_nombre", data.datos.grupo_nombre);
      handleChange("grupo_nombre_corto", data.datos.grupo_nombre_corto);
      handleChange("id", id);
    }
    setLoading(false);
  };

  const siguiente = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const res = await axiosBase.post(
        "investigador/grupo/solicitar/registrar1",
        formValues
      );
      const info = res.data;
      if (info.message == "success") {
        const query = queryString.stringify({
          id: info.id,
        });
        window.location.href = "paso2?" + query;
      } else {
        pushNotification(info.detail, info.message, notifications.length + 1);
      }
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {data.estado ? (
            <Wizard
              onNavigate={siguiente}
              activeStepIndex={0}
              isLoadingNextStep={loadingBtn}
              onCancel={() => {
                window.location.href = "../";
              }}
              steps={[
                {
                  title: "Nombre del grupo",
                  description: "Nombre y nombre corto del GI",
                  content: (
                    <Container>
                      <SpaceBetween size="m">
                        <FormField
                          label="Nombre"
                          description={
                            "Máximo 20 palabras (" +
                            (formValues.grupo_nombre == ""
                              ? 0
                              : formValues.grupo_nombre.trim().split(/\s+/)
                                  .length) +
                            "/20)"
                          }
                          errorText={formErrors.grupo_nombre}
                          stretch
                        >
                          <Input
                            value={formValues.grupo_nombre}
                            onChange={({ detail }) =>
                              handleChange("grupo_nombre", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Nombre corto"
                          description={
                            "Máximo 8 letras (" +
                            formValues.grupo_nombre_corto.length +
                            "/8)"
                          }
                          errorText={formErrors.grupo_nombre_corto}
                          stretch
                        >
                          <Input
                            value={formValues.grupo_nombre_corto}
                            onChange={({ detail }) =>
                              handleChange("grupo_nombre_corto", detail.value)
                            }
                          />
                        </FormField>
                      </SpaceBetween>
                    </Container>
                  ),
                },
                {
                  title: "Coordinador del grupo",
                },
                {
                  title: "Integrantes del grupo",
                },
                {
                  title: "Envío de publicación",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede solicitar la creación de un nuevo grupo"
                type="warning"
              >
                {data.message.map((item) => {
                  return <li>{item}</li>;
                })}
              </Alert>
            </>
          )}
        </>
      )}
    </BaseLayout>
  );
}
