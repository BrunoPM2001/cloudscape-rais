import {
  Header,
  SpaceBetween,
  Container,
  Form,
  Button,
  FormField,
  Input,
  Box,
} from "@cloudscape-design/components";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: "http://localhost:8000/login",
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
          window.location.href = "/admin";
        } else {
          alert("Usuario no habilitado");
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
          <SpaceBetween direction="horizontal" size="s">
            <Box variant="strong">Consulta técnica: </Box>
            <Box>rais.vrip@unmsm.edu.pe</Box>
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
