import React, { useEffect }  from 'react'

import TabContent from '../../Component/User/DetailFigu/TabContent'
import RandomFigure from '../../Component/User/DetailFigu/RandomFigure'
import DetailFigure from '../../Component/User/DetailFigu/DetailFigure';

export default function DetailFgurePage() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Cuộn mượt
  });
  return (
    <div className="container container-ctsp">
      <div className="grid wide"> 
          <DetailFigure />
          <TabContent />
          <h2 id="related-products">Có thể bạn sẽ thích</h2>
          <RandomFigure />
      </div>

    </div>
  )
}
