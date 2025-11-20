import axios from "axios";
import { toast } from "@/components/core/toaster";

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
        console.log("🚀 API Request:", config);

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ───────────────────────────────
api.interceptors.response.use(
  (response) => {
    const { status, config, data } = response;

    // Show toast only for POST / PUT / PATCH / DELETE
    if (
      (status === 200 || status === 201) &&
      ["post", "put", "patch", "delete"].includes(config.method || "")
    ) {
      const message = data?.message || data?.msg || "Request completed successfully";
      toast.success(message);
    }

    return response;
  },
  (error) => {
    const status = error?.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      // window.location.href = "/auth/signin"; // optional redirect
    }

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
// import axios from "axios";
// import { toast } from "@/components/core/toaster";

// import { store } from "@/store";
// import { logout } from "@/store/reducers/auth-slice";

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

//     console.log("🚀 API Request:", config);

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => {
//     const { status, config, data } = response;

//     if (
//       (status === 200 || status === 201) &&
//       ["post", "put", "patch", "delete"].includes(config.method || "")
//     ) {
//       const message =
//         data?.message || data?.msg || "Request completed successfully";
//       toast.success(message);
//     }

//     return response;
//   },
//   (error) => {
//     const status = error?.response?.status;

//     if (status === 401 && typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       store.dispatch(logout());

//     }

//     const errMsg =
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       error?.message ||
//       "Something went wrong";

//     toast.error(errMsg);
//     return Promise.reject(error);
//   }
// );

// export default api;
