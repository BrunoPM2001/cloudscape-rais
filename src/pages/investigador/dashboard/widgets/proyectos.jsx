import { BarChart, Container, Header } from "@cloudscape-design/components";
import { useEffect, useState } from "react";

export default function () {
  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  //  Functions
  const getData = async () => {
    try {
      setLoading("loading");
      const res = await fetch(
        "http://localhost:8000/api/investigador/dashboard/tipoProyectos",
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
        setData(data.data);
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
          description="Cantidad de proyectos en los que participó"
        >
          Tipos de proyecto
        </Header>
      }
      fitHeight={true}
    >
      <BarChart
        statusType={loading}
        fitHeight
        height={150}
        series={[
          {
            title: "Tipo de proyecto",
            type: "bar",
            data: data.map((item) => ({
              x: item.title,
              y: parseInt(item.cuenta),
            })),
          },
        ]}
        xScaleType="categorical"
        xDomain={data.map((item) => item.title)}
        yDomain={[0, 20]}
        xTitle="Tipos de proyecto"
        yTitle="Cantidad de proyectos"
      />
    </Container>
  );
}
