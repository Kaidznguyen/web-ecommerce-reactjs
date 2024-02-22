import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import img1 from "../../../assets/user-page/img/blog/asuna-and-yui.png";
import img2 from "../../../assets/user-page/img/blog/deadpool.png";
import img3 from "../../../assets/user-page/img/blog/black-clover.png";
import PostCateAPI from "../../../Service/PostCateAPI.js";
import { Link } from "react-router-dom";
export default function ContentLeft() {
  const [postcates, setPostCates] = useState([]);

  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await PostCateAPI.getAll(); // Sửa thành getAll
        setPostCates(data.data); // Lấy data từ response
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPostCates();
  }, []);
  return (
    <div className="col l-4 c-0 m-0">
      <div className="new-content-blog blog2">
        <h2 className="title-new-blog title-blog2">Danh mục blog</h2>
        {Array.isArray(postcates) &&
          postcates.map((postcate) => (
            <div className="blog-directory-item" key={postcate.id_cate}>
              <h1>
                <Link
                  to={`/Blog/${postcate.id_cate}`}
                  className="blog-directory-link"
                >
                  {postcate.name_cate}
                </Link>
              </h1>
            </div>
          ))}

        <div className="blog-directory-item">
          <h1>
            <a href="/" className="blog-directory-link">
              Giới thiệu
            </a>
          </h1>
        </div>
        <div className="blog-directory-item">
          <h1>
            <a href="/" className="blog-directory-link">
              Chính sách đổi trả
            </a>
          </h1>
        </div>
        <div className="blog-directory-item">
          <h1>
            <a href="/" className="blog-directory-link">
              Chính sách bảo mật
            </a>
          </h1>
        </div>
        <div className="blog-directory-item">
          <h1>
            <a href="/" className="blog-directory-link">
              Điều khoản dịch vụ
            </a>
          </h1>
        </div>
      </div>
      <div className="new-content-blog">
        <h2 className="title-new-blog">bài viết mới nhất</h2>
        <div className="content-blog-left">
          <div className="content-blog-left_img">
            <a href="blog-detail.html">
              <img src={img1} alt="" />
            </a>
            <a href="blog-detail.html" className="content-blog-left-title">
              OVERLORD "GÂY BÃO" VỚI 2 DỰ ÁN LỚN: SEASON 4 VÀ MOVIE!?
            </a>
            <span className="content-blog-left-author">
              DShop <b>15/5/2022</b>
            </span>
          </div>
        </div>
        <div className="content-blog-left">
          <div className="content-blog-left_img">
            <a href="blog-detail.html">
              <img src={img2} alt="" />
            </a>
            <a href="blog-detail.html" className="content-blog-left-title">
              TOP 10 ANIME NHẤT ĐỊNH PHẢI XEM TRONG MÙA ĐÔNG 2021! - SIÊU PHẨM +
              SIÊU PHẨM
            </a>
            <span className="content-blog-left-author">
              DShop <b>17/3/2022</b>
            </span>
          </div>
        </div>
        <div className="content-blog-left">
          <div className="content-blog-left_img">
            <a href="blog-detail.html">
              <img src={img3} alt="" />
            </a>
            <a href="blog-detail.html" className="content-blog-left-title">
              TOP 10 NHỮNG BỘ ANIME MOVIE TÌNH CẢM MÀ BẠN NÊN XEM TRƯỚC TUỔI 20
            </a>
            <span className="content-blog-left-author">
              DShop <b>17/3/2022</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
