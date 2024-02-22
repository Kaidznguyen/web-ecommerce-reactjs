import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/user-page/main.css';
import '../../../assets/user-page/grid-system.css';
import '../../../assets/user-page/reponsive.css';
import slide1 from '../../../assets/user-page/img/slide & QC/slideshow_1.png';
import slide2 from '../../../assets/user-page/img/slide & QC/slideshow_2.png';
import slide3 from '../../../assets/user-page/img/slide & QC/slideshow_3.png';
import slide4 from '../../..//assets/user-page/img/slide & QC/slideshow_4.png';

export default function SlideShow() {
  // setting cho slide
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2500,
    // dots: true,
    fade: true,
    cssEase: 'linear',
    // prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-angle-left'></i></button>",
    // nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa-solid fa-angle-right'></i></button>",
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            arrows:false,
        }
        },
        {
        breakpoint: 720,
        settings: {
            arrows:false,
            infinite: false,
        }
        }
    ]
  };
  return (
    <Slider {...settings} className="slider-show">
                <div className="slider-show_img"><img src={slide1} alt=""/></div>
                <div className="slider-show_img"><img src={slide2} alt=""/></div>
                <div className="slider-show_img"><img src={slide3} alt=""/></div>
                <div className="slider-show_img"><img src={slide4} alt=""/></div>
    </Slider>
  )
}
