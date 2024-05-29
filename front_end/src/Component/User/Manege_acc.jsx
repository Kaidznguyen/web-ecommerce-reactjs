import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Space, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import UserAPI from "../../Service/UserAPI";
import { jwtDecode } from "jwt-decode";


export default function ManageAcc({ isModalVisible, handleCancel }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Lấy token từ localStorage hoặc sessionStorage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decoded = jwtDecode(token);
        // Cập nhật state với thông tin người dùng
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Xóa token không hợp lệ nếu giải mã thất bại
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    } else {
      console.log("Không tìm thấy token trong localStorage hoặc sessionStorage.");
    }
  }, []);
  
  const onFinish = async (values) => {
    try {
        const userData = {
            username: values.username !== undefined ? values.username : user.username,
            email: values.email !== undefined ? values.email : user.email,
            role: values.role !== undefined ? values.role : user.role,
            status: values.status !== undefined ? (values.status ? 1 : 0) : user.status,
            name: values.name !== undefined ? values.name : user.name,
          };
    
          if (values.password_hash) {
            userData.password_hash = values.password_hash;
          }
    
          Object.keys(userData).forEach(key => {
            if (userData[key] === undefined || userData[key] === '') {
              delete userData[key];
            }
          });
          console.log("thông tin:",user.userId, userData)
        // Gọi service để cập nhật người dùng
        await UserAPI.update(user.userId,userData);

        notification.open({
            message: "Cập nhật tài khoản thành công!Vui lòng đăng nhập lại nha!!",
            duration: 2,
            onClose: () => {
                window.location.reload();
            },
            
          });
          

        handleCancel();
    } catch (error) {
        if (error.response) {
            notification.error({
                message: `Cập nhật tài khoản thất bại! ${
                    error.response.data.message || "Vui lòng thử lại sau!"
                }`,
            });
        } else {
            notification.error({
                message: "Cập nhật tài khoản thất bại! Vui lòng thử lại sau!",
            });
            console.log("Lỗi", error);
        }
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div>
        <div className="auth-form__container">
          <div className="auth-form__hd">
            <h3 className="auth-form__heading">
              Sửa thông tin tài khoản {user && user.username}
            </h3>
          </div>
          {user && (
            <Form
              name="manage_acc"
              onFinish={onFinish}
              initialValues={{
                username: user.username,
                email: user.email,
                name: user.name,
              }}
              autoComplete="off"
            >
              <Form.Item
                label="Tên hiển thị"
                name="username"
                rules={[
                  {
                    message: "Vui lòng nhập username của bạn!",
                  },
                ]}
              >
                <Input placeholder="Nhập username của bạn" />
              </Form.Item>

              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    message: "Vui lòng nhập họ và tên của bạn!",
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên của bạn" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Địa chỉ email"
                rules={[
                  {
                    message: "Vui lòng nhập email của bạn!",
                  },
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
                name="password_hash"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu của bạn!",
                  },
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

              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                dependencies={["password_hash"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu của bạn!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password_hash") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </Modal>
  );
}
