import React from "react";
import { Form, Input, Button, Checkbox, Modal, Space,notification  } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import UserAPI from "../../Service/UserAPI";
export default function RegisAccount({ isModalVisible, handleCancel }) {
    const onFinish = async (values) => {
        try {
          // Kiểm tra email có đúng định dạng không
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(values.email)) {
            throw new Error("Email không hợp lệ");
          }
    
          // Thêm giá trị mặc định cho trường role và status
          const formData = {
            username: values.username,
            password_hash: values.password_hash,
            email: values.email,
            role: "user",
            status: 1,
            name: values.name,
          };
    
          // Gửi dữ liệu form lên server
          await UserAPI.add(formData);
    
          // Hiển thị thông báo đăng ký thành công
          notification.success({
            message: 'Đăng ký thành công!',
            duration: 1, // Thiết lập thời gian hiển thị thông báo
          });
          handleCancel();
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error("Đăng ký thất bại:", error.message);
          // Hiển thị thông báo lỗi
          notification.error({
            message: 'Đăng ký thất bại',
            description: error.message,
          });
          // Có thể thêm các hành động khác tùy ý
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
            <h3 className="auth-form__heading">Đăng ký</h3>
            <span className="auth-form__switch-btn" id="switch-dn">
              Đăng nhập
            </span>
          </div>
          <Form name="register" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập username của bạn!",
                },
              ]}
            >
              <Input placeholder="Nhập username của bạn" />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên của bạn!",
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên của bạn" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
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

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "Bạn phải đồng ý với điều khoản dịch vụ và chính sách bảo mật!"
                        ),
                },
              ]}
            >
              <Checkbox>
                Bằng việc đăng ký, bạn đã đồng ý với tất cả các điều khoản của
                Dshop{" "}
                <a href="" className="auth-form__text-link">
                  Điều khoản dịch vụ
                </a>{" "}
                &{" "}
                <a href="" className="auth-form__text-link">
                  Chính sách bảo mật
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  ĐĂNG KÝ
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className="auth-form__socials">
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faFacebook} />}
            className="auth-form__socials-fb"
            block
          >
            Kết nối với Facebook
          </Button>
          <Button
            type="danger"
            icon={<FontAwesomeIcon icon={faGoogle} />}
            className="auth-form__socials-gg"
            block
          >
            Kết nối với Google
          </Button>
        </div>
      </div>
    </Modal>
  );
}
