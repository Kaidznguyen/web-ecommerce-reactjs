// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const BrandAPI = {
  // API admin
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/brand/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  add: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/brand/add`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error adding brand: ${error.message}`);
    }
  },
  delete: async (brandId) => {
    try {
      const response = await axios.delete(`${API_URL}/brand/delete/${brandId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting post category: ${error.message}`);
    }
  },
  update: async (Id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/brand/update/${Id}`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating brand: ${error.message}`);
    }
  },
  // API user
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}/brand/getall`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  getByCategoryId: async (brandId) => {
    try {
      const response = await axios.get(`${API_URL}/brand/getByidcate/${brandId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching products by category id: ${error.message}`);
    }
  }
  };

export default BrandAPI;
