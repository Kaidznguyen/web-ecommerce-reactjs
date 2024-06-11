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
import PostAPI from "../../../Service/PostAPI.js";
import PostCateAPI from "../../../Service/PostCateAPI.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Option } = Select;

const EditBlog = ({ isModalVisible, handleCancel, initialValue }) => {
  const [form] = Form.useForm();
  const [postcates, setPostCates] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  // Lấy dữ liệu
  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await PostCateAPI.getAllAdmin();
        setPostCates(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPostCates();
  }, []);

  // Hiển thị dữ liệu cho mô tả và nội dung, ảnh
  useEffect(() => {
    if (initialValue) {
      setDescription(initialValue.description);
      setContent(initialValue.content);
      setCurrentImage(initialValue.img); // Gán ảnh hiện tại của bài viết vào state
    }
  }, [initialValue]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("author", values.author);
      formData.append("post_category_id", values.post_category_id);
      formData.append("status", values.status ? 1 : 0);

      // Kiểm tra xem người dùng có chọn ảnh mới không
      if (image) {
        formData.append("img", image);
      } else {
        formData.append("img", currentImage); // Sử dụng ảnh hiện tại nếu không có ảnh mới
      }

      await PostAPI.update(initialValue.id, formData);

      // Hiển thị thông báo thành công
      notification.open({
        message: "Chỉnh sửa bài viết thành công!!",
        duration: 1,
        onClose: () => window.location.reload(), // Tải lại trang khi thông báo đóng
      });

      // Đóng modal sau khi chỉnh sửa thành công
      handleCancel();
    } catch (error) {
      console.error("Error updating blog:", error);
      notification.error({
        message: "Error",
        description: "Đã xảy ra lỗi khi cập nhật bài viết!",
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
        title="Chỉnh sửa bài viết"
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
            label="Tiêu đề bài viết"
            name="title"
            rules={[{ required: true, message: "Hãy nhập tiêu đề!" },
              {
                pattern: /^(?=.*[A-Za-z])[\w\W]+$/,
                message: "Tiêu đề không thể chỉ chứa số hoặc ký tự đặc biệt!"
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
          <Form.Item label="Nội dung" name="content">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label="Tác giả"
              name="author"
              style={{ flex: "1", marginRight: "10px" }}
              rules={[{ required: true, message: "Hãy nhập tên tác giả!" },
                {
                  pattern: /^(?=.*[A-Za-z])[\w\W]+$/,
                  message: "Tên tác giả không thể chỉ chứa số!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại bài viết"
              name="post_category_id"
              rules={[{ required: true, message: "Hãy chọn loại bài viết!" }]}
              style={{ flex: "1" }}
            >
              <Select>
                {Array.isArray(postcates) &&
                  postcates.map((postcate) => (
                    <Option key={postcate.id_cate} value={postcate.id_cate}>
                      {postcate.name_cate}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              className="btn-add-form__admin"
              type="primary"
              htmlType="submit"
            >
              Lưu chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditBlog;
