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
    create: async (orderData) => {
      try {
        // Kiểm tra orderData
        if (!orderData || typeof orderData !== 'object') {
          throw new Error('Invalid order data. Please provide a valid order object.');
        }
  
        // Đảm bảo dữ liệu đơn hàng được gửi dưới dạng một đối tượng
        const formattedOrderData = {
          shippingInfo: orderData.shippingInfo,
          orderDetail: orderData.orderDetail
        };
  
        // Gửi yêu cầu POST đến API để tạo đơn hàng
        const response = await axios.post(`${API_URL}/order/create-order`, formattedOrderData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Kiểm tra phản hồi từ máy chủ
        if (!response || !response.data || response.data.success !== true) {
          throw new Error('Unexpected response from server. Please try again later.');
        }
  
        return response.data;
      } catch (error) {
        // Xử lý lỗi
        // Ví dụ: Hiển thị thông báo lỗi cho người dùng
        console.error('Error creating order:', error.message);
        throw new Error('Failed to create order. Please try again later.');
      }
    },
    
    
    async getCalculateRevenue() {
      try {
        const response = await axios.get(`${API_URL}/order/get_total_price_delivered`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
    async getPaidInvoices() {
      try {
        const response = await axios.get(`${API_URL}/order/get_paid_invoices`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data from API: ${error.message}`);
      }
    },
};
  
  export default OrderAPI;