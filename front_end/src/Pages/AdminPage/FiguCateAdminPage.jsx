import React from "react";
import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import "../../assets/user-page/main.js";
import TopBar from "../../Component/Admin/TopBar";
import NavLeft from "../../Component/Admin/NavLeft";
import FiguCateList from "../../Component/Admin/FiguCate/FiguCateList.jsx";

export default function FiguCateAdminPage() {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt
      });  
      return (
        <div className="container-admin">
          <div className="grid">
            <div className="row ">
              <div className="col l-2 m-0 c-0">
                <NavLeft />
              </div>
              <div className="col l-10 m-0 c-0">
                <TopBar />
                <FiguCateList />

              </div>
            </div>
          </div>

        </div>
      );
}
