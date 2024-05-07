import axios from 'axios';

const API_URL = 'http://localhost:8080';
const OrderAPI = {
    // API admin
    async getAllAdmin() {
      try {
        const response = await axios.get(`${API_URL}/order/getall`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async getById(id) {
        try {
          const response = await axios.get(`${API_URL}/order/get/${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching data from API: ${error.message}`);
        }
      },
    async getCus(id) {
        try {
          const response = await axios.get(`${API_URL}/order/getCusById/${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching data from API: ${error.message}`);
        }
      }, 
    update: async (Id, formData) => {
      try {
        const response = await axios.put(`${API_URL}/order/update/${Id}`, formData);
        return response.data;
      } catch (error) {
        throw new Error(`Error updating brand: ${error.message}`);
      }
    },
};
  
  export default OrderAPI;