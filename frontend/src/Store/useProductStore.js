import { create } from "zustand";
import { axiosInstance } from "../Utils/axios.js";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  error: null,

  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post(
        "/product/create-product",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set((state) => ({
        products: [...state.products, response.data.data.product],
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      set({ error: error.message });
    }
  },

  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get("/product/get-all-products");
      const products = response.data.data?.products || [];
      set({ products });
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      set({ error: error.message });
      return [];
    }
  },

  getAllProductsByFarmerId: async (farmerId) => {
    try {
      const response = await axiosInstance.get(`/product/get-all-products-by-farmerId`);
      set({ products: response.data.data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      set({ error: error.message });
    }
  },

  getProductByProductId: async (id) => {
    try {
      const response = await axiosInstance.get(`/product/get-product-by-productId/${id}`);
      return response.data.data.product;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      set({ error: error.message });
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(
        `/product/update-product/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...productData } : product
        ),
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      set({ error: error.message });
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/product/delete-product/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      set({ error: error.message });
    }
  },
}));
