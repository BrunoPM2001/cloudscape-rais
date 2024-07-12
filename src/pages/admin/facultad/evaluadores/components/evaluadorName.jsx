import { useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { Autosuggest } from "@cloudscape-design/components";

export default ({ value, setValue, index }) => {
  //  States
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [avoidSelect, setAvoidSelect] = useState(false);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/facultad/evaluadores/searchEvaluadorBy",
      {
        params: {
          query: value,
        },
      }
    );
    const data = res.data;
    setOptions(data);
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

  return (
    <Autosuggest
      onChange={({ detail }) => {
        setOptions([]);
        setValue((prevState) => {
          const newArray = [...prevState];
          newArray[index] = { evaluador: detail.value };
          return newArray;
        });
      }}
      onSelect={({ detail }) => {
        if (detail.selectedOption.id != undefined) {
          setValue((prevState) => {
            const newArray = [...prevState];
            newArray[index] = {
              evaluador: detail.value,
              id: detail.selectedOption.id,
            };
            return newArray;
          });
          setAvoidSelect(false);
        }
      }}
      value={value}
      options={options}
      loadingText="Cargando data"
      placeholder="Nombres o apellidos"
      statusType={loading ? "loading" : "finished"}
      empty="No se encontraron resultados"
    />
  );
};
