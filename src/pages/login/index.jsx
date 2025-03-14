import {
  Header,
  SpaceBetween,
  Container,
  Form,
  Button,
  FormField,
  Input,
  Alert,
  CopyToClipboard,
  Spinner,
  Box,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import axiosBase from "../../api/axios";
import { useLocation } from "react-router-dom";

const userTypeRoutes = {
  Usuario_admin: "/admin",
  Usuario_investigador: "/investigador",
  Usuario_evaluador: "/evaluador",
  Usuario_facultad: "/facultad",
  Usuario_secretaria: "/secretaria",
};

export default function Login() {
  //  States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewAlerts, setViewAlerts] = useState([false, true]);
  const [validOrcid, setValidOrcid] = useState(false);

  //  Hooks
  const location = useLocation();

  //  Functions
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await axiosBase.post("login", {
      username_mail: username,
      password: password,
    });
    setLoading(false);
    const data = res.data;
    const userType = data.data.tabla;

    if (userTypeRoutes[userType]) {
      localStorage.setItem("Auth", data.data.token);
      localStorage.setItem("User", data.data.usuario);
      localStorage.setItem("Type", userType);
      window.location.href = userTypeRoutes[userType];
    } else {
      setViewAlerts((prev) => [true, prev[1]]);
    }
  };

  const tryOrcid = async () => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      setValidOrcid(true);
      const res = await axiosBase.post("investigador/orcid/obtenerTokens", {
        code,
      });
      setValidOrcid(false);
      const data = res.data;
    }
  };

  //  Effects
  useEffect(() => {
    tryOrcid();
  }, []);

  return (
    <div className={styles["login-container"]}>
      {validOrcid ? (
        <Alert header="Validando orcid" type="info" dismissible>
          <Spinner /> Espere un momento mientras se valida el registro de su
          ORCID
        </Alert>
      ) : (
        <Container
          footer={
            <SpaceBetween size="s">
              {viewAlerts[0] && (
                <Alert
                  header="Credenciales incorrectas"
                  type="error"
                  dismissible
                  onDismiss={() => setViewAlerts((prev) => [false, prev[1]])}
                />
              )}
              {validOrcid && (
                <Alert header="Validando orcid" type="info" dismissible>
                  <Spinner /> Espere un momento mientras se valida el registro
                  de su ORCID
                </Alert>
              )}
              {viewAlerts[1] && (
                <Alert
                  header="Consultas técnicas al siguiente correo"
                  dismissible
                  onDismiss={() => setViewAlerts((prev) => [prev[0], false])}
                >
                  rais.vrip@unmsm.edu.pe
                  <CopyToClipboard
                    copyButtonAriaLabel="Copiar correo"
                    copyErrorText="Error al copiar"
                    copySuccessText="Correo copiado"
                    textToCopy="rais.vrip@unmsm.edu.pe"
                    variant="icon"
                  />
                </Alert>
              )}
            </SpaceBetween>
          }
        >
          <form onSubmit={handleLogin}>
            <Form
              header={
                <Header description="(Registro de Actividades de Investigación San Marcos)">
                  Rais
                </Header>
              }
              actions={
                <Button
                  variant="primary"
                  loading={loading}
                  disabled={validOrcid}
                >
                  Iniciar Sesión
                </Button>
              }
            >
              <SpaceBetween direction="vertical" size="s">
                <FormField label="Usuario">
                  <Input
                    onChange={({ detail }) => setUsername(detail.value)}
                    disabled={validOrcid}
                    value={username}
                    placeholder="Usuario"
                  />
                </FormField>
                <FormField label="Contraseña">
                  <Input
                    onChange={({ detail }) => setPassword(detail.value)}
                    disabled={validOrcid}
                    value={password}
                    type="password"
                    placeholder="Contraseña"
                  />
                </FormField>
              </SpaceBetween>
            </Form>
          </form>
        </Container>
      )}
    </div>
  );
}
