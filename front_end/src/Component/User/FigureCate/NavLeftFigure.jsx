import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faListUl,faCaretRight} from '@fortawesome/free-solid-svg-icons'
import FigureCateAPI from "../../../Service/FigureCateAPI.js";
import BrandAPI from "../../../Service/BrandAPI.js"

export default function NavLeftFigure() {
  const [figurecates, setFigureCates] = useState([]);
  const [brands, setBrands] = useState([]);
  // lấy tất cả loại
  useEffect(() => {
    async function fetchFigureCates() {
      try {
        const data = await FigureCateAPI.getAll(); // Sửa thành getAll
        setFigureCates(data.data); // Lấy data từ response
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchFigureCates();
  }, []);
  // lấy tất thương hiệu
  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await BrandAPI.getAll(); // Sửa thành getAll
        setBrands(data.data); // Lấy data từ response
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchBrands();
  }, []);
  return (
    <div className="col l-2 m-0 c-0">
      <nav className="category">
        <h3 className="category__heading">
          <FontAwesomeIcon icon={faListUl} className="category__heading-icon"/>
          Danh mục loại mô hình
        </h3>
        <ul className="category-list">
          <li className="category-items">
            <Link to={'/Figure'} className="category-items__active">
              <FontAwesomeIcon icon={faCaretRight} className="category__items-icon"/>
              Xem tất cả mô hình
            </Link>
            
          </li>
          {Array.isArray(figurecates) &&
                figurecates.map((cate) => (
          <li className="category-items" key={cate.id_cate}>
              
                <Link to={`/Figure-cate/${cate.id_cate}`} className="category-items__link">
                  {cate.name_cate}
                </Link>
                
          </li>
          ))}
        </ul>
      </nav>
      <nav className="category">
        <h3 className="category__heading">
          <FontAwesomeIcon icon={faListUl} className="category__heading-icon"/>
          Danh mục thương hiệu mô hình
        </h3>
        <ul className="category-list">
          {Array.isArray(brands) &&
                brands.map((brand) => (
          <li className="category-items" key={brand.id_brand}>
              
                <Link to={`/Figure-brand/${brand.id_brand}`} className="category-items__link">
                  {brand.name_brand}
                </Link>
               
          </li> 
          ))}
        </ul>
      </nav>
    </div>
  );
}
