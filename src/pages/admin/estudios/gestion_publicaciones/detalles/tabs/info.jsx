import { Spinner } from "@cloudscape-design/components";
import Articulo from "./publicaciones_tipo/articulo";
import Capitulo from "./publicaciones_tipo/capitulo";
import Evento from "./publicaciones_tipo/evento";
import Libro from "./publicaciones_tipo/libro";
import Tesis_asesoria from "./publicaciones_tipo/tesis_asesoria";
import Tesis_propia from "./publicaciones_tipo/tesis_propia";

export default ({ data, loading, tipo, reload }) => {
  return (
    <>
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : tipo == "articulo" ? (
        <Articulo data={data} reload={reload} />
      ) : tipo == "capitulo" ? (
        <Capitulo data={data} reload={reload} />
      ) : tipo == "evento" ? (
        <Evento data={data} reload={reload} />
      ) : tipo == "libro" ? (
        <Libro data={data} reload={reload} />
      ) : tipo == "tesis-asesoria" ? (
        <Tesis_asesoria data={data} reload={reload} />
      ) : tipo == "tesis" ? (
        <Tesis_propia data={data} reload={reload} />
      ) : (
        <></>
      )}
    </>
  );
};
