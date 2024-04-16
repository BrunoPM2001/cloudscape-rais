import { Container, Header, LineChart } from "@cloudscape-design/components";

const data = [
  {
    periodo: 2012,
    PCONFIGI: 500,
    PFEX: 4,
  },
  {
    periodo: 2013,
    PCONFIGI: 414,
    PFEX: 40,
    "PCONFIGI-INV": 71,
    PINTERDIS: 3,
    PTPGRADO: 1,
    PMULTI: 1,
    PSINFINV: 188,
    PSINFIPU: 61,
    ECI: 95,
    "PRO-CTIE": 49,
  },
  {
    periodo: 2014,
    PCONFIGI: 442,
    PFEX: 48,
    PMULTI: 51,
    RFPLU: 63,
    PINTERDIS: 28,
    PSINFINV: 120,
    PSINFIPU: 47,
    SPINOFF: 11,
  },
  {
    periodo: 2015,
    PCONFIGI: 502,
    PFEX: 35,
    RFPLU: 68,
    PINTERDIS: 28,
    PSINFINV: 220,
    PSINFIPU: 77,
    SPINOFF: 12,
  },
  {
    periodo: 2016,
    PCONFIGI: 981,
    PFEX: 17,
    PSINFINV: 177,
    PSINFIPU: 42,
  },
  {
    periodo: 2017,
    PCONFIGI: 414,
    PFEX: 40,
    "PCONFIGI-INV": 71,
    PINTERDIS: 3,
    PTPGRADO: 1,
    PMULTI: 1,
    PSINFINV: 188,
    PSINFIPU: 61,
    ECI: 95,
    "PRO-CTIE": 49,
  },
  {
    periodo: 2018,
    PCONFIGI: 500,
    PFEX: 4,
  },
  {
    periodo: 2019,
    PCONFIGI: 414,
    PFEX: 40,
    "PCONFIGI-INV": 71,
    PINTERDIS: 3,
    PTPGRADO: 1,
    PMULTI: 1,
    PSINFINV: 188,
    PSINFIPU: 61,
    ECI: 95,
    "PRO-CTIE": 49,
  },
  {
    periodo: 2020,
    PCONFIGI: 442,
    PFEX: 48,
    PMULTI: 51,
    RFPLU: 63,
    PINTERDIS: 28,
    PSINFINV: 120,
    PSINFIPU: 47,
    SPINOFF: 11,
  },
  {
    periodo: 2021,
    PCONFIGI: 502,
    PFEX: 35,
    RFPLU: 68,
    PINTERDIS: 28,
    PSINFINV: 220,
    PSINFIPU: 77,
    SPINOFF: 12,
  },
  {
    periodo: 2022,
    PCONFIGI: 981,
    PFEX: 17,
    PSINFINV: 177,
    PSINFIPU: 42,
  },
  {
    periodo: 2023,
    PCONFIGI: 414,
    PFEX: 40,
    "PCONFIGI-INV": 71,
    PINTERDIS: 3,
    PTPGRADO: 1,
    PMULTI: 1,
    PSINFINV: 188,
    PSINFIPU: 61,
    ECI: 95,
    "PRO-CTIE": 49,
  },
  {
    periodo: 2024,
    PCONFIGI: 500,
    PFEX: 4,
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
          Proyectos a lo largo del tiempo
        </Header>
      }
      fitHeight={true}
    >
      <LineChart
        hideFilter
        fitHeight
        height={150}
        series={[
          {
            title: "PCONFIGI",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.PCONFIGI ?? 0,
            })),
          },
          {
            title: "PFEX",
            type: "line",
            data: data.map((item) => ({ x: item.periodo, y: item.PFEX ?? 0 })),
          },
          {
            title: "PCONFIGI-INV",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item["PCONFIGI-INV"] ?? 0,
            })),
          },
          {
            title: "PINTERDIS",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.PINTERDIS ?? 0,
            })),
          },
          {
            title: "PTPGRADO",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.PTPGRADO ?? 0,
            })),
          },
          {
            title: "PMULTI",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.PMULTI ?? 0,
            })),
          },
          {
            title: "PSINFINV",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.PSINFINV ?? 0,
            })),
          },
          {
            title: "PSINFIPU",
            type: "line",
            data: data.map((item) => ({
              x: item.periodo,
              y: item.PSINFIPU ?? 0,
            })),
          },
        ]}
        yDomain={[0, 1000]}
        xDomain={[
          2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
          2023, 2024,
        ]}
        xScaleType="categorical"
        xTitle="Periodo"
        yTitle="Cantidad de proyectos"
      />
    </Container>
  );
}
