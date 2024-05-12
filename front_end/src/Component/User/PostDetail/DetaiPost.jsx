import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileLines, faComment,faEye} from '@fortawesome/free-solid-svg-icons'
import PostAPI from '../../../Service/PostAPI.js';
import moment from "moment";
import { Link } from "react-router-dom";
export default function DetaiPost() {
    const { id } = useParams();
  const [detail, setPost] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostAPI.getById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => {
      increaseViews();
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [id]);
  const increaseViews = async () => {
    try {
      // Gọi API để tăng views của sản phẩm
      await PostAPI.views(id);
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };
  const formattedDateTime = moment(detail.updated_at).format(
    "dddd DD/MM/YYYY HH:mm:ss"
  );
  return (
    <div className="col l-8 c-12 m-12">
                        <div className="blog-detail-content">
                            <div className="blog-slide_main">
                            <img src={"http://localhost:8080/" + detail.img} alt={detail.title} />
                            </div>
                            <h2 className="blog-detail-title">
                            {detail.title}
                            </h2>
                            <span className="blog-detail-author">Người viết: {detail.author} lúc {formattedDateTime}</span>
                            <span className="blog-detail-author"><FontAwesomeIcon icon={faFileLines} className="blog-detail-icon" /><Link to={'/Blog'}>Tin tức - DShop</Link></span>
                            <span className="blog-detail-author"><FontAwesomeIcon icon={faComment} className="blog-detail-icon" /><a href="#comment">0 Bình luận</a></span>
                            <span className="blog-detail-author" style={{marginLeft:'-15px'}}><FontAwesomeIcon icon={faEye} className="blog-detail-icon" /><a href="#">{detail.views} Lượt xem</a></span>
                            <p className=" blog-content__img blog-text"  dangerouslySetInnerHTML={{ __html: detail.content }}/>
                            <Link className="blog-link" to={'/'}>Ngoài ra các bạn có thể mua mô hình tại đây.</Link>
                            <div className="blog-comment">
                                <div className="blog-comment__title">
                                    <h2 className="title-new-blog title-blog3">viết bình luận</h2>
                                    <input type="text" placeholder="Viết bình luận của bạn..." className="tabs-content-form-index margin-top"/>
                                    <button className="btn btn--primary help">Đăng bình luận</button>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}
