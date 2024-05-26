import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import PostAPI from "../../../Service/PostAPI.js";
import AddBlog from "./AddBlog.jsx";
import EditBlog from "./EditBlog.jsx";
import { Table, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPostCate, setSelectedPostCate] = useState(null);
  const [searchText, setSearchText] = useState("");

  // lấy tất cả sp
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await PostAPI.getAllAdmin();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPosts();
  }, []);
    // tìm kiếm theo tên
    const filteredUsers = posts.filter((user) =>
      user.title.toLowerCase().includes(searchText.toLowerCase())
    );
      // xóa
      const handleDeleteClick = (categoryId) => {
        Modal.confirm({
          title: "Xác nhận xóa",
          icon: <ExclamationCircleOutlined />,
          content: "Bạn có chắc muốn xóa bài viết này không?",
          okText: "Xác nhận",
          cancelText: "Hủy",
          onOk: async () => {
            try {
              // Gọi service để xóa loại bài viết dựa vào categoryId
              await PostAPI.delete(categoryId);
    
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


  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleEditClick = (postId) => {
    const selectedPostCate = posts.find(
      (post) => post.id === postId
    );
    setIsEditModalVisible(true);
    setSelectedPostCate(selectedPostCate);
  };


  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
  };
  const column = [
    {
      align: "center",
      title: "STT",
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.id - b.id,
    },
    {
      align: "center",
      title: "Ảnh",
      dataIndex: "img",
      render: (text) => <img src={"http://localhost:8080/" + text} alt="Ảnh" style={{ width: 150, height: 150 }} />,
      key: "img",
    },
    {
      align: "center",
      title: "Phân loại",
      dataIndex: "name_cate",
      key: "name_cate",
    },
    {
      align: "center",
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
    },
    {
      align: "center",
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      align: "center",
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        record.status === 1 ? (
          <FontAwesomeIcon icon={faCircleCheck} className="icon_check" />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} className="icon_check" />
        ),
    },
    {
      align: "center",
      title: "Thao tác",
      render: (text, record) => (
        <div className="icon-manipulation">
          <Button
            type="primary"
            onClick={() => handleEditClick(record.id)}
            title="Sửa"
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteClick(record.id)}
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
      <h1 className="title-tab_admin2-main">Quản lý bài viết</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" onClick={handleAddClick}>
            <FontAwesomeIcon icon={faCirclePlus} /> Thêm bài viết
          </div>
          <Input.Search
          placeholder="Nhập từ khóa..."
          allowClear
          style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
          onChange={(e) => setSearchText(e.target.value)} />
          
        </div>
        <AddBlog isModalVisible={isAddModalVisible}
          handleCancel={handleCancel}/>
        <EditBlog isModalVisible={isEditModalVisible}
          initialValue={selectedPostCate} // Truyền selectedPostCate vào prop initialValue
          handleCancel={handleCancel}/>


        <Table
          style={{ margin: "0 10px", align: "center" }}
          columns={column}
          dataSource={filteredUsers}
          bordered
          pagination={{ pageSize: 5 }}
          size="middle"
        />
      </div>
    </div>
  );
}
