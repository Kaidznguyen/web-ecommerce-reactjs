import React from "react";
import { Modal, Input, Button, Checkbox, Form, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import UserAPI from "../../Service/UserAPI";

export default function Login({ isModalVisible, handleCancel }) {
  const onFinish = async (values) => {
    const { email, password, rememberMe } = values;
    try {
      const response = await UserAPI.login(email, password, rememberMe);
      const token = response.token;
      if (rememberMe) {
        // Nếu rememberMe là true, lưu token vào localStorage
        localStorage.setItem("token", token);
      } else {
        // Nếu rememberMe không phải là true, xóa token khỏi localStorage nếu tồn tại
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        // Lưu token vào sessionStorage
        sessionStorage.setItem("token", token);
      }

      notification.success({
        message: "Đăng nhập thành công!",
      });
      // Sau 1.5 giây, reload lại trang
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      handleCancel();
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.",
      });
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div className="auth-form__hd">
        <h3 className="auth-form__heading">Đăng nhập</h3>
        <span className="auth-form__switch-btn" id="switch-dn">
          Đăng ký
        </span>
      </div>
      <Form
        name="login"
        initialValues={{ rememberMe: false }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập Email của bạn!" },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Nhập Email của bạn" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            {
              min: 8,
              message: "Mật khẩu phải chứa ít nhất 8 ký tự!",
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d).*$/,
              message: "Mật khẩu phải chứa cả chữ và số!",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu của bạn" />
        </Form.Item>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox>Ghi nhớ</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div className="auth-form__socials">
        <Button
          type="primary"
          className="btn btn--with-icon btn-size-s auth-form__socials-fb"
        >
          <FontAwesomeIcon icon={faFacebook} />
          <span className="auth-form__socials-title help">
            Đăng nhập với Facebook
          </span>
        </Button>
        <Button
          type="danger"
          className="btn btn--with-icon btn-size-s auth-form__socials-gg"
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className="auth-form__socials-title help">
            Đăng nhập với Google
          </span>
        </Button>
      </div>
    </Modal>
  );
}
