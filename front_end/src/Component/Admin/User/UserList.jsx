import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { Table, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import UserAPI from "../../../Service/UserAPI.js";
import AddUser from "./AddUser.jsx";
import EditUser from "./EditUser.jsx";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUserCate, setSelectedUserCate] = useState(null);
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
  useEffect(() => {
    async function fetchBrandes() {
      try {
        const data = await UserAPI.getAllAdmin();
        setUsers(data.data);
        setTotalData(data.data.length);

      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }
    fetchBrandes();
  }, []);

  const handleEditClick = (id) => {
    const selectedUserCate = users.find((user) => user.id_us === id);
    setIsEditModalVisible(true);
    setSelectedUserCate(selectedUserCate);
  };

  const handleDeleteClick = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn xóa loại bài viết này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await UserAPI.delete(id);
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
  function translateStatus(role) {
    switch (role) {
      case 'admin':
        return 'Quản lý';
      case 'staff':
        return 'Nhân viên';
      case 'user':
        return 'Khách';
      
      // Nếu không khớp với bất kỳ trạng thái nào, trả về chính nó
      default:
        return role;
    }
  }
  const columns = [
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
      title: "Tên hiển thị",
      align: "center",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      align: "center",
      dataIndex: "role",
      key: "role",
      render: (role) => translateStatus(role),
    },
    {
      title: "Status",
      align: "center",
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
            onClick={() => handleEditClick(record.id_us)}
            title="Sửa"
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteClick(record.id_us)}
            title="Xóa"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];

  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
  };
    // Hàm loại bỏ dấu tiếng Việt
    function removeVietnameseTones(str) {
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
      return str;
    }
  const filteredUsers = users.filter((user) =>
  removeVietnameseTones(user.username.toLowerCase()).includes(removeVietnameseTones(searchText.toLowerCase()))

  );

  return (
    <div className="main__admin custom_margin">
      <h1 className="title-tab_admin2-main">Quản lý tài khoản</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" onClick={handleAddClick}>
            <FontAwesomeIcon icon={faCirclePlus} />
            Thêm tài khoản
          </div>
          <Input.Search
          placeholder="Nhập từ khóa..."
          allowClear
          style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
          onChange={(e) => setSearchText(e.target.value)} />
          <AddUser
            isModalVisible={isAddModalVisible}
            handleCancel={handleCancel}
          />
          <EditUser
            isModalVisible={isEditModalVisible}
            initialValue={selectedUserCate}
            handleCancel={handleCancel}
          />
        </div>
        
        <Table
          style={{ margin: "0 10px" }}
          columns={columns}
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
    </div>
  );
}
