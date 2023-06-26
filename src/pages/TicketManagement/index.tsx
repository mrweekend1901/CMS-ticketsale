import React, { useEffect } from 'react';
import SearchInput from '../../components/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketManagement } from '../../redux/actions/ticketManagementAction';
import { RootState } from '../../redux/reducers/rootReducer';
import { TicketManagementType } from '../../redux/types/ticketManagementType';
import { ThunkDispatch } from 'redux-thunk';

import classNames from 'classnames/bind';
import styles from './TicketManagement.module.scss';

const cx = classNames.bind(styles);

const TicketManagement: React.FC = () => {
  // Lấy dữ liệu User từ Redux
  const dispatch: ThunkDispatch<RootState, null, any> = useDispatch();
  const ticketsManagement = useSelector(
    (state: RootState) => state.ticketManagement.ticketsManagement,
  );
  const loading = useSelector((state: RootState) => state.ticketManagement.loading);
  const error = useSelector((state: RootState) => state.ticketManagement.error);

  useEffect(() => {
    // Gọi hàm fetchUsers khi component được mount
    dispatch(fetchTicketManagement());
  }, [dispatch]);

  // Render RowHead
  const renderHeadRow = () => {
    return (
      <>
        <th>STT</th>
        <th>Booking code</th>
        <th>Số vé</th>
        <th>Tên sự kiện</th>
        <th>Tình trạng sử dụng</th>
        <th>Ngày sử dụng</th>
        <th>Ngày xuất vé</th>
        <th>Cổng check - in</th>
      </>
    );
  };

  // Render RowBody
  const renderBodyRow = (ticketManagement: TicketManagementType, index: number) => (
    <>
      <td>{ticketManagement.numerical}</td>
      <td>{ticketManagement.bookingCode}</td>
      <td>{ticketManagement.ticketID}</td>
      <td>{ticketManagement.eventName}</td>
      <td>{ticketManagement.ticketStatus}</td>
      <td>{ticketManagement.dayUse}</td>
      <td>{ticketManagement.dayMFG}</td>
      <td>{ticketManagement.address}</td>
    </>
  );

  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Đang tìm kiếm:', searchTerm);
  };

  console.log(ticketsManagement);

  return (
    <div className={cx('wraper')}>
      <header className={cx('header')}>Danh sách vé</header>
      <div className={cx('body')}>
        <div className={cx('feature-group')}>
          <SearchInput
            onSearch={handleSearch}
            placeholder="Tìm bằng số vé"
            width="446px"
            height="48px"
            backgroundColor="#F7F7F8"
          />

          <span className={cx('btn-group')}>
            <button className={cx('btn-style', 'btn-feature')}>
              <span className={cx('btn-icon')}>
                <FontAwesomeIcon icon={faFilter} />
              </span>
              <p className={cx('btn-text')}>Lọc vé</p>
            </button>
            <button className={cx('btn-style', 'btn-feature')}>
              <p className={cx('btn-text')}>Xuất file (.csv)</p>
            </button>
          </span>
        </div>
        <div className={cx('table')}>
          <Table<TicketManagementType>
            data={ticketsManagement}
            loading={loading}
            error={error}
            renderHeadRow={renderHeadRow}
            renderBodyRow={renderBodyRow}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
