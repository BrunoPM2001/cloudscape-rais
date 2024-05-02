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
} from "@cloudscape-design/components";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewAlerts, setViewAlerts] = useState([false, true]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: "http://localhost:8000/api/login",
        method: "POST",
        data: {
          username_mail: username,
          password: password,
        },
      });

      if (res.status != 200) {
        setLoading(false);
        throw new Error("Error in fetch");
      } else {
        setLoading(false);
        const result = await res.data;
        if (result.data.tabla == "Usuario_admin") {
          localStorage.setItem("Auth", result.data.token);
          localStorage.setItem("User", result.data.usuario);
          localStorage.setItem("Type", result.data.tabla);
          window.location.href = "/admin";
        } else if (result.data.tabla == "Usuario_investigador") {
          localStorage.setItem("Auth", result.data.token);
          localStorage.setItem("User", result.data.usuario);
          localStorage.setItem("Type", result.data.tabla);
          window.location.href = "/investigador";
        } else {
          setViewAlerts((prev) => [true, prev[1]]);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log("Error " + e);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <Container
        footer={
          <SpaceBetween size="s">
            {viewAlerts[0] && (
              <Alert
                header="Credenciales incorrectas"
                type="error"
                dismissible
                onDismiss={() => setViewAlerts((prev) => [false, prev[1]])}
              ></Alert>
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
        <Form
          variant="embedded"
          header={
            <Header description="(Registro de Actividades de Investigación San Marcos)">
              Rais
            </Header>
          }
          actions={
            <Button
              variant="primary"
              loading={loading}
              onClick={() => handleLogin()}
            >
              Iniciar Sesión
            </Button>
          }
        >
          <SpaceBetween direction="vertical" size="s">
            <FormField label="Usuario">
              <Input
                onChange={({ detail }) => setUsername(detail.value)}
                value={username}
                placeholder="Usuario"
              />
            </FormField>
            <FormField label="Contraseña">
              <Input
                onChange={({ detail }) => setPassword(detail.value)}
                value={password}
                type="password"
                placeholder="Contraseña"
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </Container>
    </div>
  );
}
