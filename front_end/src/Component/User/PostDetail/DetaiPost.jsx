import React from 'react'
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import img1 from "../../../assets/user-page/img/blog/black-clover.png";
export default function DetaiPost() {
  return (
    <div className="col l-8 c-12 m-12">
                        <div className="blog-detail-content">
                            <div className="blog-slide_main">
                                <img src={img1} alt=""/>
                            </div>
                            <h2 className="blog-detail-title">
                                Figure là gì? Những kiến thức cơ bản về figure
                            </h2>
                            <span className="blog-detail-author">Người viết: nhat240601@gmail.com lúc 15/05/2022</span>
                            <span className="blog-detail-author"><i className="blog-detail-icon fa-solid fa-file-lines"></i> <a href="blog.html">Tin tức - DShop</a></span>
                            <span className="blog-detail-author"><i className="blog-detail-icon fa-solid fa-comment"></i><a href="#comment">0 Bình luận</a></span>
                            <p className="blog-text">Nếu bạn là một người chơi figure lâu năm, bạn sẽ không lạ gì với cụm từ figure nữa. Tuy nhiên, ở Việt Nam, thú chơi figure vẫn còn khá mới mẻ và nhiều người vẫn còn hiểu sai về nó. Vậy nên hôm nay Hunters cùng mọi người sẽ điểm qua những điều cơ bản của figure nhé ^^</p>
                            <h3 className="blog-detail-title-main">1. <b>Figure là gì?</b></h3>
                            <p className="blog-text">Ra đời vào những năm 1964, đến nay mặc dù đã trải qua hơn 50 phát triển, thế nhưng tại Việt Nam, figure vẫn còn khá lạ lẫm. Đối với nhiều người, figure chỉ như một món đồ chơi dành cho trẻ con. Tuy nhiên, đằng sau những con búp bê đắt tiền nhưng vô bổ mà mọi người vẫn thường nghĩ ấy là cả một nghệ thuật, một nền văn hóa và là thú vui sưu tầm đáng được coi trọng.</p>
                            <div className="blog-content__img">
                                <img src={img1}alt=""/>
                                <p>Thú chơi figure từ những năm 80s của thế kỷ trước</p>
                            </div>
                            <div className="blog-content__img on-table__img">
                                <img src={img1}alt=""/>
                                <p>Các mô hình và phụ kiện đi kèm</p>
                            </div>
                            <p className="blog-text">Theo từ điển tiếng Anh, figure có nghĩa là nhân vật tượng trưng, hình minh họa… Bắt nguồn từ Mỹ nhưng phát triển nhờ văn hóa Otaku của Nhật Bản, ban đầu figure chỉ là những mô hình mô phỏng lại các nhân vật trong truyện tranh, manga và anime. Đến nay, bạn có thể tìm kiếm bất kỳ figure của nhân vật trong phim ảnh, thậm chí ngoài đời.</p>
                            <h3 className="blog-detail-title-main">2. <b>Tại sao figure lại có nhiều người đam mê đến vậy?</b></h3>
                            <p className="blog-text">Hầu hết các figure collectors đều là fan cứng của nhân vật trong truyên tranh/phim ảnh. Việc ngắm họ qua những trang giấy hay qua màn hình tivi tất nhiên sẽ không thú vị bằng việc có mô hình giống y nhân vật yêu thích của mình bên cạnh đúng không? Với figure, họ có thể tha hồ tạo dáng, chụp ảnh, hay xây dựng nên câu chuyện từ những mô hình ấy.</p>
                            <div className="blog-content__img blog-slide_main">
                                <img src={img1}alt=""/>
                                <p>Một câu chuyện hài hước dựa trên figure của loạt phim Marvel nổi tiếng (Avengergram)</p>
                            </div>
                            <p className="blog-text">Figure được làm bằng sự tỉ mỉ và óc sáng tạo vô biên của người thợ, với các bộ phận và chi tiết đạt đến tiêu chuẩn y như người thật trong phim hay nhân vật trong truyện tranh. Chính bởi vậy, figure có giá thành cao hơn hẳn các đồ chơi  bình thường và thường dành cho người trên 12 tuổi.</p>
                            <div className="blog-content__img">
                                <img src={img1}alt=""/>
                                <p>Mô hình nhân vật nổi tiếng DC Joker của hãng Hot Toys</p>
                            </div>
                            <p className="blog-text">Mặc dù vậy, nhiều người vẫn đánh đồng figure với đồ chơi dành cho trẻ em. Có thể bởi hầu hết figure collectors đều là người trẻ, và họ sưu tầm một thứ giống như đồ chơi của trẻ con. Vậy nên họ thường không nhận được ánh mắt coi trọng của người đối diện. Nhưng cũng giống như thú vui sưu tầm tem, xe, cây cảnh…thì sưu tầm figure cũng vậy. Họ sưu tầm vì đam mê của bản thân, tạo nên một cộng đồng, một nền văn hóa không phân biệt lứa tuổi. Chính vì vậy, hơn ai hết, figure collectors là những người đáng được nhìn nhận và coi trọng.</p>
                            <div className="blog-content__img on-table__img">
                                <img src={img1}alt=""/>
                                <p>Các figures được làm theo các nhân vật anime/manga Nhật Bản</p>
                            </div>
                            <h3 className="blog-detail-title-main">3. <b>Phân loại figure</b></h3>
                            <p className="blog-text">Hiện nay, có rất nhiều cách để phân loại figure. Tuy nhiên, Hunters chỉ phân thành 3 loại cơ bản là Action Figure (Figure động – có thể điều chỉnh, cử động tạo dáng), Scale Figure (Figure tĩnh – không thể điều chỉnh, chỉ để trưng bày) và loại chibi (đầu to, thân nhỏ, phong cách dễ thương).</p>
                            <div className="blog-content__img on-table__img">
                                <img src={img1}alt=""/>
                                <p>Figure chibi của nhân vật DC nổi tiếng: Harley Quinn</p>
                            </div>
                            <p className="blog-text">Như vậy, Figure Store đã tổng hợp vài kiến thức cơ bản về figure. Hy vọng sau bài viết này, các bạn sẽ hiểu hơn về figure và thú chơi figure. Bài viết có tham khảo từ các nguồn thông tin và ảnh trên mạng nên vẫn còn nhiều thiếu sót. Xin hãy góp ý và bình luận phía dưới bài viết để chúng mình sửa đổi và cập nhật nhé!</p>
                            <a className="blog-link" href="index.html" target="_blank">Ngoài ra các bạn có thể mua mô hình tại đây.</a>
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
