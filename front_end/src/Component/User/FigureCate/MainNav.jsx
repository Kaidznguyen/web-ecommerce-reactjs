import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowsUpDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import FigureCateAPI from "../../../Service/FigureCateAPI.js";
import BrandAPI from "../../../Service/BrandAPI.js";
export default function MainNav({ onSearch, onPriceRangeSelectChange, onSortChange}) {
  const [figurecates, setFigureCates] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState("");

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
  // sắp xếp theo giá tiền
  const handlePriceRangeSelect = (minPrice, maxPrice) => {
    onPriceRangeSelectChange(minPrice, maxPrice);
  };
  // sắp xếp theo thời gian
  const handleSortChange = (sortType) => {
    onSortChange(sortType);
  };

  // tìm kiếm

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value); // Gọi hàm tìm kiếm và truyền giá trị nhập vào
  };
  return (
    <div>
      <ul className="hd__sort-bar">
        <li className="hd__sort-item help">
          <a href="/" className="hd__sort-link">
            Liên quan
          </a>
        </li>
        <li className="hd__sort-item help">
          <a href="/" className="hd__sort-link hd__sort-link-active">
            Mới nhất
          </a>
        </li>
        <li className="hd__sort-item help">
          <a href="/" className="hd__sort-link">
            Bán chạy
          </a>
        </li>
        <li className="hd__sort-item help">
          <a href="/" className="hd__sort-link">
            Giá
            <FontAwesomeIcon icon={faArrowsUpDown} className="hd__sort-icon" />
          </a>
        </li>
      </ul>
      <div className="home-filter hide-on-mobile-table">
        <div className="search-admin search_custom">
          <label htmlFor="" id="">
            <input
              className="SearchInput"
              type="text"
              value={searchText}
              onChange={handleSearchInputChange}
              placeholder="Nhập từ khóa để tìm kiếm..."
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="SearchIcon" />
          </label>
        </div>
        <span className="home-filter_label">Sắp xếp theo</span>
        <button className="home-filter_btn btn" onClick={() => handleSortChange("newest")}>Mới nhất</button>
        <button className="home-filter_btn btn" onClick={() => handleSortChange("oldest")}>Cũ nhất</button>

        <div className="select-input">
          <span className="select-input__label">Giá </span>
          <FontAwesomeIcon icon={faAngleDown} />
          {/* <!-- list option --> */}
          <ul className="select-input__list">
            <li className="select-input__items">
              <button
                className="select-input__link border_bottom button_arrange"
                onClick={() => handlePriceRangeSelect(0, 100)}
              >
                0 - 100
              </button>
            </li>
            <li className="select-input__items">
              <button
                className="select-input__link border_bottom button_arrange"
                onClick={() => handlePriceRangeSelect(101, 1000)}
              >
                101 - 1000
              </button>
            </li>
            <li className="select-input__items">
              <button
                className="select-input__link border_bottom button_arrange"
                onClick={() => handlePriceRangeSelect(1001, 2000)}
              >
                1001 - 2000
              </button>
            </li>
            <li className="select-input__items">
              <button
                className="select-input__link border_bottom button_arrange"
                onClick={() => handlePriceRangeSelect(2001, 5000)}
              >
                2001 - 5000
              </button>
            </li>
            <li className="select-input__items">
              <button
                className="select-input__link button_arrange"
                onClick={() => handlePriceRangeSelect(5001, Infinity)}
              >
                5001 trở nên
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* thanh điều hướng xem sp theo loại trên mobile và tablet */}
      <nav className="mobile-category show-on-mobile-tablet">
        <ul className="mobile-category__list">
          <li className="mobile-category__item help">
            <Link
              to={"/Figure"}
              className="mobile-category__link"
              style={{ lineHeight: "4rem" }}
            >
              Tất cả mô hình
            </Link>
          </li>
          {Array.isArray(figurecates) &&
            figurecates.map((cate) => (
              <li className="mobile-category__item" key={cate.id_cate}>
                <Link
                  to={`/Figure-cate/${cate.id_cate}`}
                  className="mobile-category__link"
                  style={{ lineHeight: "4rem" }}
                >
                  {cate.name_cate}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      {/* thanh điều hướng xem sp theo thương hiệu trên mobile và tablet */}
      <nav className="mobile-category show-on-mobile-tablet">
        <ul className="mobile-category__list">
          {Array.isArray(brands) &&
            brands.map((brand) => (
              <li className="mobile-category__item help" key={brand.id_brand}>
                <Link
                  to={`/Figure-brand/${brand.id_brand}`}
                  className="mobile-category__link"
                  style={{ lineHeight: "4rem" }}
                >
                  {brand.name_brand}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
