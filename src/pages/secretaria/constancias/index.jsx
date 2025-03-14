import { Badge, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../components/baseLayout";
import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Secretaria",
    href: "/secretaria",
  },
  {
    text: "Constancias",
  },
  {
    text: "Listado",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Constancias() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de constancias"
      helpInfo={
        <>
          <h4>Módulo de constancias firmadas</h4>
          <ul>
            <li>
              Dentro de este módulo podrá cargar las constancias firmadas que se
              reciba de parte del vicerrector.
            </li>
            <li>
              Verificar cargar el documento correcto para el docente
              correspondiente, para hacerlo simplemente seleccione un registro
              que diga <Badge color="red">Pendiente</Badge>, luego presione el
              botón de <strong>Cargar constancia</strong> y adjunte el documento
              correspondiente.
            </li>
            <li>
              Para validar la no alteración del documento antes de la firma
              puede comparar el documento original y el firmado (descargando
              ambos desde este módulo).
            </li>
          </ul>
        </>
      }
      contentType="table"
      disableOverlap
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
