import axiosInstance from "./axiosInstance";

export async function  createUserRoll(data: any) {
  return await axiosInstance.post<any>('api/roles/create-role', data);
}

export async function getUserRoll() {
  return await axiosInstance.get<any>('api/permissions/get-module-with-permissions');
}

export async function getUserRoleByID(roleId: string) {
  const response = await axiosInstance.get(`/api/roles/get-role/${roleId}`);
  return response.data;
}

export async function updateUser(id: string, data: any) {
  try {
    const response = await axiosInstance.put<any>(`api/users/update-user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update user API error:", error);
    if (error.response) {
      console.error("Error response status:", error.response.status);  // Logs HTTP status
      console.error("Error response data:", JSON.stringify(error.response.data, null, 2));  // Logs full response
    }
    throw error;
  }
}

export const updateUserRole = async (roleData: any): Promise<any> => {
  try {
    return await axiosInstance.put<any>(`api/roles/update-role/${roleData.id}`, roleData);
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export async function inviteUser(data: any) {
  return await axiosInstance.post<any>('api/users/create-user', data);
}

export function getRolePermissions() {
  return 'api/permissions/get-module-with-permissions';
}


export async function deleteUserRole(data: any) {
  return await axiosInstance.post<any>('api/roles/delete-role', {RoleIds:data, softDelete:true});
}


