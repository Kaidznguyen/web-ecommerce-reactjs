// apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PostCateAPI = {
    getAll: async () => {
        try {
          const response = await axios.get(`${API_URL}/blog-cate/getall`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching post categories: ${error.message}`);
        }
      }
  };

export default PostCateAPI;
