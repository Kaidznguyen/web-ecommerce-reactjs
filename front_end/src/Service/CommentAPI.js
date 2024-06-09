import axios from 'axios';

const API_URL = 'http://localhost:8080';

const CommentAPI = {
    async getcommentbyFiguID(id) {
        try {
          const response = await axios.get(`${API_URL}/comment/getcommentbyFiguID/${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching data from API: ${error.message}`);
        }
      },
    addComment: async (name_com, email, comment_mes,figure_id,parentID) => {
        try {
          const response = await axios.post(`${API_URL}/comment/addComment`, { name_com, email, comment_mes,figure_id,parentID });
          return response.data;
        } catch (error) {
          throw new Error(`Error adding new post category: ${error.message}`);
        }
      },
      async getAllAdmin() {
        try {
          const response = await axios.get(`${API_URL}/comment/getall`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching data from API: ${error.message}`);
        }
      },
      delete: async (categoryId) => {
        try {
          const response = await axios.delete(`${API_URL}/comment/delete/${categoryId}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error deleting post category: ${error.message}`);
        }
      },
};

export default CommentAPI;