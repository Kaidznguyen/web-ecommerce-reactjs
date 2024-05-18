import React from "react";
import "../../assets/user-page/main.css";
import "../../assets/user-page/grid-system.css";
import "../../assets/user-page/reponsive.css";
import Table_item from "../../Component/User/Cart/Table_item";
export default function CartPage() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Cuộn mượt
  });
  return (
    <div className="container">
      <div className="grid wide">
        <div className="col l-12 m-12 c-12 table-content">
          <h2 className="cart-title">DSHOP | Giỏ hàng</h2>
          <Table_item />
        </div>
      </div>
    </div>
  );
}
