import { Button } from "@cloudscape-design/components";

export default ({ data, loading }) => {
  const descargar = () => {
    window.location.href = data?.archivo;
  };

  return (
    <Button onClick={descargar} disabled={loading || !data?.archivo}>
      Descargar anexo
    </Button>
  );
};
