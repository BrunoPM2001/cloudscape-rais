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
import ProtectedRoute from "../../../components/protectedRoute.jsx";
import Miembros from "./tabs/miembros.jsx";
import Documentos from "./tabs/documentos.jsx";
import Lineas from "./tabs/lineas.jsx";
import Proyectos from "./tabs/proyectos.jsx";
import Publicaciones from "./tabs/publicaciones.jsx";
import Laboratorios from "./tabs/laboratorios.jsx";
import Extras from "./tabs/extras.jsx";
import Detalles from "./detalles.jsx";
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
    text: "Gestion de grupos",
    href: "../grupos",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_grupo() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "miembros",
      label: "Miembros",
      content: <Miembros />,
    },
    {
      id: "documentos",
      label: "Documentos",
      content: <Documentos />,
    },
    {
      id: "lineas",
      label: "Lineas",
      content: <Lineas />,
    },
    {
      id: "proyectos",
      label: "Proyectos",
      content: <Proyectos />,
    },
    {
      id: "publicaciones",
      label: "Publicaciones",
      content: <Publicaciones />,
    },
    {
      id: "laboratorios",
      label: "Laboratorios",
      content: <Laboratorios />,
    },
    {
      id: "extras",
      label: "Extras",
      content: <Extras data={data} loading={loading} />,
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
        "http://localhost:8000/api/admin/estudios/grupos/detalle/" + id
      );
      if (!res.ok) {
        localStorage.clear();
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
    <ProtectedRoute>
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
              <Header variant="h1">Detalle del grupo de investigación:</Header>
            }
          >
            <SpaceBetween size="l">
              <Detalles data={data} loading={loading} />
              <Tabs tabs={tabs} ariaLabel="Opciones de grupo" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
