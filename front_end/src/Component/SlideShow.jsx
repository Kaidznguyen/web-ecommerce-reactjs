import React from 'react'
import '../assets/user-page/main.css'
import '../assets/user-page/grid-system.css' 
import '../assets/user-page/reponsive.css'
import '../assets/user-page/main.js'
import slide1 from  '../assets/user-page/img/slide & QC/slideshow_1.png'
import slide2 from  '../assets/user-page/img/slide & QC/slideshow_2.png'
import slide3 from  '../assets/user-page/img/slide & QC/slideshow_3.png'
import slide4 from  '../assets/user-page/img/slide & QC/slideshow_4.png'

export default function SlideShow() {
  return (
    <div className="slider-show">
                <div className="slider-show_img"><img src={slide1} alt=""/></div>
                <div className="slider-show_img"><img src={slide2} alt=""/></div>
                <div className="slider-show_img"><img src={slide3} alt=""/></div>
                <div className="slider-show_img"><img src={slide4} alt=""/></div>
    </div>
  )
}
