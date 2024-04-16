import { BarChart, Container, Header } from "@cloudscape-design/components";

const data = [
  {
    periodo: 2017,
    deuda_academica: 60,
    deuda_economica: 2,
    deuda_academica_economica: 2,
  },
  {
    periodo: 2018,
    deuda_academica: 56,
    deuda_economica: 4,
    deuda_academica_economica: 9,
  },
  {
    periodo: 2019,
    deuda_academica: 58,
    deuda_economica: 5,
    deuda_academica_economica: 7,
  },
  {
    periodo: 2020,
    deuda_academica: 30,
    deuda_economica: 6,
    deuda_academica_economica: 4,
  },
  {
    periodo: 2021,
    deuda_academica: 40,
    deuda_economica: 1,
    deuda_academica_economica: 4,
  },
  {
    periodo: 2022,
    deuda_academica: 20,
    deuda_economica: 1,
    deuda_academica_economica: 1,
  },
];

export default function () {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de deudas registradas los últimos años"
        >
          Deudas académicas y económicas por año
        </Header>
      }
      fitHeight={true}
    >
      <BarChart
        fitHeight
        height={150}
        yDomain={[0, 80]}
        xDomain={[2017, 2018, 2019, 2020, 2021, 2022]}
        xScaleType="categorical"
        stackedBars
        hideFilter
        series={[
          {
            title: "Deuda académica",
            type: "bar",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.deuda_academica,
            })),
          },
          {
            title: "Deuda económica",
            type: "bar",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.deuda_economica,
            })),
          },
          {
            title: "Deuda académica y económica",
            type: "bar",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.deuda_academica_economica,
            })),
          },
        ]}
        xTitle="Periodo"
        yTitle="Cantidad total"
      />
    </Container>
  );
}
