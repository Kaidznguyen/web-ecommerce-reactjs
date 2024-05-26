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
import BrandAPI from "../../../Service/BrandAPI.js";
import AddBrand from "./AddBrand.jsx";
import EditBrand from "./EditBrand.jsx";
import { Table, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPostCate, setSelectedPostCate] = useState(null);
  const [searchText, setSearchText] = useState("");

  // lấy tất cả sp
  useEffect(() => {
    async function fetchBrandes() {
      try {
        const data = await BrandAPI.getAllAdmin();
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchBrandes();
  }, []);
    // tìm kiếm theo tên
    const filteredUsers = brands.filter((user) =>
      user.name_brand.toLowerCase().includes(searchText.toLowerCase())
    );
    // xóa
    const handleDeleteClick = (categoryId) => {
      Modal.confirm({
        title: "Xác nhận xóa",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc muốn xóa loại bài viết này không?",
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            // Gọi service để xóa loại bài viết dựa vào categoryId
            await BrandAPI.delete(categoryId);
  
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

  const handleEditClick = (brandId) => {
    const selectedPostCate = brands.find(
      (brand) => brand.id_brand === brandId
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
      title: "STT",
      render: (text, record, index) => index + 1,
      align: "center",
      sorter: (a, b) => a.id_brand - b.id_brand,
    },
    {
      title: "Ảnh",
      dataIndex: "img_brand",
      align: "center",
      key: "img_brand",
      render: (text) => <img src={"http://localhost:8080/" + text} alt="Ảnh" style={{ width: 100, height: 100 }} />,
    },    
    {
      title: "Tên thương hiệu",
      align: "center",
      dataIndex: "name_brand",
      key: "name_brand",
    },
    {
      title: "Mô tả",
      dataIndex: "description_brand",
      align: "center",
      key: "description_brand",
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
            onClick={() => handleEditClick(record.id_brand)}
            title="Sửa"
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteClick(record.id_brand)}
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
      <h1 className="title-tab_admin2-main">Quản lý thương hiệu mô hình</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" onClick={handleAddClick}>
            <FontAwesomeIcon icon={faCirclePlus} />
            Thêm thương hiệu
          </div>
          <Input.Search
          placeholder="Nhập từ khóa..."
          allowClear
          style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
          onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <AddBrand isModalVisible={isAddModalVisible}
          handleCancel={handleCancel}/>
        <EditBrand  isModalVisible={isEditModalVisible}
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
