import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "../../../assets/user-page/main.css";
import OrderAPI from "../../../Service/OrderAPI.js";
import logo from  '../../../assets/user-page/img/app/logo.png'
import numeral from "numeral";
const OrderDetail = ({ isModalVisible, handleCancel, orderId }) => {
    const [order, setOrder] = useState([]);
    const [cus, setCus] = useState({});
    useEffect(() => {
    // Gọi service getById với id từ params
    OrderAPI.getCus(orderId)
      .then((data) => {
        // Lưu dữ liệu của figure vào state
        setCus(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [orderId]);
  useEffect(() => {
    // Gọi service getById với id từ params
    OrderAPI.getById(orderId)
      .then((data) => {
        // Lưu dữ liệu của figure vào state
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [orderId]);
  const totalOrderPrice = order.reduce((total, currentOrder) => total + currentOrder.totalprice, 0);
  return (
    <Modal open={isModalVisible} onCancel={handleCancel} footer={null}  width="45%">
      <div className="container-fluid">
        <div className="section">
          <div className="header_order">
            <div className="header_img_order">
              <img src={logo} alt=""/>
            </div>

            <div className="header_name_order">
              <span className="header_name_p_order">Cửa Hàng Bán Mô Hình DShop</span>
              <br />
              <span className="header_name_p_order">Địa Chỉ:Văn Lâm-Hưng Yên</span>
              <br />
              <span className="header_name_p_order">Số Điện Thoại:0999999999</span>
              <br />
            </div>
          </div>
          <div className="container_order">
            <h2 className="container_header">Hóa Đơn Bán Mô Hình</h2>
            <div className="container_name">
              <p className="container_name_p">Tên khách hàng: {cus.name}</p>
              <p className="container_name_p">Số điện thoại: {cus.phone}</p>
              <p className="container_name_p">Địa chỉ giao hàng: {cus.address}</p>
              <p className="container_name_p">Địa chỉ Email: {cus.email}</p>
              <p className="container_name_p">Ghi chú của khách: {cus.note}</p>
              <p className="container_name_p">Phương thức thanh toán: {cus.payment}</p>
            </div>
          </div>
          <div className="row py-8">
            <div className="col-lg-12 mx-auto">
              <div className="card rounded2 shadow border-0">
                <div className="card-body p-5 bg-white rounded2">
                  <div className="table-responsive">
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
                      {order.map((order) => (
                        <tr align="center">
                          <td>
                            <img
                              style={{ width: "150px", height: "150px" }}
                              src={"http://localhost:8080/" + order.img}
                              alt="ảnh"
                            />
                          </td>
                          <td>{order.name}</td>
                          <td>{numeral(order.promotionprice).format("$0,0")}</td>
                          <td>{order.totalquantity}</td>
                          <td>{numeral(order.totalprice).format("$0,0")}</td>
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
                        

                      Tổng giá trị đơn hàng: {numeral(totalOrderPrice).format("$0,0")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-order">
            <div className="footer_customer one">
              <p className="footer_cutomer_p">Khách Hàng</p>
              <p className="sign1">{cus.name}</p>
            </div>
            <div className="footer_customer two">
              <p className="footer_cutomer_p">Người Bán Hàng</p>
              <div className="header_img">
                <img
                  className="footer_img_seller"
                  src={logo}
                  alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetail;
