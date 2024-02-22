import React from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";

import img1 from "../../../assets/user-page/img/slide & QC/feedback1.png";
import img2 from "../../../assets/user-page/img/slide & QC/feedback2.png";
import img3 from "../../../assets/user-page/img/slide & QC/feedback3.png";
import img4 from "../../../assets/user-page/img/slide & QC/feedback4.png";
import img5 from "../../../assets/user-page/img/slide & QC/feedback5.png";
import img6 from "../../../assets/user-page/img/slide & QC/feedback6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
export default function FeedBackImg() {
  return (
    <div>
      <div className="index-product-title" style={{ marginBottom: "80px" }}>
        <a href="#">Ảnh feedback từ khách</a>
      </div>
      <div className="feedback-img">
        <div className="row sm-gutter">
          <div className="col l-2 c-4 m-2 feedback-img">
            <div className="feedback-img-item">
              <img src={img1} alt="" />
              <div className="feedback-img-icon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="feedback-img-icon_item"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col l-2 c-4 m-2 feedback-img">
            <div className="feedback-img-item">
              <img src={img2} alt="" />
              <div className="feedback-img-icon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="feedback-img-icon_item"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col l-2 c-4 m-2 feedback-img">
            <div className="feedback-img-item on-mobile">
              <img src={img3} alt="" />
              <div className="feedback-img-icon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="feedback-img-icon_item"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col l-2 c-4 m-2 feedback-img">
            <div className="feedback-img-item">
              <img src={img4} alt="" />
              <div className="feedback-img-icon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="feedback-img-icon_item"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col l-2 c-4 m-2 feedback-img">
            <div className="feedback-img-item">
              <img src={img5} alt="" />
              <div className="feedback-img-icon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="feedback-img-icon_item"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col l-2 c-4 m-2 feedback-img">
            <div className="feedback-img-item" style={{ marginRight: "5px" }}>
              <img src={img6} alt="" />
              <div className="feedback-img-icon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="feedback-img-icon_item"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="feedback-img-icon_item"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
