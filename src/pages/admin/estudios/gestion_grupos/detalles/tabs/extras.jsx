import {
  Container,
  ColumnLayout,
  Header,
  Box,
  Spinner,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalEditarAmbiente from "../components/modalEditarAmbiente";

export default ({ data, loading, grupo_id, reload }) => {
  //  States
  const [modal, setModal] = useState("");

  let redes = [];
  try {
    redes = Array.isArray(data?.redes)
      ? data.redes
      : JSON.parse(data?.redes || "[]");
  } catch {
    redes = [];
  }

  return (
    <Container header={<Header variant="h2">Extras</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <SpaceBetween size="s">
            <div>
              <Header variant="h3">Presentación</Header>
              <Box margin={{ top: "xxs" }}>
                {loading ? (
                  <Spinner />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.presentacion }}
                  ></div>
                )}
              </Box>
            </div>
            <div>
              <Header
                variant="h3"
                actions={
                  <Button onClick={() => setModal("edit")} disabled={loading}>
                    Editar
                  </Button>
                }
              >
                Ambientes físicos
              </Header>
              <Box margin={{ top: "xxs" }}>
                {loading ? (
                  <Spinner />
                ) : (
                  <div>{data.infraestructura_ambientes}</div>
                )}
              </Box>
            </div>
          </SpaceBetween>
        </div>
        <div>
          <SpaceBetween size="s">
            <div>
              <Header variant="h3">Objetivos</Header>
              <Box margin={{ top: "xxs" }}>
                {loading ? (
                  <Spinner />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.objetivos }}
                  ></div>
                )}
              </Box>
            </div>
            <div>
              <Header variant="h3">Servicios</Header>
              <Box margin={{ top: "xxs" }}>
                {loading ? (
                  <Spinner />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.servicios }}
                  ></div>
                )}
              </Box>
            </div>
            <div>
              <Header variant="h3">Redes</Header>
              <Box margin={{ top: "xxs" }}>
                {loading ? (
                  <Spinner />
                ) : redes.length > 0 ? (
                  <SpaceBetween size="xs">
                    {redes.map((red, index) => (
                      <div key={index}>
                        <a
                          href={red.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#0972d3", textDecoration: "none" }}
                        >
                          {red.nombre}
                        </a>
                      </div>
                    ))}
                  </SpaceBetween>
                ) : (
                  <Box color="text-body-secondary">No se han registrado redes</Box>
                )}
              </Box>
            </div>
          </SpaceBetween>
        </div>
      </ColumnLayout>
      {modal == "edit" && (
        <ModalEditarAmbiente
          close={() => setModal("")}
          grupo_id={grupo_id}
          initValue={data.infraestructura_ambientes}
          reload={reload}
        />
      )}
    </Container>
  );
};
