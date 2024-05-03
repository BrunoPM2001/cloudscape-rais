import { BarChart, Container, Header } from "@cloudscape-design/components";
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
        "http://localhost:8000/api/admin/dashboard/tipoPublicaciones",
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (!res.ok) {
        localStorage.clear();
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
          description="Cantidad de publicaciones registradas los últimos años"
        >
          Publicaciones por periodo
        </Header>
      }
      fitHeight={true}
    >
      <BarChart
        statusType={loading}
        fitHeight
        height={150}
        series={tipos.map((tipo) => ({
          title: tipo.tipo,
          type: "bar",
          data: data.map((item) => ({
            x: parseInt(item.periodo),
            y: item[tipo.tipo],
          })),
        }))}
        xScaleType="categorical"
        xDomain={data.map((item) => item.periodo)}
        yDomain={[0, 3000]}
        xTitle="Periodos"
        yTitle="Cantidad de publicaciones"
      />
    </Container>
  );
}
