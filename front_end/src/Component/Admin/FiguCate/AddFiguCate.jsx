import React, { useState } from "react";
import { Modal, Form, Input, Checkbox, notification } from "antd";
import "../../../assets/user-page/main.css";
import FiguCateAPI from "../../../Service/FigureCateAPI.js";

const AddFiguCate = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { name_cate, description_cate, status } = values;
      // Chuyển trạng thái thành số (1 hoặc 0)
      const formattedStatus = status ? 1 : 0;

      // Gọi service để thêm loại bài viết mới
      await FiguCateAPI.add(name_cate, description_cate, formattedStatus);

      // Hiển thị thông báo thành công
      notification.open({
        message: "Thêm loại mô hình thành công!!",
        duration: 1,
        onClose: () => window.location.reload(), // Reload trang khi thông báo đóng
      });

      // Reset form sau khi thêm thành công
      handleCancel();
    } catch (error) {
      // Hiển thị thông báo thất bại nếu có lỗi
      notification.error({
        message: "Thêm loại mô hình thất bại! Vui lòng thử lại sau!!",
      });
      console.log("lỗi", error);
    }
  };

  return (
    <div>
      <Modal
        title="Thêm loại mô hình"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addFiguCateForm" onFinish={onFinish}>
          <Form.Item
            label="Tên loại"
            name="name_cate"
            rules={[{ required: true, message: "Hãy nhập tên loại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description_cate"
            // rules={[{ required: true, message: "Hãy nhập mô tả!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            valuePropName="checked"
          >
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
          <Form.Item>
            <button className="btn-add-form__admin" type="primary" htmlType="submit">Thêm</button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AddFiguCate;
