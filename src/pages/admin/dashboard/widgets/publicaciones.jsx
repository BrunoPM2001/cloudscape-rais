import { BarChart, Container, Header } from "@cloudscape-design/components";
import { useEffect, useState } from "react";

const data = [
  {
    titulo: "null",
    cuenta: 5612,
  },
  {
    titulo: "Artículos Publicados en Revistas de Investigación",
    cuenta: 24061,
  },
  {
    titulo: "Resúmenes de Eventos Científicos",
    cuenta: 15023,
  },
  {
    titulo: "Tesis de Pre y Postgrado",
    cuenta: 3382,
  },
  {
    titulo: "Ensayos",
    cuenta: 238,
  },
  {
    titulo: "Capitulo de Libros",
    cuenta: 2342,
  },
  {
    titulo: "Libros",
    cuenta: 2579,
  },
  {
    titulo: "Tesis asesoria",
    cuenta: 5563,
  },
];

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
        "http://localhost:8000/api/admin/dashboard/tipoPublicaciones"
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
