import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get("/auth/check-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        authUser: response.data,
      });
    } catch (error) {
      set({ authUser: null });
    }
  },

  login: async (data) => {
    console.log("Login request:", data);
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      console.log("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred during login. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw error to propagate it to the component
    }
  },

  register: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      toast.success("Registered successfully!");
    } catch (error) {
      console.log("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred during registration. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw error to propagate it to the component
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log("logout Error:", error)
      toast.error(error.response.data.message);
    }
  },
}));
