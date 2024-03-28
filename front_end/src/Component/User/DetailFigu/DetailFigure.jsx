import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import FigureAPI from "../../../Service/FigureAPI.js";
import numeral from "numeral";
export default function DetailFigure() {
  const { id } = useParams();
  const [detail, setFigure] = useState({});

  useEffect(() => {
    // Gọi service getById với id từ params
    FigureAPI.getById(id)
      .then((data) => {
        // Lưu dữ liệu của figure vào state
        setFigure(data);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  return (
    <div className="row sm-gutter">
      <div className="col l-6 c-12 m-10">
        <div className="main-img">
          <img src={"http://localhost:8080/" + detail.img} alt="" />
          {/* <img src={img6} alt="" /> */}
        </div>
      </div>
      <div className="col l-6 c-12 m-12">
        <div className="main-content-img">
          <div className="main-content-title">
            <span>
              <a href="/"> trang chủ </a> /
              <a href="product.html"> Danh sách mô hình</a> /
              <a href="/"> {detail.name}</a>
            </span>
            <h1>{detail.name}</h1>
          </div>
          <div className="main-content-price">
            {/* <span>{detail.promotionprice}</span> */}
            {/* <span>{numeral(detail.promotionprice).format("$0,0")}</span>  */}
            <span
              className={
                detail.promotionprice === 0
                  ? "home-product-item__price-curent"
                  : "home-product-item__price-old"
              }
            >
              {numeral(detail.price).format("$0,0")}
            </span>
            <span
              className={
                detail.promotionprice === 0
                  ? "hidden"
                  : "home-product-item__price-curent"
              }
            >
              {numeral(detail.promotionprice).format("$0,0")}
            </span>
            <div
              className={`discount-price ${
                detail.promotionprice === 0 ? "hidden" : ""
              }`}
            >
              {detail.price !== 0 && detail.promotionprice !== 0 && (
                <span className="home-product-item__sale-off-percent">
                  Giảm ngay 
                  -{" "}
                  {(
                    ((detail.price - detail.promotionprice) / detail.price) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              )}
            </div>
          </div>
          <div className="main-content-subtit">
            <ul className="main-content-list">
              <li className="main-content-item">
                <i className="main-content-icon fa-solid fa-check"></i> Hàng mới
                100% fullbox
              </li>
              <li className="main-content-item">
                <i className="main-content-icon fa-solid fa-check"></i> Đổi trả
                trong 3 ngày
              </li>
              <li className="main-content-item">
                <i className="main-content-icon fa-solid fa-check"></i> Check
                lỗi kĩ càng trước khi gửi
              </li>
              <li className="main-content-item">
                <i className="main-content-icon fa-solid fa-check"></i> Hình ảnh
                thật được chụp trực tiếp 100% tại shop
              </li>
              <li className="main-content-item">
                <i className="main-content-icon fa-solid fa-check"></i> Nhiều ưu
                đãi với các gói hỗ trợ freeship
              </li>
            </ul>
          </div>
          <div className="main-content-btn">
            <button className={
              `btn-main1 ${
                detail.quantity === 0 ? "hidden" : ""
              }`}>
                hêm vào giỏ hàng
            </button>
            <button className={`${
                detail.quantity === 0 ? "no_btn" : "btn-main2 "
              }`}>
             {detail.quantity === 0 ? "Hết hàng" : "Mua ngay"}
            </button>
          </div>
          <div className="main-content-text">
            <span className="main-content-text-list">
              Danh mục:<a href="/">{detail.name_cate}</a>
            </span>
          </div>
          {/* <div className="main-content-text">
            <span className="main-content-text-key">
              Từ khóa:<a href="">Zoro</a>;<a href="">One Piece</a>;
              <a href="">Zoro tam long</a>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
