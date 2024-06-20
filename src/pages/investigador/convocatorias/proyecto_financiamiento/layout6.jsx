import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import Paso6 from "./paso6";
import { useContext, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Registrar",
  },
];

export default function Registrar_proyecto_paso6() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [requisitos, setRequisitos] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 5) {
      if (!requisitos) {
        pushNotification(
          "Necesita tener al menos 1 partida registrada",
          "warning",
          notifications.length + 1
        );
        return;
      }
      const query = queryString.stringify({
        proyecto_id: proyecto_id,
      });
      window.location.href = "paso7?" + query;
    } else {
      const query = queryString.stringify({
        proyecto_id,
      });
      window.location.href = "paso5?" + query;
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo={
        <div>
          <h4>Bienes:</h4>
          <h5>Equipos y bienes duraderos</h5>
          <ul>
            <li>
              Adquisición de equipos (PC, Laptop, etc., Software, maquinaria o
              equipo de laboratorio, muebles, y libros para el proyecto de
              investigación).
              <br />
              <strong>No debe superar S/. 12500</strong>
            </li>
          </ul>
          <h5>Materiales e Insumos</h5>
          <ul>
            <li>
              Materiales, insumos, reactivos, repuestos, accesorios, componentes
              electrónicos o mecánicos, bienes no inventariables.
              <br />
              <strong>No debe superar S/. 7500</strong>
            </li>
          </ul>
          <h5>Útiles de oficina y materiales de aseo, limpieza y tocador</h5>
          <ul>
            <li>
              Papelería en general, útiles y materiales de oficina.
              <br />
              <strong>No debe superar S/. 500</strong>
            </li>
          </ul>
          <h4>Servicios:</h4>
          <h5>Pasajes y viáticos</h5>
          <ul>
            <li>
              Gastos de viajes relacionados a actividades propias del proyecto
              de investigación (pasajes, viáticos, viáticos, manutención y
              seguro de viaje).
              <br />
              <strong>No debe superar S/. 3750</strong>
            </li>
          </ul>
          <h5>Servicios de terceros</h5>
          <ul>
            <li>
              Gastos de contratación de personas naturales o jurídicas para la
              ejecución de actividades complementarias dentro de la propuesta.
              <br />
              <strong>No debe superar S/. 8750</strong>
            </li>
          </ul>
          <h5>Movilidad Local</h5>
          <ul>
            <li>
              Movilidad local en Lima Metropolitana y el Callao.
              <br />
              <strong>No debe superar S/. 500</strong>
            </li>
          </ul>
          <br />
        </div>
      }
      disableOverlap
      withoutContentLayout
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={5}
        onCancel={() => {
          window.location.href = "../../";
        }}
        isLoadingNextStep={loading}
        steps={[
          {
            title: "Información general",
          },
          {
            title: "Asesor",
          },
          {
            title: "Integrantes del proyecto",
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Calendario de actividades",
          },
          {
            title: "Financiamiento del proyecto",
            description: "Asignación de presupuesto a partidas",
            content: (
              <Paso6
                proyecto_id={proyecto_id}
                setRequisitos={setRequisitos}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Instrucciones finales",
          },
        ]}
      />
    </BaseLayout>
  );
}
