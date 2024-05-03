import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  SpaceBetween,
} from "@cloudscape-design/components";
import Sidebar from "../../../components/sidebar.jsx";
import Navbar from "../../../components/navbar.jsx";
import Detalle from "./detalle.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import ProtectedRoute from "../../../components/protectedRoute.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Facultad",
    href: "#",
  },
  {
    text: "Convocatorias",
    href: "../convocatorias",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_convocatoria() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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
            header={<Header variant="h1">Detalle del convocatoria:</Header>}
          >
            <SpaceBetween size="l">
              <Detalle data={data} loading={loading} />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
