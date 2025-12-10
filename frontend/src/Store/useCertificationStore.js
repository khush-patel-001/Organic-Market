import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useCertificationStore = create((set) => ({
  certifications: [],
  error: null,

  createCertification: async (productId, data) => {
    try {
      const response = await axiosInstance.post(
        `/certification/create-certification/${productId}`,
        data
      );
      set((state) => ({
        certifications: [
          ...state.certifications,
          response.data.data.certification,
        ]
      }));
      toast.success("Certification created successfully.");
    } catch (error) {
      set({ error: error.response.data.message});
      toast.error(error.response.data.message);
    }
  },

  getAllCertifications: async (productId) => {
    try {
      const response = await axiosInstance.get(
        `/certification/get-all-certifications/${productId}`
      );
      set({
        certifications: response.data.data.certifications
      });
    } catch (error) {
      set({ error: error.response.data.message});
      toast.error(error.response.data.message);
    }
  },

  getCertificationById: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/certification/get-certification-by-id/${id}`
      );
      set({
        certification: response.data.data.certification
      });
    } catch (error) {
      set({ error: error.response.data.message});
      toast.error(error.response.data.message);
    }
  },

  updateCertification: async (id, data) => {
    try {
      const response = await axiosInstance.put(
        `/certification/update-certification/${id}`,
        data
      );
      set((state) => ({
        certifications: state.certifications.map((certification) =>
          certification._id === id
            ? response.data.data.certification
            : certification
        )
      }));
      toast.success("Certification updated successfully.");
    } catch (error) {
      set({ error: error.response.data.message});
      toast.error(error.response.data.message);
    }
  },

  deleteCertification: async (id) => {
    try {
      await axiosInstance.delete(`/certification/delete-certification/${id}`);
      set((state) => ({
        certifications: state.certifications.filter(
          (certification) => certification._id !== id
        )
      }));
      toast.success("Certification deleted successfully.");
    } catch (error) {
      set({ error: error.response.data.message});
      toast.error(error.response.data.message);
    }
  }
}));
