import React, { useState } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchPost({ onSearch, onSortChange }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value); // Gọi hàm tìm kiếm và truyền giá trị nhập vào
  };

  const handleSortChange = (sortType) => {
    onSortChange(sortType);
  };

  return (
    <div
      className="home-filter"
      style={{ margin: "20px 0" }}
    >
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
      <div className="select-input select_input_mobile" style={{ marginLeft: "150px" }}>
        <span className="select-input__label ">Sắp xếp</span>
        <FontAwesomeIcon icon={faAngleDown} />
        <ul className="select-input__list">
          <li className="select-input__items">
            <button
              className="select-input__link border_bottom button_arrange"
              onClick={() => handleSortChange("newest")}
            >
              Mới nhất
            </button>
          </li>
          <li className=" select-input__items">
            <button
              className="select-input__link button_arrange"
              onClick={() => handleSortChange("oldest")}
            >
              Cũ nhất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
