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
import FigureCateAPI from "../../../Service/FigureCateAPI.js";
import AddFiguCate from "./AddFiguCate.jsx";
import EditFiguCate from "./EditFiguCate.jsx";
import { Table, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function FiguCateList() {
  const [figurecates, setFigureCates] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPostCate, setSelectedPostCate] = useState(null);
  const [searchText, setSearchText] = useState("");

  // lấy tất cả sp
  useEffect(() => {
    async function fetchFigureCates() {
      try {
        const data = await FigureCateAPI.getAllAdmin();
        setFigureCates(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchFigureCates();
  }, []);
  // tìm kiếm theo tên
  const filteredUsers = figurecates.filter((user) =>
    user.name_cate.toLowerCase().includes(searchText.toLowerCase())
  );
  // xóa
  const handleDeleteClick = (categoryId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn xóa loại mô hình này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Gọi service để xóa loại bài viết dựa vào categoryId
          await FigureCateAPI.delete(categoryId);

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
  const handleEditClick = (categoryId) => {
    const selectedPostCate = figurecates.find(
      (postcate) => postcate.id_cate === categoryId
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
      sorter: (a, b) => a.id_cate - b.id_cate,
    },
    {
      align: "center",
      title: "Tên loại",
      dataIndex: "name_cate",
      key: "name_cate",
    },
    {
      align: "center",
      title: "Mô tả",
      dataIndex: "description_cate",
      key: "description_cate",
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
            onClick={() => handleEditClick(record.id_cate)}
            title="Sửa"
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteClick(record.id_cate)}
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
      <h1 className="title-tab_admin2-main">Quản lý loại mô hình</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" id="add" onClick={handleAddClick}>
            <FontAwesomeIcon icon={faCirclePlus} /> Thêm loại mô hình

          </div>
          
              <Input.Search
          placeholder="Nhập từ khóa..."
          allowClear
          style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
          onChange={(e) => setSearchText(e.target.value)} />
          
        
          
          
        </div>
        <AddFiguCate
          isModalVisible={isAddModalVisible}
          handleCancel={handleCancel}
        />
        <EditFiguCate
          isModalVisible={isEditModalVisible}
          initialValue={selectedPostCate} // Truyền selectedPostCate vào prop initialValue
          handleCancel={handleCancel}
        />
        
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
  );
}
