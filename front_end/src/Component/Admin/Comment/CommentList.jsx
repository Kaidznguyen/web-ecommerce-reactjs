import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CommentAPI from "../../../Service/CommentAPI.js";
import { Table, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [searchText, setSearchText] = useState("");

// lấy data
useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await CommentAPI.getAllAdmin();
        setComments(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPostCates();
  }, []);
    // Hàm loại bỏ dấu tiếng Việt
    function removeVietnameseTones(str) {
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
        return str;
      }
  // tìm kiếm theo tên
  const filteredUsers = comments.filter((comment) =>
    removeVietnameseTones(comment.name.toLowerCase()).includes(removeVietnameseTones(searchText.toLowerCase()))
  );
    // xóa
    const handleDeleteClick = (categoryId) => {
        Modal.confirm({
          title: "Xác nhận xóa",
          icon: <ExclamationCircleOutlined />,
          content: "Bạn có chắc muốn xóa bình luận này không?",
          okText: "Xác nhận",
          cancelText: "Hủy",
          onOk: async () => {
            try {
              // Gọi service để xóa loại bài viết dựa vào categoryId
              await CommentAPI.delete(categoryId);
    
              // Reload trang sau khi xóa thành công
              window.location.reload();
            } catch (error) {
              console.error("Error deleting post category:", error);
            }
          },
          onCancel: () => {
            console.log("Hủy xác nhận xóa");
          },
        });
      };
    
  const column = [
    {
      align: "center",
      title: "STT",
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.id_comment - b.id_comment,
    },
    {
        align: "center",
        title: "Bình luận",
        dataIndex: "comment_mes",
        key: "comment_mes",
        render: (text, record) => (
          <span dangerouslySetInnerHTML={{ __html: record.comment_mes }} />
        ),
      },
    {
      align: "center",
      title: "Mô hình được bình luận",
      dataIndex: "name",
      key: "name",
    },
    {
        align: "center",
        title: "Tên người bình luận",
        dataIndex: "name_com",
        key: "name_com",
    },
    {
        align: "center",
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
    {
      align: "center",
      title: "Thao tác",
      render: (text, record) => (
        <div className="icon-manipulation">
          <Button
            type="danger"
            onClick={() => handleDeleteClick(record.id_comment)}
            title="Xóa"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="main__admin custom_margin">
    <h1 className="title-tab_admin2-main">Quản lý bình luận</h1>
    <div className="product-management">
      <div className="the-record">
        <Input.Search
        placeholder="Nhập từ khóa..."
        allowClear
        style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
        onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <Table
        style={{ margin: "0 10px" }}
        columns={column}
        dataSource={filteredUsers}
        bordered
        pagination={{ pageSize: 5 }}
        size="middle"
      />
    </div>
  </div>
  )
}
