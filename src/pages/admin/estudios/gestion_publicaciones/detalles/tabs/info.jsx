import { Spinner } from "@cloudscape-design/components";
import Articulo from "./publicaciones_tipo/articulo";
import Capitulo from "./publicaciones_tipo/capitulo";
import Evento from "./publicaciones_tipo/evento";
import Libro from "./publicaciones_tipo/libro";
import Tesis_asesoria from "./publicaciones_tipo/tesis_asesoria";
import Tesis_propia from "./publicaciones_tipo/tesis_propia";

export default ({ data, setData, loading, tipo, reload }) => {
  return (
    <>
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : tipo == "articulo" ? (
        <Articulo data={data} setData={setData} reload={reload} />
      ) : tipo == "capitulo" ? (
        <Capitulo data={data} setData={setData} reload={reload} />
      ) : tipo == "evento" ? (
        <Evento data={data} setData={setData} reload={reload} />
      ) : tipo == "libro" ? (
        <Libro data={data} setData={setData} reload={reload} />
      ) : tipo == "tesis-asesoria" ? (
        <Tesis_asesoria data={data} setData={setData} reload={reload} />
      ) : (
        tipo == "tesis" && (
          <Tesis_propia data={data} setData={setData} reload={reload} />
        )
      )}
    </>
  );
};
