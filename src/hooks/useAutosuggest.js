import { useState, useEffect } from "react";
import axiosBase from "../api/axios";

const useAutosuggest = (type) => {
  //  States
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [avoidSelect, setAvoidSelect] = useState(true);

  //  Functions
  const getData = async () => {
    setLoading(true);
    switch (type) {
      case "investigador":
        {
          const res = await axiosBase.get(
            "admin/admin/usuarios/searchInvestigadorBy",
            {
              params: {
                query: value,
              },
            }
          );
          const data = await res.data;
          setOptions(data);
        }
        break;
      case "rrhh":
        {
          const res = await axiosBase.get(
            "admin/estudios/grupos/searchDocenteRrhh",
            {
              params: {
                query: value,
              },
            }
          );
          const data = await res.data;
          setOptions(data);
        }
        break;
      case "estudiante":
        {
          const res = await axiosBase.get(
            "admin/estudios/grupos/searchEstudiante",
            {
              params: {
                query: value,
              },
            }
          );
          const data = res.data;
          setOptions(data);
        }
        break;
      case "egresado":
        {
          const res = await axiosBase.get(
            "admin/estudios/grupos/searchEgresado",
            {
              params: {
                query: value,
              },
            }
          );
          const data = res.data;
          setOptions(data);
        }
        break;
      case "sum":
        {
          const res = await axiosBase.get("admin/estudios/sum/listadoSum", {
            params: {
              query: value,
            },
          });
          const data = res.data;
          setOptions(data);
        }
        break;
      case "investigador_Docente permanente":
        {
          const res = await axiosBase.get(
            "admin/estudios/investigadores/searchDocenteRrhh",
            {
              params: {
                query: value,
              },
            }
          );
          const data = res.data;
          setOptions(data);
        }
        break;
      case "investigador_Docente permanente":
        {
          const res = await axiosBase.get(
            "admin/estudios/investigadores/searchDocenteRrhh",
            {
              params: {
                query: value,
              },
            }
          );
          const data = res.data;
          setOptions(data);
        }
        break;
      case "investigador_Estudiante":
        {
          const res = await axiosBase.get(
            "admin/estudios/investigadores/searchEstudiante",
            {
              params: {
                query: value,
              },
            }
          );
          const data = res.data;
          setOptions(data);
        }
        break;
      case "proyectos_registrados":
        {
          const res = await axiosBase.get(
            "investigador/publicaciones/proyectos_registrados",
            {
              params: {
                query: value,
              },
            }
          );
          const data = res.data;
          setOptions(data);
        }
        break;
      default:
        break;
    }
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    const temp = setTimeout(() => {
      if (value.length > 2 && avoidSelect) {
        getData();
      } else {
        setAvoidSelect(true);
      }
    }, 1000);
    return () => clearTimeout(temp);
  }, [value]);

  return { loading, options, setOptions, value, setValue, setAvoidSelect };
};

export { useAutosuggest };
