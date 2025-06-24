import { Box, Spinner } from "@cloudscape-design/components";
import Psinfinv from "../proyectos/psinfinv";
import Psinfipu from "../proyectos/psinfipu";
import Pconfigi from "../proyectos/pconfigi";
import Pmulti from "../proyectos/pmulti";
import Eci from "../proyectos/eci";
import Pconfiginv from "../proyectos/pconfiginv";

export default ({ loading, data }) => {
  console.log(data);
  return (
    <Box>
      <div
        style={{
          maxHeight: "400px",
          border: "1px solid #000",
          padding: "15px",
          overflow: "auto",
        }}
      >
        {loading ? (
          <>
            <Spinner /> Cargando información del proyecto
          </>
        ) : (
          <>
            {data.proyecto.tipo_proyecto === "PSINFINV" ? (
              <Psinfinv data={data} />
            ) : data.proyecto.tipo_proyecto === "PSINFIPU" ? (
              <Psinfipu data={data} />
            ) : data.proyecto.tipo_proyecto === "PCONFIGI" ? (
              <Pconfigi data={data} />
            ) : data.proyecto.tipo_proyecto === "PMULTI" ? (
              <Pmulti data={data} />
            ) : data.proyecto.tipo_proyecto === "ECI" ? (
              <Eci data={data} />
            ) : data.proyecto.tipo_proyecto === "PCONFIGI-INV" ? (
              <Pconfiginv data={data} />
            ) : (
              <p>Proyecto no reconocido</p>
            )}
          </>
        )}
      </div>
    </Box>
  );
};
