import React from "react";
import { Modal, Form, Input, Checkbox, Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../../assets/user-page/main.css";
import BrandAPI from "../../../Service/BrandAPI.js";

const EditBrand = ({ isModalVisible, handleCancel, initialValue }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Tạo FormData từ dữ liệu form
      const formData = new FormData();
      formData.append('name_brand', values.name_brand);
      formData.append('description_brand', values.description_brand);
      formData.append('status', values.status ? 1 : 0);

      // Nếu có chọn ảnh mới, thêm vào formData
      if (values.img_brand && values.img_brand.file) {
        formData.append('img_brand', values.img_brand.file.originFileObj);
      }

      // Gọi service để gửi yêu cầu PUT
      await BrandAPI.update(initialValue.id_brand, formData);

      // Hiển thị thông báo thành công
      notification.open({
        message: "Chỉnh sửa thương hiệu thành công!!",
        duration: 1,
        onClose: () => window.location.reload(), // Reload trang khi thông báo đóng
      });

      // Đóng modal sau khi chỉnh sửa thành công
      handleCancel();
    } catch (error) {
      // Xử lý lỗi khi có lỗi xảy ra
      notification.error({
        message: "Chỉnh sửa thương hiệu thất bại! Vui lòng thử lại sau!!",
      });
      console.log("lỗi", error);
    }
  };

  // Hàm xử lý khi người dùng chọn file
  const beforeUpload = (file) => {
    return true; // Return true để cho phép upload
  };

  return (
    <div>
      <Modal
        title="Chỉnh sửa thương hiệu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="editBrandForm"
          onFinish={onFinish}
          initialValues={initialValue}
        >
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
            <Upload beforeUpload={beforeUpload} fileList={[]}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Mô tả" name="description_brand">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
          <Form.Item>
            <button className="btn-add-form__admin" type="primary" htmltype="submit">
              Lưu chỉnh sửa
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditBrand;
