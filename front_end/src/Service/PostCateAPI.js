// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PostCateAPI = {
  // api cho admin
  async getAllAdmin() {
    try {
      const response = await axios.get(`${API_URL}/blog-cate/getalladmin`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },
  add: async (name_cate, description_cate, status) => {
    try {
      const response = await axios.post(`${API_URL}/blog-cate/add`, { name_cate, description_cate, status });
      return response.data;
    } catch (error) {
      throw new Error(`Error adding new post category: ${error.message}`);
    }
  },

  edit: async (categoryId, name_cate, description_cate, status) => {
    try {
      const response = await axios.put(`${API_URL}/blog-cate/update/${categoryId}`, { name_cate, description_cate, status });
      return response.data;
    } catch (error) {
      throw new Error(`Error editing post category: ${error.message}`);
    }
  },

  delete: async (categoryId) => {
    try {
      const response = await axios.delete(`${API_URL}/blog-cate/delete/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting post category: ${error.message}`);
    }
  },
  // api cho user
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
