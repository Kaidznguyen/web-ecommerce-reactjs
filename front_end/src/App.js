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
import HeaderAdmin from './Component/Admin/HeaderAdmin'
import FooterAdmin from './Component/Admin/FooterAdmin';
import Loading from './Component/Loading';
import PostCatePage from './Pages/UserPage/PostCatePage';
import PostDetailPage from './Pages/UserPage/PostDetailPage';

function UserLayout() {
  return (
    <>
      <HeaderUser />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/Detail-Figure/:id" element={<DetailFgurePage />} />
        <Route exact path="/Blog" element={<PostCatePage />} />
        <Route exact path='/Blog-Detail/:id' element={<PostDetailPage />}/>
        <Route path="*" element={<ErorrPage />} />
      </Routes>
      <FooterUser />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <HeaderAdmin />
      <Routes>
        <Route exact path="/dashboard" element={<DashboadPage />} />
      </Routes>
      <FooterAdmin />
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
    }, 1500); // Simulate loading time

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
