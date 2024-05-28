import { useState, useEffect, useCallback } from "react";
import axiosBase from "../api/axios";

const usePaginatedData = (initialPageSize, initialSearch = "") => {
  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [cache, setCache] = useState({});

  //  Functions
  const fetchPage = useCallback(
    async (page) => {
      if (cache[page]) {
        setData(cache[page].data);
        setTotalPages(cache[page].last_page);
        setTotalRecords(cache[page].total);
      } else {
        setLoadingData(true);
        const response = await axiosBase.get(
          "admin/estudios/sum/listadoLocal",
          {
            params: {
              page: page,
              search: search,
            },
          }
        );
        const result = response.data;
        setLoadingData(false);
        setCache((prevCache) => ({
          ...prevCache,
          [page]: {
            data: result.data,
            last_page: result.last_page,
            total: result.total,
          },
        }));
        setData(result.data);
        setTotalPages(result.last_page);
        setTotalRecords(result.total);
      }
    },
    [cache, pageSize]
  );

  const handleSearch = (input) => {
    setSearch(input);
    setPage(1);
    setCache({});
  };

  //  Effects
  useEffect(() => {
    fetchPage(page, search);
  }, [page, fetchPage]);

  return {
    loadingData,
    data,
    page,
    totalPages,
    totalRecords,
    setPage,
    handleSearch,
  };
};

export default usePaginatedData;
