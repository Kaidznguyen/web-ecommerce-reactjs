import React from 'react'
import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import img1 from "../../assets/user-page/img/app/giao-hang-tiet-kiem.png";
import img2 from "../../assets/user-page/img/app/giaohangnhanh.png";
import img3 from "../../assets/user-page/img/app/vietnam-post.png";
import img4 from "../../assets/user-page/img/app/viettel-post.png";
export default function FooterUser() {
  return (
    <div>
    <footer className="footer">
    <div className="grid wide">
        <div className="row">
            <div className="col l-2-4 m-4 c-12 center">
                <h3 className="footer__heading">Liên hệ</h3>
                <ul className="footer-list">
                    <li className="footer-list-items">Số điện thoại:0355551111</li>
                    <li className="footer-list-items">Địa chỉ: Như Quỳnh - Văn Lâm - Hưng Yên</li>
                    <li className="footer-list-items">Giờ làm việc: 8h - 22h</li>
                    <li className="footer-list-items">Email: dat*****@gmail.com</li>
                </ul>
            </div>
            <div className="col l-2-4 m-4 c-12 center">
                <h3 className="footer__heading">Giới thiệu</h3>
                <span className="footer-label">Đây là cửa hàng demo bán mô hình của Dshop</span>
            </div>
            <div className="col l-2-4 m-4 c-12 center">
                <h3 className="footer__heading">Theo dõi chúng tôi trên</h3>
                <ul className="footer-list">
                    <li><a href="https://www.facebook.com/profile.php?id=100008489491989" className="footer-list-link"><i className="footer-icon fa-brands fa-facebook"></i> Facebook</a></li>
                    <li><a href="https://www.instagram.com/datnguyen10702/" className="footer-list-link"><i className="footer-icon fa-brands fa-instagram"></i> Instagram</a></li>
                    <li id="footer-list-item"><a href="https://discord.com/" className="footer-list-link"><i className="footer-icon fa-brands fa-discord"></i> Discord</a></li>
                </ul>
            </div>
            <div className="col l-2-4 m-4 c-12 center">
                <h3 className="footer__heading">Chăm sóc khách hàng</h3>
                <ul className="footer-list">
                    <li className="footer-list-items"><a href="ctsp2.html">Trung tâm trợ giúp khách hàng</a> </li>
                    <li className="footer-list-items"><a href="#">Hướng dẫn mua hàng</a> </li>
                    <li className="footer-list-items"><a href="#">Hỏi & Trả lời</a> </li>
                </ul>
            </div>
            <div className="col l-2-4 m-8 c-12 center">
                <h3 className="footer__heading">Giao hàng qua các đơn vị vận chuyển sau</h3>
                <div className="footer__transport">
                    <a href="#" className="footer__transport-link"><img src={img1} alt="Logo Giao Hàng Nhanh" className="footer__transport-img"/></a>
                    <a href="#" className="footer__transport-link"><img src={img2} alt="Logo Vietnam Post" className="footer__transport-img"/></a>
                    <a href="#" className="footer__transport-link"><img src={img3} alt="Logo Giao Hàng Tiết Kiệm" className="footer__transport-img"/></a>
                    <a href="#" className="footer__transport-link"><img src={img4} alt="Logo Viettel Post" className="footer__transport-img"/></a>
                </div>
            </div>
        </div>
    </div>
</footer>
<div className="footer__bottom">
    <div className="grid wide">
        <p className="footer__text">© - 2024 Bản quyển thuộc về Nguyễn Tiến Đạt <FontAwesomeIcon icon={faHeart}/> </p>
    </div>
</div>
<div className="backtop">

<FontAwesomeIcon
            icon={faChevronUp}
            className="backtop-icon"
          />
</div>
</div>

  )
}
