// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const FigureAPI = {
    async getLatestFigures() {
      try {
        const response = await axios.get(`${API_URL}/figure/getLatestFigures`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
  };

export default FigureAPI;
