import React, { useState, useEffect } from "react";
import { Form, Input, notification } from "antd";
import "../../../assets/user-page/main.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FigureAPI from "../../../Service/FigureAPI.js";
import { jwtDecode } from "jwt-decode";
import CommentAPI from "../../../Service/CommentAPI.js";
const CommentFigure = ({ id }) => {
  const [form] = Form.useForm();
  const [comment_mes, setComment_mes] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Lấy token từ localStorage hoặc sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decoded = jwtDecode(token);
        // Cập nhật state với thông tin người dùng
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Xóa token không hợp lệ nếu giải mã thất bại
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    } else {
      console.log(
        "Không tìm thấy token trong localStorage hoặc sessionStorage."
      );
    }
  }, []);
  const validateEmail = (_, value) => {
    if (!value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.com)$/.test(value)) {
      return Promise.reject("Email không hợp lệ hoặc không có đuôi .com!");
    }
    return Promise.resolve();
  };
  const onFinish = async (data) => {
    try {
      const { name_com, email, parentID } = data;
      const figure_id = id;
      const name_com_value = name_com || "Người dùng ẩn danh";
      const parentID_value = parentID || 0;
      await CommentAPI.addComment(
        name_com_value,
        email,
        comment_mes, // Dữ liệu của trình soạn thảo CKEditor được lấy từ comment_mes
        figure_id,
        parentID_value
      );

      notification.open({
        message: "Thêm bình luận thành công!!",
        duration: 1,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi thêm bình luận! Hãy thử lại",
      });
      console.error("Lỗi thêm bình luận:", error);
    }
  };

  return (
    <div style={{ marginTop: "8px" }}>

  <Form
    form={form}
    name="comment"
    onFinish={onFinish}

  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Form.Item
        label="Tên hiển thị"
        name="name_com"
        style={{ flex: "1", margin: " 10px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Hãy nhập email!" },{ required: true, validator: validateEmail }]}
        style={{ flex: "1", margin: " 10px" }}
      >
        <Input />
      </Form.Item>
    </div>
    <Form.Item
      label="Bình luận"
      name="comment_mes"
      rules={[{ required: true, message: "Hãy nhập bình luận!" }]}
      style={{ margin: " 10px" }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={comment_mes}
        onBlur={(event, editor) => {
          const data = editor.getData();
          setComment_mes(data);
          form.setFieldsValue({ comment_mes: data }); // Cập nhật giá trị của trường `comment_mes` trong Form
        }}
      />
    </Form.Item>
    <Form.Item>
      <button
        className="btn-add-form__admin"
        type="primary"
        htmltype="submit"
        style={{ margin: " 10px" }}
      >
        Thêm
      </button>
    </Form.Item>
  </Form>


    </div>
  );
};

export default CommentFigure;
