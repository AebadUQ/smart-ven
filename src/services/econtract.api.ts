import axiosInstance from "./axiosInstance";

export async function addEContract(data: any) {
    return await axiosInstance.post<any>('api/e-contract', data);
}



export async function editEContract(id: any, data: any) {
    return await axiosInstance.put<any>(`api/e-contract/${id}`, data);
}

export async function deleteEContract(id: any) {
    return await axiosInstance.delete<any>(`api/e-contract/${id}`);
}


export async function sendEContract(data: any) {
    return await axiosInstance.post<any>('api/users-e-contract', data);
}

export async function FavroiteEContractById(id: any) {
    return await axiosInstance.get<any>(`api/e-contract/${id}/favourite`);
}

export async function getEContractById(id: any) {
    return await axiosInstance.get<any>(`api/e-contract/${id}`);
}
export async function getDeclarationtById() {
    return await axiosInstance.get<any>(`api/declarations`);
}
export async function deleteEContractById(id: any) {
    return await axiosInstance.delete<any>(`api/e-contract/${id}`);
}

// export function getEContracts() {
//     return ('api/e-contract');
// }

export async function getEContracts(page = 1, limit = 10) {
  const { data } = await axiosInstance.get<any>('api/e-contract', {
    params: { page, limit },
  });
  return data;
}

export function getSendEContracts() {
    return ('api/users-e-contract');
}
export async function contractDuplciate(id: any) {
    return await axiosInstance.get<any>(`api/e-contract/duplicate/${id}`);
}
export async function addDecleration(data: any) {
    return await axiosInstance.post<any>('api/user-declarations', data);
}
export function getDecleration() {
     return ('api/user-declarations');
}

export async function editDecleration(id:any,data: any) {
        return await axiosInstance.put<any>(`api/declarations/${id}`, data);

}
export function getDeclerations() {
    return ('api/user-declarations');
}