import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";
import Sidebar from "../../../components/sidebar.jsx";
import Navbar from "../../../components/navbar.jsx";
import Detalles from "./detalles.jsx";
import Integrantes from "./tabs/integrantes.jsx";
import Descripcion from "./tabs/descripcion.jsx";
import Calendario from "./tabs/calendario.jsx";
import Presupuesto from "./tabs/presupuesto.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
    href: "#",
  },
  {
    text: "Gestión de proyectos de grupos",
    href: "../proyectos_grupos",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_proyecto_grupo() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "integrantes",
      label: "Integrantes",
      content: <Integrantes />,
    },
    {
      id: "descripcion",
      label: "Descripcion",
      content: <Descripcion />,
    },
    {
      id: "calendario",
      label: "Calendario",
      content: <Calendario />,
    },
    {
      id: "presupuesto",
      label: "Presupuesto",
      content: <Presupuesto />,
    },
  ];

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/estudios/proyectosGrupo/detalle/" + id
      );
      if (!res.ok) {
        setData([]);
        setLoading(false);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setData(data.data[0]);
        setLoading(false);
      }
    } catch (error) {
      setData([]);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Información sobre la páginal actual para poder mostrarla al público
            en general.
          </HelpPanel>
        }
        content={
          <ContentLayout
            header={
              <Header variant="h1">Detalle del proyecto de grupo:</Header>
            }
          >
            <SpaceBetween size="l">
              <Detalles data={data} loading={loading} />
              <Tabs tabs={tabs} ariaLabel="Opciones de proyecto de grupo" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
