import React, { useState, useEffect, useRef  } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import PostAPI from "../../../Service/PostAPI.js";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchPost from "./SearchPost.jsx";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faEye
} from "@fortawesome/free-solid-svg-icons";

export default function ContentRight() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 2; // Số bài viết trên mỗi trang
  const topRef = useRef(null);

  // lấy tất cả blog
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await PostAPI.getAll();
        setPosts(data.data);
        // Filter and sort posts when data is fetched initially
        filterAndSortPosts(searchText, sortType, data.data);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }

    fetchPosts();
  }, []);
  
  // sắp xếp và lọc bài viết
  const filterAndSortPosts = (searchText, sortType, data) => {
    let filtered = [...data];

    // Hàm loại bỏ dấu tiếng Việt
    const removeVietnameseTones = (str) => {
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
      return str;
    }

    if (searchText) {
      // Chuẩn hóa searchText
      const normalizedSearchText = removeVietnameseTones(searchText.toLowerCase());
      
      filtered = filtered.filter((post) =>
        removeVietnameseTones(post.title.toLowerCase()).includes(normalizedSearchText)
      );
    }

    if (sortType === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setFilteredPosts(filtered);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    // Filter and sort posts when sort type changes
    filterAndSortPosts(searchText, type, posts);
  };

  // Xử lý tìm kiếm
  const handleSearch = (searchText) => {
    setSearchText(searchText);
    // Filter and sort posts when search text changes
    filterAndSortPosts(searchText, sortType, posts);
  };

  // Phân trang
  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pageNumber]);

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // phần cần filter
  const displayPosts = filteredPosts
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (
      <div className="content-blog-item" key={post.id}>
        <div className="col l-5 c-5 m-5">
          <div className="content-blog-main_img">
            <Link to={`/Blog-Detail/${post.id}`}>
              <img src={"http://localhost:8080/" + post.img} />
            </Link>
          </div>
        </div>
        <div className="col l-7 c-7 m-7">
          <div className="content-blog-main_sub">
            <Link
              to={`/Blog-Detail/${post.id}`}
              className="content-blog-main_title"
            >
              {post.title}
            </Link>
            <p className="content-blog-main_author">
              Người viết: {post.author} /{" "}
              <b>{moment(post.created_at).format("dddd DD/MM/YYYY HH:mm:ss")}</b>/
              <b >{post.views} <FontAwesomeIcon icon={faEye} /></b>
            </p>
            <p
              className="content-blog-main_text"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>
        </div>
      </div>
    ));

  return (
    <div className="col l-8 c-12 m-12" ref={topRef}>
      <SearchPost onSearch={handleSearch} onSortChange={handleSortChange} />
      <div className="content-blog">
        <h2 className="content-blog-title">tin tức - DShop</h2>
        <div className="row" >
          {(filteredPosts.length === 0 && !searchText && !sortType) && (
            <div className="not_found">
              Hãy nhập từ khóa hoặc chọn cách sắp xếp để tìm kiếm bài viết
            </div>
          )}
          {displayPosts}
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
    </div>
  );
}
