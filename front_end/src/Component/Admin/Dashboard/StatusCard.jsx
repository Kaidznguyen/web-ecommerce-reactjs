import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import StatisticalAPI from "../../../Service/StatisticalAPI.js";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faBoxesStacked,
  faMoneyBillWave,
  faCartFlatbed,
  faBoxOpen,
  faSackXmark
} from "@fortawesome/free-solid-svg-icons";
import OrderAPI from "../../../Service/OrderAPI.js";

export default function StatusCard() {
  const [figures, setFigures] = useState([]);
  const [orders, setOrders] = useState({ cod: 0, momo: 0 });
  const [countStatus, setCountStatus] = useState({
    delivered: 0,
    shipped: 0,
    cancelled: 0,
    pending: 0
  });;
  // lấy số lượng figure
  useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await StatisticalAPI.RecentlyFigure();
        setFigures(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchFigures();
  }, []);
// lấy số lượng hóa đơn
useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await OrderAPI.getAllAdmin();
        const orders = data.data;

        // Lọc các bản ghi có payment là "cod" hoặc "momo"
        const codOrders = orders.filter(order => order.payment === "COD");
        const momoOrders = orders.filter(order => order.payment === "MoMo");

        // Đếm số lượng bản ghi cho mỗi loại thanh toán
        const codCount = codOrders.length;
        const momoCount = momoOrders.length;

        // Cập nhật state với đối tượng chứa số lượng bản ghi cho cả hai loại thanh toán
        setOrders({ cod: codCount, momo: momoCount });
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    }
  
    fetchOrders();
  }, []);
  // tính % chiếm của COD và MoMo
  const calculatePercentage = (value, total) => {
    const percentage = (value / total) * 100;
    return roundPercentage(percentage);
  };
  
  const roundPercentage = (percentage) => {
    const rounded = Math.round(percentage);
    return `${rounded}%`;
  };
  
  const totalOrders = orders.cod + orders.momo;
  const codPercentage = calculatePercentage(orders.cod, totalOrders);
  const momoPercentage = calculatePercentage(orders.momo, totalOrders);
  
  // tính số lượng hóa đơn hủy
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await OrderAPI.getAllAdmin();
        if (response.status) {
          const orders = response.data;
          const counts = {
            delivered: orders.filter(order => order.status === 'delivered').length,
            shipped: orders.filter(order => order.status === 'shipped').length,
            cancelled: orders.filter(order => order.status === 'cancelled').length,
            pending: orders.filter(order => order.status === 'pending').length
          };
          setCountStatus(counts);
        } else {
          console.error("API error: ", response.error);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    }

    fetchOrders();
  }, []);
  return (
    <div className="graphBox">
      <div className="box" style={{ maxHeight: "300px", overflow: "auto" }}>
        <h1 className="title-box">10 mẫu mô hình được mua gần đây</h1>
        {figures.map((figure) => (
          <div className="detail_box" style={{ marginBottom: "10px" }} key={figure.id}>
            <div className="imgBx">
              <img
                src={"http://localhost:8080/" + figure.img}
                alt={figure.name}
              />
            </div>
            <div className="content_deteil-box">
              <h3>
                <b>{figure.name}</b>{" "}
              </h3>
              <span>
                {figure.promotionprice === 0
                  ? numeral(figure.price).format("$0,0")
                  : numeral(figure.promotionprice).format("$0,0")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="box" style={{ maxHeight: "300px", overflow: "auto" }}>
        <h1 className="title-box">Phân tích bán hàng</h1>
        <div className="graphBox2" style={{marginLeft:'30px'}}>
          <div className="box box2">
            <div className="iconBox">
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </div>
            <div className="detail__box">
              <h2>Đơn hàng thanh toán COD</h2>
              <div className="detai_numberBox">
                <span>{orders.cod} <span className="numberBox">chiếm {codPercentage}</span></span>
              </div>
            </div>
          </div>
          <div className="box box2">
            <div className="iconBox">
              <ion-icon name="cart-outline"></ion-icon>
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div className="detail__box">
              <h2>Đơn hàng thanh toán onine</h2>
              <div className="detai_numberBox">
                <span>{orders.momo}<span className="numberBox">chiếm {momoPercentage}</span></span>
              </div>
            </div>
          </div>
          <div className="box box2">
            <div className="iconBox">
              <ion-icon name="people-circle-outline"></ion-icon>
              <FontAwesomeIcon icon={faBoxesStacked} />
            </div>
            <div className="detail__box">
              <h2>Đơn chờ xác nhận</h2>
              <div className="detai_numberBox">
                <span>{countStatus.pending}</span>
              </div>
            </div>
          </div>
          <div className="box box2">
            <div className="iconBox">
              <ion-icon name="people-circle-outline"></ion-icon>
              <FontAwesomeIcon icon={faCartFlatbed} />
            </div>
            <div className="detail__box">
              <h2>Đơn đang vận chuyển</h2>
              <div className="detai_numberBox">
                <span>{countStatus.shipped}</span>
              </div>
            </div>
          </div>
          <div className="box box2">
            <div className="iconBox">
              <ion-icon name="people-circle-outline"></ion-icon>
              <FontAwesomeIcon icon={faBoxOpen} />
            </div>
            <div className="detail__box">
              <h2>Đơn đã nhận</h2>
              <div className="detai_numberBox">
                <span>{countStatus.delivered}</span>
              </div>
            </div>
          </div>
          <div className="box box2">
            <div className="iconBox">
              <ion-icon name="people-circle-outline"></ion-icon>
              <FontAwesomeIcon icon={faSackXmark} />
            </div>
            <div className="detail__box">
              <h2>Đơn đã hủy</h2>
              <div className="detai_numberBox">
                <span>{countStatus.cancelled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
