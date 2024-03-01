import React, { useState, useEffect } from "react";
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import { useTable, usePagination, useSortBy } from 'react-table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import FigureAPI from "../../../Service/FigureAPI.js";
import numeral from "numeral";
import AddFigure from "./AddFigure.jsx";
import EditFigure from "./EditFigure.jsx";

export default function MainFigure() {
  const [figures, setFigures] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPostCate, setSelectedPostCate] = useState(null);

// lấy tất cả sp
  useEffect(() => {
    async function fetchFigures() {
      try {
        const data = await FigureAPI.getAllAdmin();
        setFigures(data.data);

      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchFigures();
  }, []);

  const data = React.useMemo(
    () => figures.map((figure, index) => ({
      TT: index + 1,
      Ảnh: <img src={"http://localhost:8080/" + figure.img} alt="" />,
      'Phân loại': figure.name_cate,
      'Tên sản phẩm': figure.name,
      Giá: numeral(figure.price).format("$0,0"),
      'Giá khuyến mãi': figure.promotionprice !== 0 ? numeral(figure.promotionprice).format("$0,0") : "Không khuyến mãi",
      'Trạng thái': figure.status === 1 ? <FontAwesomeIcon icon={faCircleCheck} className="icon_check" /> : <FontAwesomeIcon icon={faCircleXmark} className="icon_check" />,
      'Thao tác': (
        <div className="icon-manipulation">
          <button onClick={() => handleEditClick(figures)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    })),
    [figures]
  );

  const columns = React.useMemo(
    () => [
      { Header: 'TT', accessor: 'TT' },
      { Header: 'Ảnh', accessor: 'Ảnh', Cell: row => <div className="img-cell">{row.value}</div> },
      { Header: 'Phân loại', accessor: 'Phân loại' },
      { Header: 'Tên sản phẩm', accessor: 'Tên sản phẩm' },
      { Header: 'Giá', accessor: 'Giá' },
      { Header: 'Giá khuyến mãi', accessor: 'Giá khuyến mãi' },
      { Header: 'Trạng thái', accessor: 'Trạng thái' },
      { Header: 'Thao tác', accessor: 'Thao tác' },
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
  } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, useSortBy, usePagination);
  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleEditClick = (figures) => {
    setSelectedPostCate(figures);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
  };
  return (
    <div className="main__admin custom_margin">
      <h1 className="title-tab_admin2-main">Quản lý mô hình</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2" onClick={handleAddClick}><FontAwesomeIcon icon={faCirclePlus} /> Thêm mô hình</div>
        </div>
        <AddFigure isModalVisible={isAddModalVisible}
          handleCancel={handleCancel}/>
        <EditFigure isModalVisible={isEditModalVisible}
          postcate={selectedPostCate}
          handleCancel={handleCancel}/>
        <table {...getTableProps()} className="table__product-admin" style={{ width: '100%' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="title-card-admin">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="header-cell">
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="card__admin">
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{marginLeft:'500px'}}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Trước
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
