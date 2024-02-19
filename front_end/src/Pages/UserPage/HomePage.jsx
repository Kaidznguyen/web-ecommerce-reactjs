import React from 'react'
import SlideShow from '../../Component/SlideShow';
import SlideFigure from '../../Component/SlideFigure';
import Banner from '../../Component/Banner';
import Accessory from '../../Component/Accessory';
import Hotnew from '../../Component/Hotnew';
import RegistEremail from '../../Component/RegisterEmail';

export default function HomePage() {
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
    </div>
  )
}
