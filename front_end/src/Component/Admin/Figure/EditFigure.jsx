import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Button,
  Select,
  notification,
} from "antd";
import "../../../assets/user-page/main.css";
import FigureAPI from "../../../Service/FigureAPI.js";
import BrandAPI from "../../../Service/BrandAPI.js";
import FiguCateAPI from "../../../Service/FigureCateAPI.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { Option } = Select;

const EditFigure = ({ isModalVisible, handleCancel, initialValue }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [figucates, setFiguCates] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
// lấy data figucate
useEffect(() => {
  async function fetchFiguCates() {
    try {
      const data = await FiguCateAPI.getAll();
      setFiguCates(data.data);
    } catch (error) {
      console.error("Error fetching post categories: ", error);
    }
  }

  fetchFiguCates();
}, []);
// lấy data brand
useEffect(() => {
  async function fetchBrands() {
    try {
      const data = await BrandAPI.getAll();
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching post categories: ", error);
    }
  }

  fetchBrands();
}, []);
  // Hiển thị dữ liệu cho mô tả và ảnh
  useEffect(() => {
    if (initialValue) {
      setDescription(initialValue.description);
      setCurrentImage(initialValue.img); // Gán ảnh hiện tại của bài viết vào state
    }
  }, [initialValue]);
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", description);
      formData.append("price", values.price);
      formData.append("promotionprice", values.promotionprice);
      formData.append("quantity", values.quantity);
      formData.append("figure_category_id", values.figure_category_id);
      formData.append("brand_id", values.brand_id);
      formData.append("warranty", values.warranty);
      formData.append("status", values.status ? 1 : 0);

      // Kiểm tra xem người dùng có chọn ảnh mới không
      if (image) {
        formData.append("img", image);
      } else {
        formData.append("img", currentImage); // Sử dụng ảnh hiện tại nếu không có ảnh mới
      }

      await FigureAPI.update(initialValue.id, formData);

      // Hiển thị thông báo thành công
      notification.open({
        message: "Chỉnh sửa mô hình thành công!!",
        duration: 1,
        onClose: () => window.location.reload(), // Tải lại trang khi thông báo đóng
      });

      // Đóng modal sau khi chỉnh sửa thành công
      handleCancel();
    } catch (error) {
      console.error("Error updating blog:", error);
      notification.error({
        message: "Error",
        description: "Đã xảy ra lỗi khi cập nhật mô hình!",
      });
    }
  };
  // Xử lý khi người dùng chọn file ảnh
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
          <div className="select_img">
            <span>Ảnh:</span>
            <input
              type="file"
              name="img"
              id="img-detail__admin"
              onChange={handleImageChange}
            />
          </div>
          <Form.Item
            label="Mô tả"
            name="description"
            // rules={[{ required: true, message: "Hãy nhập mô tả!" }]}
          >
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
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
              {Array.isArray(figucates) &&
                  figucates.map((figucate) => (
                    <Option key={figucate.id_cate} value={figucate.id_cate}>
                      {figucate.name_cate}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Thương hiệu"
              name="brand_id"
              rules={[{ required: true, message: "Hãy chọn loại bài viết!" }]}
              style={{ flex: '1' }}
            >
              <Select>
              {Array.isArray(brands) &&
                  brands.map((brand) => (
                    <Option key={brand.id_brand} value={brand.id_brand}>
                      {brand.name_brand}
                    </Option>
                  ))}
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
