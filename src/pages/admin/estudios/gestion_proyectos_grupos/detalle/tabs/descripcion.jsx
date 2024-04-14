import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
  ExpandableSection,
  Container,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  //  State
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const sample = `<div>sample</div>`;

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
        {/* {data.resumen} */}
      </ExpandableSection>
      <ExpandableSection headerText="Antecedentes">
        {/* {data.antecedentes} */}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos">
        {/* {data.objetivos} */}
      </ExpandableSection>
      <ExpandableSection headerText="Justificacion">
        {/* {data.justificacion} */}
      </ExpandableSection>
      <ExpandableSection headerText="Hipótesis">
        {/* {data.hipotesis} */}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {/* {data.metodologia} */}
      </ExpandableSection>
      <ExpandableSection headerText="Referencias bibliográficas">
        {/* {data.referencias} */}
      </ExpandableSection>
      <ExpandableSection headerText="Contribución">
        <div dangerouslySetInnerHTML={{ __html: sample }} />
      </ExpandableSection>
    </Container>
  );
};
