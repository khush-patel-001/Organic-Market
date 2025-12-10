import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useAuditStore = create((set) => ({
  audits: [],
  audit: null,
  error: null,

  createAudit: async (id, data) => {
    try {
      const response = await axiosInstance.post(`/create-audit/${id}`, data);
      set((state) => ({
        audits: [...state.audits, response.data]
      }));
      toast.success("Audit created successfully!");
    } catch (error) {
      set({error: error.response.data.message });
      toast.error(error.response.data.message);
    }
  },

  getAuditById: async (id) => {
    try {
      const response = await axiosInstance.get(`/get-audit-by-id/${id}`);
      set({ audit: response.data});
    } catch (error) {
      set({ error: error.response.data.message });
    }
  },

  getAuditByProductId: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/get-audit-by-product-id/${id}`
      );
      set({ audits: response.data});
    } catch (error) {
      set({error: error.response.data.message });
    }
  },

  updateAudit: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/update-audit/${id}`, data);
      set((state) => ({
        audits: state.audits.map((audit) =>
          audit._id === id ? response.data : audit
        )
      }));
      toast.success("Audit updated successfully!");
    } catch (error) {
      set({error: error.response.data.message });
      toast.error(error.response.data.message);
    }
  },

  deleteAudit: async (id) => {
    try {
      await axiosInstance.delete(`/delete-audit/${id}`);
      set((state) => ({
        audits: state.audits.filter((audit) => audit._id !== id)
      }));
      toast.success("Audit deleted successfully!");
    } catch (error) {
      set({error: error.response.data.message });
      toast.error(error.response.data.message);
    }
  },
}));
