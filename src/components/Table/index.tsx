import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Table.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// Interface định nghĩa các props cho component Table
interface TableProps<T> {
  data: T[]; // Dữ liệu hiển thị trong bảng
  loading: boolean;
  error: string | null;
  itemsPerPage?: number;
  renderHeadRow: () => React.ReactNode;
  renderBodyRow: (item: T, index: number) => React.ReactNode; // Callback function để render từng dòng trong bảng
}

const Table = <T extends {}>({
  data,
  loading,
  error,
  itemsPerPage = 6,
  renderHeadRow,
  renderBodyRow,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Paging
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Hiển thị loading hoặc lỗi khi đổ data Table
  if (loading) {
    return <div className={cx('message', 'load')}>Loading...</div>;
  }

  if (error) {
    return <div className={cx('message', 'error')}>Error: {error}</div>;
  }

  // Render phần phân trang
  const renderPagination = () => {
    const pageNumbersToShow = 5; // Số lượng số trang hiển thị
    const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2); // Nửa số lượng số trang hiển thị

    let startPage: number; // Trang bắt đầu
    let endPage: number; // Trang kết thúc

    if (totalPages <= pageNumbersToShow) {
      startPage = 1; // Trường hợp tổng số trang nhỏ hơn hoặc bằng số lượng số trang hiển thị
      endPage = totalPages;
    } else if (currentPage <= halfPageNumbersToShow) {
      startPage = 1; // Trường hợp trang hiện tại ở gần trang đầu
      endPage = pageNumbersToShow;
    } else if (currentPage + halfPageNumbersToShow >= totalPages) {
      startPage = totalPages - pageNumbersToShow + 1; // Trường hợp trang hiện tại ở gần trang cuối
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPageNumbersToShow; // Trường hợp trang hiện tại ở giữa danh sách trang
      endPage = currentPage + halfPageNumbersToShow;
    }

    const pages = [];
    // Trạng thái Page được chọn
    const isActivePage = (pageNumber: number) => {
      return pageNumber === currentPage;
    };

    // Trạng thái nút Back và Next bị disabled
    const isDisabled = (buttonType: string) => {
      if (buttonType === 'back') {
        return currentPage === 1;
      } else if (buttonType === 'next') {
        return currentPage === totalPages;
      }
      return false;
    };

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          className={isActivePage(i) ? cx('btn-page', 'active-page') : cx('btn-page')}
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>,
      );
    }

    const renderEllipsis = () => {
      if (endPage < totalPages) {
        return <span className={cx('ellipsis')}>...</span>; // Hiển thị dấu "..." khi có trang bị ẩn
      }
    };

    const disableBack = currentPage === 1; // Kiểm tra xem có phải là trang 1 hay không
    const disableNext = currentPage === totalPages; // Kiểm tra xem có phải trang cuối hay không

    // Hiển thị trang cuối cùng sau dấu "..."
    const renderLastPage = () => {
      if (endPage < totalPages) {
        return (
          <button
            className={cx('btn-page')}
            onClick={() => handlePageChange(totalPages)}
            disabled={disableNext}
          >
            {totalPages}
          </button>
        );
      }
    };

    return (
      <Fragment>
        <button
          className={
            isDisabled('back') ? cx('btn-changepage', 'btn-disabled') : cx('btn-changepage')
          }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disableBack}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        {pages}
        {renderEllipsis()}
        {renderLastPage()} {/* Hiển thị trang cuối cùng */}
        <button
          className={
            isDisabled('next') ? cx('btn-changepage', 'btn-disabled') : cx('btn-changepage')
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disableNext}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </Fragment>
    );
  };

  return (
    <span className={cx('wraper')}>
      <table className={cx('container')}>
        <thead>
          <tr className={cx('tr-head')}>{renderHeadRow()}</tr>
        </thead>
        <tbody>
          {currentData.map((item: T, index: number) => (
            <tr className={cx('tr-body')} key={index}>
              {renderBodyRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={cx('paging')}>{renderPagination()}</div> {/* Hiển thị phân trang */}
    </span>
  );
};

export default Table;
