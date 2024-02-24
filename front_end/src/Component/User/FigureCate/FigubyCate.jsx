import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import numeral from "numeral";
import FigureCateAPI from "../../../Service/FigureCateAPI.js";
import MainNav from "./MainNav.jsx";

export default function FigubyCate() {
    const { cateId } = useParams();
    const [figures, setFigures] = useState([]);
    // lấy sp theo cateID
    useEffect(() => {
        async function fetchFigus() {
          try {
            const data = await FigureCateAPI.getByCategoryId(cateId);
            setFigures(data); // Lấy data từ response
          } catch (error) {
            console.error("Error fetching post categories: ", error);
          }
        }
    
        fetchFigus();
      }, [cateId]);

    return (
        <div className="col l-10 m-12 c-12">
          <MainNav />
          {/* <!-- sản phẩm --> */}
          <div className="home-product">
            <div className="row sm-gutter">
              {Array.isArray(figures) &&
                figures.map((figure) => (
                  <div className="col l-3 m-4 c-6" key={figure.id}>
                    <Link
                      className="home-product-item"
                      to={`/Detail-Figure/${figure.id}`}
                    >
                      <div>
                        <img
                          src={"http://localhost:8080/" + figure.img}
                          alt={figure.name}
                          className="home-product-item__img"
                        />
                      </div>
                      <h4 className="home-product-item__name">{figure.name}</h4>
                      <div className="home-product-item__price">
                        <span
                          className={
                            figure.promotionprice === 0
                              ? "home-product-item__price-curent"
                              : "home-product-item__price-old"
                          }
                        >
                          {numeral(figure.price).format("$0,0")}
                        </span>
                        <span
                          className={
                            figure.promotionprice === 0
                              ? "hidden"
                              : "home-product-item__price-curent"
                          }
                        >
                          {numeral(figure.promotionprice).format("$0,0")}
                        </span>
                      </div>
                      <div className="home-product-item__origin">
                        <span className="home-product-item__brand">Phân loại</span>
                        <span className="home-product-item__origin-name">
                          Xuất sứ
                        </span>
                      </div>
                      <div className="home-product-item__origin">
                        <span
                          className="home-product-item__brand"
                          style={{ fontSize: "1.2rem" }}
                        >
                          {figure.name_cate}
                        </span>
                        <span
                          className="home-product-item__origin-name"
                          style={{ fontSize: "1.2rem" }}
                        >
                          {figure.name_brand}
                        </span>
                      </div>
                      <div
                        className={`home-product-item__favourite ${
                          figure.quantity === 0 ? "sold-out" : ""
                        }`}
                      >
                        <span>
                          {figure.quantity === 0 ? "Hết hàng" : "Yêu thích"}
                        </span>
                      </div>
                      <div
                        className={`home-product-item__sale-off ${
                          figure.promotionprice === 0 ? "hidden" : ""
                        }`}
                      >
                        {figure.price !== 0 && figure.promotionprice !== 0 && (
                          <span className="home-product-item__sale-off-percent">
                            -{" "}
                            {(
                              ((figure.price - figure.promotionprice) /
                                figure.price) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        )}
                        {/* <span className="home-product-item__sale-off-label">GIẢM</span> */}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <ul className="pagination home-product__pagination">
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                <i className="pagination-item__icon fa-solid fa-angle-left"></i>
              </a>
            </li>
            <li className="pagination-item pagination-item__active">
              <a href="/" className="pagination-item__link">
                1
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                2
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                3
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                4
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                5
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                ...
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                10
              </a>
            </li>
            <li className="pagination-item">
              <a href="/" className="pagination-item__link">
                <i className="pagination-item__icon fa-solid fa-angle-right"></i>
              </a>
            </li>
          </ul>
        </div>
      );
}
