import React, { useEffect } from "react";
import "../assets/user-page/main.css";
import "../assets/user-page/grid-system.css";
import "../assets/user-page/reponsive.css";
import "../assets/user-page/main.js";
import img1 from "../assets/user-page/img/ctsp1/zoro-tam-long2.png";
import img2 from "../assets/user-page/img/ctsp1/zoro-tam-long3.png";
import img3 from "../assets/user-page/img/ctsp1/zoro-tam-long4.png";
import img4 from "../assets/user-page/img/ctsp1/zoro-tam-long5.png";
import img5 from "../assets/user-page/img/ctsp1/zoro-tam-long6.png";
import img6 from "../assets/user-page/img/mô hình/zoro_tamlong.png";
import $ from "jquery";
export default function DetailFigure() {
    useEffect(() => {
        $('.list-img-item img').click(function() {
          var imgSrc = $(this).attr("src");
          $(".main-img img").attr("src", imgSrc);
        });
      }, []);
  return (
    <div class="row sm-gutter">
      <div className="col l-1 c-12 m-2">
        <div className="list-img">
          <div className="list-img-item">
            <img src={img1} alt="" className="img1" />
          </div>
          <div className="list-img-item">
            <img src={img2} alt="" className="img2" />
          </div>
          <div className="list-img-item">
            <img src={img3} alt="" className="img3" />
          </div>
          <div className="list-img-item">
            <img src={img4} alt="" className="img4" />
          </div>
          <div className="list-img-item">
            <img src={img5} alt="" className="img5" />
          </div>
        </div>
      </div>
      <div className="col l-6 c-12 m-10">
        <div className="main-img">
          <img src={img6} alt="" />
        </div>
      </div>
      <div class="col l-5 c-12 m-12">
        <div class="main-content-img">
          <div class="main-content-title">
            <span>
              <a href="/"> trang chủ </a> /{" "}
              <a href="product.html">Danh sách mô hình</a>
            </span>
            <h1>MÔ HÌNH ZORO ONE PIECE TAM LONG</h1>
          </div>
          <div class="main-content-price">
            <span>2.500.000đ</span>
          </div>
          <div class="main-content-subtit">
            <ul class="main-content-list">
              <li class="main-content-item">
                <i class="main-content-icon fa-solid fa-check"></i> Hàng mới
                100% fullbox
              </li>
              <li class="main-content-item">
                <i class="main-content-icon fa-solid fa-check"></i> Đổi trả
                trong 3 ngày
              </li>
              <li class="main-content-item">
                <i class="main-content-icon fa-solid fa-check"></i> Check lỗi kĩ
                càng trước khi gửi
              </li>
              <li class="main-content-item">
                <i class="main-content-icon fa-solid fa-check"></i> Hình ảnh
                thật được chụp trực tiếp 100% tại shop
              </li>
              <li class="main-content-item">
                <i class="main-content-icon fa-solid fa-check"></i> Nhiều ưu đãi
                với các gói hỗ trợ freeship
              </li>
            </ul>
          </div>
          <div class="main-content-btn">
            <button class="btn-main1">Thêm vào giỏ hàng</button>
            <button class="btn-main2">Mua ngay</button>
          </div>
          <div class="main-content-text">
            <span class="main-content-text-subtit">Hết hàng</span>
          </div>
          <div class="main-content-text">
            <span class="main-content-text-list">
              Danh mục:<a href="product.html">Mô hình</a>;
              <a href="">Mô hình One Piece</a>
            </span>
          </div>
          <div class="main-content-text">
            <span class="main-content-text-key">
              Từ khóa:<a href="">Zoro</a>;<a href="">One Piece</a>;
              <a href="">Zoro tam long</a>
            </span>
          </div>
        </div>
      </div>
    </div>
    
  );
}
