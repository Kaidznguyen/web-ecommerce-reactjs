import React, { useEffect, useState } from "react";
import { Modal, Radio, Button, notification } from "antd";
import "../../../assets/user-page/main.css";
import OrderAPI from "../../../Service/OrderAPI.js";
import numeral from "numeral";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const OrderUpdateState = ({ isModalVisible, handleCancel, orderId }) => {
  const [order, setOrder] = useState([]);
  const [cus, setCus] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [orderState, setOrderState] = useState("pending");

  useEffect(() => {
    OrderAPI.getCus(orderId)
      .then((data) => {
        setCus(data);
        setOrderState(data.status);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    OrderAPI.getById(orderId)
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [orderId]);

  const totalOrderPrice = order.reduce(
    (total, currentOrder) => total + currentOrder.totalprice,
    0
  );

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleUpdateState = () => {
    OrderAPI.update(orderId, { status: selectedState }) // Sửa trạng thái của đơn hàng thành selectedState
      .then(() => {
        console.log("Order state updated successfully.");
        notification.success({
          message: "Cập nhật trạng thái đơn hàng",
          duration: 2,
        });
        setTimeout(() => {
          window.location.reload(); // Reload lại trang sau 2 giây
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating order state:", error);
      });
  };

  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đã xác nhận";
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Hủy đơn";
      default:
        return status;
    }
  };

  const getDisabledOptions = (status) => {
    switch (status) {
      case "cancelled":
        return ["pending", "processing", "shipped", "delivered", "cancelled"];
      case "delivered":
        return ["pending", "processing", "shipped", "cancelled", "delivered"];
      case "shipped":
        return ["pending", "processing"];
      case "processing":
        return ["pending"];
      case "pending":
      default:
        return [];
    }
  };

  const disabledOptions = getDisabledOptions(orderState);

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width="45%"
    >
      <div className="container-fluid">
        <div className="section">
          <div className="container_order">
            <h2 className="container_header">Thông Tin Đơn Hàng</h2>
            <div className="container_name">
              <p className="container_name_p">Tên khách hàng: {cus.name}</p>
              <p className="container_name_p">Số điện thoại: {cus.phone}</p>
              <p className="container_name_p">
                Địa chỉ giao hàng: {cus.address}
              </p>
              <p className="container_name_p">Địa chỉ Email: {cus.email}</p>
              <p className="container_name_p">Ghi chú của khách: {cus.note}</p>
              <p className="container_name_p">
                Phương thức thanh toán: {cus.payment}
              </p>
              <p
                className="container_name_p"
                style={{ color: "var(--primary-color" }}
              >
                Trạng thái đơn hàng: {translateStatus(cus.status)}
              </p>
            </div>
          </div>
          <div className="row py-8">
            <div className="col-lg-12 mx-auto">
              <div className="card rounded2 shadow border-0">
                <div className="card-body p-5 bg-white rounded2">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "345px", overflow: "auto" }}
                  >
                    <table
                      id="example"
                      style={{ width: "100%" }}
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr align="center">
                          <th>Ảnh</th>
                          <th style={{ width: "30%" }}>Tên Mô Hình</th>
                          <th>Giá</th>
                          <th>Số Lượng</th>
                          <th>Thành Tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.map((orderItem) => (
                          <tr align="center" key={orderItem.id}>
                            <td>
                              <img
                                style={{ width: "150px", height: "150px" }}
                                src={"http://localhost:8080/" + orderItem.img}
                                alt="ảnh"
                              />
                            </td>
                            <td>{orderItem.name}</td>
                            <td>
                              {numeral(orderItem.promotionprice).format("$0,0")}
                            </td>
                            <td>{orderItem.totalquantity}</td>
                            <td>
                              {numeral(orderItem.totalprice).format("$0,0")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="total_price">
                    <h3
                      style={{
                        color: "var(--ck-color-button-cancel)",
                        paddingTop: "10px",
                      }}
                    >
                      Tổng giá trị đơn hàng:{" "}
                      {numeral(totalOrderPrice).format("$0,0")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-order-state">
            <RadioGroup
              size="large"
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <RadioButton value="pending" disabled={disabledOptions.includes("pending")}>
                Chờ xác nhận
              </RadioButton>
              <RadioButton value="processing" disabled={disabledOptions.includes("processing")}>
                Đã xác nhận
              </RadioButton>
              <RadioButton value="shipped" disabled={disabledOptions.includes("shipped")}>
                Đang giao
              </RadioButton>
              <RadioButton value="delivered" disabled={disabledOptions.includes("delivered")}>
                Đã giao
              </RadioButton>
              <RadioButton value="cancelled" disabled={disabledOptions.includes("cancelled")}>
                Hủy đơn
              </RadioButton>
            </RadioGroup>
          </div>
          <div style={{ margin: "10px" }}>
            <Button 
              type="primary" 
              onClick={handleUpdateState} 
              disabled={orderState === "cancelled" || orderState === "delivered"}
            >
              Cập nhật trạng thái
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderUpdateState;
