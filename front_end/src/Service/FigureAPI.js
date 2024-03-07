// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const FigureAPI = {
  // API ADMIN
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/figure/getall`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  add: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/figure/add`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error adding brand: ${error.message}`);
    }
  },
  delete: async (brandId) => {
    try {
      const response = await axios.delete(`${API_URL}/figure/delete/${brandId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting post category: ${error.message}`);
    }
  },
  update: async (Id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/figure/update/${Id}`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating brand: ${error.message}`);
    }
  },
  //  API USER
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}/figure/getallsp`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },

    async getLatestFigures() {
      try {
        const response = await axios.get(`${API_URL}/figure/getLatestFigures`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async getAccessory() {
      try {
        const response = await axios.get(`${API_URL}/figure/getAccessory`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async getRandom() {
      try {
        const response = await axios.get(`${API_URL}/figure/getRandom`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async getById(id) {
      try {
        const response = await axios.get(`${API_URL}/figure/getById/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    }
  };

export default FigureAPI;
