// import axios from "axios";
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
// });

// api.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // if (error.response?.status === 401) {
//     //   if (typeof window !== "undefined") {
//     //     localStorage.removeItem("token");
//     //     window.location.href = "/auth/admin";
//     //   }
//     // }
//     // return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";
import { toast } from '@/components/core/toaster';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// ─── Request Interceptor ───────────────────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ───────────────────────────────
api.interceptors.response.use(
  (response) => {
    const status = response?.status;

    // show toast only for 200 / 201
    if (status === 200 || status === 201) {
      const message =
        response?.data?.message ||
        response?.data?.msg ||
        "Request completed successfully";
      toast.success(message);
    }

    return response;
  },
  (error) => {
    const status = error?.response?.status;

    // optional: handle unauthorized
    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // window.location.href = "/auth/signin";
      }
    }

    // show proper error toast
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";
    toast.error(errMsg);

    return Promise.reject(error);
  }
);

export default api;
