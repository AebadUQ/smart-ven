"use client";

import axiosInstance from "./axiosInstance";
import type { SignInCredential, SignInResponse } from '@/types/auth'



export async function apiSignIn(data: SignInCredential) {
  return await axiosInstance.post<SignInResponse>('api/users/login', data);
}


export const logoutApi = async () => {
  const { data } = await axiosInstance.get("api/users/userLogout");

  return data;
};

export const getUserProfile = async () => {
  const data = await axiosInstance.get("api/users/get-user-profile");
  return data?.data;
};

export async function forgetPassword(data: any) {
    return await axiosInstance.post<any>('api/users/forgotPassword', data);
}
