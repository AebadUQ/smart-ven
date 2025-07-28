import axiosInstance from "./axiosInstance";

export const fetchData = async <T>(url: string, params?: any): Promise<T> => {
    const { data } = await axiosInstance.get(url, { params }); 
    return data;
};


