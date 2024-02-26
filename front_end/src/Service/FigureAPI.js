// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const FigureAPI = {
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}/figure/getallsp`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/figure/getall`);
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
