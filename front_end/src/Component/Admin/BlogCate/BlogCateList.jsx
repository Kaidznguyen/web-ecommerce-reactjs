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
import PostCateAPI from "../../../Service/PostCateAPI.js";
import { Table, Button, Modal, Input } from "antd";
import AddBlogCate from "./AddBlogCate.jsx";
import EditBlogCate from "./EditBlogCate.jsx";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function BlogCateList() {
  const [postcates, setPostCates] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPostCate, setSelectedPostCate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1, // Trang hiện tại
    pageSize: 5, // Kích thước trang
  });

  const handlePageSizeChange = (current, size) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1, // Cập nhật trang hiện tại thành 1 khi thay đổi kích thước trang
      pageSize: size, // Cập nhật kích thước trang mới
    }));
  };


  // lấy data
  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await PostCateAPI.getAllAdmin();
        setPostCates(data.data);
        setTotalData(data.data.length);

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
    const filteredUsers = postcates.filter((user) =>
      removeVietnameseTones(user.name_cate.toLowerCase()).includes(removeVietnameseTones(searchText.toLowerCase()))

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
          await PostCateAPI.delete(categoryId);

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
    const selectedPostCate = postcates.find(
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
      render: (text, record, index) => {
        const currentPage = pagination.current;
        const pageSize = pagination.pageSize;
        const startIndex = (currentPage - 1) * pageSize;
        return startIndex + index + 1;
      },
      sorter: (a, b) => a.id_comment - b.id_comment,
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
      <h1 className="title-tab_admin2-main">Quản lý loại bài viết</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" id="add" onClick={handleAddClick}>
            <FontAwesomeIcon icon={faCirclePlus} /> Thêm loại bài viết
          </div>
          <Input.Search
          placeholder="Nhập từ khóa..."
          allowClear
          style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
          onChange={(e) => setSearchText(e.target.value)} />
          <AddBlogCate
            isModalVisible={isAddModalVisible}
            handleCancel={handleCancel}
          />
          
          
        </div>
        <Table
          style={{ margin: "0 10px" }}
          columns={column}
          dataSource={filteredUsers}
          bordered
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: totalData,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            onShowSizeChange: (current, size) => {
              handlePageSizeChange(current, size);
            },
            onChange: (page) => {
              setPagination((prevPagination) => ({
                ...prevPagination,
                current: page,
              }));
            },
          }}
          size="middle"
        />

      </div>
      {/* Hiển thị EditBlogCate khi được bật */}
      {isEditModalVisible && (
        <EditBlogCate
          isModalVisible={isEditModalVisible}
          initialValue={selectedPostCate} // Truyền selectedPostCate vào prop initialValue
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
}
