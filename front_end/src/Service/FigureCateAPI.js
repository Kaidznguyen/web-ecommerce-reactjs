// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const FigureCateAPI = {
  // admin api
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/category/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  add: async (name_cate, description_cate, status) => {
    try {
      const response = await axios.post(`${API_URL}/category/add`, { name_cate, description_cate, status });
      return response.data;
    } catch (error) {
      throw new Error(`Error adding new post category: ${error.message}`);
    }
  },

  edit: async (categoryId, name_cate, description_cate, status) => {
    try {
      const response = await axios.put(`${API_URL}/category/update/${categoryId}`, { name_cate, description_cate, status });
      return response.data;
    } catch (error) {
      throw new Error(`Error editing post category: ${error.message}`);
    }
  },

  delete: async (categoryId) => {
    try {
      const response = await axios.delete(`${API_URL}/category/delete/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting post category: ${error.message}`);
    }
  },
  // user api
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}/category/getall`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  getByCategoryId: async (cateId) => {
    try {
      const response = await axios.get(`${API_URL}/category/getByidcate/${cateId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching products by category id: ${error.message}`);
    }
  }
};

export default FigureCateAPI;
