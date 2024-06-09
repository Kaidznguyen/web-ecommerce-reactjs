import React, { useState } from "react";
import { Modal, Form, Input, Checkbox, Upload, Button, notification } from "antd";
import "../../../assets/user-page/main.css";
import BrandAPI from "../../../Service/BrandAPI.js";

const AddBrand = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);


  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name_brand', values.name_brand);
      formData.append('description_brand', values.description_brand);
      formData.append('status', values.status ? 1 : 0);
      formData.append("img_brand", image);


      
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
    }
  };
  

  // Hàm xử lý khi người dùng chọn file
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
            rules={[
              { required: true, message: "Hãy nhập tên thương hiệu!" },
              {
                pattern: /^(?=.*[A-Za-z])[\w\W]+$/,
                message: "Thương hiệu phải chứa ít nhất một chữ cái và có thể chứa ký tự đặc biệt!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <div className="select_img">
            <span>Ảnh:</span>
            <input
              type="file"
              name="img_brand"
              id="img-detail__admin"
              onChange={handleImageChange}
            />
          </div>

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
            <button className="btn-add-form__admin" type="primary" htmltype="submit">
              Thêm
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBrand;
