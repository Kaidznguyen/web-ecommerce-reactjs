import React from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment,faClipboard,faSackDollar,faBoxesStacked} from '@fortawesome/free-solid-svg-icons'
export default function StatisticsCard() {
  return (
    <div class="card-box">
      <div class="card">
        <div>
          <div class="numbers">1,504</div>
          <div class="card_name">Số lượng sản phẩm</div>
        </div>
        <div class="iconBx">
        <FontAwesomeIcon icon={faBoxesStacked} />
        </div>
      </div>
      <div class="card">
        <div>
          <div class="numbers">77</div>
          <div class="card_name">Số lượng bài viết</div>
        </div>
        <div class="iconBx">
        <FontAwesomeIcon icon={faClipboard} />
        </div>
      </div>
      <div class="card">
        <div>
          <div class="numbers">1,704</div>
          <div class="card_name">Bình luận</div>
        </div>
        <div class="iconBx">
        <FontAwesomeIcon icon={faComment} />
        </div>
      </div>
      <div class="card">
        <div>
          <div class="numbers">$2101</div>
          <div class="card_name">Doanh thu</div>
        </div>
        <div class="iconBx">
        <FontAwesomeIcon icon={faSackDollar} />
        </div>
      </div>
    </div>
  );
}
