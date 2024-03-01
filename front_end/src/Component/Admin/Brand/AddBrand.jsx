import React, { useState } from "react";
import { Modal, Form, Input, Checkbox, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../../assets/user-page/main.css";

const AddBrand = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Thực hiện các xử lý khi submit form
  };

  // Hàm xử lý khi người dùng chọn file
  const beforeUpload = (file) => {
    // Validate file type, size, ...
    return true; // Return true để cho phép upload
  };

  return (
    <div>
      <Modal
        title="Thêm thương hiệu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addBrandForm" onFinish={onFinish}>
          <Form.Item
            label="Tên thương hiệu"
            name="name_brand"
            rules={[{ required: true, message: "Hãy nhập tên thương hiệu!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="img_brand"
            rules={[{ required: true, message: "Hãy chọn ảnh!" }]}
          >
            <Upload beforeUpload={beforeUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description_brand"
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

export default AddBrand;

