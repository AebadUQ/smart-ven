import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../types/apiResponse";
import { fetchData } from "../services/apiService";
import { fetchJobData } from "../services/jobs.api";
import _ from "lodash";

//import { showNotificationMessage } from "../Helper";

type FilterType = {
  [key: string]: string;
} | null;

function useListApi<T>(listUrl: string, deleteUrl: string, type: string = 'middleware') {
  //state
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sort, setSort] = useState<any | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilterState] = useState<FilterType>(null);

  const setFilter = (filters: FilterType) => {
    setFilterState(filters);
    setPageIndex(1);
  };
  // fetch api
  const fetchDataApi = async () => {
    // set loading true
    setLoading(true);

    // set query params
    const sortOrder = sort?.order ?? "";
    const sortKey = sort?.key ?? "";
    const sortBy =
      sortOrder != "" && sortKey != "" ? `${sortKey}:${sortOrder}` : "";
    const filterOptions = filter ? { ...filter } : {};
    const params = {
      page: pageIndex,
      search: query,
      limit: pageSize,
      sortBy,
      ...filterOptions,
    };

    try {
      // fetch result
      let result; 
     
      if(type === "middleware" ){
       result = await fetchData<ApiResponse<any[]>>(listUrl, params);
  
      }
      else{
        result = await fetchJobData<ApiResponse<any[]>>(listUrl, params);
  
      }
      
      // for testing
      await new Promise((resolve) => setTimeout(resolve, 300));

      // set data in state
      setLoading(false);
      if(Array.isArray(result?.data)){
        setData(result?.data);
      }else{
        setData(result?.data?.data);
      }
      setPageIndex((result?.data?.metaData?.page) ?? 1);
      setPageSize((result?.data?.metaData?.limit) ?? 10);
      setTotal((result?.data?.metaData?.totalDocs) ?? 0);
    } catch (error) {
      console.log(`error`, error);
      setLoading(false);
    }
  };

  // change events
  const onPaginationChange = (page: number) => {
    setPageIndex(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageIndex(1);
    setPageSize(value);
    setData([]);
  };

  const onSort = (sort: OnSortParam) => {
    setSort(sort);
  };

  function onSearchChange(val: string) {
    setQuery(val);
    setPageIndex(1);
    setTotal(0);
    setData([]);
  }

  const debounceFn = _.debounce(onSearchChange, 500);

  const onEditSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
  };

  const handleDeleteClick = useCallback(
    (id: string) => () => {
      setSelectedItem(id);
      setShowDeleteDialog(true);
    },
    []
  );

  const onDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const onDeleteConfirm = async () => {
    try {
      // hide dialog
      setShowDeleteDialog(false);

      // set loading true
      setLoading(true);

      fetchDataApi();
    } catch (error) {
      // console error
      console.log(`error`, error);

      setLoading(false);
    }
  };

  // use effect call
  useEffect(() => {
    fetchDataApi();
  }, [pageIndex, sort, query, pageSize, filter]);

  // return state and functions
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
