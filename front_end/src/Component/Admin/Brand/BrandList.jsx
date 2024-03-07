import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { useTable, usePagination, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import BrandAPI from "../../../Service/BrandAPI.js";
import AddBrand from "./AddBrand.jsx";
import EditBrand from "./EditBrand.jsx";
import { Modal, Popconfirm } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPostCate, setSelectedPostCate] = useState(null);
  // lấy tất cả sp
  useEffect(() => {
    async function fetchBrandes() {
      try {
        const data = await BrandAPI.getAllAdmin();
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchBrandes();
  }, []);
    // xóa
    const handleDeleteClick = (categoryId) => {
      Modal.confirm({
        title: "Xác nhận xóa",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc muốn xóa loại bài viết này không?",
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            // Gọi service để xóa loại bài viết dựa vào categoryId
            await BrandAPI.delete(categoryId);
  
            // Reload trang sau khi xóa thành công
            window.location.reload();
          } catch (error) {
            console.error("Error deleting post category:", error);
          }
        },
        onCancel: () => {
          console.log("Hủy xác nhận xóa");
        },
      });
    };
  const data = React.useMemo(
    () =>
      brands.map((brand, index) => ({
        TT: index + 1,
        Ảnh: <img src={"http://localhost:8080/" + brand.img_brand} alt="" style={{marginLeft:'50px'}}/>,
        "Tên thương hiệu": brand.name_brand,
        "Mô tả": brand.description_brand,
        "Trạng thái":
          brand.status === 1 ? (
            <FontAwesomeIcon icon={faCircleCheck} className="icon_check" />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} className="icon_check" />
          ),
        "Thao tác": (
          <div className="icon-manipulation">
            <button onClick={() => handleEditClick(brand.id_brand)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={() => handleDeleteClick(brand.id_brand)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
      })),
    [brands]
  );

  const columns = React.useMemo(
    () => [
      { Header: "TT", accessor: "TT" },
      {
        Header: "Ảnh",
        accessor: "Ảnh",
        Cell: (row) => (
          <div
            className="img-cell"
            style={{ marginLeft: "15px", marginBottom: "15px" }}
          >
            {row.value}
          </div>
        ),
      },
      { Header: "Tên thương hiệu", accessor: "Tên thương hiệu" },
      { Header: "Mô tả", accessor: "Mô tả" },
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
  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleEditClick = (brandId) => {
    const selectedPostCate = brands.find(
      (brand) => brand.id_brand === brandId
    );
    setIsEditModalVisible(true);
    setSelectedPostCate(selectedPostCate);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
  };
  return (
    <div className="main__admin custom_margin">
      <h1 className="title-tab_admin2-main">Quản lý thương hiệu mô hình</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" onClick={handleAddClick}>
            <FontAwesomeIcon icon={faCirclePlus} />
            Thêm thương hiệu
          </div>
        </div>
        <AddBrand isModalVisible={isAddModalVisible}
          handleCancel={handleCancel}/>
        <EditBrand  isModalVisible={isEditModalVisible}
          initialValue={selectedPostCate} // Truyền selectedPostCate vào prop initialValue
          handleCancel={handleCancel}/>
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
  );
}
