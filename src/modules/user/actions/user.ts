"use server";
import { axiosInstance } from "@/core/config/axios";
import { User, UserPut } from "../types/user";
import { AxiosError } from "axios";
import { formatErrors } from "@/core/helpers/format-errors";
// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
// }
export const getUser = async () => {
  const { data: results } = await axiosInstance.get("/user");
  console.log("results", results);
  const user  = results as User;
  return user;
};

export const updateUser = async (data: FormData) => {
  data.append("_method", "PUT");
  try {
    const { data: results, status } = await axiosInstance.post(`/user`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const {
      data: user,
      message,
      success,
    } = results as { data: UserPut; message: string; success: boolean };

    return { message, user, status, success };
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors);

      return {
        message: "",
        user: null,
        status: error.response?.status,
        success: error.response?.data.success,
        errors: formattedErrors,
      };
    }
    return {
      message: "Error Interno del Servidor",
      user: null,
      status: 500,
      success: false,
    };
  }
};
