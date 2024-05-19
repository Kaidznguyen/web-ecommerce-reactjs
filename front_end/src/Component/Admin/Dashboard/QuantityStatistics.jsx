import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import StatisticalAPI from "../../../Service/StatisticalAPI.js";
import numeral from "numeral";
import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faBox } from "@fortawesome/free-solid-svg-icons";
const { TabPane } = Tabs;
export default function QuantityStatistics() {
  const [figures, setFigures] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [potentialCustomers, setPotentialCustomers] = useState([]);
  const [cusCancels, setCusCancels] = useState([]);
  const [outStock, setOutStock] = useState([]);
  const [overStock, setOverStock] = useState([]);

  // lấy số lượng figure có nhiều mắt xem
  useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await StatisticalAPI.ManyViews();
        setFigures(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }
    fetchFigures();
  }, []);
  // figure bán chạy
  useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await StatisticalAPI.BestSeller();
        setBestSeller(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }
    fetchFigures();
  }, []);
//   khách chi nhiều
useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await StatisticalAPI.PotentialCustomers();
        setPotentialCustomers(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }
    fetchFigures();
  }, []);
//   khách hủy đơn
useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await StatisticalAPI.CusCancels();
        setCusCancels(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }
    fetchFigures();
  }, []);
  //   sắp hết hàng <=10
useEffect(() => {
  async function fetchFigures() {
    try {
      const data = await StatisticalAPI.OutStock();
      setOutStock(data.data);
    } catch (error) {
      console.error("Error fetching post categories: ", error);
    }
  }
  fetchFigures();
}, []);
  //   hàng tồn kho >= 100
  useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await StatisticalAPI.OverStock();
        setOverStock(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }
    fetchFigures();
  }, []);
  return (
    <div className="graphBox5">
      <div className="box" style={{ maxHeight: "400px", overflow: "auto" }}>
        <h1 className="title-box">Thống kê kinh doanh và thương mại</h1>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Lượt xem sản phẩm" key="1">
            {figures.map((figure) => (
              <div
                className="detail_box"
                style={{ marginBottom: "10px" }}
                key={figure.id}
              >
                <div className="imgBx">
                  <img
                    src={"http://localhost:8080/" + figure.img}
                    alt={figure.name}
                  />
                </div>
                <div className="content_deteil-box">
                  <h3>
                    <b style={{ fontWeight: "normal" }}>{figure.name}</b>{" "}
                  </h3>
                  <span>
                    Lượt xem: {figure.views} <FontAwesomeIcon icon={faEye} />
                  </span>
                </div>
              </div>
            ))}
          </TabPane>
          <TabPane tab="Sản phẩm bán chạy" key="2">
            {bestSeller.map((figure) => (
              <div
                className="detail_box"
                style={{ marginBottom: "10px" }}
                key={figure.id}
              >
                <div className="imgBx">
                  <img
                    src={"http://localhost:8080/" + figure.img}
                    alt={figure.name}
                  />
                </div>
                <div className="content_deteil-box">
                  <h3>
                    <b style={{ fontWeight: "normal" }}>{figure.name}</b>{" "}
                  </h3>
                  <span>
                    {figure.promotionprice === 0
                      ? numeral(figure.price).format("$0,0")
                      : numeral(figure.promotionprice).format("$0,0")}
                  </span>{" "}
                  <span>Lượt bán: {figure.total_sold}</span>
                </div>
              </div>
            ))}
          </TabPane>
          <TabPane tab="Khách hàng tiềm năng" key="3">
            <table style={{width:"100%"}}>
              <thead>
                <tr class="title-card" style={{textAlign:"center"}}>
                  <td>Tên khách</td>
                  <td>Số điện thoại</td>
                  <td>Địa chỉ</td>
                  <td>Tổng chi tiêu</td>
                </tr>
              </thead>
                <tbody style={{textAlign:"center"}}>
                {potentialCustomers.map((cus) => (
                <tr key={cus.id_ship}>
                <td>{cus.name}</td>
                <td>{cus.phone}</td>
                <td>{cus.address}</td>
                <td>
                  <span class="delivered">{numeral(cus.total_spent).format("$0,0")}</span>
                </td>
              </tr>
            ))}
                  
                </tbody>
            </table>
          </TabPane>
          <TabPane tab="Khách hàng hủy đơn" key="4">
          <table style={{width:"100%"}}>
              <thead>
                <tr class="title-card" style={{textAlign:"center"}}>
                  <td>Tên khách</td>
                  <td>Số điện thoại</td>
                  <td>Địa chỉ</td>
                  <td>Giá trị đơn hủy</td>
                </tr>
              </thead>
                <tbody style={{textAlign:"center"}}>
                {cusCancels.map((cus) => (
                <tr key={cus.id_ship}>
                <td>{cus.name}</td>
                <td>{cus.phone}</td>
                <td>{cus.address}</td>
                <td>
                  <span class="return">{numeral(cus.total_spent).format("$0,0")}</span>
                </td>
              </tr>
            ))}
                  
                </tbody>
            </table>
          </TabPane>
        </Tabs>
      </div>
      <div className="box" style={{ maxHeight: "400px", overflow: "auto" }}>
        <h1 className="title-box">Thống kê số lượng hàng</h1>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Mô hình hết hàng và sắp hết hàng" key="1">
            {outStock.map((figure) => (
              <div
                className="detail_box"
                style={{ marginBottom: "10px" }}
                key={figure.id}
              >
                <div className="imgBx">
                  <img
                    src={"http://localhost:8080/" + figure.img}
                    alt={figure.name}
                  />
                </div>
                <div className="content_deteil-box">
                  <h3>
                    <b style={{ fontWeight: "normal" }}>{figure.name}</b>{" "}
                  </h3>
                  <span>
                    Sô lượng còn lại: {figure.quantity} <FontAwesomeIcon icon={faBox} />
                  </span>
                </div>
              </div>
            ))}
          </TabPane>
          <TabPane tab="Mô hình tồn kho" key="2">
            {overStock.map((figure) => (
              <div
                className="detail_box"
                style={{ marginBottom: "10px" }}
                key={figure.id}
              >
                <div className="imgBx">
                  <img
                    src={"http://localhost:8080/" + figure.img}
                    alt={figure.name}
                  />
                </div>
                <div className="content_deteil-box">
                  <h3>
                    <b style={{ fontWeight: "normal" }}>{figure.name}</b>{" "}
                  </h3>
                  <span>Số lượng: {figure.quantity} <FontAwesomeIcon icon={faBox} /></span>
                </div>
              </div>
            ))}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
