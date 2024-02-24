import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import "../../assets/user-page/main.js";
import banner from "../../assets/user-page/img/blog/slide.png";
import ContentLeft from "../../Component/User/PostCate/ContentLeft.jsx";
import FeedBackImg from "../../Component/User/Home/FeedBackImg.jsx";
import PostByCateId from "../../Component/User/PostCate/PostByCateId.jsx";
export default function PostByIdcatePage() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Cuộn mượt
      });
      return (
        <div className="container container-ctsp">
          <div className="blog__img">
            <img src={banner} alt="" />
          </div>
          <div className="grid wide">
                <div className="row sm-gutter">
                    <ContentLeft /> 
                    <PostByCateId />
                </div> 
          </div>
          <FeedBackImg />
        </div>
      );
}
