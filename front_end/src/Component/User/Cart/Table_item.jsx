import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import FigureAPI from "../../../Service/FigureAPI.js";
import numeral from "numeral";
import img1 from "../../../assets/user-page/img/slide & QC/feedback1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export default function Table_item() {
  return (
    <div id="cart-product">
      <table cellspacing="0" cellpadding="0">
        <tr>
          <th className="cart-product_title">Ảnh</th>
          <th className="cart-product_title">Phân loại</th>
          <th className="cart-product_title">Tên sản phẩm</th>
          <th className="cart-product_title">Đơn giá</th>
          <th className="cart-product_title">Số lượng</th>
          <th className="cart-product_title">Thành tiền</th>
          <th className="cart-product_title">Xóa</th>
        </tr>

        <tr>
          <td>
            <img src={img1} alt="Product Image" className="cart-product_img" />
          </td>
          <td>
            <a href="#">MÔ HÌNH</a>
          </td>
          <td>
            <Link to={`/Detail-Figure/4`}>MÔ HÌNH CÁC HÌNH THÁI CỦA FRIEZA</Link>
          </td>
          <td>100,000 VNĐ</td>
          <td>
            <input type="button" className="cart-product_min" value="-"/>
            <input type="text" className="cart-product_number" value="1" />
            <input type="button" className="cart-product_max" value="+" />
          </td>
          <td>100,000 VNĐ</td>
          <td>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="cart-product_delete_icon"
            />
          </td>
        </tr>
      </table>
      <button className="btn btn--primary" style={{marginTop:"35px"}}><Link to={"/"} style={{textDecoration:"none",color:"var(--white-color)"}}>Tiếp tục mua sắm</Link></button> 
      <button className="btn btn--primary" style={{marginTop:"35px",marginLeft:"20px"}}>Xóa toàn bộ giỏ hàng</button>
    </div>
  );
}
