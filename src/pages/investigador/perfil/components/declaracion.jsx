import {
  Box,
  SpaceBetween,
  Checkbox,
  Header,
  Container,
} from "@cloudscape-design/components";

export default ({ data, check, setCheck, proyectos }) => {
  //  Functions
  const obtenerFechaActual = () => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `${dia} de ${mes} de ${año}`;
  };

  return (
    <Container
      header={
        <Header variant="h3">
          {proyectos > 0 ? "4. Declaración Jurada" : "3. Declaración Jurada"}
        </Header>
      }
    >
      <SpaceBetween size="xs">
        <div>
          Quien suscribe, identificado/a con DNI N° {data.doc_numero}, docente
          ordinario, {data.docente_categoria} y a {data.clase}, de la Facultad
          de {data.facultad}, Departamento Académico {data.des_dep_cesantes},
          declaro no haber incurrido en algún tipo de infracción o tener alguna
          sanción vigente, conforme lo establecido en el Código de Integridad
          Científica del Consejo Nacional de Ciencia, Tecnología e Innovación
          Tecnológica (CONCYTEC). En caso contrario, me hago responsable de las
          sanciones establecidas en el referido documento, en fe de lo cual
          suscribo la presente.
        </div>
        <div>
          Por tanto, declaro haber leído y cumplir con las condiciones
          establecidas en esta Declaración Jurada.
        </div>
        <div>Lima, {obtenerFechaActual()}</div>
        <Box variant="strong" float="right">
          {data.nombres}
        </Box>
        <Box variant="strong" float="right">
          DNI: {data.doc_numero}
        </Box>
        <Checkbox
          checked={check}
          onChange={({ detail }) => setCheck(detail.checked)}
        >
          Acepto los términos y condiciones
        </Checkbox>
        <Box variant="small">
          * Los datos personales fueron obtenidos de la Oficina General de
          Recursos Humanos
        </Box>
      </SpaceBetween>
    </Container>
  );
};
