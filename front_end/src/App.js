import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './Pages/UserPage/HomePage';
import ErorrPage from './Pages/UserPage/ErrorPage';
import HeaderUser from './Component/User/HeaderUser';
import FooterUser from './Component/User/FooterUser';
import Login from './Component/User/Login';
import RegisAccount from './Component/User/RegisAccount';
import DetailFgurePage from './Pages/UserPage/DetailFgurePage';
import DashboadPage from './Pages/AdminPage/DashboadPage';
import Loading from './Component/Loading';
import PostCatePage from './Pages/UserPage/PostCatePage';
import PostDetailPage from './Pages/UserPage/PostDetailPage';
import PostByIdcatePage from './Pages/UserPage/PostByIdcatePage';
import FigureCatePage from './Pages/UserPage/FigureCatePage';
import FiguByCatePage from './Pages/UserPage/FiguByCatePage';
import FiguByBrandPage from './Pages/UserPage/FiguByBrandPage';
import FigureAdminPage from './Pages/AdminPage/FigureAdminPage';
import FiguCateAdminPage from './Pages/AdminPage/FiguCateAdminPage';
import BrandAdminPage from './Pages/AdminPage/BrandAdminPage';
import BlogAdminPage from './Pages/AdminPage/BlogAdminPage';
import BlogCatePage from './Pages/AdminPage/BlogCatePage';
import CartPage from './Pages/UserPage/CartPage';
import OrderAdminPage from './Pages/AdminPage/OrderAdminPage';
function UserLayout() {
  return (
    <>
      <HeaderUser />
      <Routes>
        {/* trang chủ */}
        <Route exact path="/" element={<HomePage />} />
        {/* trang chi tiết sp */}
        <Route exact path="/Detail-Figure/:id" element={<DetailFgurePage />} />
        {/* trang tất cả bài viết */}
        <Route exact path="/Blog" element={<PostCatePage />} />
        {/* trang xem bài viết theo loại */}
        <Route exact path="/Blog/:categoryId" element={<PostByIdcatePage />} />
        {/* trang chi tiết bài viết */}
        <Route exact path='/Blog-Detail/:id' element={<PostDetailPage />}/>
        {/* trang tất cả mô hình */}
        <Route exact path='/Figure' element={<FigureCatePage />}/>
        {/* trang xem mô hình theo loại */}
        <Route exact path='/Figure-cate/:cateId' element={<FiguByCatePage />}/>
        {/* trang xem mô hình theo thương hiệu */}
        <Route exact path='/Figure-brand/:brandId' element={<FiguByBrandPage />}/>
        {/* trang giỏ hàng */}
        <Route exact path="/Cart" element={<CartPage />} />
        {/* trang cảm ơn mua hàng */}
        {/* trang lỗi */}
        <Route path="*" element={<ErorrPage />} />
      </Routes>
      <FooterUser />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      {/* <NavLeft /> */}
      <Routes>
      
        {/* Trang thống kê */}
        <Route exact path="/dashboard" element={<DashboadPage />} />
        {/* Trang quản lý mô hình */}
        <Route exact path="/Figure-Admin" element={<FigureAdminPage />} />
        {/* Trang quản lý loại mô hình */}
        <Route exact path="/FiguCate-Admin" element={<FiguCateAdminPage />} />
        {/* Trang quản lý thương hiệu */}
        <Route exact path="/Brand-Admin" element={<BrandAdminPage />} />
        {/* Trang quản lý bài viết */}
        <Route exact path="/Blog-Admin" element={<BlogAdminPage />} />
        {/* Trang quản lý loại bài viết */}
        <Route exact path="/BlogCate-Admin" element={<BlogCatePage />} />
        {/* Trang quản lý hóa đơn bán */}
        <Route exact path="/Order-Admin" element={<OrderAdminPage />} />
        {/* Trang lỗi */}
        <Route path="*" element={<ErorrPage />} />
       
      </Routes>

    </>
  );
}

function App() {
  return (
    <div className="main">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading time

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/system/*" element={<AdminLayout />} />
      </Routes>
      <Login />
      <RegisAccount />
    </>
  );
}

export default App;
