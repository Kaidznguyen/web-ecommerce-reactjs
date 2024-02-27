// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const FigureCateAPI = {
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/category/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
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
