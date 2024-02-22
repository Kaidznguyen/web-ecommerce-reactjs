import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import PostAPI from "../../../Service/PostAPI.js";
import { Link } from "react-router-dom";
import moment from "moment";
export default function ContentRight() {
  const [posts, setPostCates] = useState([]);

  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await PostAPI.getAll(); // Sửa thành getAll
        setPostCates(data.data); // Lấy data từ response
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPostCates();
  }, []);
  const formattedDateTime = moment(posts.updated_at).format(
    "dddd DD/MM/YYYY HH:mm:ss"
  );
  return (
    <div className="col l-8 c-12 m-12">
      <div className="content-blog">
        <h2 className="content-blog-title">tin tức - DShop</h2>
        <div className="row">
          {Array.isArray(posts) &&
            posts.map((post) => (
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
                      Người viết: {post.author} / <b>{formattedDateTime}</b>
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
    </div>
  );
}
