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
import { Table, Button, Modal, Input,notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function FiguCateList() {
  const [figurecates, setFigureCates] = useState([]);
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

  // lấy tất cả sp
  useEffect(() => {
    async function fetchFigureCates() {
      try {
        const data = await FigureCateAPI.getAllAdmin();
        setFigureCates(data.data);
        setTotalData(data.data.length);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchFigureCates();
  }, []);
      // Hàm loại bỏ dấu tiếng Việt
      function removeVietnameseTones(str) {
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
        return str;
      }
  // tìm kiếm theo tên
  const filteredUsers = figurecates.filter((user) =>
  removeVietnameseTones(user.name_cate.toLowerCase()).includes(removeVietnameseTones(searchText.toLowerCase()))

  );
  // Hàm kiểm tra xem có mô hình nào trong bảng figure có figure_category_id trùng với categoryId không
  const checkAssociation = async (categoryId) => {
    try {
      // Gọi service để kiểm tra xem có mô hình nào trong bảng figure có figure_category_id trùng với categoryId không
      const response = await FigureCateAPI.getByCategoryId(categoryId);
      return response.data.length > 0; // Thay vì trả về độ dài của mảng dữ liệu, trả về kết quả trực tiếp
    } catch (error) {
      console.error("Error checking association:", error);
      return false;
    }
  };
  
//xóa
const handleDeleteClick = async (categoryId) => {
  Modal.confirm({
    title: "Xác nhận xóa",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có chắc muốn xóa loại mô hình này không?",
    okText: "Xác nhận",
    cancelText: "Hủy",
    async onOk() {
      try {
        // Kiểm tra xem có mô hình nào trong bảng figure có figure_category_id trùng với categoryId không
        const isAssociated = await checkAssociation(categoryId);
        console.log(isAssociated)
        if (!isAssociated) {
          // Nếu không có mô hình trùng, thực hiện xóa
          const response = await FigureCateAPI.delete(categoryId);
          // Kiểm tra nếu xóa thành công trước khi reload trang
          if (response && response.message === 'Xóa thành công') {
            window.location.reload();
          }
        } else {
          // Nếu có mô hình trùng, hiển thị thông báo trên màn hình
          notification.error({
            message: 'Không thể xóa',
            description: 'Loại mô hình này đang được liên kết với một hoặc nhiều mô hình khác. Hãy xóa các mô hình liên kết trước khi xóa loại mô hình này.',
          });
        }
      } catch (error) {
        console.error("Error deleting post category:", error);
      }
    },
    onCancel() {
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
