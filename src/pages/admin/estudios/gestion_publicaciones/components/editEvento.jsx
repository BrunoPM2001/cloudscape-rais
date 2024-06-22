import { ColumnLayout, Container } from "@cloudscape-design/components";

export default ({ id }) => {
  const initialForm = {
    grupo_nombre: "",
    grupo_nombre_corto: "",
    resolucion_rectoral_creacion: "",
    resolucion_creacion_fecha: "",
    resolucion_rectoral: "",
    resolucion_fecha: "",
    observaciones: "",
    observaciones_admin: "",
    estado: null,
    grupo_categoria: null,
    telefono: "",
    anexo: "",
    oficina: "",
    direccion: "",
    email: "",
    web: "",
  };

  const formRules = {
    grupo_nombre: { required: true },
    grupo_nombre_corto: { required: true },
    resolucion_rectoral_creacion: { required: false },
    resolucion_creacion_fecha: { required: false },
    resolucion_rectoral: { required: false },
    resolucion_fecha: { required: false },
    observaciones: { required: false },
    observaciones_admin: { required: false },
    estado: { required: true },
    grupo_categoria: { required: true },
    telefono: { required: false },
    anexo: { required: false },
    oficina: { required: false },
    direccion: { required: false },
    email: { required: false },
    web: { required: false },
  };

  return (
    <Container>
      <ColumnLayout columns={4}></ColumnLayout>
    </Container>
  );
};
