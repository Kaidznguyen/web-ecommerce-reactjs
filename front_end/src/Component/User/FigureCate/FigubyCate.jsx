import React, { useState, useEffect, useRef } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import numeral from "numeral";
import FigureCateAPI from "../../../Service/FigureCateAPI.js";
import MainNav from "./MainNav.jsx";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
export default function FigubyCate() {
  const { cateId } = useParams();
  const [figures, setFigures] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 8; // Số bài viết trên mỗi trang
  const topRef = useRef(null);
  const [originalFigures, setOriginalFigures] = useState([]); // Lưu trữ danh sách sản phẩm gốc
  const [searchText, setSearchText] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);
  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  }, [pageNumber]);

  // lấy sp theo cateID
  useEffect(() => {
    async function fetchFigus() {
      try {
        const data = await FigureCateAPI.getByCategoryId(cateId);
        const fetchedFigures = data;
        setOriginalFigures(fetchedFigures); // Lưu trữ danh sách sản phẩm gốc
        setFigures(fetchedFigures);
        setShowNotFound(false); // Lấy data từ response
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchFigus();
  }, [cateId]);
// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  return str;
}

// Xử lý tìm kiếm
const handleSearch = (searchText) => {
  setSearchText(searchText);
  if (!searchText.trim()) {
    // Nếu searchText rỗng, reset dữ liệu về ban đầu từ danh sách sản phẩm gốc
    setFigures(originalFigures);
    setShowNotFound(false);
    return;
  }

  // Chuẩn hóa searchText
  const normalizedSearchText = removeVietnameseTones(searchText.toLowerCase());

  // Thực hiện tìm kiếm với searchText đã chuẩn hóa
  const filteredFigures = originalFigures.filter((figure) =>
    removeVietnameseTones(figure.name.toLowerCase()).includes(normalizedSearchText)
  );

  // Cập nhật danh sách sản phẩm sau khi tìm kiếm
  setFigures(filteredFigures);
  setShowNotFound(filteredFigures.length === 0); // Hiển thị thông báo nếu không có kết quả tìm kiếm
};

  // Hàm xử lý sắp xếp theo khoảng giá
  const handlePriceRangeSelectChange = (minPrice, maxPrice) => {
    const filteredFigures = originalFigures.filter(
      (figure) =>
        figure.promotionprice >= minPrice && figure.promotionprice <= maxPrice
    );
    // Sắp xếp filteredFigures theo giá tiền tăng dần
    filteredFigures.sort((a, b) => a.promotionprice - b.promotionprice);
    setFigures(filteredFigures);
    setShowNotFound(filteredFigures.length === 0); // Hiển thị thông báo nếu không có kết quả sau khi sắp xếp
  };
  // sắp xếp cũ mới
  const handleSortChange = (sortType) => {
    let sortedFigures = [...figures]; // Tạo bản sao của danh sách sản phẩm

    // Sắp xếp theo thời gian ra mắt
    if (sortType === "newest") {
      sortedFigures.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortType === "oldest") {
      sortedFigures.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    setFigures(sortedFigures); // Cập nhật danh sách sản phẩm sau khi sắp xếp
  };
  // phân trang
  const pageCount = Math.ceil(figures.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayFigures = figures
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((figure) => (
      <div className="col l-3 m-4 c-6" key={figure.id}>
        <Link className="home-product-item" to={`/Detail-Figure/${figure.id}`}>
          <div>
            <img
              src={"http://localhost:8080/" + figure.img}
              alt={figure.name}
              className="home-product-item__img"
            />
          </div>
          <h4 className="home-product-item__name">{figure.name}</h4>
          <div className="home-product-item__price">
            <span
              className={
                figure.promotionprice === 0
                  ? "home-product-item__price-curent"
                  : "home-product-item__price-old"
              }
            >
              {numeral(figure.price).format("$0,0")}
            </span>
            <span
              className={
                figure.promotionprice === 0
                  ? "hidden"
                  : "home-product-item__price-curent"
              }
            >
              {numeral(figure.promotionprice).format("$0,0")}
            </span>
          </div>
          <div className="home-product-item__origin">
            <span className="home-product-item__brand">Phân loại</span>
            <span className="home-product-item__origin-name">Xuất sứ</span>
          </div>
          <div className="home-product-item__origin">
            <span
              className="home-product-item__brand"
              style={{ fontSize: "1.2rem" }}
            >
              {figure.name_cate}
            </span>
            <span
              className="home-product-item__origin-name"
              style={{ fontSize: "1.2rem" }}
            >
              {figure.name_brand}
            </span>
          </div>
          <div
            className={`home-product-item__favourite ${
              figure.quantity === 0 ? "sold-out" : ""
            }`}
          >
            <span>{figure.quantity === 0 ? "Hết hàng" : "Yêu thích"}</span>
          </div>
          <div
            className={`home-product-item__sale-off ${
              figure.promotionprice === 0 ? "hidden" : ""
            }`}
          >
            {figure.price !== 0 && figure.promotionprice !== 0 && (
              <span className="home-product-item__sale-off-percent">
                -{" "}
                {(
                  ((figure.price - figure.promotionprice) / figure.price) *
                  100
                ).toFixed(0)}
                %
              </span>
            )}
            {/* <span className="home-product-item__sale-off-label">GIẢM</span> */}
          </div>
        </Link>
      </div>
    ));
  return (
    <div className="col l-10 m-12 c-12" ref={topRef}>
      <MainNav
        onSearch={handleSearch}
        onPriceRangeSelectChange={handlePriceRangeSelectChange}
        onSortChange={handleSortChange}
      />
      {/* <!-- sản phẩm --> */}
      <div className="home-product">
        {showNotFound && ( // Hiển thị thông báo nếu không có kết quả tìm kiếm hoặc sắp xếp
          <div className="not_found">
            Không tìm thấy theo yêu cầu của bạn rồi T.T!! Hãy thử lại nha
          </div>
        )}
        <div className="row sm-gutter">{displayFigures}</div>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
          pageCount={pageCount}
          pageClassName={"pagination-item pagination-item__link"}
          onPageChange={changePage}
          forcePage={pageNumber}
          containerClassName={"pagination home-product__pagination"}
          previousLinkClassName={"pagination-item pagination-item__link"}
          nextLinkClassName={"pagination-item pagination-item__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination-item__active"}
        />
      </div>
    </div>
  );
}
