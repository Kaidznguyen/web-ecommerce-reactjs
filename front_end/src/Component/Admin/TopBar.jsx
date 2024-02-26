import React from 'react'
import '../../assets/user-page/main.css'
import '../../assets/user-page/grid-system.css' 
import '../../assets/user-page/reponsive.css'
import "../../assets/user-page/main.js";
import avata from '../../assets/user-page/img/mô hình/luffy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSun, faMoon,faBorderAll} from '@fortawesome/free-solid-svg-icons'

export default function TopBar() {
  return (
    <div className="main__admin">
<div className="topbar">
    <div className="toggle">
    <FontAwesomeIcon icon={faBorderAll} />
    </div>
    <div className="search-admin">
        <label htmlFor="" id="">
            <input type="text" placeholder="Nhập từ khóa để tìm kiếm..."/>
            <ion-icon name="search-outline"></ion-icon>
        </label>
    </div>
    <div className="dark-light__them">
        <span className="them active_them"><FontAwesomeIcon icon={faSun} /></span>
        <span className="them"><FontAwesomeIcon icon={faMoon} /></span>
    </div>
    <div className="user-admin">
        <img src={avata} alt="" />
    </div>
</div>
</div>
  )
}
