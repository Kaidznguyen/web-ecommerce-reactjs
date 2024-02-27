// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PostCateAPI = {
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/blog-cate/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/blog-cate/getall`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching post categories: ${error.message}`);
    }
  },
  getByCategoryId: async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/blog-cate/getByidcate/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching products by category id: ${error.message}`);
    }
  }

};
export default PostCateAPI;
