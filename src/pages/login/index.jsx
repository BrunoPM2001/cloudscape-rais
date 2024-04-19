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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
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
