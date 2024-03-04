import React, { useState } from "react";
import { Modal, Form, Input, Checkbox, Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../../assets/user-page/main.css";
import BrandAPI from "../../../Service/BrandAPI.js";

const AddBrand = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  const onFinish = async (values) => {
    try {
      setUploading(true);
  
      const formData = new FormData();
      formData.append('name_brand', values.name_brand);
      formData.append('description_brand', values.description_brand);
      formData.append('status', values.status ? 1 : 0);
  
      const fileList = values.img_brand || []; // Đảm bảo fileList không bị null hoặc undefined
      fileList.forEach((file) => {
        formData.append('img_brand', file.originFileObj);
      });

      
      await BrandAPI.add(formData);
  
      notification.open({
        message: "Thêm thương hiệu thành công!!",
        duration: 1,
        onClose: () => window.location.reload(),
      });
  
      handleCancel();
    } catch (error) {
      notification.error({
        message: "Thêm thương hiệu thất bại! Vui lòng thử lại sau!!",
      });
      console.log("lỗi", error);
    } finally {
      setUploading(false);
    }
  };
  
  
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  // Hàm xử lý khi người dùng chọn file
  const beforeUpload = (file) => {
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
  valuePropName="fileList"
  getValueFromEvent={normFile}
>
  <Upload beforeUpload={beforeUpload} fileList={[]}>
    <Button icon={<UploadOutlined />} disabled={uploading}>
      {uploading ? 'Đang tải lên...' : 'Chọn ảnh'}
    </Button>
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
            <button className="btn-add-form__admin" type="primary" htmltype="submit" disabled={uploading}>
              Thêm
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBrand;
