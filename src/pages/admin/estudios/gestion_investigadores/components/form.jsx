import {
  ColumnLayout,
  DatePicker,
  FormField,
  Grid,
  Header,
  Input,
  Link,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";

const doc_opt = [
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
];

const tipo_opt = [
  {
    value: "Docente permanente",
  },
  {
    value: "Estudiante pregrado",
  },
  {
    value: "Estudiante posgrado",
  },
  {
    value: "Externo",
  },
];

const estado_opt = [
  {
    label: "Activo",
    value: "1",
  },
  {
    label: "No activo",
    value: "0",
  },
];

const sexo_opt = [
  {
    label: "Masculino",
    value: "M",
  },
  {
    label: "Femenino",
    value: "F",
  },
];

const opt_grados = [
  { value: "Bachiller" },
  { value: "Maestro" },
  { value: "Doctor" },
  { value: "Msci" },
  { value: "Phd" },
];

export default function Formulario({
  formValues,
  formErrors,
  handleChange,
  facultades,
  paises,
  dependencias,
  institutos,
  docente_categorias,
}) {
  return (
    <SpaceBetween direction="vertical" size="s">
      <SpaceBetween size="l">
        <Header variant="h3">Datos de investigador rais</Header>
        <ColumnLayout columns={4}>
          <FormField
            label="Tipo de investigador"
            stretch
            errorText={formErrors.tipo_investigador}
          >
            <Input
              placeholder="Escriba el tipo de investigador"
              value={formValues.tipo_investigador}
              onChange={({ detail }) =>
                handleChange("tipo_investigador", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Tipo de categoría del investigador"
            stretch
            errorText={formErrors.tipo_investigador_categoria}
          >
            <Input
              placeholder="Escriba la categoría de investigador"
              value={formValues.tipo_investigador_categoria}
              onChange={({ detail }) =>
                handleChange("tipo_investigador_categoria", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Tipo de programa del investigador"
            stretch
            errorText={formErrors.tipo_investigador_programa}
          >
            <Input
              placeholder="Escriba el programa del investigador"
              value={formValues.tipo_investigador_programa}
              onChange={({ detail }) =>
                handleChange("tipo_investigador_programa", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Tipo de estado del investigador"
            stretch
            errorText={formErrors.tipo_investigador_estado}
          >
            <Input
              placeholder="Escriba el tipo de estado de investigador"
              value={formValues.tipo_investigador_estado}
              onChange={({ detail }) =>
                handleChange("tipo_investigador_estado", detail.value)
              }
            />
          </FormField>
          <FormField label="Tipo" stretch errorText={formErrors.tipo}>
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.tipo}
              onChange={({ detail }) =>
                handleChange("tipo", detail.selectedOption)
              }
              options={tipo_opt}
            />
          </FormField>
          <FormField label="Estado" stretch errorText={formErrors.estado}>
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.estado}
              onChange={({ detail }) =>
                handleChange("estado", detail.selectedOption)
              }
              options={estado_opt}
            />
          </FormField>
          <FormField
            label="RRHH Estado"
            stretch
            errorText={formErrors.rrhh_status}
          >
            <Input readOnly value={formValues.rrhh_status} />
          </FormField>
          <FormField
            label="Fecha ICSI"
            stretch
            errorText={formErrors.fecha_icsi}
          >
            <DatePicker
              placeholder="YYYY-MM-DD"
              value={formValues.fecha_icsi}
              onChange={({ detail }) =>
                handleChange("fecha_icsi", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
      <SpaceBetween size="l">
        <Header variant="h3">Datos personales</Header>
        <ColumnLayout columns={4}>
          <FormField label="Nombres" stretch errorText={formErrors.nombres}>
            <Input
              placeholder="Escriba su nombres"
              value={formValues.nombres}
              onChange={({ detail }) => handleChange("nombres", detail.value)}
            />
          </FormField>
          <FormField
            label="Apellido paterno"
            stretch
            errorText={formErrors.apellido1}
          >
            <Input
              placeholder="Escriba su ap. paterno"
              value={formValues.apellido1}
              onChange={({ detail }) => handleChange("apellido1", detail.value)}
            />
          </FormField>
          <FormField
            label="Apellido materno"
            stretch
            errorText={formErrors.apellido2}
          >
            <Input
              placeholder="Escriba su ap. materno"
              value={formValues.apellido2}
              onChange={({ detail }) => handleChange("apellido2", detail.value)}
            />
          </FormField>
          <FormField label="Sexo" stretch errorText={formErrors.sexo}>
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.sexo}
              onChange={({ detail }) =>
                handleChange("sexo", detail.selectedOption)
              }
              options={sexo_opt}
            />
          </FormField>
          <FormField
            label="Tipo de documento"
            stretch
            errorText={formErrors.doc_tipo}
          >
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.doc_tipo}
              onChange={({ detail }) =>
                handleChange("doc_tipo", detail.selectedOption)
              }
              options={doc_opt}
            />
          </FormField>
          <FormField
            label="N° documento"
            stretch
            errorText={formErrors.doc_numero}
          >
            <Input
              placeholder="Escriba el n° de doc"
              value={formValues.doc_numero}
              onChange={({ detail }) =>
                handleChange("doc_numero", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha nacimiento"
            stretch
            errorText={formErrors.fecha_nac}
          >
            <DatePicker
              placeholder="YYYY-MM-DD"
              value={formValues.fecha_nac}
              onChange={({ detail }) => handleChange("fecha_nac", detail.value)}
            />
          </FormField>
          <FormField label="País" stretch errorText={formErrors.pais}>
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.pais}
              onChange={({ detail }) =>
                handleChange("pais", detail.selectedOption)
              }
              options={paises}
              statusType={paises.length == 0 ? "loading" : "finished"}
              loadingText="Cargando"
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
      <SpaceBetween size="l">
        <Header variant="h3">Datos de contacto</Header>
        <ColumnLayout columns={2}>
          <ColumnLayout columns={3} minColumnWidth={150}>
            <FormField
              label="Teléfono de casa"
              stretch
              errorText={formErrors.telefono_casa}
            >
              <Input
                placeholder="Escriba su teléfono de casa"
                value={formValues.telefono_casa}
                onChange={({ detail }) =>
                  handleChange("telefono_casa", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Teléfono de trabajo"
              stretch
              errorText={formErrors.telefono_trabajo}
            >
              <Input
                placeholder="Escriba su teléfono de trabajo"
                value={formValues.telefono_trabajo}
                onChange={({ detail }) =>
                  handleChange("telefono_trabajo", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Teléfono móvil"
              stretch
              errorText={formErrors.telefono_movil}
            >
              <Input
                placeholder="Escriba su teléfono móvil"
                value={formValues.telefono_movil}
                onChange={({ detail }) =>
                  handleChange("telefono_movil", detail.value)
                }
              />
            </FormField>
            <FormField label="Correo 1" stretch errorText={formErrors.email1}>
              <Input
                placeholder="Escriba un correo"
                type="email"
                value={formValues.email1}
                onChange={({ detail }) => handleChange("email1", detail.value)}
              />
            </FormField>
            <FormField label="Correo 2" stretch errorText={formErrors.email2}>
              <Input
                placeholder="Escriba un correo"
                type="email"
                value={formValues.email2}
                onChange={({ detail }) => handleChange("email2", detail.value)}
              />
            </FormField>
            <FormField
              label="Correo unmsm"
              stretch
              errorText={formErrors.email3}
            >
              <Input
                placeholder="Escriba un correo"
                type="email"
                value={formValues.email3}
                onChange={({ detail }) => handleChange("email3", detail.value)}
              />
            </FormField>
          </ColumnLayout>
          <SpaceBetween size="l">
            <ColumnLayout columns={2}>
              <FormField
                label="Dirección 1"
                stretch
                errorText={formErrors.direccion1}
              >
                <Input
                  placeholder="Escriba una dirección"
                  value={formValues.direccion1}
                  onChange={({ detail }) =>
                    handleChange("direccion1", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Dirección 2"
                stretch
                errorText={formErrors.direccion2}
              >
                <Input
                  placeholder="Escriba una dirección"
                  value={formValues.direccion2}
                  onChange={({ detail }) =>
                    handleChange("direccion2", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <ColumnLayout columns={3} minColumnWidth={150}>
              <FormField
                label="Facebook"
                stretch
                errorText={formErrors.facebook}
              >
                <Input
                  placeholder="Url de facebook"
                  value={formValues.facebook}
                  onChange={({ detail }) =>
                    handleChange("facebook", detail.value)
                  }
                />
              </FormField>
              <FormField label="Twitter" stretch errorText={formErrors.twitter}>
                <Input
                  placeholder="Url de twitter"
                  value={formValues.twitter}
                  onChange={({ detail }) =>
                    handleChange("twitter", detail.value)
                  }
                />
              </FormField>
              <FormField label="Página web" stretch errorText={formErrors.link}>
                <Input
                  placeholder="Escriba la url"
                  value={formValues.link}
                  onChange={({ detail }) => handleChange("link", detail.value)}
                />
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </ColumnLayout>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 4, xxs: 12 } },
            { colspan: { default: 12, xs: 4, xxs: 6 } },
            { colspan: { default: 12, xs: 4, xxs: 6 } },
          ]}
        >
          <FormField label="Grado" stretch>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.grado}
              onChange={({ detail }) =>
                handleChange("grado", detail.selectedOption)
              }
              options={opt_grados}
            />
          </FormField>
          <FormField label="Título profesional" stretch>
            <Input
              value={formValues.titulo_profesional}
              onChange={({ detail }) =>
                handleChange("titulo_profesional", detail.value)
              }
            />
          </FormField>
          <FormField label="Especialidad" stretch>
            <Input
              value={formValues.especialidad}
              onChange={({ detail }) =>
                handleChange("especialidad", detail.value)
              }
            />
          </FormField>
        </Grid>
      </SpaceBetween>
      <SpaceBetween size="l">
        <Header variant="h3">Datos de investigador</Header>
        <ColumnLayout columns={4}>
          <FormField
            label="Orcid"
            errorText={formErrors.codigo_orcid}
            info={
              <Link
                external
                href={`https://orcid.org/${formValues.codigo_orcid}`}
              />
            }
            stretch
          >
            <Input
              placeholder="Escriba su código orcid"
              value={formValues.codigo_orcid}
              onChange={({ detail }) =>
                handleChange("codigo_orcid", detail.value)
              }
            />
          </FormField>
          <FormField
            label={
              <Link
                external
                href="https://access.clarivate.com/login?app=wos"
                variant="primary"
              >
                ResearcherID
              </Link>
            }
            stretch
            errorText={formErrors.researcher_id}
          >
            <Input
              placeholder="Escriba su researcher id"
              value={formValues.researcher_id}
              onChange={({ detail }) =>
                handleChange("researcher_id", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Scopus Author ID"
            errorText={formErrors.scopus_id}
            info={
              <Link
                external
                href={`https://www.scopus.com/authid/detail.uri?authorId=${formValues.scopus_id}`}
              />
            }
            stretch
          >
            <Input
              placeholder="Escriba su scopus id"
              value={formValues.scopus_id}
              onChange={({ detail }) => handleChange("scopus_id", detail.value)}
            />
          </FormField>
          <FormField
            label={
              <Link
                external
                href="https://ctivitae.concytec.gob.pe/appDirectorioCTI/"
                variant="primary"
              >
                CTI Vitae
              </Link>
            }
            stretch
            errorText={formErrors.cti_vitae}
          >
            <Input
              placeholder="Url de cti"
              value={formValues.cti_vitae}
              onChange={({ detail }) => handleChange("cti_vitae", detail.value)}
            />
          </FormField>
          <FormField
            label="Google scholar"
            errorText={formErrors.google_scholar}
            info={<Link external href={formValues.google_scholar} />}
            stretch
          >
            <Input
              placeholder="Escriba su url de google scholar"
              value={formValues.google_scholar}
              onChange={({ detail }) =>
                handleChange("google_scholar", detail.value)
              }
            />
          </FormField>
          <FormField label="Renacyt" stretch errorText={formErrors.renacyt}>
            <Input
              placeholder="Escriba su renacyt"
              value={formValues.renacyt}
              onChange={({ detail }) => handleChange("renacyt", detail.value)}
            />
          </FormField>
          <FormField
            label="Renacyt nivel"
            stretch
            errorText={formErrors.renacyt_nivel}
          >
            <Input
              placeholder="Escriba su renacyt"
              value={formValues.renacyt_nivel}
              onChange={({ detail }) =>
                handleChange("renacyt_nivel", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Palabras clave"
            stretch
            errorText={formErrors.palabras_clave}
          >
            <Input
              placeholder="Escriba palabras clave"
              value={formValues.palabras_clave}
              onChange={({ detail }) =>
                handleChange("palabras_clave", detail.value)
              }
            />
          </FormField>
          <FormField label="Índice h" stretch errorText={formErrors.indice_h}>
            <Input
              placeholder="Escriba su índice h"
              value={formValues.indice_h}
              onChange={({ detail }) => handleChange("indice_h", detail.value)}
            />
          </FormField>
          <FormField
            label="Índice h URL"
            stretch
            errorText={formErrors.indice_h_url}
          >
            <Input
              placeholder="Escriba la url de su índice h"
              value={formValues.indice_h_url}
              onChange={({ detail }) =>
                handleChange("indice_h_url", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Facultad"
            stretch
            errorText={formErrors.facultad_id}
          >
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.facultad_id}
              onChange={({ detail }) =>
                handleChange("facultad_id", detail.selectedOption)
              }
              options={facultades}
              statusType={facultades.length == 0 ? "loading" : "finished"}
              loadingText="Cargando"
            />
          </FormField>
          <FormField
            label="Dependencia"
            stretch
            errorText={formErrors.dependencia_id}
          >
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.dependencia_id}
              onChange={({ detail }) =>
                handleChange("dependencia_id", detail.selectedOption)
              }
              options={dependencias}
              statusType={dependencias.length == 0 ? "loading" : "finished"}
              loadingText="Cargando"
            />
          </FormField>
          <FormField
            label="Instituto"
            stretch
            errorText={formErrors.instituto_id}
          >
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.instituto_id}
              onChange={({ detail }) =>
                handleChange("instituto_id", detail.selectedOption)
              }
              options={institutos}
              statusType={institutos.length == 0 ? "loading" : "finished"}
              loadingText="Cargando"
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
      <SpaceBetween size="l">
        <Header variant="h3">Datos de docente</Header>
        <ColumnLayout columns={3}>
          <FormField label="Código" stretch errorText={formErrors.codigo}>
            <Input readOnly value={formValues.codigo} />
          </FormField>
          <FormField
            label="Categoria del docente"
            stretch
            errorText={formErrors.docente_categoria}
          >
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.docente_categoria}
              onChange={({ detail }) =>
                handleChange("docente_categoria", detail.selectedOption)
              }
              options={docente_categorias}
              statusType={
                docente_categorias.length == 0 ? "loading" : "finished"
              }
              loadingText="Cargando"
            />
          </FormField>
          <FormField
            label="Posición en la institución"
            stretch
            errorText={formErrors.posicion_unmsm}
          >
            <Input
              placeholder="Escriba su posición en la institución"
              value={formValues.posicion_unmsm}
              onChange={({ detail }) =>
                handleChange("posicion_unmsm", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
      <FormField label="Biografía" stretch errorText={formErrors.biografia}>
        <Textarea
          placeholder="Escriba su biografia"
          value={formValues.biografia}
          onChange={({ detail }) => handleChange("biografia", detail.value)}
        />
      </FormField>
    </SpaceBetween>
  );
}
