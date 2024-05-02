import { BarChart, Container, Header } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";

export default function () {
  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  //  Functions
  const getData = async () => {
    try {
      setLoading("loading");
      const res = await axiosBase.get("investigador/dashboard/tipoProyectos");
      if (res.status == 401 || res.status == 500) {
        localStorage.removeItem("Auth");
        setLoading(false);
      } else {
        const data = await res.data;
        setData(data.data);
        setLoading("finished");
      }
    } catch (error) {
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
