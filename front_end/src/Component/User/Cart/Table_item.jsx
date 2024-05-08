import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import nocart from '../../../assets/user-page/img/app/no_cart.png';
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal, notification } from "antd";
export default function Table_item() {
  const [products, setProducts] = useState([]);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [productToDeleteIndex, setProductToDeleteIndex] = useState(null);
  const [confirmDeleteAllVisible, setConfirmDeleteAllVisible] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  // hàm xử lý lấy sản phẩm trong local
  useEffect(() => {
    // Lấy danh sách sản phẩm từ local storage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setProducts(storedCart);
    }else {
      setIsEmptyCart(true);
    }
  }, []);
  // Hàm xử lý sự kiện khi thay đổi số lượng sản phẩm

  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].amount = newQuantity;
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };
  // hàm xử lý xóa 1 sản phẩm
  const handleDeleteProduct = (index) => {
    setProductToDeleteIndex(index);
    setConfirmDeleteVisible(true);
  };
  const confirmDelete = () => {
    const updatedProducts = [...products];
    updatedProducts.splice(productToDeleteIndex, 1);
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    setConfirmDeleteVisible(false);
    notification.success({
      message: "Xóa sản phẩm thành công",
      duration: 2,
    });
  };

  const cancelDelete = () => {
    setConfirmDeleteVisible(false);
  };
  // xóa tất cả
  const handleDeleteAll = () => {
    setConfirmDeleteAllVisible(true);
  };

  const confirmDeleteAll = () => {
    localStorage.removeItem("cart");
    setProducts([]);
    setConfirmDeleteAllVisible(false);
    notification.success({
      message: "Xóa toàn bộ giỏ hàng thành công",
      duration: 1,
      onClose: () => {
        window.location.reload();
      }
    });
  };

  const cancelDeleteAll = () => {
    setConfirmDeleteAllVisible(false);
  };
  return (
    <div id="cart-product">
      {isEmptyCart ? (
       
        <div>
          <h2 className="no_cart_text">Giỏ hàng hiện chưa có bất cứ cái gì hãy bắt đầu mua sắm ngay khi <Link to="/Figure">click vào đây</Link></h2>
          <img src={nocart} alt="" className="no_cart_img" />

        </div>
      ) : (
        <table cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th className="cart-product_title">Ảnh</th>
              <th className="cart-product_title">Phân loại</th>
              <th className="cart-product_title">Tên sản phẩm</th>
              <th className="cart-product_title">Đơn giá</th>
              <th className="cart-product_title">Số lượng</th>
              <th className="cart-product_title">Thành tiền</th>
              <th className="cart-product_title">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={"http://localhost:8080/" + product.img}
                    alt="Product Image"
                    className="cart-product_img"
                  />
                </td>
                <td>
                  <a href="#">{product.name_cate}</a>
                </td>
                <td>
                  <Link to={`/Detail-Figure/${product.id}`}>{product.name}</Link>
                </td>
                <td>
                  {product.promotionprice !== 0
                    ? numeral(product.promotionprice).format("$0,0")
                    : numeral(product.price).format("$0,0")}
                </td>

                <td>
                  <input
                    type="button"
                    className="cart-product_min"
                    value="-"
                    onClick={() =>
                      handleQuantityChange(index, Math.max(1, product.amount - 1))
                    } // Giảm số lượng
                  />
                  <input
                    type="text"
                    className="cart-product_number"
                    min={"1"}
                    value={product.amount}
                    readOnly
                  />
                  <input
                    type="button"
                    className="cart-product_max"
                    value="+"
                    onClick={() =>
                      handleQuantityChange(
                        index,
                        Math.min(99, product.amount + 1)
                      )
                    } // Tăng số lượng
                  />
                </td>
                <td>
                  {product.promotionprice !== 0
                    ? numeral(product.promotionprice * product.amount).format(
                        "$0,0"
                      )
                    : numeral(product.price * product.amount).format("$0,0")}
                </td>

                <td>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cart-product_delete_icon"
                    onClick={() => handleDeleteProduct(index)} // Gọi hàm xóa sản phẩm khi người dùng nhấn vào biểu tượng thùng rác
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      {/* modal xóa 1 sản phẩm */}
      <Modal
        title="Xác nhận xóa mô hình khỏi giỏ hàng"
        visible={confirmDeleteVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa mô hình này?</p>
      </Modal>
      {/* modal xóa tất cả sản phẩm */}
      <Modal
        title="Xác nhận xóa toàn bộ giỏ hàng"
        visible={confirmDeleteAllVisible}
        onOk={confirmDeleteAll}
        onCancel={cancelDeleteAll}
        okText="Xóa toàn bộ"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?</p>
      </Modal>
  {/* Phần nút Tiếp tục mua sắm và Xóa toàn bộ giỏ hàng */}
  <div style={{ display: isEmptyCart ? "none" : "block" }}>
    <button className="btn btn--primary" style={{ marginTop: "35px" }}>
      <Link
        to={"/"}
        style={{ textDecoration: "none", color: "var(--white-color)" }}
      >
        Tiếp tục mua sắm
      </Link>
    </button>
    <button
      className="btn btn--primary"
      style={{ marginTop: "35px", marginLeft: "20px" }}
      onClick={handleDeleteAll}
    >
      Xóa toàn bộ giỏ hàng
    </button>
  </div>
    </div>
  );
}
