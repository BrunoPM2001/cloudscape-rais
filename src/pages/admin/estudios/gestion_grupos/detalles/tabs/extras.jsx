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
