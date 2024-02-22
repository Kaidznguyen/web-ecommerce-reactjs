import React from 'react'
import '../../../assets/user-page/main.css';
import '../../../assets/user-page/grid-system.css';
import '../../../assets/user-page/reponsive.css';
import "../../../assets/user-page/main.js";
import banner1 from  '../../../assets/user-page/img/slide & QC/moc-kiem.png'
import banner2 from  '../../../assets/user-page/img/slide & QC/sale.png'
import banner3 from  '../../../assets/user-page/img/slide & QC/blog.png'
export default function Banner() {
  return (
    <div>
      <div className="img-content">
                    <div className="row sm-gutter">
                        <div className="col l-4 c-12 m-4 content-img">
                            <a href="#" className="content-img-item"><img src={banner1} alt=""/></a>
                            <div className="img-content-title">
                                <span>Giảm Giả</span>
                            </div> 
                        </div>
                        <div className="col l-4 c-12 m-4 content-img">
                            <a href="#" className="content-img-item"><img src={banner2} alt=""/></a>
                            <div className="img-content-title">
                                <span>Móc khóa</span>
                            </div>
                        </div>
                        <div className="col l-4 c-12 m-4 content-img">
                            <a href="blog.html" className="content-img-item"><img src={banner3} alt=""/></a>
                            <div className="img-content-title">
                                <span>blog</span>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}
