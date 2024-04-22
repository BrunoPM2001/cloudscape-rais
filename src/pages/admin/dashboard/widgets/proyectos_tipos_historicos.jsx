import { Container, Header, LineChart } from "@cloudscape-design/components";
import { useEffect, useState } from "react";

export default function () {
  //  States
  const [data, setData] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState("loading");

  //  Functions
  const getData = async () => {
    try {
      setLoading("loading");
      const res = await fetch(
        "http://localhost:8000/api/admin/dashboard/proyectosHistoricoData",
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (!res.ok) {
        setLoading("error");
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setTipos(data.tipos);
        setData(data.cuenta);
        setLoading("finished");
      }
    } catch (error) {
      setItems([]);
      setLoading("error");
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

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
        statusType={loading}
        fitHeight
        height={200}
        series={tipos.map((tipo) => ({
          title: tipo.tipo_proyecto,
          type: "line",
          data: data.map((item) => ({
            x: parseInt(item.periodo),
            y: item[tipo.tipo_proyecto],
          })),
        }))}
        xScaleType="categorical"
        xDomain={[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]}
        yDomain={[0, 600]}
        xTitle="Periodo"
        yTitle="Cantidad de proyectos"
      />
    </Container>
  );
}
