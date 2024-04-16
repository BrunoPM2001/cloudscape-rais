import { Container, Header, PieChart } from "@cloudscape-design/components";

const data = [
  {
    title: "PCONFIGI",
    value: 200,
  },
  {
    title: "ECI",
    value: 532,
  },
  {
    title: "PINVPOS",
    value: 476,
  },
];

export default function () {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de proyectos clasificados por tipos"
        >
          Proyectos del presente año
        </Header>
      }
      fitHeight={true}
    >
      <PieChart hideFilter fitHeight size="large" data={data} />
    </Container>
  );
}
