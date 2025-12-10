import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useFarmerStore = create((set) => ({
  currUser: async () => {
    try {
      const response = await axiosInstance.get("/farmer/current-farmer");
      set({ currUser: response.data?.data?.farmer });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile.");
    }
  },

  getFarmerById: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/farmer/get-farmer-by-id/${id}`
      );
      return response.data.data.farmer;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
      set({ error: error.message });
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/farmer/update-farmer-account-details",
        data
      );
      set({ currUser: response.data?.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfileImage: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/farmer/update-farmer-profile-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ currUser: response.data?.data });
      toast.success("Profile image updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateCoverImage: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/farmer/update-farmer-cover-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ currUser: response.data?.data });
      toast.success("Cover image updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updatePassword: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/farmer/update-farmer-password",
        data
      );
      set({ currUser: response.data?.data });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
