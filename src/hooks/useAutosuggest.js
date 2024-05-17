import { useState, useEffect } from "react";
import axiosBase from "../api/axios";

const useAutosuggest = () => {
  //  States
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/admin/usuarios/searchInvestigadorBy/" + value
    );
    const data = await res.data;
    const opt = data.map((item) => {
      return {
        detail: item.id,
        value: `${item.codigo} | ${item.doc_numero} | ${item.apellido1} ${item.apellido2}, ${item.nombres}`,
      };
    });
    setOptions(opt);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    const temp = setTimeout(() => {
      if (value) {
        getData();
      }
    }, 1000);
    return () => clearTimeout(temp);
  }, [value]);

  return { loading, options, setOptions, value, setValue };
};

export { useAutosuggest };
