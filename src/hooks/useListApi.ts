import { useCallback, useEffect, useMemo, useState, ChangeEvent } from "react";
import api from '@/api/axios';
type FilterType = Record<string, string> | null;
interface MetaData {
  page: number;
  limit: number;
  totalDocs: number;
}
interface ApiResponse<T> {
  data: T | { data: T; metaData: MetaData };
  metaData?: MetaData;
}
function useListApi<T>(listUrl: string) {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sort, setSort] = useState<{ key?: string; order?: string } | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilterState] = useState<FilterType>(null);
  const setFilter = (filters: FilterType) => {
    setFilterState(filters);
    setPageIndex(1);
  };

  const resetData = () => {
    setPageIndex(1);
    setTotal(0);
    setData([]);
  };
  const fetchDataApi = async () => {
    setLoading(true);

    const sortBy = sort?.key && sort?.order ? `${sort.key}:${sort.order}` : "";
    const params = {
      page: pageIndex,
      search: query,
      limit: pageSize,
      sortBy,
      ...filter,
    };

    try {
      // , { params }
      const { data: res } = await api.get<ApiResponse<T[]>>(listUrl);
console.log("res",res)
      const rows = Array.isArray(res.data) ? res.data : res.data.data;
      const meta: MetaData = res.metaData || (res.data as any).metaData || {};

      setData(rows);
      setPageIndex(meta.page ?? 1);
      setPageSize(meta.limit ?? 10);
      setTotal(meta.totalDocs ?? 0);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onPaginationChange = (page: number) => setPageIndex(page);

  const onPageSizeChange = (value: number) => {
    setPageSize(value);
    resetData();
  };

  const onSort = (sort: { key: string; order: string }) => setSort(sort);

  const onSearchChange = (val: string) => {
    setQuery(val);
    resetData();
  };

  const debouncedSearch = useMemo(() => {
    let timer: NodeJS.Timeout;
    return (val: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => onSearchChange(val), 500);
    };
  }, []);

  const onEditSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedItem(id);
    setShowDeleteDialog(true);
  }, []);

  const onDeleteDialogClose = () => setShowDeleteDialog(false);

  const onDeleteConfirm = async () => {
    setShowDeleteDialog(false);
    setLoading(true);
    await fetchDataApi();
    setLoading(false);
  };

  useEffect(() => {
    fetchDataApi();
  }, [pageIndex, sort, query, pageSize, filter]);

  return {
    pageIndex,
    pageSize,
    total,
    data,
    selectedItem,
    showDeleteDialog,
    loading,
    onPaginationChange,
    onPageSizeChange,
    onSort,
    onEditSearch,
    onDeleteDialogClose,
    onDeleteConfirm,
    handleDeleteClick,
    filter,
    setFilter,
    setData,
  };
}

export default useListApi;
