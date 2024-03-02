import React from "react";
import { Modal, Form, Input, Checkbox, notification } from "antd";
import "../../../assets/user-page/main.css";
import FiguCateAPI from "../../../Service/FigureCateAPI.js";
const EditFiguCate = ({ isModalVisible, handleCancel, initialValue }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const status = values.status ? 1 : 0;
      // Gọi hàm sửa từ service
      await FiguCateAPI.edit(initialValue.id_cate, values.name_cate, values.description_cate, status);
       // Hiển thị thông báo thành công
       notification.open({
        message: "Sửa loại mô hình thành công!!",
        duration: 1,
        onClose: () => window.location.reload(), // Reload trang khi thông báo đóng
      });

      // Đóng modal sau khi sửa thành công
      handleCancel();
    } catch (error) {
      notification.error({
        message: "Sửa loại mô hình thất bại! Vui lòng thử lại sau!!",
      });
      console.log("lỗi", error);
    }
  };

  return (
    <div>
      <Modal
        title="Chỉnh sửa loại mô hình"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="editBlogForm"
          onFinish={onFinish}
          initialValues={initialValue}
        >
          <Form.Item
            label="Tên loại"
            name="name_cate"
            rules={[{ required: true, message: "Hãy nhập tên loại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description_cate">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
          <Form.Item>
            <button className="btn-add-form__admin" type="primary" htmlType="submit">
              Lưu chỉnh sửa
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditFiguCate;
