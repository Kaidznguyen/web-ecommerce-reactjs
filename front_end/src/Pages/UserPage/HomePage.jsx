import React from 'react'
import SlideShow from '../../Component/User/Home/SlideShow';
import SlideFigure from '../../Component/User/Home/SlideFigure';
import Banner from '../../Component/User/Home/Banner';
import Accessory from '../../Component/User/Home/Accessory';
import Hotnew from '../../Component/User/Home/Hotnew';
import RegistEremail from '../../Component/User/Home/RegisterEmail';
import FeedBackImg from '../../Component/User/Home/FeedBackImg';


export default function HomePage() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Cuộn mượt
  });
  return (
    <div className="container container-index">
      <SlideShow />
      <div className="grid wide">
        <SlideFigure />
        <Banner />
        <Accessory />
        <Hotnew />
      </div>
      <RegistEremail />
      <FeedBackImg />
    </div>
  )
}
