import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  currUser: null,

  user : async () => {
    try {
      const response = await axiosInstance.get("/user/current-user");
      set({ currUser: response.data.message.user });
      return response.data.message.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile.");
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/user/update-account-details",
        data
      );
      console.log("response: ", response);  
      set({ currUser: response.data.data });
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error: ", error);
    }
  },

  updateProfileImage: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/user/update-profile-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ currUser: response.data.message.user });
      toast.success("Profile image updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },


  updateCoverImage: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/user/update-cover-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedUser = response.data.message.user;
      set({ currUser: updatedUser });
      return updatedUser;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cover image.");
      console.error("Error updating cover image:", error);
    }
  },

  updatePassword: async (data) => {
    try {
      const response = await axiosInstance.put("/user/update-password", data);
      set({ currUser: response.data.message.user });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
