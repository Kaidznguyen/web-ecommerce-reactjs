import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  notification,
} from "antd";
import "../../../assets/user-page/main.css";
import PostAPI from "../../../Service/PostAPI.js";
import PostCateAPI from "../../../Service/PostCateAPI.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { Option } = Select;

const AddBlog = ({ isModalVisible, handleCancel }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [postcates, setPostCates] = useState([]);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  // lấy data
  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await PostCateAPI.getAll();
        setPostCates(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPostCates();
  }, []);
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("author", values.author);
      formData.append("post_category_id", values.post_category_id);
      formData.append("status", values.status ? 1 : 0);
      formData.append("img", image);

      await PostAPI.add(formData);

      notification.open({
        message: "Thêm bài viết thành công!!",
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
        title="Thêm bài viết"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addBlogForm" onFinish={onFinish}>
          <Form.Item
            label="Tiêu đề bài viết"
            name="title"
            rules={[{ required: true, message: "Hãy nhập tiêu đề bài viết!" }]}
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
          <Form.Item
            label="Nội dung"
            name="content"
            // rules={[{ required: true, message: "Hãy nhập nội dung!" }]}
          >
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
              //   rules={[{ required: true, message: "Hãy nhập tác giả!" }]}
              style={{ flex: "1", marginRight: "10px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại bài viết"
              name="post_category_id"
              rules={[{ required: true, message: "Hãy chọn loại bài viết!" }]}
              style={{ flex: "1" }}
            >
              <Select defaultValue="">
              <Option value="" disabled>Hãy chọn loại</Option>
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
            <button
              className="btn-add-form__admin"
              type="primary"
              htmltype="submit"
            >
              Thêm
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBlog;
