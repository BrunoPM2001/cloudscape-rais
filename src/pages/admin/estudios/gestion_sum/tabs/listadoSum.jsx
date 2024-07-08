import {
  Alert,
  Autosuggest,
  Box,
  Button,
  ColumnLayout,
  Container,
  CopyToClipboard,
  Form,
  FormField,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";
import { useState } from "react";

export default () => {
  //  States
  const [form, setForm] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("admin/estudios/sum/listadoSum");

  return (
    <Container>
      <SpaceBetween size="s">
        <Form
          variant="embedded"
          header={
            <Header variant="h2">
              Búsqueda de alumnos en la base de datos del SUM
            </Header>
          }
        >
          <FormField label="Alumno" stretch>
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                if (detail.value == "") {
                  setForm({});
                }
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.codigo_alumno != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  setForm(rest);
                  setAvoidSelect(false);
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="Código, dni o nombres"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados"
            />
          </FormField>
        </Form>
        {form.codigo_alumno != null && (
          <Alert header="Datos extraídos" action={<Button>Actualizar</Button>}>
            <ColumnLayout columns={3} variant="text-grid">
              <SpaceBetween size="xs">
                <div>
                  <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={`${form.apellido_paterno} ${form.apellido_materno}, ${form.nombres}`}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Dni:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.dni}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Fecha de nacimiento:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.fecha_nacimiento}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Sexo:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.sexo}
                  />
                </div>
              </SpaceBetween>
              <SpaceBetween size="xs">
                <div>
                  <Box variant="awsui-key-label">Código de estudiante:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.codigo_alumno}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Facultad:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.facultad}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Permanencia:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.permanencia}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Último periodo matriculado:
                  </Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.ultimo_periodo_matriculado}
                  />
                </div>
              </SpaceBetween>
              <SpaceBetween size="xs">
                <div>
                  <Box variant="awsui-key-label">Teléfono:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.telefono}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Teléfono personal:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.telefono_personal}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Correo:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.correo_electronico}
                  />
                </div>
                <div>
                  <Box variant="awsui-key-label">Correo personal:</Box>
                  <CopyToClipboard
                    variant="inline"
                    copyButtonAriaLabel="Copiar"
                    copySuccessText="Copiado!"
                    copyErrorText="Error al copiar"
                    textToCopy={form.correo_electronico_personal}
                  />
                </div>
              </SpaceBetween>
            </ColumnLayout>
          </Alert>
        )}
      </SpaceBetween>
    </Container>
  );
};
