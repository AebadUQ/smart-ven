import apiClient from './apiclient';


export async function postJob(data: any) {
    return await apiClient.post<any>('api/jobs', data);
}

export async function assignJob(data: any) {
    return await apiClient.post<any>('api/candidates/fromGeneralCandidateToCandidate', data);
}



export async function getJobCategories() {
    return await apiClient.get<any>('api/job-category');
}

export function getAllCandidates() {
    return ('api/candidates');
}

export async function getJobById(id: any) {
    return await apiClient.get<any>(`api/jobs/${id}`);
}

export async function updateJobById(id: any, data: any) {
    return await apiClient.put<any>(`api/jobs/${id}`, data);
}

export async function updateJobStatus(id: any, data: any) {
    return await apiClient.put<any>(`api/candidates/${id}`, data);
}

export async function getJobStatus(type: any) {
    return await apiClient.get<any>(`api/candidates/status?statusType=${type}`);
}

export function getAllJobs() {
    return ('api/jobs');
}

export async function getActiveJobs() {
    return await apiClient.get<any>(`api/jobs?isNotExpire=${true}&limit=100`);
}
export async function getAllActiveJobs() {
    return await apiClient.get<any>(`api/jobs?limit=100`);
}

export function getAllCandidatesById(id: string) {
    return (`api/job-application/${id}/candidates`);
}

export function getGeneralCandidates() {
    return (`api/candidates/general-candidates`);
}

export const getCareerDashboard = async (): Promise<any> => {
  const { data } = await apiClient.get<any>("api/jobs/chart-data");
  return data?.data;
};

export const getCareerConfiguration = async (type: string): Promise<any> => {
  const { data } = await apiClient.get<any>(`api/jobs/dropdown?type=${type}`);
  return data?.data;
};

export const addCareerConfiguration = async (body: any): Promise<any> => {
  const { data } = await apiClient.post<any>(`api/jobs/dropdown`, body);
  return data?.data;
};

export const editCareerConfiguration = async (body: any): Promise<any> => {
  const { data } = await apiClient.put<any>(`api/jobs/dropdown`, body);
  return data?.data;
};

export const deleteCareerConfiguration = async (
  params: { type: string; id: number }
): Promise<any> => {
  const { data } = await apiClient.delete<any>(
    `api/jobs/dropdown`,
    {
      params,        
    }
  );
  return data.data;
};

export const fetchJobData = async <T>(url: string, params?: any): Promise<T> => {
    const { data } = await apiClient.get(url, { params }); 
    return data;
};


