import axios from 'axios';

const API_URL = 'http://localhost:8080';

const StatisticalAPI = {
    // API ADMIN
    async RecentlyFigure() {
      try {
        const response = await axios.get(`${API_URL}/statistical/unique-figures`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    };
export default StatisticalAPI;