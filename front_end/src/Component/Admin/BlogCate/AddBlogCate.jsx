import React, { useState } from "react";
import { Modal, Form, Input, Checkbox } from "antd";
import "../../../assets/user-page/main.css";


const AddBlogCate = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Thực hiện các xử lý khi submit form
  };

  return (
    <div>
      <Modal
        title="Thêm loại bài viết"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addBlogForm" onFinish={onFinish}>
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

export default AddBlogCate;
