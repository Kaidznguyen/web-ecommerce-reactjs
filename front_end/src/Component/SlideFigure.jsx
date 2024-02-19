import React, { useState, useEffect } from "react";
import "../assets/user-page/main.css";
import "../assets/user-page/grid-system.css";
import "../assets/user-page/reponsive.css";
import "../assets/user-page/main.js"
import FigureAPI from "../Service/FigureAPI.js";
import imgAccessory from  '../assets/user-page/img/phụ kiện/bai_one_piece.png'

export default function SlideFigure() {
  const [figures, setFigures] = useState([]);

  useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await FigureAPI.getLatestFigures();
        setFigures(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchFigures();
  }, []);
  return (
    <div>
      <div className="index-product-title">
        <a href="product.html">Sản phẩm bán chạy</a>
      </div>
      <div className="index-product-link">
        <a href="product.html">Xem thêm...</a>
      </div>
      <div className="slider-product">
      {figures.map(figure => (
  <div className="slider-product-item" key={figure.id}>
    <a className="home-product-item" href="ctsp1.html">
      <img
        src={'http://localhost:8080/' + figure.img} 
        alt={figure.name}
        className="home-product-item__img"
      />
      <h4 className="home-product-item__name">
        {figure.name}
      </h4>
      <div className="home-product-item__price">
        <span className="home-product-item__price-old">$ {figure.price}</span>
        <span className="home-product-item__price-curent">
          $ {figure.promotionprice}
        </span>
      </div>
      {/* sold-out khi het hang */}
      <div className="home-product-item__favourite ">
        <span>Hot</span>
      </div>
      <div className="home-product-item__sale-off">
        <span className="home-product-item__sale-off-percent">5%</span>
        <span className="home-product-item__sale-off-label">GIẢM</span>
      </div>
    </a>
  </div>
))}

      </div>
    </div>
  );
}
