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
import PostAPI from "../../../Service/PostAPI.js";
export default function BlogList() {
  const [posts, setPosts] = useState([]);
  // lấy tất cả sp
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await PostAPI.getAllAdmin();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching post categories: ", error);
      }
    }

    fetchPosts();
  }, []);
  const data = React.useMemo(
    () =>
      posts.map((post, index) => ({
        TT: index + 1,
        Ảnh: <img src={"http://localhost:8080/" + post.img} alt="" />,
        "Phân loại": post.name_cate,
        "Tên bài viết": post.title,
        "Mô tả": post.author,

        "Trạng thái":
          post.status === 1 ? (
            <FontAwesomeIcon icon={faCircleCheck} className="icon_check" />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} className="icon_check" />
          ),
        "Thao tác": (
          <div className="icon-manipulation">
            <button>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
      })),
    [posts]
  );

  const columns = React.useMemo(
    () => [
      { Header: "TT", accessor: "TT" },
      {
        Header: "Ảnh",
        accessor: "Ảnh",
        Cell: (row) => <div className="img-cell">{row.value}</div>,
      },
      { Header: "Phân loại", accessor: "Phân loại" },
      { Header: "Tên bài viết", accessor: "Tên bài viết" },
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
  return (
    <div className="main__admin custom_margin">
      <h1 className="title-tab_admin2-main">Quản lý bài viết</h1>
      <div className="product-management">
        <div className="the-record">
          <div className="title-tab_admin2">
            <FontAwesomeIcon icon={faCirclePlus} /> Thêm bài viết
          </div>
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
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
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
