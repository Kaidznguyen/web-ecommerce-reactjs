import React from "react";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Button,
  notification,
  Radio,
} from "antd";
import "../../../assets/user-page/main.css";
import UserAPI from "../../../Service/UserAPI";

const AddUser = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Tạo đối tượng FormData
      const userData = {
        username: values.username,
        password_hash: values.password_hash,
        email: values.email,
        role: values.role,
        status: values.status ? 1 : 0, // Chuyển đổi boolean thành 0 hoặc 1
        name: values.name,
      };

      console.log(userData); // Log dữ liệu gửi đi để kiểm tra

      await UserAPI.add(userData);

      notification.open({
        message: "Thêm tài khoản thành công!!",
        duration: 1,
        onClose: () => window.location.reload(),
      });

      handleCancel();
    } catch (error) {
      if (error.response) {
        notification.error({
          message: `Thêm tài khoản thất bại! ${
            error.response.data.message || "Vui lòng thử lại sau!!"
          }`,
        });
      } else {
        notification.error({
          message: "Thêm tài khoản thất bại! Vui lòng thử lại sau!!",
        });
        console.log("lỗi", error);
      }
    }
  };

  return (
    <div>
      <Modal
        title="Thêm tài khoản"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addUserForm" onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Hãy nhập họ và tên bạn!" },
              {
                pattern: /^[^0-9"':\/?.><,\[\]{}\\|=_+\-()*!@#$%^&~`]*$/,
                message: "Họ và tên chỉ có thể chứa chữ và không có ký tự đặc biệt cũng như số!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên hiển thị"
            name="username"
            rules={[{ required: true, message: "Hãy nhập tên hiển thị!" },
              {
                pattern: /^(?=.*[A-Za-z])[\w\W]+$/,
                message: "Tên hiển thị phải chứa ít nhất một chữ cái và có thể chứa ký tự đặc biệt!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password_hash"
            rules={[
              { required: true, message: "Hãy nhập mật khẩu!" },
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
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ email"
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
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: "Hãy chọn vai trò!" }]}
          >
            <Radio.Group size="large">
              <Radio.Button value="admin">Quản lý</Radio.Button>
              <Radio.Button value="staff">Nhân viên</Radio.Button>
              <Radio.Button value="user">Khách</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;
