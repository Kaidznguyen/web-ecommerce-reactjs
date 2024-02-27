// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const BrandAPI = {
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/brand/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
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
