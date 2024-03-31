import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import FigureAPI from "../../../Service/FigureAPI.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import numeral from "numeral";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
export default function RandomFigure() {
  const { id } = useParams();
  const [detail, setFigure] = useState({});
  const [figures, setFigures] = useState([]);

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

    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/detail-figure/${id}`); // Thay đổi "/detail-figure/123" bằng đường dẫn cụ thể
      window.scrollTo(0, 0);
    };
    useEffect(() => {
      async function fetchFigures() {
        try {
          const data = await FigureAPI.getRandom();
          setFigures(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchFigures();
    }, []);
    const settings = {
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 3,
      cssEase: "linear",
      speed: 1000,
  
      // prevArrow:<button type='button' className='slick-next pull-right product-arrow'><FontAwesomeIcon icon={faAngleLeft} /></button>,
      // nextArrow: <button type='button' className='slick-next pull-right product-arrow'><FontAwesomeIcon icon={faAngleRight} /></button>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
          },
        },
        {
          breakpoint: 720,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
  return (
    <div className="slider-product">
    <Slider {...settings}>
      {figures.map((figure) => (
        <div className="slider-product-item" key={figure.id}>
          <Link className="home-product-item" to={`/Detail-Figure/${figure.id}`} onClick={handleClick}>
            <img
              src={"http://localhost:8080/" + figure.img}
              alt={figure.name}
              className="home-product-item__img"
            />
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
              <span className="home-product-item__origin-name">Xuất sứ</span>
            </div>
            <div className="home-product-item__origin">
              <span className="home-product-item__brand">{figure.name_cate}</span>
              <span className="home-product-item__origin-name">{figure.name_brand}</span>
            </div>
            {/* sold-out khi het hang */}
            <div
              className={`home-product-item__favourite ${
                figure.quantity === 0 ? "sold-out" : ""
              }`}
            >
              <span>{figure.quantity === 0 ? "Hết hàng" : "Hot"}</span>
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
    </Slider>
  </div>
  )
}
