import { Spinner } from "@cloudscape-design/components";
import Articulo from "./publicaciones_tipo/articulo";
import Capitulo from "./publicaciones_tipo/capitulo";
import Evento from "./publicaciones_tipo/evento";
import Libro from "./publicaciones_tipo/libro";
import Tesis_asesoria from "./publicaciones_tipo/tesis_asesoria";
import Tesis_propia from "./publicaciones_tipo/tesis_propia";

export default ({ data, loading, tipo }) => {
  return (
    <>
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : tipo == "articulo" ? (
        <Articulo data={data} />
      ) : tipo == "capitulo" ? (
        <Capitulo data={data} />
      ) : tipo == "evento" ? (
        <Evento data={data} />
      ) : tipo == "libro" ? (
        <Libro data={data} />
      ) : tipo == "tesis-asesoria" ? (
        <Tesis_asesoria data={data} />
      ) : tipo == "tesis" ? (
        <Tesis_propia data={data} />
      ) : (
        <></>
      )}
    </>
  );
};
