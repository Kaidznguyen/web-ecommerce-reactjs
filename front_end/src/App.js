import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/UserPage/HomePage';
import ErorrPage from './Pages/UserPage/ErrorPage';
import HeaderUser from './Component/HeaderUser';
import FooterUser from './Component/FooterUser';
import Login from './Component/Login';
import RegisAccount from './Component/RegisAccount';
import DetailFgurePage from './Pages/UserPage/DetailFgurePage';
import DashboadPage from './Pages/AdminPage/DashboadPage';
import HeaderAdmin from './Component/HeaderAdmin'
import FooterAdmin from './Component/FooterAdmin';

function UserLayout() {
  return (
    <>
      <HeaderUser />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/Detail-Figure/:id" element={<DetailFgurePage />} />
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
        <Routes>
          <Route path="/" element={<UserLayout />} />
          <Route path="/system/*" element={<AdminLayout />} />
        </Routes>
      </Router>
      <Login />
      <RegisAccount />
    </div>
  );
}

export default App;
