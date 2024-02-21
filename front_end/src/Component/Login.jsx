import React from 'react'
import '../assets/user-page/main.css'
import '../assets/user-page/grid-system.css' 
import '../assets/user-page/reponsive.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle }from '@fortawesome/free-brands-svg-icons';
import "../assets/user-page/main.js";
export default function Login() {
  return (
    <div class="modal-login">
            {/* <!-- tạo lớp phủ màu đen bằng modal__overplay --> */}
            <div class="modal__overplay"></div>
            <div class="modal__body">
            {/* <!-- authen form đnhap --> */}
                {/* <!-- authen form --> */}
                <div class="auth-form"> 
                    <div class="auth-form__container">
                        {/* <!-- title authen form --> */}
                         <div class="auth-form__hd"> 
                            <h3 class="auth-form__heading">Đăng nhập</h3>
                            <span class="auth-form__switch-btn" id="switch-dk">Đăng ký</span>
                        </div>
                        {/* <!-- input authen form --> */}
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <input type="text" class="auth-form__input" placeholder="Nhập Email của bạn"/>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input" placeholder="Nhập mật khẩu của bạn"/>
                            </div>
                        </div>
                        {/* <!-- thêm 1 phần bất kì vào form --> */}
                        <div class="auth-form__aside">
                            <div class="auth-form__help">
                                <a href="" class="auth-form__help-link auth-form__help-link-forgot">Quên mật khẩu</a>
                                <span class="auth-form__help-separate"></span>
                                <a href="" class="auth-form__help-link">Trợ giúp ?</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- tạo btt cho authen form --> */}
                     <div class="auth-form__control">
                        <button class="btn auth-form__control-back btn--normal back-btn">TRỞ LẠI</button>
                        <button class="btn btn--primary btn-login">ĐĂNG NHẬP</button>
                    </div>
                    <div class="auth-form__socials">
                        <a href="" class="btn btn--with-icon btn-size-s auth-form__socials-fb">
                        <FontAwesomeIcon icon={faFacebook} />
                            <span class="auth-form__socials-title help">Đăng nhập với Facebook</span>
                        </a>
                        <a href="" class="btn btn--with-icon btn-size-s auth-form__socials-gg">                            
                        <FontAwesomeIcon icon={faGoogle} />
                            <span class="auth-form__socials-title help">Đăng nhập với Google</span>
                        </a>
                    </div>
                </div> 
            </div> 
        </div>
  )
}
