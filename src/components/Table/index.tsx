import React from 'react';

import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

// Interface định nghĩa các props cho component Table
interface TableProps<T> {
  data: T[]; // Dữ liệu hiển thị trong bảng
  loading: boolean;
  error: string | null;
  renderHeadRow: () => React.ReactNode;
  renderBodyRow: (item: T, index: number) => React.ReactNode; // Callback function để render từng dòng trong bảng
}

const Table = <T extends {}>({
  data,
  loading,
  error,
  renderHeadRow,
  renderBodyRow,
}: TableProps<T>) => {
  //Hiển thị loading hoặc lỗi
  if (loading) {
    return <div className={cx('message', 'load')}>Loading...</div>;
  }

  if (error) {
    return <div className={cx('message', 'error')}>Error: {error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>{renderHeadRow()}</tr>
      </thead>
      <tbody>
        {data.map((item: T, index: number) => (
          <tr key={index}>{renderBodyRow(item, index)}</tr> // Render từng dòng trong bảng bằng cách gọi callback function renderRow
        ))}
      </tbody>
    </table>
  );
};

export default Table;
