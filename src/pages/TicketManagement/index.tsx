import React, { Fragment, useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketManagement } from '../../redux/actions/ticketManagementAction';
import { RootState } from '../../redux/reducers/rootReducer';
import { TicketManagementType } from '../../redux/types/ticketManagementType';
import { ThunkDispatch } from 'redux-thunk';
import TicketStatus from '../../components/TicketStatus';
import FilterTicketPopup, { FilterData } from '../../components/FilterTicketPopup';

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

  // Số lượng trang của Table
  const itemsPerPage = 12;

  // Render RowHead
  const renderHeadRow = () => {
    return (
      <Fragment>
        <th>STT</th>
        <th className={cx('left')}>Booking code</th>
        <th className={cx('left')}>Số vé</th>
        <th className={cx('left')}>Tên sự kiện</th>
        <th className={cx('left')}>Tình trạng sử dụng</th>
        <th className={cx('right')}>Ngày sử dụng</th>
        <th className={cx('right')}>Ngày xuất vé</th>
        <th>Cổng check - in</th>
      </Fragment>
    );
  };

  // Render RowBody
  const renderBodyRow = (ticketManagement: TicketManagementType, index: number) => (
    <Fragment>
      <td className={cx('stt')}>{index + 1}</td>
      <td>{ticketManagement.bookingCode}</td>
      <td>{ticketManagement.ticketID}</td>
      <td>{ticketManagement.eventName}</td>
      <td>
        <TicketStatus ticketStatus={ticketManagement.ticketStatus} />
      </td>
      <td className={cx('day-use')}>{ticketManagement.dayUse}</td>
      <td className={cx('day-mfg')}>{ticketManagement.dayMFG}</td>
      <td className={cx('address')}>{ticketManagement.address}</td>
    </Fragment>
  );

  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Đang tìm kiếm:', searchTerm);
    // Áp dụng logic lọc vào ticketsManagement dựa trên searchTerm
    const filteredTickets = ticketsManagement.filter((ticket: TicketManagementType) => {
      return ticket.ticketID.includes(searchTerm);
    });

    // Lưu trữ dữ liệu đã lọc vào state filteredData
    setFilteredData(filteredTickets);
  };

  // Show popup
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(!showPopup);
  };

  // Ngăn hành vi nổi bọt, popup không bị ẩn
  const handleInnerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const [filteredData, setFilteredData] = useState<TicketManagementType[]>([]);

  function convertStringToDate(dateString: any) {
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null;
    }

    const dateObject = new Date(year, month, day);
    return dateObject;
  }

  // Nhận dữ liệu từ FilterPopup
  const handleFilter = (dataFilter: FilterData) => {
    setShowPopup(!showPopup);
    // console.log('Data Filter received in parent component:', dataFilter);

    // Lọc dữ liệu theo các điều kiện
    const filteredTickets = ticketsManagement.filter((ticket: TicketManagementType) => {
      // Lọc theo trạng thái vé
      if (
        !dataFilter.radioValue.includes('Tất cả') &&
        !dataFilter.radioValue.includes(ticket.ticketStatus)
      ) {
        return false;
      }

      // Lọc theo cổng Check - in
      if (
        !dataFilter.checkboxValue.includes('Tất cả') &&
        !dataFilter.checkboxValue.some(address => address === ticket.address)
      ) {
        return false;
      }

      //Lọc theo ngày
      if (dataFilter.startDate !== null && dataFilter.endDate !== null) {
        const ticketDateMFG = convertStringToDate(ticket.dayMFG);
        const ticketDateUse = convertStringToDate(ticket.dayUse);

        if (
          ticketDateMFG &&
          ticketDateMFG >= dataFilter.startDate &&
          ticketDateUse &&
          ticketDateUse <= dataFilter.endDate
        ) {
          return true; // Ticket nằm giữa ticketDateMFG và ticketDateUse
        } else {
          return false;
        }
      }

      return true; // Mặc định trả về true nếu không có điều kiện lọc nào áp dụng
    });

    setFilteredData(filteredTickets);
  };

  return (
    <Fragment>
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
              <button className={cx('btn-style', 'btn-feature')} onClick={handleClosePopup}>
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
              data={filteredData.length > 0 ? filteredData : ticketsManagement}
              loading={loading}
              error={error}
              itemsPerPage={itemsPerPage}
              renderHeadRow={renderHeadRow}
              renderBodyRow={renderBodyRow}
            />
          </div>
        </div>
      </div>
      {showPopup && (
        <div className={cx('popup')} onClick={handleClosePopup}>
          <div className={cx('popup-inner')} onClick={handleInnerClick}>
            <FilterTicketPopup onFilter={handleFilter} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TicketManagement;
