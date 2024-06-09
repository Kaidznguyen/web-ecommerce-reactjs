import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import OrderAPI from "../../../Service/OrderAPI.js";
import OrderDetail from "./OrderDetail.jsx";
import OrderUpdateState from "./OrderUpdateState.jsx";
import { Table, Button, Input } from "antd";
export default function OrderList() {
    const [postcates, setPostCates] = useState([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isStateModalVisible, setIsStateModalVisible] = useState(false);
    const [selectedPostCate, setSelectedPostCate] = useState(null);
    const [searchText, setSearchText] = useState("");
  // lấy data
  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await OrderAPI.getAllAdmin();
        setPostCates(data.data);
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
    removeVietnameseTones(user.name.toLowerCase()).includes(removeVietnameseTones(searchText.toLowerCase()))
    );
  // hàm dịch 
function translateStatus(status) {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Hủy đơn';
      
      // Nếu không khớp với bất kỳ trạng thái nào, trả về chính nó
      default:
        return status;
    }
  }
  const handleDetailClick = (orderId) => {
    setIsDetailModalVisible(true);
    setSelectedPostCate(orderId);
  };

  const handleStateClick = (orderId) => {
    setIsStateModalVisible(true);
    setSelectedPostCate(orderId);
  };
  const handleCancel = () => {
    setIsDetailModalVisible(false);
    setIsStateModalVisible(false);
  };
  const column = [
    {
      align: "center",
      title: "STT",
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.shipping_id - b.shipping_id,
    },
    {
      align: "center",
      title: "Mã vận đơn",
      dataIndex: "shipping_id",
      key: "shipping_id",
      sorter: (a, b) => a.shipping_id - b.shipping_id,
    },
    {
      align: "center",
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      align: "center",
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      align: "center",
      title: "Lời nhắn",
      dataIndex: "note",
      key: "note",
    },
    {
      align: "center",
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
    },
    {
      align: "center",
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => translateStatus(status),
    },
    {
      align: "center",
      title: "Thao tác",
      render: (text, record) => (
        <div className="icon-manipulation">
          <Button
            type="primary"
            onClick={() => handleDetailClick(record.id_order)} title="Chi tiết đơn hàng"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </Button>
          <Button
            type="danger"
            onClick={() => handleStateClick(record.id_order)} title="Cập nhật trạng thái đơn hàng"

          >
            <FontAwesomeIcon icon={faClipboardList} />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="main__admin custom_margin">
      <h1 className="title-tab_admin2-main">Quản lý hóa đơn</h1>
      <div className="product-management">
        <div className="the-record">
        <Input.Search
          placeholder="Nhập từ khóa..."
          allowClear
          style={{ width: 200, marginBottom: 10,marginLeft:10, marginTop:-50 }}
          onChange={(e) => setSearchText(e.target.value)} />
          
         {/* Hiển thị EditBlogCate khi được bật */}
      {isDetailModalVisible && (
        <OrderDetail
          isModalVisible={isDetailModalVisible}
          orderId={selectedPostCate}
          handleCancel={handleCancel}
        />
        
      )}
      {isStateModalVisible && (
      <OrderUpdateState 
      isModalVisible={isStateModalVisible}
      orderId={selectedPostCate}
      handleCancel={handleCancel}
      />
      )}
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
