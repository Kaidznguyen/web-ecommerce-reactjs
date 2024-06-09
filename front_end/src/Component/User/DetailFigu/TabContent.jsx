import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import avartar from "../../../assets/user-page/img/noavatar.png";
import moment from "moment";
import FigureAPI from "../../../Service/FigureAPI.js";
import { Tabs } from "antd";
import CommentFigure from "./CommentFigure.jsx";
import CommentAPI from "../../../Service/CommentAPI.js";
const { TabPane } = Tabs;


export default function TabContent() {
  const { id } = useParams();
  const [detail, setFigure] = useState({});
  const [comment, setComment] = useState([]);

  // lấy dữ liệu mô hình
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
  // lấy dữ liệu comment
  useEffect(() => {
    // Gọi service getById với id từ params
    CommentAPI.getcommentbyFiguID(id)
      .then((data) => {
        // Lưu dữ liệu của figure vào state
        setComment(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" className="nav-tabs">
        <TabPane tab="Mô tả sản phẩm" key="1" className="tabs-item">
          <div className="tabs-content">
            <span className="title-tab">
              Xin chào bạn, bạn đang tìm kiếm cho mình mô hình {detail.name}.
              Một mô hình chuẩn anime, giá cả hợp lý, kích thước đúng tỉ lệ và
              giúp hoàn thiện bộ sưu tập của bạn? Hãy tham khảo mô hình figure
              sau đây tại DShop nhé.
            </span>
            <h2 className="tabs-content-title-main">MÔ HÌNH {detail.name}</h2>
            <div className="tabs-content-summary">
              <h2 className="tabs-content-title">Tóm lược nhân vật</h2>
              <div className="tabs-content_subtit">
                <p>
                  Mô hình {detail.name} được mô phỏng theo nhân vật trong phim “
                  {detail.name_cate}” do hãng {detail.name_brand} cung cấp. Mô
                  hình được làm theo hoàn toàn nguyên mẫu.
                </p>
                <img src={"http://localhost:8080/" + detail.img} alt="" />
                <span className="tabs-content-detail-subtit">
                  Mô hình {detail.name}
                </span>
              </div>
              <div className="tabs-content-detail">
                <h2 className="tabs-content-title">Thông tin sản phẩm</h2>
                <ul className="tabs__list">
                  <li className="tabs__list-item">
                    Tên sản phẩm: {detail.name}
                  </li>
                  <li className="tabs__list-item">
                    Phân loại: {detail.name_cate}
                  </li>
                  <li className="tabs__list-item">Nặng: 8,5 kg</li>
                  <li className="tabs__list-item">Size: 52 x 53 x 50 cm</li>
                  <li className="tabs__list-item">Chất liệu: PVC</li>
                  <li className="tabs__list-item">
                    Hãng Sản xuất: {detail.name_brand}
                  </li>
                  <li className="tabs__list-item">Đóng hộp: Fullbox</li>
                  <li className="tabs__list-item">
                    Phụ kiện: Đầy đủ như hình Mô Tả
                  </li>
                  <li
                    className="tabs__list-item"
                    dangerouslySetInnerHTML={{
                      __html: `Mô tả mô hình: ${detail.description}`,
                    }}
                  />
                </ul>
              </div>
            </div>
            <div className="tabs-content-review">
              <h2 className="tabs-content-title">đánh giá tổng quan</h2>
              <span>Ưu điểm</span>
              <ul className="tabs__list">
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Chi
                  tiết tốt, rõ ràng ít lem
                </li>
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Chất
                  lượng nhựa tốt
                </li>
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Màu sơn
                  đẹp
                </li>
              </ul>
              <span>Nhược điểm</span>
              <ul className="tabs__list">
                <li className="tabs__list-item">
                  <i className="tabs-content-review-icon fa-solid fa-circle-xmark"></i>
                  Head phụ khi thay sẽ rất chặt và khó tháo sau khi đã lắp, lưu
                  ý xem xét kĩ trước khi thay head phụ này.
                </li>
              </ul>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Hướng dẫn mua hàng" key="2" className="tabs-item">
          <div className="tabs-content">
            <h2 className="tabs-content-title">thời gian đặt hàng nhanh</h2>
            <div className="tabs-content_subtit">
              <p>
                DShop luôn là đơn vị đi đầu khi bán ra thị trường những mẫu mô
                hình figure action mới sớm nhất, để các bạn có thể trải nghiệm
                sản phẩm hot trong thời gian ngắn. Ship rất nhanh, 1 ngày nếu
                bạn ở Hà Nội và từ 2-3 ngày nếu bạn ở Hồ Chí Minh, những sản
                phẩm order cũng chỉ mất 7-10 hôm để về tới tay bạn.
              </p>
            </div>
            <h2 className="tabs-content-title">lựa chọn dshop</h2>
            <div className="tabs-content-list">
              <span>
                Tất cả các sản phẩm tại shop sẽ được đảm bảo những yếu tố sau:
              </span>
              <ul className="tabs__list">
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Đủ size
                  kích cơ tỉ lệ chuẩn, màu sắc
                </li>
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Check
                  lỗi với các sản phẩm bootleg để tránh những lỗi nặng
                </li>
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Hình
                  ảnh trên website đều là ảnh thật được chụp trực tiếp tại shop
                </li>
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Thông
                  tin mình bạch công khai về phân khúc, phân loại (chính hãng,
                  bootleg, 2nd…)
                </li>
                <li className="tabs__list-item">
                  <i className="main-content-icon fa-solid fa-check"></i>Giao
                  dịch uy tín với đầy đủ phương thức (có gian hàng tại Shopee)
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
                  <i className="tabs-list_icon fa-regular fa-circle-check"></i>
                  Thay phụ kiện Cẩn Thận.
                </li>
                <li className="tabs__list-item">
                  <i className="tabs-list_icon fa-regular fa-circle-check"></i>
                  Với các khớp bị cứng/chặt, ngâm nước nóng hoặc dùng máy sấy
                  sấy qua khớp trước khi thay. Không cố bẻ khớp vì như vậy có
                  thể làm gẫy sản phẩm.
                </li>
                <li className="tabs__list-item">
                  <i className="tabs-list_icon fa-regular fa-circle-check"></i>
                  Với các khớp bị lỏng, tháo khớp ra, bôi một lớp sơn móng tay
                  vào đầu khớp, chờ khô rồi lắp lại (xem thêm video hướng dẫn
                  tại đây)
                </li>
                <li className="tabs__list-item">
                  <i className="tabs-list_icon fa-regular fa-circle-check"></i>
                  Xoay đúng chiều của khớp, nếu xoay sai sẽ làm gẫy khớp.
                </li>
                <li className="tabs__list-item">
                  <i className="tabs-list_icon fa-regular fa-circle-check"></i>
                  Với các trường hợp sản phẩm bị hỏng, gẫy do không làm theo
                  hướng dẫn, Hunters sẽ không chịu trách nhiệm.
                </li>
              </ul>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Bình luận" key="3" className="tabs-item">
          <div className="tabs-content">
            <h2 className="tabs-content-title">Bình luận</h2>
            <CommentFigure id={id} />
            <div className="comment-list">
              {Array.isArray(comment) && comment.length > 0 ? (
                comment.map((comment) => (
                  <div className="comment-box" key={comment.id_comment}>
                    <img src={avartar} alt="Avatar" className="avatar" />
                    <div className="comment_box">
                      <span className="name_com">{comment.name_com}</span>
                      <hr />
                      <div
                        className="comment-text"
                        dangerouslySetInnerHTML={{
                          __html: comment.comment_mes,
                        }}
                      ></div>
                      <div className="info-bar">
                        <button>Trả lời</button>
                        <span>
                          {moment(comment.created_at).format(
                            "dddd DD/MM/YYYY HH:mm:ss"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="title-tab">
                  Chưa có bình luận nào, bạn hãy trở thành người đầu tiên bình
                  luận nhé! ^^
                </span>
              )}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
