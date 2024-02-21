import React from "react";
import "../assets/user-page/main.css";
import "../assets/user-page/grid-system.css";
import "../assets/user-page/reponsive.css";
import "../assets/user-page/main.js";
import img1 from "../assets/user-page/img/ctsp1/zoro-tam-long2.png";
import img2 from "../assets/user-page/img/ctsp1/zoro-tam-long3.png";
import img3 from "../assets/user-page/img/ctsp1/zoro-tam-long4.png";
import img4 from "../assets/user-page/img/ctsp1/zoro-tam-long5.png";
import img5 from "../assets/user-page/img/ctsp1/zoro-tam-long6.png";
import img6 from "../assets/user-page/img/mô hình/zoro_tamlong.png";
export default function TabContent() {
  return (
    <div className="tabs">
      <ul className="nav-tabs">
        <li className="tabs-item active">
          <a href="#tab1">Mô tả sản phẩm</a>
        </li>
        <li className="tabs-item">
          <a href="#tab2">Hướng dẫn mua hàng</a>
        </li>
        <li className="tabs-item">
          <a href="#tab3">Đánh giá</a>
        </li>
      </ul>
      <div className="tabs-content">
        <div className="tabs-content-item" id="tab1">
          <span className="title-tab">
            Xin chào bạn, bạn đang tìm kiếm cho mình mô hình Zoro tam long. Một
            mô hình chuẩn anime, giá cả hợp lý, kích thước đúng tỉ lệ và giúp
            hoàn thiện bộ sưu tập của bạn? Hãy tham khảo mô hình figure sau đây
            tại DShop nhé.
          </span>
          <h2 className="tabs-content-title-main">
            MÔ HÌNH ZORO ONE PIECE TAM LONG
          </h2>
          <div className="tabs-content-summary">
            <h2 className="tabs-content-title">Tóm lược nhân vật</h2>
            <div className="tabs-content_subtit">
              <p>
                Mô hình Zoro tam long được mô phỏng theo trang phục Zoro trong
                phim “One Piece - Arc Đảo người cá” do tác giả Oda vẽ. Mô hình
                được làm theo nguyên mẫu trong anime khi Zoro đánh nhau với một
                trong các thuộc hạ của Hody Jones.
              </p>
              <img src={img6} alt="" />
              <span className="tabs-content-detail-subtit">
                Mô hình Zoro tam long
              </span>
            </div>
            <div className="tabs-content-detail">
              <h2 className="tabs-content-title">Thông tin sản phẩm</h2>
              <ul className="tabs__list">
                <li className="tabs__list-item">
                  Tên sản phẩm: Zoro One Piece tam long
                </li>
                <li className="tabs__list-item">Phân loại: Figure One Piece</li>
                <li className="tabs__list-item">Nặng: 8,5 kg</li>
                <li className="tabs__list-item">Size: 52 x 53 x 50 cm</li>
                <li className="tabs__list-item">Chất liệu: PVC</li>
                <li className="tabs__list-item">Sản xuất: China</li>
                <li className="tabs__list-item">Đóng hộp: Fullbox</li>
                <li className="tabs__list-item">Phụ kiện: Đầy đủ như hình Mô Tả</li>
              </ul>
              <h2 className="tabs-content-title">Một số hình ảnh thực tế</h2>
              <img src={img1} alt="" />
              <span className="tabs-content-detail-subtit">
                Góc nghiêng của mô hình
              </span>
              <img src={img2} alt="" />
              <span className="tabs-content-detail-subtit">Cận mặt con rồng 1</span>
              <img src={img3} alt="" />
              <span className="tabs-content-detail-subtit">Cận mặt con rồng 2</span>
              <img src={img4} alt="" />
              <span className="tabs-content-detail-subtit">Cận mặt con rồng 3</span>
              <img src={img5} alt="" />
              <span className="tabs-content-detail-subtit">Cận mặt Zoro</span>
              <span>
                Tất cả ảnh có DShop đều được chụp trực tiếp tại shop để đảm bảo
                độ chân thật màu sắc sơn và cho góc nhìn khách quan nhất về sản
                phẩm.
              </span>
            </div>
          </div>
          <div className="tabs-content-video">
            <h2 className="tabs-content-title">video review</h2>
            <div className="video-review">
              <iframe
                width="70%"
                height="450px"
                src="https://www.youtube.com/embed/5S__BRt9mdg"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="tabs-content-review">
            <h2 className="tabs-content-title">đánh giá tổng quan</h2>
            <span>Ưu điểm</span>
            <ul className="tabs__list">
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Chi tiết tốt,
                rõ ràng ít lem
              </li>
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Chất lượng
                nhựa tốt
              </li>
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Màu sơn đẹp
              </li>
            </ul>
            <span>Nhược điểm</span>
            <ul className="tabs__list">
              <li className="tabs__list-item">
                <i className="tabs-content-review-icon fa-solid fa-circle-xmark"></i>
                Head phụ khi thay sẽ rất chặt và khó tháo sau khi đã lắp, lưu ý
                xem xét kĩ trước khi thay head phụ này.
              </li>
            </ul>
          </div>
        </div>
        <div className="tabs-content-item" id="tab2">
          <h2 className="tabs-content-title">thời gian đặt hàng nhanh</h2>
          <div className="tabs-content_subtit">
            <p>
              DShop luôn là đơn vị đi đầu khi bán ra thị trường những mẫu mô
              hình figure action mới sớm nhất, để các bạn có thể trải nghiệm sản
              phẩm hot trong thời gian ngắn. Ship rất nhanh, 1 ngày nếu bạn ở Hà
              Nội và từ 2-3 ngày nếu bạn ở Hồ Chí Minh, những sản phẩm order
              cũng chỉ mất 7-10 hôm để về tới tay bạn.
            </p>
          </div>
          <h2 className="tabs-content-title">lựa chọn dshop</h2>
          <div className="tabs-content-list">
            <span>
              Tất cả các sản phẩm tại shop sẽ được đảm bảo những yếu tố sau:
            </span>
            <ul className="tabs__list">
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Đủ size kích
                cơ tỉ lệ chuẩn, màu sắc
              </li>
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Check lỗi với
                các sản phẩm bootleg để tránh những lỗi nặng
              </li>
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Hình ảnh trên
                website đều là ảnh thật được chụp trực tiếp tại shop
              </li>
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Thông tin
                mình bạch công khai về phân khúc, phân loại (chính hãng,
                bootleg, 2nd…)
              </li>
              <li className="tabs__list-item">
                <i className="main-content-icon fa-solid fa-check"></i>Giao dịch uy
                tín với đầy đủ phương thức (có gian hàng tại Shopee)
              </li>
            </ul>
          </div>
          <h2 className="tabs-content-title">cách đặt hàng</h2>
          <div className="tabs-content-list">
            <span>
              Đặt hàng qua website Dshop.vn, page{" "}
              <a
                href="https://www.facebook.com/"
                className="tabs-content-list-link"
              >
                Facebook
              </a>{" "}
              hoặc{" "}
              <a href="https://shopee.vn/" className="tabs-content-list-link">
                Shopee
              </a>{" "}
              của shop để được freeship (tối đa 40k) nhé ^^
            </span>
            <span className="tabs_content-list-sub">
              Lưu ý: (Đọc thêm{" "}
              <a href="" className="tabs-content-list-link">
                "Kiến thức cơ bản về figure"
              </a>{" "}
              trước khi sưu tầm):
            </span>
            <ul className="tabs__list">
              <li className="tabs__list-item">
                <i className="tabs-list_icon fa-regular fa-circle-check"></i>Thay
                phụ kiện Cẩn Thận.
              </li>
              <li className="tabs__list-item">
                <i className="tabs-list_icon fa-regular fa-circle-check"></i>Với các
                khớp bị cứng/chặt, ngâm nước nóng hoặc dùng máy sấy sấy qua khớp
                trước khi thay. Không cố bẻ khớp vì như vậy có thể làm gẫy sản
                phẩm.
              </li>
              <li className="tabs__list-item">
                <i className="tabs-list_icon fa-regular fa-circle-check"></i>Với các
                khớp bị lỏng, tháo khớp ra, bôi một lớp sơn móng tay vào đầu
                khớp, chờ khô rồi lắp lại (xem thêm video hướng dẫn tại đây)
              </li>
              <li className="tabs__list-item">
                <i className="tabs-list_icon fa-regular fa-circle-check"></i>Xoay
                đúng chiều của khớp, nếu xoay sai sẽ làm gẫy khớp.
              </li>
              <li className="tabs__list-item">
                <i className="tabs-list_icon fa-regular fa-circle-check"></i>Với các
                trường hợp sản phẩm bị hỏng, gẫy do không làm theo hướng dẫn,
                Hunters sẽ không chịu trách nhiệm.
              </li>
            </ul>
          </div>
        </div>
        <div className="tabs-content-item" id="tab3">
          <h2 className="tabs-content-title">đánh giá</h2>
          <span className="title-tab">Chưa có đánh giá</span>
          <div className="tabs-content-form">
            <input
              type="text"
              placeholder="Hãy nhập vào đây...."
              className="tabs-content-form-index"
            />
            <button className="btn btn--primary help">Đăng bình luận</button>
          </div>
        </div>
      </div>
    </div>
  );
}
