import axiosInstance from "./axiosInstance";
import type { SignInCredential, SignInResponse } from '@/types/auth'

export async function  inviteUser(data: any) {
  return await axiosInstance.post<any>('api/users/create-user', data);
}
export async function getUserRoll() {
  return await axiosInstance.get<any>('api/roles/get-role');
}

export async function getBranches() {
  return await axiosInstance.get<any>('api/dropdown/dropdownByCategory?category=Branch');
}
export async function updateUser(data: { firstName: string; lastName: string }) {
  return await axiosInstance.put(`api/users/update-profile`, data);
}

export async function getUserRoleURL() {
  return await axiosInstance.get('api/roles/get-role');
}

export async function updatePassword(data: {currentPassword: string;newPassword: string;confirmPassword: string;}) {
  return await axiosInstance.patch("api/users/change-password", data);
}

export const updateUserStatus = async(id: string, data: any) => {
    return await axiosInstance.patch(`api/users/update-status/${id}`, {isActive: data});
};
  export const deleteUser = async(data: any[]) => {
    return await axiosInstance.post(`api/users/delete-user`,{"adminId":data});
};


export const getContactUsData = () => {
  return "api/contact-us";
}