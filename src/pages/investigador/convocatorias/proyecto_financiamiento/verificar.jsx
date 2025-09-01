import { Alert, Box, Spinner } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout.jsx";
import axiosBase from "../../../../api/axios.js";

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

export default function Verificar_requisitos() {
  // States
  const [verifyLoading, setVerifyLoading] = useState(true);
  const [verifyRes, setVerifyRes] = useState({});
  const [verifyGroup, setVerifyGroup] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");  // Estado para manejar el mensaje de error

  // Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  // Functions
  const verifyUser = async () => {
    setVerifyLoading(true);
    if (proyecto_id == null) {
      try {
        // Llamada a la verificación de requisitos del investigador
        const res = await axiosBase.get("investigador/convocatorias/pro-ctie/verificar");
        const data = res.data;

        console.log("Respuesta de verificar (investigador):", data);  // Depuración
        setVerifyRes(data);

        // Verificación del grupo
        const groupCheck = await axiosBase.get("investigador/convocatorias/pro-ctie/verificarGrupo");
        console.log("Respuesta de verificarGrupo (grupo):", groupCheck.data);  // Depuración
        setVerifyGroup(groupCheck.data);

        if (data.estado === false) {
          const msg = Array.isArray(data.message) ? data.message.join(" ") : data.message;
          setErrorMessage(msg);
          console.log(msg);  // Depuración
          return;  // Detener la ejecución si la validación del investigador falla
        }

        if (groupCheck.data.estado === false) {
          const msg = Array.isArray(groupCheck.data.message)
            ? groupCheck.data.message.join(" ")
            : groupCheck.data.message;
          setErrorMessage(msg);
          console.log(msg);  // Depuración
          return;  // Detener la ejecución si la validación del grupo falla
        }

        // Si ambas validaciones son correctas, redirigimos
        if (data.estado === true && data.paso) {
          console.log("Redirigiendo a la siguiente página con paso:", data.paso);  // Depuración
          const redirectionUrl = `/investigador/convocatoria/pro-ctie/${data.paso}`;
          window.location.href = redirectionUrl; // Redirigir a la página correcta
        }

      } catch (error) {
        console.error("Error al verificar el estado del investigador o grupo:", error);
        setErrorMessage("Hubo un error al verificar los datos. Intente nuevamente.");  // Mensaje de error
      } finally {
        setVerifyLoading(false);
      }
    }
  };

  // Usamos useEffect para llamar la verificación cuando se monte el componente
  useEffect(() => {
    verifyUser();
  }, []);

  // Función para manejar las validaciones
  const handleValidation = () => {
    if (verifyGroup) {
      // Verificar si el investigador ya tiene un proyecto registrado como responsable
      if (verifyGroup.proyectoExistente) {
        return (
          <Box margin="m">
            <Alert header="Error en el registro del proyecto" type="error">
              Ya tiene un proyecto registrado como responsable en la convocatoria 2025.
            </Alert>
          </Box>
        );
      }

      // Verificar si otro miembro del grupo ya es responsable de un proyecto
      if (verifyGroup.responsableExistente) {
        return (
          <Box margin="m">
            <Alert header="Error en el registro del proyecto" type="error">
              Otro miembro de su grupo ya es responsable de un proyecto en esta convocatoria.
            </Alert>
          </Box>
        );
      }
    }

    return null;
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la página actual para poder mostrarla al público general."
      disableOverlap
    >
      {verifyLoading ? (
        <Box margin="m">
          <Alert header="Verificando intento de registro en la convocatoria">
            <Spinner />
          </Alert>
        </Box>
      ) : errorMessage ? (
        <Box margin="m">
          <Alert header="No se puede iniciar el registro" type="error">
            {errorMessage}  {/* Mostrar el motivo del error */}
          </Alert>
        </Box>
      ) : !verifyRes.estado ? (
        <Box margin="m">
          <Alert header="Solicitud de registro a esta convocatoria no procede" type="warning">
            <ul>
              {Array.isArray(verifyRes.message) ? (
                verifyRes.message.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>{verifyRes.message}</li>
              )}
            </ul>
          </Alert>
        </Box>
      ) : (
        <>
          {handleValidation()}
          <Box margin="m">
            <Alert header="¡Registro válido!" type="success">
              Puedes proceder con el registro del proyecto en esta convocatoria.
            </Alert>
          </Box>
        </>
      )}
    </BaseLayout>
  );
}
