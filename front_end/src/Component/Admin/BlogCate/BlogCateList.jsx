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
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import PostCateAPI from "../../../Service/PostCateAPI.js"
import { Modal } from 'antd';
import AddBlogCate from "./AddBlogCate.jsx";
import EditBlogCate from "./EditBlogCate.jsx";

export default function BlogCateList() {
    const [postcates, setPostCates] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedPostCate, setSelectedPostCate] = useState(null);

    useEffect(() => {
        async function fetchPostCates() {
            try {
                const data = await PostCateAPI.getAllAdmin();
                setPostCates(data.data);
            } catch (error) {
                console.error("Error fetching post categories: ", error);
            }
        }

        fetchPostCates();
    }, []);

    const data = React.useMemo(
        () => postcates.map((postcate, index) => ({
            TT: index + 1,
            'Tên loại bài viết': postcate.name_cate,
            'Mô tả': postcate.description_cate,
            'Trạng thái': postcate.status === 1 ? <FontAwesomeIcon icon={faCircleCheck} className="icon_check" /> : <FontAwesomeIcon icon={faCircleXmark} className="icon_check" />,
            'Thao tác': (
                <div className="icon-manipulation">
                    {/* Sử dụng sự kiện onClick để hiển thị EditBlogCate */}
                    <button onClick={() => handleEditClick(postcate)}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )
        })),
        [postcates]
    );

    const columns = React.useMemo(
        () => [
            { Header: 'TT', accessor: 'TT' },
            { Header: 'Tên loại bài viết', accessor: 'Tên loại bài viết' },
            { Header: 'Mô tả', accessor: 'Mô tả' },
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

    const handleEditClick = (postcate) => {
        setSelectedPostCate(postcate);
        setIsEditModalVisible(true);
    };

    const handleCancel = () => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
    };

    return (
        <div className="main__admin custom_margin">
            <h1 className="title-tab_admin2-main">Quản lý loại bài viết</h1>
            <div className="product-management">
                <div className="the-record">
                    <div className="title-tab_admin2" id="add" onClick={handleAddClick}>
                        <FontAwesomeIcon icon={faCirclePlus} /> Thêm loại bài viết
                    </div>
                    <AddBlogCate isModalVisible={isAddModalVisible} handleCancel={handleCancel} />
                </div>
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
            {/* Hiển thị EditBlogCate khi được bật */}
            {isEditModalVisible && (
                <EditBlogCate
                    isModalVisible={isEditModalVisible}
                    postcate={selectedPostCate}
                    handleCancel={handleCancel}
                />
            )}
        </div>
    );
}
