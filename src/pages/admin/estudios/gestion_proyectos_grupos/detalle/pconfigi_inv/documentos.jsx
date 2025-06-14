import { Button, SpaceBetween } from "@cloudscape-design/components";

export default ({ data, loading }) => {
  const descargar1 = () => {
    window.location.href = data?.documento1?.archivo;
  };

  const descargar2 = () => {
    window.location.href = data?.documento2?.archivo;
  };

  return (
    <SpaceBetween size="xs" direction="horizontal">
      <Button onClick={descargar1} disabled={loading || !data?.documento1}>
        Descargar anexo
      </Button>
      <Button onClick={descargar2} disabled={loading || !data?.documento2}>
        Descargar anexo de metodología
      </Button>
    </SpaceBetween>
  );
};
