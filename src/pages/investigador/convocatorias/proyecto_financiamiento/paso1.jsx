import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import axiosBase from "../../../../api/axios";
import {
  Box,
  ColumnLayout,
  Container,
  FormField,
  Input,
  Select,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";

const initialForm = {
  titulo: "",
  linea_investigacion_id: null,
  ocde_1: null,
  ocde_2: null,
  ocde_3: null,
  ods: null,
  localizacion: null,
  tipo_investigacion: null,
};

const formRules = {
  titulo: { required: true },
  linea_investigacion_id: { required: true },
  ocde_1: { required: true },
  ocde_2: { required: true },
  ocde_3: { required: true },
  ods: { required: true },
  localizacion: { required: true },
  tipo_investigacion: { required: true },
};

const localizaciones = [
  { value: "En las sedes de la UNMSM en Lima" },
  { value: "En el área de Lima Metropolitana" },
  { value: "En las Regiones de Lima provincias y El Callao" },
  { value: "En otras Regiones del país" },
  { value: "En otros lugares" },
];

const tipo_investigaciones = [
  {
    value: "basica",
    label: "1. Básica (aumento del conocimiento existente sobre el tema)",
  },
  {
    value: "aplicada",
    label:
      "2. Aplicada (utilización del conocimiento existente para mejorar algo)",
  },
  {
    value: "exploratoria",
    label:
      "3. Exploratoria (examinar un problema poco estudiado o no analizado antes)",
  },
  {
    value: "experimental",
    label:
      "4. Experimental (explicar el contenido del problema o fenómeno que se investiga)",
  },
  {
    value: "teorica",
    label: "5. Teórica (estudios filosóficos, jurídicos, culturales)",
  },
  {
    value: "otro",
    label: "6. Otros",
  },
];

export default forwardRef(function (props, ref) {
  //  State
  const [data, setData] = useState({});
  const [lineas, setLineas] = useState([]);
  const [ocde_1, setOcde_1] = useState([]);
  const [ocde_2, setOcde_2] = useState();
  const [ocde_3, setOcde_3] = useState();
  const [ocde_2Status, setOcde_2Status] = useState("loading");
  const [ocde_3Status, setOcde_3Status] = useState("loading");

  const [ods, setOds] = useState([]);
  const [odsStatus, setOdsStatus] = useState("loading");

  const [loadingData, setLoadingData] = useState(true);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Function;
  const getData1 = async () => {
    const res = await axiosBase.get("investigador/convocatorias/pro-ctie/datosPaso1", {
      params: {
        proyecto_id: props.proyecto_id,
      },
    });
    const res1 = res.data;
    console.log("Lineas recibidas (getData1):", res1.data.lineas); //
    setData(res1.data.data);
    setLineas(res1.data.lineas);
    setOcde_1(res1.data.ocde1);
    setOcde_2(res1.ocde_2);
    setOcde_3(res1.ocde_3);
    setOds(res1.listOds);
    setOdsStatus("finished");
    setFormValues({
      ...initialForm,
      ...res1.proyecto,
      linea_investigacion_id: res1.data.lineas.find(
        (opt) => opt.value == res1.proyecto.linea_investigacion_id
      ),
      ods: res1.listOds.find((opt) => opt.value == res1.ods.detalle),
      localizacion: localizaciones.find(
        (opt) => opt.value == res1.proyecto.localizacion
      ),
      tipo_investigacion: tipo_investigaciones.find(
        (opt) => opt.value == res1.tipo_investigacion.detalle
      ),
      ocde_1: res1.data.ocde1.find(
        (opt) => opt.value == res1.ocde_2[0].parent_id
      ),
      ocde_2: res1.ocde_2.find((opt) => opt.value == res1.ocde_3[0].parent_id),
      ocde_3: res1.ocde_3.find((opt) => opt.value == res1.proyecto.ocde_id),
    });
    setLoadingData(false);
  };

  const getData = async () => {
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/getDataToPaso1"
    );
    const data = res.data;
    console.log("Lineas recibidas (getData):", data.lineas);
    setData(data.data);
    setLineas(data.lineas);
    setOcde_1(data.ocde1);
    setLoadingData(false);
  };

  const updateOds = async (value) => {
    handleChange("ods", null);
    setOdsStatus("loading");
    const res = await axiosBase.get("investigador/convocatorias/pro-ctie/getOds", {
      params: {
        linea_investigacion_id: value,
      },
    });
    const data = res.data;
    setOds(data);
    setOdsStatus("finished");
  };

  const updateOcde2 = async (value) => {
    handleChange("ocde_2", null);
    setOcde_2Status("loading");
    const res = await axiosBase.get("investigador/convocatorias/pro-ctie/getOcde", {
      params: {
        parent_id: value,
      },
    });
    const data = res.data;
    setOcde_2(data);
    setOcde_2Status("finished");
  };

  const updateOcde3 = async (value) => {
    handleChange("ocde_3", null);
    setOcde_3Status("loading");
    const res = await axiosBase.get("investigador/convocatorias/pro-ctie/getOcde", {
      params: {
        parent_id: value,
      },
    });
    const data = res.data;
    setOcde_3(data);
    setOcde_3Status("finished");
  };

  const registrar = async () => {
    if (validateForm()) {
      if (props.proyecto_id != null) {
        await axiosBase.post("investigador/convocatorias/pro-ctie/registrarPaso1", {
          ...formValues,
          proyecto_id: props.proyecto_id,
        });
        return { isValid: true, res_proyecto_id: null };
      } else {
        const res = await axiosBase.post(
          "investigador/convocatorias/pro-ctie/registrarPaso1",
          formValues
        );
        const data = res.data;
        return { isValid: true, res_proyecto_id: data.proyecto_id };
      }
    } else {
      return { isValid: false };
    }
  };

  //  Effect;
  useEffect(() => {
    if (props.proyecto_id != null) {
      getData1();
    } else {
      getData();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <>
      {loadingData ? (
        <Spinner />
      ) : (
        <SpaceBetween direction="vertical" size="s">
          <FormField
            label="Título del proyecto"
            stretch
            errorText={formErrors.titulo}
          >
            <Input
              placeholder="Escriba el título del proyecto"
              value={formValues.titulo}
              onChange={({ detail }) => handleChange("titulo", detail.value)}
            />
          </FormField>
          <Container>
            <ColumnLayout columns={3}>
              <div>
                <Box variant="awsui-key-label">Asesor del proyecto</Box>
                <div>{localStorage.getItem("User")}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Facultad</Box>
                <div>{data.facultad}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Grupo de investigación</Box>
                <div>{data.grupo_nombre}</div>
              </div>
            </ColumnLayout>
          </Container>
          <FormField
            label="Línea de investigación"
            stretch
            errorText={formErrors.linea_investigacion_id}
          >
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.linea_investigacion_id}
              onChange={({ detail }) => {
                handleChange("linea_investigacion_id", detail.selectedOption);
                updateOds(detail.selectedOption.value);
              }}
              options={lineas}
            />
          </FormField>
          <FormField
            label="Objetivo del desarrollo sostenible (ODS)"
            stretch
            errorText={formErrors.ods}
          >
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.ods}
              onChange={({ detail }) => {
                handleChange("ods", detail.selectedOption);
              }}
              options={ods}
              statusType={odsStatus}
            />
          </FormField>
          <ColumnLayout columns={3}>
            <FormField label="OCDE Área" stretch errorText={formErrors.ocde_1}>
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.ocde_1}
                onChange={({ detail }) => {
                  handleChange("ocde_1", detail.selectedOption);
                  updateOcde2(detail.selectedOption.value);
                }}
                options={ocde_1}
              />
            </FormField>
            <FormField label="OCDE Línea" stretch errorText={formErrors.ocde_2}>
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.ocde_2}
                onChange={({ detail }) => {
                  handleChange("ocde_2", detail.selectedOption);
                  updateOcde3(detail.selectedOption.value);
                }}
                statusType={ocde_2Status}
                options={ocde_2}
              />
            </FormField>
            <FormField
              label="OCDE Sub línea"
              stretch
              errorText={formErrors.ocde_3}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.ocde_3}
                onChange={({ detail }) => {
                  handleChange("ocde_3", detail.selectedOption);
                }}
                statusType={ocde_3Status}
                options={ocde_3}
              />
            </FormField>
          </ColumnLayout>
          <ColumnLayout columns={2}>
            <FormField
              label="Lugar de ejecucion"
              stretch
              errorText={formErrors.localizacion}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.localizacion}
                onChange={({ detail }) => {
                  handleChange("localizacion", detail.selectedOption);
                }}
                options={localizaciones}
              />
            </FormField>
            <FormField
              label="Tipo de investigación"
              stretch
              errorText={formErrors.tipo_investigacion}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.tipo_investigacion}
                onChange={({ detail }) => {
                  handleChange("tipo_investigacion", detail.selectedOption);
                }}
                options={tipo_investigaciones}
              />
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      )}
    </>
  );
});
