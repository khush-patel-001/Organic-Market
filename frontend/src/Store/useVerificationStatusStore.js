import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useVerificationStatusStore = create((set) => ({
  verificationStatus: null,
  error: null,

  createVerificationStatus: async (farmerId) => {
    try {
      const response = await axiosInstance.post("/verificationStatus/create-verification-status", {
        farmerId,
      });
      set({ verificationStatus: response.data});
      toast.success("Verification Status created successfully.");
    } catch (error) {
      set({ error: error.response.data});
      toast.error(error.response.data.message);
    }
  },

  getVerificationStatusById: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/verificationStatus/get-verification-status-by-id/${id}`
      );
      set({ verificationStatus: response.data});
    } catch (error) {
      set({ error: error.response.data});
      toast.error(error.response.data.message);
    }
  },

  updateVerificationStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(
        `/verificationStatus/update-verification-status/${id}`,
        { status }
      );
      set({ verificationStatus: response.data});
      toast.success("Verification Status updated successfully.");
    } catch (error) {
      set({ error: error.response.data});
      toast.error(error.response.data.message);
    }
  },

  deleteVerificationStatus: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/verificationStatus/delete-verification-status/${id}`
      );
      set({ verificationStatus: response.data});
      toast.success("Verification Status deleted successfully.");
    } catch (error) {
      set({ error: error.response.data});
      toast.error(error.response.data.message);
    }
  },
}));
