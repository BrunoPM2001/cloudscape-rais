import {
  Alert,
  Box,
  Container,
  FormField,
  Header,
  Input,
  Pagination,
  SpaceBetween,
  Spinner,
  Table,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useCollection } from "@cloudscape-design/collection-hooks";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de equipamiento científico",
  },
];

const initialForm = {
  grupo_nombre: "",
  responsable: "",
  facultad: "",
};

const columnDefinitions = [
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
  },
  {
    id: "doc_numero",
    header: "N° documento",
    cell: (item) => item.doc_numero,
  },
  {
    id: "nombres",
    header: "Nombre",
    cell: (item) => item.nombres,
  },
  {
    id: "codigo_orcid",
    header: "Orcid",
    cell: (item) => item.codigo_orcid,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
  },
  {
    id: "tesista",
    header: "Tesista",
    cell: (item) => item.tesista,
  },
];

const columnDisplay = [
  { id: "condicion", visible: true },
  { id: "doc_numero", visible: true },
  { id: "nombres", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "tesista", visible: true },
];

export default function Registro_eci_1() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);

  //  Hooks
  const { formValues, handleChange } = useFormValidation(initialForm, {});
  const { items, collectionProps, paginationProps } = useCollection(data, {
    pagination: { pageSize: 10 },
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/eci/verificar1",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    if (!info.estado) {
      setErrors(info.errores);
    } else {
      setData(info.miembros);
      handleChange("id", id);
      handleChange("grupo_id", info.grupo.grupo_id);
      handleChange("facultad_id", info.grupo.facultad_id);
      handleChange("grupo_nombre", info.grupo.grupo_nombre);
      handleChange("facultad", info.grupo.facultad);
      handleChange("responsable", info.grupo.responsable);
    }
    setLoading(false);
  };

  const siguiente = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.post(
      "investigador/convocatorias/eci/registrar1",
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro a la convocatoria vigente"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="wizard"
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {errors.length == 0 ? (
            <Wizard
              onNavigate={siguiente}
              activeStepIndex={0}
              isLoadingNextStep={loadingBtn}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información del grupo de investigación",
                  description: "Información general",
                  content: (
                    <SpaceBetween size="l">
                      <Container>
                        <SpaceBetween size="s">
                          <FormField label="Grupo" stretch>
                            <Input readOnly value={formValues.grupo_nombre} />
                          </FormField>
                          <FormField label="Coordinador del grupo" stretch>
                            <Input readOnly value={formValues.responsable} />
                          </FormField>
                          <FormField label="Facultad" stretch>
                            <Input readOnly value={formValues.facultad} />
                          </FormField>
                        </SpaceBetween>
                      </Container>
                      <Table
                        {...collectionProps}
                        trackBy="id"
                        items={items}
                        columnDefinitions={columnDefinitions}
                        columnDisplay={columnDisplay}
                        enableKeyboardNavigation
                        header={
                          <Header counter={"(" + data.length + ")"}>
                            Integrantes del proyecto
                          </Header>
                        }
                        pagination={<Pagination {...paginationProps} />}
                        empty={
                          <Box
                            margin={{ vertical: "xs" }}
                            textAlign="center"
                            color="inherit"
                          >
                            <SpaceBetween size="m">
                              <b>No hay registros...</b>
                            </SpaceBetween>
                          </Box>
                        }
                      />
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Datos generales",
                  description: "Datos del proyecto",
                },
                {
                  title: "Equipamiento",
                  description:
                    "Datos de equipamiento y documentos relacionados",
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Impacto",
                  description:
                    "Impacto de la propuesta y documentos relacionados",
                },
                {
                  title: "Administración de equipamiento solicitado",
                  description:
                    "Administración de equipamiento solicitado y documentos relacionados",
                },
                {
                  title: "Instrucciones finales",
                  description: "Reporte y envío de la propuesta",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede registrarse en esta convocatoria"
                type="warning"
              >
                {errors.map((item) => {
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
