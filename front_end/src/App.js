import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/UserPage/HomePage';
import ErorrPage from './Pages/UserPage/ErrorPage';
import HeaderUser from './Component/HeaderUser';
import FooterUser from './Component/FooterUser';
function App() {
  return (
    <div className="main">
      <HeaderUser />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<ErorrPage />} />
        </Routes>
      </Router>
      <FooterUser />
    </div>

  );
}

export default App;
