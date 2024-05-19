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
    async ManyViews() {
      try {
        const response = await axios.get(`${API_URL}/statistical/many_views`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async BestSeller() {
      try {
        const response = await axios.get(`${API_URL}/statistical/bestseller`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async PotentialCustomers() {
      try {
        const response = await axios.get(`${API_URL}/statistical/potential_customers`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async CusCancels() {
      try {
        const response = await axios.get(`${API_URL}/statistical/cus_cancels`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async OutStock() {
      try {
        const response = await axios.get(`${API_URL}/statistical/outStock`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async OverStock() {
      try {
        const response = await axios.get(`${API_URL}/statistical/overstock`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    };
export default StatisticalAPI;