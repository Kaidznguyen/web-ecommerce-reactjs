import axios from 'axios';

const API_URL = 'http://localhost:8080';

const UserAPI = {
    // API admin
    async getAllAdmin() {
      try {
        const response = await axios.get(`${API_URL}/user/getall`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    add: async (formData) => {
      try {
        const response = await axios.post(`${API_URL}/user/signup`, formData);
        return response.data;
      } catch (error) {
        throw new Error(`Error adding brand: ${error.message}`);
      }
    },
    login: async (email, password_hash, rememberMe) => {
      try {
          const response = await axios.post(`${API_URL}/user/login`, {
              email: email,
              password: password_hash,
              rememberMe: rememberMe
          });
  
          // Kiểm tra xem phản hồi từ máy chủ có chứa token hay không
          if (response.data.token) {
              // Lưu token vào localStorage
              localStorage.setItem('token', response.data.token);
          }
  
          return response.data;
      } catch (error) {
          throw new Error(`Error logging in: ${error.message}`);
      }
  },
    delete: async (Id) => {
      try {
        const response = await axios.delete(`${API_URL}/user/delete/${Id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error deleting post category: ${error.message}`);
      }
    },
    update: async (Id, formData) => {
      try {
        const response = await axios.put(`${API_URL}/user/update/${Id}`, formData);
        return response.data;
      } catch (error) {
        throw new Error(`Error updating brand: ${error.message}`);
      }
    },
};
  
  export default UserAPI;