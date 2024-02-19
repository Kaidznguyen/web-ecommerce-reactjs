import React from 'react'
import "../assets/user-page/main.css";
import "../assets/user-page/grid-system.css";
import "../assets/user-page/reponsive.css";
import "../assets/user-page/main.js";
import imgPost from  '../assets/user-page/img/blog/asuna-and-yui.png'
export default function Hotnew() {
  return (
    <div>
      <div class="index-product-title" style={{ marginBottom: '80px' }}>
                    <a href="blog.html">Bài viết nổi bật</a>
                </div>
                <div class="newspaper-content">
                    <div class="row sm-gutter">
                        <div class="col l-4 c-12 m-4">
                            <a href="blog-detail.html" class="content-newspaper-item"><img src={imgPost} alt="" title="OVERLORD"/></a>
                            <div class="content-newspaper-time">
                                <span>chủ nhật 23/05/2021</span>
                            </div>
                            <div class="content-newspaper-title">
                                <a href="blog-detail.html">OVERLORD "GÂY BÃO" VỚI 2 DỰ ÁN LỚN: SEASON 4 VÀ MOVIE!?</a>
                            </div>
                            <div class="content-newspaper">
                                <span>Trong buổi ghi hình trực tiếp vào hôm thứ bảy, sê-ri anime truyền hình Overlord đã chính thức xác nhận mùa thứ 4 cùng với anime movie. Đồng thời, cũng aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                            </div> 
                        </div>
                        <div class="col l-4 c-12 m-4">
                            <a href="blog-detail.html" class="content-newspaper-item"><img src={imgPost} alt="" title="TOP 10 ANIME NHẤT ĐỊNH PHẢI XEM TRONG MÙA ĐÔNG 2021! - SIÊU PHẨM + SIÊU PHẨM"/></a>
                            <div class="content-newspaper-time">
                                <span>thứ tư 17/03/2021</span>
                            </div>
                            <div class="content-newspaper-title">
                                <a href="blog-detail.html">TOP 10 ANIME nhất định PHẢI XEM TRONG MÙA ĐÔNG 2021! - SIÊU PHẨM + SIÊU PHẨM</a>
                            </div>
                            <div class="content-newspaper">
                                <span>Năm 2020 đi qua để lại biết bao nhiêu dấu vết ảm đạm cho ngành công nghiệp anime nhưng qua một năm mới, 2021, chúng ta đã lại được chào đón aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </span>
                            </div> 
                        </div>
                        <div class="col l-4 c-12 m-4">
                            <a href="blog-detail.html" class="content-newspaper-item"><img src={imgPost} alt="" title="TOP 10 NHỮNG BỘ ANIME MOVIE TÌNH CẢM MÀ BẠN NÊN XEM TRƯỚC TUỔI 20"/></a>
                            <div class="content-newspaper-time">
                                <span>thứ tư 17/03/2021</span>
                            </div>
                            <div class="content-newspaper-title">
                                <a href="blog-detail.html">TOP 10 NHỮNG BỘ ANIME MOVIE TÌNH CẢM MÀ BẠN NÊN XEM TRƯỚC TUỔI 20</a>
                            </div>
                            <div class="content-newspaper">
                                <span>Từ trước đến nay có thể nói anime và manga luôn là một món ăn tinh thần đối với chúng ta. Hơn bao giờ hết, anime thể loại tình cảm aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                            </div> 
                        </div>
                    </div>
                </div>
    </div>
  )
}
