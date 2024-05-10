import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment,faClipboard,faSackDollar,faBoxesStacked} from '@fortawesome/free-solid-svg-icons'
import FigureAPI from "../../../Service/FigureAPI.js";
import PostAPI from "../../../Service/PostAPI.js";
import OrderAPI from "../../../Service/OrderAPI.js";
import numeral from "numeral";

export default function StatisticsCard() {
  const [figures, setFigures] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [calculateRevenue, setCalculateRevenue] = useState([]);
  const [cancel, setCancel] = useState([]);

// lấy số lượng figure
useEffect(() => {
  async function fetchFigures() {
    try {
      const data = await FigureAPI.getAllAdmin();
      const figuresCount = data.data.length; // Đoạn này làm thay đổi
      setFigures(figuresCount);
    } catch (error) {
      console.error("Error fetching post categories: ", error);
    }
  }

  fetchFigures();
}, []);
// lấy số lượng post
useEffect(() => {
  async function fetchPosts() {
    try {
      const data = await PostAPI.getAllAdmin();
      const postCount = data.data.length; // Đoạn này làm thay đổi
      setPosts(postCount);
    } catch (error) {
      console.error("Error fetching post categories: ", error);
    }
  }

  fetchPosts();
}, []);
// lấy số lượng hóa đơn
useEffect(() => {
  async function fetchOrders() {
    try {
      const data = await OrderAPI.getAllAdmin();
      const orderCount = data.data.length; // Đoạn này làm thay đổi
      setOrders(orderCount);
    } catch (error) {
      console.error("Error fetching post categories: ", error);
    }
  }

  fetchOrders();
}, []);
// tính doanh thu cho những đơn đã nhận hóa đơn
useEffect(() => {
  async function fetchTotalPriceDelivered() {
    try {
      const response = await OrderAPI.getCalculateRevenue();
      if (response.status) {
        setCalculateRevenue(response.data[0].total_price_delivered);
      } else {
        console.error("API error: ", response.error);
      }
    } catch (error) {
      console.error("Error fetching total price delivered: ", error);
    }
  }

  fetchTotalPriceDelivered();
}, []);
// tính số lượng các hóa đơn đã thanh toán
useEffect(() => {
  async function fetchOrder() {
    try {
      const response = await OrderAPI.getPaidInvoices();
      const orderCount = response.data.length; // Đoạn này làm thay đổi
      setOrder(orderCount);
      
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  }
  fetchOrder();
}, []);
// tính số lượng hóa đơn hủy
useEffect(() => {
  async function fetchCancelledOrders() {
    try {
      const response = await OrderAPI.getAllAdmin();
      if (response.status) {
        const cancelledOrders = response.data.filter(order => order.status === 'cancelled');
        const cancelledOrdersCount = cancelledOrders.length;
        setCancel(cancelledOrdersCount);
      } else {
        console.error("API error: ", response.error);
      }
    } catch (error) {
      console.error("Error fetching cancelled orders: ", error);
    }
  }

  fetchCancelledOrders();
}, []);



  return (
    <div className="card-box">
      <div className="card">
        <div>
          <div className="numbers">{figures}</div>
          <div className="card_name">Số lượng mô hình</div>
        </div>
        <div className="iconBx">
        <FontAwesomeIcon icon={faBoxesStacked} />
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{posts}</div>
          <div className="card_name">Số lượng bài viết</div>
        </div>
        <div className="iconBx">
        <FontAwesomeIcon icon={faClipboard} />
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{orders}</div>
          <div className="card_name">Hóa đơn</div>
        </div>
        <div className="iconBx">
        <FontAwesomeIcon icon={faComment} />
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{numeral(calculateRevenue).format("$0,0")}</div>
          <div className="card_name">Doanh thu({order} đã thanh toán/{cancel} hóa đơn đã hủy/{orders} hóa đơn)</div>
        </div>
        <div className="iconBx">
        <FontAwesomeIcon icon={faSackDollar} />
        </div>
      </div>
      
    </div>
  );
}
