import React from "react";
import { Form, Input, Button } from "antd";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import TextArea from "antd/es/input/TextArea.js";

const CheckOut = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="col l-12 m-8 c-12">
      <div className="row app__content sm-gutter">
        <div className="col l-8 m-12 c-12">
          <div className="addres-content">
            <h2 className="cart-title">Thông tin liên hệ của khách hàng</h2>
            <Form name="basic" onFinish={onFinish}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên của bạn!" }]}
                style={{width:"80%"}}
              >
                <Input placeholder="Nhập họ tên của bạn" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                style={{width:"80%"}}
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại của bạn!" }]}
              >
                <Input placeholder="Nhập số điện thoại của bạn" />
              </Form.Item>

              <Form.Item
                style={{width:"80%"}}
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập Email của bạn!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập Email của bạn" />
              </Form.Item>

              <Form.Item
                style={{width:"80%"}}
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ của bạn!" }]}
              >
                <Input placeholder="Nhập địa chỉ giao hàng" />
              </Form.Item>
              <Form.Item
                style={{width:"80%"}}
                label="Lời nhắn"
                name="message"
                
              >
                <TextArea placeholder="Hãy để lại lời nhắn cho chúng tôi nếu như bạn có yêu cầu đặc biệt nào khác nha!" />
              </Form.Item>
              <Form.Item>
                <Button style={{backgroundColor:"var(--primary-color)",color:"var(--white-color)"}} htmlType="submit">
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
              <span>Tổng cộng (0 sản phẩm)</span>
              <span className="payment-price" style={{ color: "var(--primary-color)" }}>
                0đ
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
