// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PostAPI = {
  // API ADMIN
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/blog/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  add: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/blog/add`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error adding brand: ${error.message}`);
    }
  },
  delete: async (brandId) => {
    try {
      const response = await axios.delete(`${API_URL}/blog/delete/${brandId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting post category: ${error.message}`);
    }
  },
  update: async (Id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/blog/update/${Id}`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating brand: ${error.message}`);
    }
  },
  // API USER
    async Newpost() {
      try {
        const response = await axios.get(`${API_URL}/blog/getNewpost`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    getAll: async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/getall`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching post: ${error.message}`);
      }
    },
    async getById(id) {
      try {
        const response = await axios.get(`${API_URL}/blog/getById/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    views: async (Id) => {
      try {
        const response = await axios.put(`${API_URL}/blog/views/${Id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error editing post category: ${error.message}`);
      }
    },
  };

export default PostAPI;
