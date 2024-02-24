import React from "react";
import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import "../../assets/user-page/main.js";
import NavLeftFigure from "../../Component/User/FigureCate/NavLeftFigure.jsx";
import FigubyCate from "../../Component/User/FigureCate/FigubyCate.jsx";

export default function FigureCatePage() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Cuộn mượt
  });
  return (
    <div className="container">
      <div className="grid wide">
        <div className="row app__content sm-gutter">
            <NavLeftFigure />
            <FigubyCate />
        </div>
      </div>
    </div>
  );
}
