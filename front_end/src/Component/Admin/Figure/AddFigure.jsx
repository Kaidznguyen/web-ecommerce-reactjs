import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Checkbox, Select, notification } from "antd";
import "../../../assets/user-page/main.css";
import FigureAPI from "../../../Service/FigureAPI.js";
import BrandAPI from "../../../Service/BrandAPI.js";
import FiguCateAPI from "../../../Service/FigureCateAPI.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { Option } = Select;

const AddFigure = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [figucates, setFiguCates] = useState([]);
  const [brands, setBrands] = useState([]);
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
      formData.append("img", image);

      await FigureAPI.add(formData);

      notification.open({
        message: "Thêm mô hình thành công!!",
        duration: 1,
        onClose: () => window.location.reload(),
      });
      // Thực hiện các xử lý khi submit form thành công
      handleCancel(); // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Hàm xử lý khi người dùng chọn file
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Modal
        title="Thêm mô hình"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addFigureForm" onFinish={onFinish}>
          <Form.Item
            label="Tên mô hình"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên mô hình!" },
              {
                pattern: /^(?=.*[A-Za-z])[\w\W]+$/,
                message: "Tên mô hình phải chứa cả chữ và số hoặc chỉ chữ, không thể chỉ chứa số!"
              }
            ]}
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
          <Form.Item label="Mô tả" name="description">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label="Giá"
              name="price"
              style={{ flex: "0.7", marginRight: "10px" }}
              rules={[
                { required: true, message: "Hãy nhập giá!" },
                { type: 'number', min: 0, max: 1000000, message: "Chỉ có thể nhập số và phải nằm trong khoảng từ 0 đến 1,000,000!" }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá khuyến mại"
              name="promotionprice"
              rules={[
                { required: true, message: "Hãy nhập giá!" },
                { type: 'number', min: 0, max: 1000000, message: "Chỉ có thể nhập số và phải nằm trong khoảng từ 0 đến 1,000,000!" }
              ]}
              style={{ flex: "1" }}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label="Loại mô hình"
              name="figure_category_id"
              rules={[{ required: true, message: "Hãy chọn loại mô hình!" }]}
              style={{ flex: "1" }}
            >
              <Select defaultValue="">
                <Option value="" disabled>
                  Hãy chọn loại
                </Option>
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
              rules={[{ required: true, message: "Hãy chọn thương hiệu!" }]}
              style={{ flex: "1" }}
            >
              <Select defaultValue="">
                <Option value="" disabled>
                  Hãy chọn thương hiệu
                </Option>
                {Array.isArray(brands) &&
                  brands.map((brand) => (
                    <Option key={brand.id_brand} value={brand.id_brand}>
                      {brand.name_brand}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                { type: 'number', min: 0, message: "Chỉ có thể nhập số" }
              ]}
              style={{ flex: "1", marginRight: "10px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bảo hành"
              name="warranty"
              rules={[
                
                { type: 'number', min: 0, message: "Chỉ có thể nhập số" }
              ]}
              style={{ flex: "1" }}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
          <Form.Item>
            <button
              className="btn-add-form__admin"
              type="primary"
              htmlType="submit"
            >
              Thêm
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddFigure;
