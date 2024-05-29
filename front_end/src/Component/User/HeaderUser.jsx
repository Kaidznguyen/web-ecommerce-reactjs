import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCircleQuestion,
  faListUl,
  faXmark,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import logo from "../../assets/user-page/img/app/logo.png";
import sp1 from "../../assets/user-page/img/mô hình/luffy.png";
import sp2 from "../../assets/user-page/img/mô hình/batman.png";
import sp3 from "../../assets/user-page/img/mô hình/naruto.png";
import avarta from "../../assets/user-page/img/noavatar.png";
import { Link } from "react-router-dom";
import Login from "./Login";
import RegisAccount from "./RegisAccount";
import { jwtDecode } from "jwt-decode";
import Manege_acc from "./Manege_acc";
export default function HeaderUser() {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisVisible, setRegisVisible] = useState(false);
  const [isManegeVisible, setManegeVisible] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Lấy token từ localStorage hoặc sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decoded = jwtDecode(token);
        // Cập nhật state với thông tin người dùng
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Xóa token không hợp lệ nếu giải mã thất bại
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    } else {
      console.log("Không tìm thấy token trong localStorage hoặc sessionStorage.");
    }
  }, []);

  const handleRegisClick = () => {
    setRegisVisible(true);
  };
  const handleLoginClick = () => {
    setLoginVisible(true);
  };
  const handleManegeClick = () => {
    setManegeVisible(true);
  };
  const handleCancel = () => {
    setLoginVisible(false);
    setRegisVisible(false);
    setManegeVisible(false);

  };
  return (
    <header className="header">
      <div className="grid wide">
        {/* navbar  */}
        <nav className="hd__navbar hide-on-mobile-table">
          <ul className="hd__navbar-list">
            <li
              className="hd__navbar-item separate hidden-qr"
              style={{ cursor: "pointer" }}
            >
              Mô hình Anime - Manga - Movie
            </li>
            <li className="hd__navbar-item">
              Kết nối
              <a href="https://facebook.com" className="hd__navbar-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com" className="hd__navbar-icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
          <ul className="hd__navbar-list">
            <li className="hd__navbar-item notify">
              <a href="#" className="hd__navbar-link">
                <FontAwesomeIcon icon={faBell} />
                Thông báo
              </a>
              {/* tạo phần thông báo ẩn đi */}
              <div className="hd__notify">
                <header className="hd__notify-title">
                  <h3>Thông báo mới nhận</h3>
                </header>
                <ul className="hd__notify-list">
                  <li className="hd__notify-item">
                    <a href="#" className="hd__notify-link viewed">
                      <img src={sp1} alt="" className="hd__notify-img" />
                      <div className="hd__notify-info">
                        <span className="hd__notify-name">
                          Mô hình Lufffy chính hãng
                        </span>
                        <span className="hd__notify-descriotion">
                          Mô hình Luffy cao 40cm của hãng Konami
                        </span>
                      </div>
                    </a>
                  </li>
                  <li className="hd__notify-item">
                    <a href="#" className="hd__notify-link">
                      <img src={sp2} alt="" className="hd__notify-img" />
                      <div className="hd__notify-info">
                        <span className="hd__notify-name">
                          Mô hình Batman chính hãng
                        </span>
                        <span className="hd__notify-descriotion">
                          Mô hình Batman cao 180cm của nhà DC
                        </span>
                      </div>
                    </a>
                  </li>
                  <li className="hd__notify-item">
                    <a href="#" className="hd__notify-link viewed">
                      <img src={sp3} alt="" className="hd__notify-img" />
                      <div className="hd__notify-info">
                        <span className="hd__notify-name">Mô hình Naruto</span>
                        <span className="hd__notify-descriotion">
                          Mô hình Naruto cao 120cm của hãng Konami
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
                <footer className=" hd__notify-footer">
                  <a href="" className="hd__notify-footer-btn">
                    Xem tất cả
                  </a>
                </footer>
              </div>
            </li>
            <li className="hd__navbar-item">
              <a href="" className="hd__navbar-link help">
                <FontAwesomeIcon icon={faCircleQuestion} />
                Trợ giúp
              </a>
            </li>
            {user ? (
              <li className="hd__navbar-item hd__navbar-user">
                <img src={avarta} alt="" className="hd__navbar-user-img" />
                <span className="hd__navbar-user-name">{user.username}</span>
                <ul className="hd__navbar-user-menu">
                  {user.role === "admin" ? (
                    <li className="hd__navbar-user-item">
                      <Link to="/system/dashboard">Quản lý cửa hàng</Link>
                    </li>
                  ) : (
                    <li className="hd__navbar-user-item">
                      <button className="btt_manage" onClick={handleManegeClick}>Quản lý tài khoản</button>
                    </li>
                  )}
                  <li className="hd__navbar-user-item hd__navbar-user-item-separate">
                    <a
                      href="#"
                      onClick={() => {
                        localStorage.removeItem("token");
                        sessionStorage.removeItem("token");
                        setUser(null);
                      }}
                    >
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="hd__navbar-item bold separate opacity">
                  <button
                    className="hd__navbar-link login"
                    onClick={handleLoginClick}
                  >
                    Đăng nhập
                  </button>
                </li>
                <li className="hd__navbar-item bold opacity">
                  <button
                    className="hd__navbar-link register"
                    onClick={handleRegisClick}
                  >
                    Đăng ký
                  </button>
                </li>
              </>
            )}

            <Login
              isModalVisible={isLoginVisible}
              handleCancel={handleCancel}
            />
            <RegisAccount
              isModalVisible={isRegisVisible}
              handleCancel={handleCancel}
            />
            <Manege_acc isModalVisible={isManegeVisible}
              handleCancel={handleCancel}/>
          </ul>
        </nav>
        {/* searrch */}
        <div className="hd-with-search">
          <input
            type="checkbox"
            hidden
            id="mobile-menu-checkbox"
            className="nav__input"
          />
          <label
            htmlFor="mobile-menu-checkbox"
            className="hd__mobile-menu show-on-mobile"
          >
            <FontAwesomeIcon icon={faListUl} />
          </label>
          <label
            htmlFor="mobile-menu-checkbox"
            className="nav--overplay"
          ></label>
          <nav className="nav__mobile">
            <label
              htmlFor="mobile-menu-checkbox"
              className="nav__mobile-btn-close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </label>
            <ul className="nav__mobile-list">
              <li>
                <Link to={"/"} className="nav__mobile-link">
                  Trang chủ
                </Link>
              </li>
              <li>
                <a
                  href=""
                  className="nav__mobile-link login"
                  onClick={handleLoginClick}
                >
                  Đăng nhập
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="nav__mobile-link register"
                  onClick={handleRegisClick}
                >
                  Đăng ký
                </a>
              </li>
              <li>
                <a href="" className="nav__mobile-link help">
                  Trợ giúp
                </a>
              </li>
              <li>
                <a href="product.html" className="nav__mobile-link">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="blog.html" className="nav__mobile-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="" className="nav__mobile-link help">
                  Chính sách
                </a>
              </li>
            </ul>
          </nav>
          <div className="hd__logo hide-on-mobile">
            <Link to="/" className="hd__logo-link">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>
          <input
            type="checkbox"
            hidden
            id="mobile-search-checkbox"
            className="hd__search-checkbox"
          />
          {/* search history  */}
          <div className="hd__search">
            <div className="hd__seach-input-warp">
              <input
                type="text"
                className="hd__seach-input"
                placeholder="Nhập vào từ khóa để bắt đầu tìm kiếm sản phẩm........."
              />
            </div>
            <button className="hd__search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="hd__cart">
            <Link to={"/Cart"} className="hd__cart-wrap">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: "white", fontSize: "30px" }}
              />
              {/* <span className="hd__cart-notice">{cartLength}</span> */}
              {/* className khi ko có sản phẩm: hd__cart-list-no-cart 
                    className khi có sản phẩm: hd__cart-list-have-cart */}
              {/* <div className="hd__cart-list hd__cart-list-no-cart">
                                <img src={nocart} alt="" className="hd__cart-no-cart-img" />
                                <span className="hd__cart-list-no-cart-msg">Hãy mua gì đó để giỏ hàng không tro</span>
                            </div> */}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
