import { idea } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import axiosInstance from "./axiosInstance";



export async function addMerchant(data: any) {
    return await axiosInstance.post<any>('api/merchant/create-merchant', data);
}



export async function getOffer() {
    return await axiosInstance.get<any>('api/offer/get-offers?page=1&limit=100');
}

export const updateMerchant = (id: string, data: any) => {
    return axiosInstance.put(`api/merchant/${id}/update-merchant`, data);
};

export const updateOfferStatus = (id: string, data: any) => {
    return axiosInstance.patch(`api/offer/${id}/status`, {isActive: data});
  };

export async function createOffer(data: any) {
    return await axiosInstance.post<any>('api/offer/create-offer', data);
}

export async function getMerchantCategories() {
    return await axiosInstance.get<any>('api/merchant-categories/get-merchant-categories');
}

export async function getdropdownByCategory(category: string) {
    return await axiosInstance.get<any>(`api/dropdown/dropdownByCategory?category=${category}`);
}

// export async function getMerchant() {
//      const data = await axiosInstance.get<any>('api/merchant/get-merchants');
//      return data.data
// }
// export async function getMerchant(page = 1, limit = 10) {
//   const { data } = await axiosInstance.get<any>('api/merchant/get-merchants', {
//     params: { page, limit },
//   });
//   return data;
// }
export async function getMerchant(page = 1, limit = 10, merchantName = '') {
  const { data } = await axiosInstance.get<any>('api/merchant/get-merchants', {
    params: { page, limit, merchantName }, // 👈 added search param
  });
  return data;
}

export function getMerchantURL() {
    return 'api/merchant/get-merchants';
}

export function getOfferURL() {
  return 'api/offer/get-offers';
}
export const updateOffer = (id: any, data: any) => {
    return axiosInstance.put(`api/offer/${id}/update-offer`, data);
};
