"use server";
//instancia axios para prueba
import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
// import { cookies } from 'next/headers'
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookieStore = await cookies();
    const token = decodeURIComponent(cookieStore.get("token")?.value);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const cookieStore = cookies()
//     const token = cookieStore.get('token')?.value
//     const company_id = cookieStore.get('company_id')?.value

//     if (token && !config.url?.includes('/login')) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     if (company_id) {
//       config.headers['CompanyId'] = company_id
//       // config.headers['ngrok-skip-browser-warning'] = 'true'
//     }

//     return config
//     // return { ...config, timeout: 5000 }
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
