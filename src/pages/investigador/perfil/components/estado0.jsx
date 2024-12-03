import { Alert, Header, SpaceBetween } from "@cloudscape-design/components";

export default () => {
  return (
    <SpaceBetween size="xs">
      <Header variant="h3">No puede solicitar CDI</Header>
      <Alert header="No figura su registro en RRHH" type="warning">
        Comuníquese con el personal del RAIS en caso vea este error si es que
        usted es docente desde hace más de un mes en la UNMMS
      </Alert>
    </SpaceBetween>
  );
};
