import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, notification } from "antd";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import TextArea from "antd/es/input/TextArea.js";
import OrderAPI from "../../../Service/OrderAPI.js";
import numeral from "numeral";

const CheckOut = ({ totalPrice }) => {
  const validateName = (_, value) => {
    if (!value || value.length > 50 || /[+\-*/.=_?><,{}[\]]/.test(value)) {
      return Promise.reject(
        "Họ và tên không được vượt quá 50 ký tự và không được chứa các kí tự đặc biệt!"
      );
    }
    return Promise.resolve();
  };

  const validatePhone = (_, value) => {
    if (!value || !/^(0\d{9})$/.test(value)) {
      return Promise.reject(
        "Số điện thoại phải có 10 số và bắt đầu bằng số 0!"
      );
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    if (!value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.com)$/.test(value)) {
      return Promise.reject("Email không hợp lệ hoặc không có đuôi .com!");
    }
    return Promise.resolve();
  };

  const [products, setProducts] = useState([]);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  // hàm xử lý lấy sản phẩm trong local
  useEffect(() => {
    // Lấy danh sách sản phẩm từ local storage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      setProducts(storedCart);
      setCartItemCount(storedCart.length);
    } else {
      setIsEmptyCart(true);
      setCartItemCount(0);
    }
  }, []);
  const onFinish = async (values) => {
    try {
      // Lấy dữ liệu từ localStorage hoặc từ state products
      const storedCart = JSON.parse(localStorage.getItem("cart"));
  
      if (!Array.isArray(storedCart) || storedCart.length === 0) {
        notification.error({
          message: "Giỏ hàng trống. Không thể tạo đơn hàng",
          duration: 2,
        });
        return;
      }
  
      // Tạo dữ liệu order và orderDetail
      const shippingInfo = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        payment: values.payment,
        note: values.note,
      };
      const orderDetail = storedCart.map(item => ({
        figure_id: item.id,
        totalquantity: item.amount,
        totalprice: item.amount * (item.promotionprice !== 0 ? item.promotionprice : item.price)
      }));
  
      // Gửi request tạo đơn hàng lên server
      const response = await OrderAPI.create({ shippingInfo, orderDetail });
  
      if (response.success) {
        // Xóa dữ liệu cart sau khi tạo đơn hàng thành công
        localStorage.removeItem("cart");
  
        notification.success({
          message: "Cảm ơn bạn vì đã ủng hộ chúng tôi! Hãy check mail để kiểm tra lại đơn hàng nha",
          duration: 2,
        });
  
        // Đợi 2 giây trước khi làm mới trang
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        notification.error({
          message: "Đã xảy ra lỗi khi tạo đơn hàng",
          description: response.message || "Vui lòng thử lại sau.",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Đã xảy ra lỗi khi tạo đơn hàng",
        description: error.message || "Vui lòng thử lại sau.",
        duration: 2,
      });
    }
  };
  
  
  
  

  return (
    <div
      className="col l-12 m-8 c-12"
      style={{ display: isEmptyCart ? "none" : "block" }}
    >
      <div className="row app__content sm-gutter">
        <div className="col l-8 m-12 c-12">
          <div className="addres-content">
            <h2 className="cart-title">Thông tin liên hệ của khách hàng</h2>
            <Form name="basic" onFinish={onFinish}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên của bạn!" },
                  { validator: validateName },
                ]}
                style={{ width: "80%" }}
              >
                <Input placeholder="Nhập họ tên của bạn" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                style={{ width: "80%" }}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn!",
                  },
                  { validator: validatePhone },
                ]}
              >
                <Input placeholder="Nhập số điện thoại của bạn" />
              </Form.Item>

              <Form.Item
                style={{ width: "80%" }}
                label="Email"
                name="email"
                rules={[
                  { required: true, validator: validateEmail },
                  // // { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập Email của bạn" />
              </Form.Item>

              <Form.Item
                style={{ width: "80%" }}
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ của bạn!" },
                ]}
              >
                <Input placeholder="Nhập địa chỉ giao hàng" />
              </Form.Item>
              <Form.Item
                style={{ width: "80%" }}
                label="Phương thức thanh toán"
                name="payment"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phương thức thanh toán!",
                  },
                ]}
                hasFeedback // Thêm hasFeedback
              >
                <Radio.Group>
                  <Radio.Button value="COD">
                    Nhận hàng rồi thanh toán
                  </Radio.Button>
                  <Radio.Button value="MoMo">Thanh toán online</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ width: "80%" }} label="Lời nhắn" name="note">
                <TextArea placeholder="Hãy để lại lời nhắn cho chúng tôi nếu như bạn có yêu cầu đặc biệt nào khác nha!" />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white-color)",
                  }}
                  htmlType="submit"
                >
                  Thanh toán
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="col l-4 m-12 c-12">
          <div className="payment-content">
            <h2 className="cart-title">Thông tin đơn hàng</h2>
            <div className="temporary-payment">
              <span>Tổng cộng ({cartItemCount} sản phẩm)</span>
              <span
                className="payment-price"
                style={{ color: "var(--primary-color)" }}
              >
                {numeral(totalPrice).format("$0,0")}
              </span>
            </div>
            <div className="VAT">
              <span>Đã bao gồm VAT (nếu có)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
