import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../types/apiResponse";
import { fetchData } from "../services/apiService";
import { fetchJobData } from "../services/jobs.api";
import _ from "lodash";

type FilterType = {
  [key: string]: string;
} | null;

function useInfiniteListApi<T>(listUrl: string, type: string = "middleware") {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState<any | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilterState] = useState<FilterType>(null);

  const setFilter = (filters: FilterType) => {
    setFilterState(filters);
    setPageIndex(1);
    setData([]);
    setHasMore(true);
  };

  const fetchDataApi = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const sortOrder = sort?.order ?? "";
    const sortKey = sort?.key ?? "";
    const sortBy =
      sortOrder && sortKey ? `${sortKey}:${sortOrder}` : "";
    const filterOptions = filter ? { ...filter } : {};
    const params = {
      page: pageIndex,
      search: query,
      limit: pageSize,
      sortBy,
      ...filterOptions,
    };

    try {
      let result;

      if (type === "middleware") {
        result = await fetchData<ApiResponse<any[]>>(listUrl, params);
      } else {
        result = await fetchJobData<ApiResponse<any[]>>(listUrl, params);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const newData = Array.isArray(result?.data)
        ? result?.data
        : result?.data?.data;

      const totalDocs = result?.data?.metaData?.totalDocs ?? 0;

      setData((prev) => [...prev, ...newData]);
      setTotal(totalDocs);

      if (pageIndex * pageSize >= totalDocs) {
        setHasMore(false);
      } else {
        setPageIndex((prev) => prev + 1);
      }

    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const onSort = (sort: OnSortParam) => {
    setSort(sort);
    setData([]);
    setPageIndex(1);
    setHasMore(true);
  };

  function onSearchChange(val: string) {
    setQuery(val);
    setPageIndex(1);
    setData([]);
    setHasMore(true);
  }

  const debounceFn = _.debounce(onSearchChange, 500);

  const onEditSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
  };

  useEffect(() => {
    fetchDataApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, query, filter]);

  return {
    data,
    total,
    loading,
    fetchMore: fetchDataApi, // Call this when scroll hits bottom
    onSort,
    onEditSearch,
    filter,
    setFilter,
    hasMore,
    setData,
  };
}

export default useInfiniteListApi;
