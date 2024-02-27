import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faUser, faComment, faClipboardList,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import '../../assets/user-page/main.css'
import '../../assets/user-page/grid-system.css' 
import '../../assets/user-page/reponsive.css'
import logo from  '../../assets/user-page/img/app/logo.png'
import { Link } from 'react-router-dom';
export default function HeaderAdmin() {
  return (

    <div className="navigation">
    <ul>
        <li><Link to={'/system/dashboard'}>
            <span className="icon-navigation__admin"><img src={logo} alt=""/></span>
            <span className="brand" style={{fontSize: '4rem',marginTop: '15px'}}>DShop</span>
        </Link></li>
        <li className="navigation-item"><Link to={'/system/dashboard'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faHouse} /></span>
            <span className="brand">Trang chủ</span>
        </Link></li>
        <li className="navigation-item"><Link to={'/system/User'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faUser} /></span>
            <span className="brand">Quản lý tài khoản</span>
        </Link></li>
        <li className="navigation-item"><Link  to={'/system/FiguCate-Admin'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faClipboardList} /></span>
            <span className="brand">Quản lý loại mô hình</span>
        </Link></li>
        <li className="navigation-item"><Link to={'/system/Brand-Admin'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faClipboardList} /></span>
            <span className="brand">Quản lý thương hiệu</span>
        </Link></li>
        <li className="navigation-item"><Link to={'/system/Figure-Admin'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faClipboardList} /></span>
            <span className="brand">Quản lý mô hình</span>
        </Link></li>
        <li className="navigation-item"><Link to={'/system/BlogCate-Admin'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faClipboardList} /></span>
            <span className="brand">Quản lý loại bài viết</span>
        </Link></li>
        <li className="navigation-item"><Link to={'/system/Blog-Admin'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faClipboardList} /></span>
            <span className="brand">Quản lý bài viết</span>
        </Link></li>
        <li className="navigation-item"><a href="#">
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faComment} /></span>
            <span className="brand">Nhắn tin</span>
        </a></li>
        {/* <li className="navigation-item"><a href="#tab_admin6">
            <span className="icon-navigation__admin"><ion-icon name="cog-outline"></ion-icon></span>
            <span className="brand">Cài đặt</span>
        </a></li> */}
        <li><Link to={'/'}>
            <span className="icon-navigation__admin"><FontAwesomeIcon icon={faRightFromBracket} /></span>
            <span className="brand">Đăng xuất</span>
        </Link></li>
    </ul>
</div>

  )
}
