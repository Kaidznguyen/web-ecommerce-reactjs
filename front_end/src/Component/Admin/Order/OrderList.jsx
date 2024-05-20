import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { useTable, usePagination, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import OrderAPI from "../../../Service/OrderAPI.js";
import OrderDetail from "./OrderDetail.jsx";
import OrderUpdateState from "./OrderUpdateState.jsx";
export default function OrderList() {
    const [postcates, setPostCates] = useState([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isStateModalVisible, setIsStateModalVisible] = useState(false);
    const [selectedPostCate, setSelectedPostCate] = useState(null);


  // lấy data
  useEffect(() => {
    async function fetchPostCates() {
      try {
        const data = await OrderAPI.getAllAdmin();
        setPostCates(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPostCates();
  }, []);
  // hàm dịch 
function translateStatus(status) {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Hủy đơn';
      
      // Nếu không khớp với bất kỳ trạng thái nào, trả về chính nó
      default:
        return status;
    }
  }
  const data = React.useMemo(
    () =>
      postcates.map((order, index) => ({
        TT: index + 1,
        "Mã vận đơn": order.shipping_id,
        "Tên khách hàng": order.name,
        "Số điện thoại": order.phone,
        "Lời nhắn": order.note,
        "Thanh toán": order.payment,
        "Trạng thái":translateStatus(order.status),
        "Thao tác": (
          <div className="icon-manipulation">
            {/* Sử dụng sự kiện onClick để hiển thị EditBlogCate */}
            <button onClick={() => handleDetailClick(order.id_order)} title="Chi tiết đơn hàng">
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
            <button onClick={() => handleStateClick(order.id_order)} title="Cập nhật trạng thái đơn hàng">
              <FontAwesomeIcon icon={faClipboardList} />
            </button>
          </div>
        ),
      })),
    [postcates]
  );

  const columns = React.useMemo(
    () => [
      { Header: "TT", accessor: "TT" },
      { Header: "Mã vận đơn", accessor: "Mã vận đơn" },
      { Header: "Tên khách hàng", accessor: "Tên khách hàng" },
      { Header: "Số điện thoại", accessor: "Số điện thoại" },
      { Header: "Lời nhắn", accessor: "Lời nhắn" },
      { Header: "Thanh toán", accessor: "Thanh toán" },
      { Header: "Trạng thái", accessor: "Trạng thái" },
      { Header: "Thao tác", accessor: "Thao tác" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination
  );


  const handleDetailClick = (orderId) => {
    setIsDetailModalVisible(true);
    setSelectedPostCate(orderId);
  };

  const handleStateClick = (orderId) => {
    setIsStateModalVisible(true);
    setSelectedPostCate(orderId);
  };
  const handleCancel = () => {
    setIsDetailModalVisible(false);
    setIsStateModalVisible(false);
  };

  return (
    <div className="main__admin custom_margin">
      <h1 className="title-tab_admin2-main">Quản lý hóa đơn</h1>
      <div className="product-management">
        <div className="the-record">
         {/* Hiển thị EditBlogCate khi được bật */}
      {isDetailModalVisible && (
        <OrderDetail
          isModalVisible={isDetailModalVisible}
          orderId={selectedPostCate}
          handleCancel={handleCancel}
        />
        
      )}
      {isStateModalVisible && (
      <OrderUpdateState 
      isModalVisible={isStateModalVisible}
      orderId={selectedPostCate}
      handleCancel={handleCancel}
      />
      )}
        </div>
        <table
          {...getTableProps()}
          className="table__product-admin"
          style={{ width: "100%" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="title-card-admin"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="header-cell"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="card__admin">
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginLeft: "500px" }}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Trước
          </button>
          <span>
            Trang{" "}
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>{" "}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}
