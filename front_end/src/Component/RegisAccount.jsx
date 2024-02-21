import React from 'react'
import '../assets/user-page/main.css'
import '../assets/user-page/grid-system.css' 
import '../assets/user-page/reponsive.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle }from '@fortawesome/free-brands-svg-icons';
import "../assets/user-page/main.js";
export default function RegisAccount() {
  return (
    <div>
      <div class="modal-register">
            {/* <!-- tạo lớp phủ màu đen bằng modal__overplay --> */}
            <div class="modal__overplay"></div>
            <div class="modal__body">
            {/* <!-- authen form đky -->  */}
                <div class="auth-form ">
                    <div class="auth-form__container">
                        {/* <!-- title authen form --> */}
                        <div class="auth-form__hd">
                            <h3 class="auth-form__heading">Đăng ký</h3>
                            <span class="auth-form__switch-btn" id="switch-dn">Đăng nhập</span>
                        </div>
                        {/* <!-- input authen form --> */}
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <input type="text" class="auth-form__input" placeholder="Nhập họ tên của bạn"/>
                            </div>
                            <div class="auth-form__group">
                                <input type="tel" class="auth-form__input" maxlength="10" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" placeholder="Nhập số điện thoại của bạn"/>
                            </div>
                            <div class="auth-form__group">
                                <input type="text" class="auth-form__input" placeholder="Nhập Email của bạn"/>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input" placeholder="Nhập mật khẩu của bạn"/>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input" placeholder="Xác nhận mật khẩu"/>
                            </div>
                        </div>
                        {/* <!-- thêm 1 phần bất kì vào form --> */}
                        <div class="auth-form__aside">
                            <p class="auth-form__policy-text">
                                Bằng việc đăng ký, bạn đã đồng ý với tất cả các điều khoản của Dshop  
                                <a href="" class="auth-form__text-link"> Điều khoản dịch vụ </a> &  
                                <a href="" class="auth-form__text-link"> Chính sách bảo mật</a>
                            </p>
                        </div>
                    </div>
                    {/* <!-- tạo btt cho authen form --> */}
                    <div class="auth-form__control">
                        <button class="btn auth-form__control-back btn--normal back-btn">TRỞ LẠI</button>
                        <button class="btn btn--primary">ĐĂNG KÝ</button>
                    </div>
                    <div class="auth-form__socials">
                        <a href="" class="btn btn--with-icon btn-size-s auth-form__socials-fb">
                        <FontAwesomeIcon icon={faFacebook} />
                            <span class="auth-form__socials-title help">Kết nối với Facebook</span>
                        </a>
                        <a href="" class="btn btn--with-icon btn-size-s auth-form__socials-gg">                            
                        <FontAwesomeIcon icon={faGoogle} />
                            <span class="auth-form__socials-title help">Kết nối với Google</span>
                        </a>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}
