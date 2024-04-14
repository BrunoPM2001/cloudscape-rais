import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
  ExpandableSection,
  Container,
  Spinner,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  //  State
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/admin/estudios/proyectosGrupo/descripcion/" +
            id
        );
        if (!res.ok) {
          setItems([]);
          setLoading(!loading);
          throw new Error("Error in fetch");
        } else {
          const data = await res.json();
          setItems(data.data);
          setLoading(!loading);
        }
      } catch (error) {
        setItems([]);
        setLoading(!loading);
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Container>
      <ExpandableSection headerText="Resumen ejecutivo">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: items.resumen_ejecutivo }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Antecedentes">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: items.antecedentes }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: items.objetivos }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificacion">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: items.justificacion }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Hipótesis">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: items.hipotesis }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: items.metodologia_trabajo }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Referencias bibliográficas">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: items.referencias_bibliograficas,
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Contribución">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: items.contribucion_impacto }}
          />
        )}
      </ExpandableSection>
    </Container>
  );
};
