import axios from "axios";
import {
  REQUEST_HEADER_AUTH_KEY,
  TOKEN_TYPE,
  BASE_URL,
} from "../types/apiConstants"; // Remove BASE_URL import
//import deepParseJson from "@/app/utils/deepParseJson";
//import { logoutUser } from "@/app/utils/auth";

const LOCAL_STORAGE_NAME = "persist";
// axios instance
const axiosInstance = axios.create({
  timeout: 60000,
  baseURL: BASE_URL, // Use dynamic base URL from the environment
  headers: {
    "Content-Type": "application/json",
  },
});

// intercept request
axiosInstance.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem("custom-auth-token");
    const persistData: any = rawPersistData
      //? deepParseJson(rawPersistData)
      //: null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = persistData;
    
    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass successful responses as-is
//   async (error) => {
//     console.log(error);
//     return
//     const originalRequest = error.config;

//     // Add a retry counter if not already present
//     if (!originalRequest._retryCount) {
//       originalRequest._retryCount = 0;
//     }

//     // Check for 401 (Unauthorized) errors
//     if (error.response?.status === 401 && originalRequest._retryCount < 3) {
//       originalRequest._retryCount += 1;

//       try {
//         const rawPersistData = localStorage.getItem(
//           "persist:" + LOCAL_STORAGE_NAME
//         );
//         const persistData: any = rawPersistData
//           //? deepParseJson(rawPersistData)
//           //: null;
//         const refresh = persistData?.auth.refreshToken;

//         // Attempt to refresh the token
//         const { data } = await axios.post(BASE_URL + "/auth/refresh-token", {
//           refreshToken: refresh,
//         });

//         const { accessToken, refreshToken } = data.data;
//         persistData.auth.accessToken = accessToken;
//         persistData.auth.refreshToken = refreshToken;

//         localStorage.setItem(
//           "persist:" + LOCAL_STORAGE_NAME,
//           JSON.stringify(persistData)
//         );

//         // Update the original request with the new token
//         originalRequest.headers[
//           REQUEST_HEADER_AUTH_KEY
//         ] = `${TOKEN_TYPE}${accessToken}`;

//         // Retry the original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Refresh token failed, logout the user
//         //await logoutUser();
//         localStorage.removeItem("persist:" + LOCAL_STORAGE_NAME);
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       }
//     }

//     // If retries exceeded or another error, logout the user
//     if (originalRequest._retryCount >= 3) {
//       localStorage.removeItem("persist:" + LOCAL_STORAGE_NAME);
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry
      localStorage.removeItem("custom-auth-token");
      
      setTimeout(() => {
        window.location.href = "/auth/custom/sign-in"; 
      }, 500); // Small delay to prevent immediate re-call
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
