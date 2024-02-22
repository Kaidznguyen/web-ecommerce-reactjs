import React from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
export default function RegistEremail() {
  return (
    <div>
      <div className="register-email">
        <div
          className="register-email-container"
          style={{
            backgroundImage:
              "url(http://theme.hstatic.net/200000112489/1000589682/14/bg-newsletter.jpg?v=204)",
          }}
        >
          <div className="register-email-header">
            <div className="register-email-title">
              <h1>đăng ký</h1>
            </div>
            <div className="register-email-subtit">
              <span>
                Đăng ký nhận bản tin của Figure Store để cập nhật những sản phẩm
                mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.
              </span>
            </div>
            <div className="register-email-text">
              <input
                type="email"
                className="register-email-form"
                placeholder="Nhập vào email của bạn...."
              />
              <button className="register-email-btn">
                <span>gửi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
