import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import PostCateAPI from "../../../Service/PostCateAPI.js";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchPost from "./SearchPost.jsx";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function PostByCateId() {
    const { categoryId } = useParams();
    const [posts, setPostCates] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortType, setSortType] = useState("");
    const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
    const postsPerPage = 3; // Số bài viết trên mỗi trang
    const topRef = useRef(null);

    useEffect(() => {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [pageNumber]);
  
    useEffect(() => {
      async function fetchPostCates() {
        try {
          const data = await PostCateAPI.getByCategoryId(categoryId); // Sửa thành getAll
          setPostCates(data); // Lấy data từ response
          setFilteredPosts(data);

          console.log(data)
        } catch (error) {
          console.error("Error fetching post categories: ", error);
        }
      }
      fetchPostCates();
    }, [categoryId]);

    useEffect(() => {
      const filteredData = posts.filter((post) =>
        removeVietnameseTones(post.title.toLowerCase()).includes(removeVietnameseTones(searchText.toLowerCase()))
      );
      setFilteredPosts(filteredData);
    }, [searchText, posts]);

    useEffect(() => {
      const sortedData = sortPosts(filteredPosts, sortType);
      setFilteredPosts(sortedData);
    }, [sortType, filteredPosts]);

    const sortPosts = (data, sortType) => {
      if (sortType === "newest") {
        return [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortType === "oldest") {
        return [...data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } else {
        return data;
      }
    };

    const removeVietnameseTones = (str) => {
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
      return str;
    };

    const handleSearch = (searchText) => {
      setSearchText(searchText);
    };

    const handleSortChange = (type) => {
      setSortType(type);
    };

    const handlePageClick = ({ selected }) => {
      setPageNumber(selected);
    };

    const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
    const offset = pageNumber * postsPerPage;
    const currentPageData = filteredPosts.slice(offset, offset + postsPerPage);

    return (
      <div className="col l-8 c-12 m-12" ref={topRef}>
        <SearchPost onSearch={handleSearch} onSortChange={handleSortChange} />

        <div className="content-blog">
          <h2 className="content-blog-title">tin tức - DShop</h2>
          <div className="row">
            {currentPageData.map((post) => (
              <div className="content-blog-item" key={post.id}>
                <div className="col l-5 c-5 m-5">
                  <div className="content-blog-main_img">
                    <Link to={`/Blog-Detail/${post.id}`}>
                      <img src={"http://localhost:8080/" + post.img} alt={post.title} />
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
                      Người viết: {post.author} / <b>{moment(post.created_at).format('dddd DD/MM/YYYY HH:mm:ss')}</b>
                    </p>
                    <p
                      className="content-blog-main_text"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination-container">
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
            nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
            pageCount={pageCount}
            pageClassName={"pagination-item"}
            pageLinkClassName={"pagination-item__link"}
            onPageChange={handlePageClick}
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
