import { Alert } from "@cloudscape-design/components";

export default () => {
  return (
    <Alert header="No cumple con los prerrequisitos para solicitar CDI">
      Necesita tener registrado su CTI VITAE, Google Scholar, ORCID asociado al
      RAIS y su nivel de Renacyt no debe ser María R. ni Carlos M.
    </Alert>
  );
};
