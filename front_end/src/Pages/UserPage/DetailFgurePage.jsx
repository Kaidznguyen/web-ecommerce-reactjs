import React, { useEffect }  from 'react'
import DetailFigure from '../../Component/DetailFigure'
import TabContent from '../../Component/TabContent'
import RandomFigure from '../../Component/RandomFigure'

export default function DetailFgurePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container container-ctsp">
      <div class="grid wide"> 
          <DetailFigure />
          <TabContent />
          <h2 id="related-products">Có thể bạn sẽ thích</h2>
          <RandomFigure />
      </div>

    </div>
  )
}
