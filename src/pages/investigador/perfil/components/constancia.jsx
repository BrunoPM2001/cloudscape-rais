import { Alert, Button } from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Alert
      header="Constancia vigente"
      type="success"
      action={
        <Button
          iconName="download"
          href={data.url}
          target="_blank"
          variant="primary"
          iconAlign="right"
        >
          Descargar
        </Button>
      }
    >
      Vigente desde el {data.fecha_inicio} hasta el {data.fecha_fin}. La validez
      del presente documento está condicionada a la vigencia de su registro en
      RENACYT.
    </Alert>
  );
};
