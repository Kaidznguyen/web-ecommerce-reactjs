import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import "../../assets/user-page/main.js";
import TopBar from "../../Component/Admin/TopBar";
import NavLeft from "../../Component/Admin/NavLeft";
import FiguCateList from "../../Component/Admin/FiguCate/FiguCateList.jsx";

export default function FiguCateAdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if (role !== "admin" && role !== "staff") {
          alert("Bạn không có quyền truy cập trang web này!!!!");
          navigate("/");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Bạn không có quyền truy cập trang web này!!!!");
        navigate("/");
      }
    } else {
      alert("Bạn không có quyền truy cập trang web này!!!!");
      navigate("/");
    }
  }, [navigate]);

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
