// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PostAPI = {
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/blog/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
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
    }
  };

export default PostAPI;
