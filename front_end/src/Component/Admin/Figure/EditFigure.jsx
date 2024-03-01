import React, { useState } from "react";
import { Modal, Form, Input, Checkbox, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../../assets/user-page/main.css";

const { Option } = Select;

const EditFigure = ({ isModalVisible, handleCancel, initialValue }) => {
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
        title="Chỉnh sửa mô hình"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="editFigureForm"
          onFinish={onFinish}
          initialValues={initialValue}
        >
          <Form.Item
            label="Tên mô hình"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên mô hình!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="img"
            rules={[{ required: true, message: "Hãy chọn ảnh!" }]}
          >
            <Upload beforeUpload={beforeUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            // rules={[{ required: true, message: "Hãy nhập mô tả!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              label="Giá"
              name="price"
            //   rules={[{ required: true, message: "Hãy nhập tác giả!" }]}
              style={{ flex: '0.7', marginRight: '10px' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá khuyến mại"
              name="promotionprice"
            //   rules={[{ required: true, message: "Hãy nhập tác giả!" }]}
              style={{ flex: '1' }}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
              label="Loại mô hình"
              name="figure_category_id"
              rules={[{ required: true, message: "Hãy chọn loại mô hình!" }]}
              style={{ flex: '1' }}
            >
              <Select>
                <Option value="category1">Category 1</Option>
                <Option value="category2">Category 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Thương hiệu"
              name="brand_id"
              rules={[{ required: true, message: "Hãy chọn loại bài viết!" }]}
              style={{ flex: '1' }}
            >
              <Select>
                <Option value="category1">Category 1</Option>
                <Option value="category2">Category 2</Option>
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              label="Số lượng"
              name="quantity"
            //   rules={[{ required: true, message: "Hãy nhập tác giả!" }]}
              style={{ flex: '1', marginRight: '10px' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bảo hành"
              name="warranty"
            //   rules={[{ required: true, message: "Hãy nhập tác giả!" }]}
              style={{ flex: '1' }}
            >
              <Input />
            </Form.Item>
          </div>
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

export default EditFigure;
