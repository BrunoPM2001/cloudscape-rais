import { useState, useEffect } from "react";
import axiosBase from "../api/axios";

const useAutosuggest = (url) => {
  //  States
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [avoidSelect, setAvoidSelect] = useState(true);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(url, {
      params: {
        query: value,
      },
    });
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

  return { loading, options, setOptions, value, setValue, setAvoidSelect };
};

export { useAutosuggest };
