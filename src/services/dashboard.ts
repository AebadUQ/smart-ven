import axiosInstance from "./axiosInstance";

export const getCharts = async (): Promise<any> => {
  const { data } = await axiosInstance.get("api/dashboard/analytics");
  return data?.data;
};

