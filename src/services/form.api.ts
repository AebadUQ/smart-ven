import axiosInstance from "./axiosInstance";

export const getForms = async (): Promise<any> => {
  const { data } = await axiosInstance.get("api/user/get-all-forms?limit=30");
  return data?.data;
};

export const getForm = () => {
  return "api/user/get-all-forms"
}
export const getAllFormsCompleted = () => {
  return "api/user/get-all-forms-user?type=completed"
}
export const getFormsCategory = async () => {
  const data = await axiosInstance.get("api/categories/get-forms-category");
  return data?.data;
}

export const getFormBYId = async (id: any) => {
  const data = await axiosInstance.get(`api/user/get-form-user/${id}`);
  return data?.data;
}

export const getFormsByDashboard = async () => {
  const data = await axiosInstance.get(`api/user/get-all-forms-user?type=completed`);
  return data?.data;
}

export const getRecentCallsByDashboard = async () => {
  const data = await axiosInstance.get(`api/call-logs/view-call-logs`);
  return data?.data;
}
