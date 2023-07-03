import React, { Fragment, useEffect, useRef, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import RadioList from '../../components/RadioList';
import Dropdown from '../../components/Dropdown';
import { ThunkDispatch } from 'redux-thunk';
import Table from '../../components/Table';
import { RootState } from '../../redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TicketControlType } from '../../redux/types/ticketControlType';
import { fetchTicketControl } from '../../redux/actions/ticketControlAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../components/Calendar';

import classNames from 'classnames/bind';
import styles from './TicketControl.module.scss';

const cx = classNames.bind(styles);

const optionsRadio = [
  { id: '1', label: 'Tất cả', value: 'Tất cả' },
  { id: '2', label: 'Đã đối soát', value: 'Đã đối soát' },
  { id: '3', label: 'Chưa đối soát', value: 'Chưa đối soát' },
];

const optionsDropdown = [
  { id: '1', label: 'Tất cả', value: 'Tất cả' },
  { id: '2', label: 'Hội chợ công nghệ 2022', value: 'Hội chợ công nghệ 2022' },
  { id: '3', label: 'Hội chợ triễn lãm tiêu dùng 2023', value: 'Hội chợ triễn lãm tiêu dùng 2023' },
];

const TicketControl: React.FC = () => {
  // Lấy dữ liệu User từ Redux
  const dispatch: ThunkDispatch<RootState, null, any> = useDispatch();
  const ticketsControl = useSelector((state: RootState) => state.ticketControl.ticketsControl);
  const loading = useSelector((state: RootState) => state.ticketControl.loading);
  const error = useSelector((state: RootState) => state.ticketControl.error);

  useEffect(() => {
    // Gọi hàm fetchUsers khi component được mount
    dispatch(fetchTicketControl());
  }, [dispatch]);

  // Số lượng trang của Table
  const itemsPerPage = 12;
  const [filteredData, setFilteredData] = useState<TicketControlType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [radioValue, setRadioValue] = useState<string[]>([]);
  const [dropDownValue, setdropDownValue] = useState<string>('');

  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Đang tìm kiếm:', searchTerm);
    // Áp dụng logic lọc vào ticketsManagement dựa trên searchTerm
    const filteredTickets = ticketsControl.filter((ticket: TicketControlType) => {
      return ticket.ticketID.includes(searchTerm);
    });

    // Lưu trữ dữ liệu đã lọc vào state filteredData
    setFilteredData(filteredTickets);
  };

  // Show calendar
  const [isShowCalendarTo, setIsShowCalendarTo] = useState(false);

  const handleShowCalendarTo = () => {
    setIsShowCalendarTo(!isShowCalendarTo);
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    // console.log('Selected Date:', date);
  };

  const handleRangeSelect = (start: Date | null, end: Date | null) => {
    // console.log('Start Date:', start);
    // console.log('End Date:', end);
  };

  // Định dạng format ngày
  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  };

  // Xử lý chọn dropdown
  const handleDropdownSelect = (selectedValue: string) => {
    setdropDownValue(selectedValue);
  };

  // Xử lý chọn radio
  const handleRadioChange = (selectedValues: string[]) => {
    setRadioValue(selectedValues);
  };

  // Ơ lần đầu component mouted selecteday sẽ null
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setSelectedDate(null);
      isInitialMount.current = false;
    }
  }, []);

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

  // Xử lý lọc Table
  const handleFilterClick = () => {
    console.log(dropDownValue);
    // Lọc dữ liệu theo các điều kiện
    const filteredTickets = ticketsControl.filter((ticket: TicketControlType) => {
      // Lọc theo trạng thái vé
      if (
        radioValue.length > 0 &&
        !radioValue.includes('Tất cả') &&
        !radioValue.includes(ticket.controlStatus)
      ) {
        return false;
      }

      // Lọc theo tên sự kiện
      if (dropDownValue) {
        if (dropDownValue !== 'Tất cả' && !dropDownValue.includes(ticket.eventName)) {
          return false;
        }
      }

      //Lọc theo ngày
      if (selectedDate !== null) {
        const ticketDateUse = convertStringToDate(ticket.dayUse);

        // Trường hợp không có ngày sử dụng
        if (ticketDateUse && ticketDateUse <= selectedDate) {
          return true;
        } else {
          return false;
        }
      }

      return true; // Mặc định trả về true nếu không có điều kiện lọc nào áp dụng
    });

    setFilteredData(filteredTickets);
  };

  // Render RowHead
  const renderHeadRow = () => {
    return (
      <Fragment>
        <th>STT</th>
        <th className={cx('left')}>Số vé</th>
        <th className={cx('left')}>Tên sự kiện</th>
        <th className={cx('left')}>Loại vé</th>
        <th className={cx('right')}>Ngày sử dụng</th>
        <th>Cổng check - in</th>
        <th></th>
      </Fragment>
    );
  };

  // Render RowBody
  const renderBodyRow = (ticketControl: TicketControlType, index: number) => {
    const renderControlStatus = () => {
      if (ticketControl.controlStatus === 'Đã đối soát') {
        return <span className={cx('is-control')}>Đã đối soát</span>;
      } else {
        return <span className={cx('is-not-control')}>Chưa đối soát</span>;
      }
    };
    return (
      <Fragment>
        <td className={cx('stt')}>{index + 1}</td>
        <td>{ticketControl.ticketID}</td>
        <td>{ticketControl.eventName}</td>
        <td>{ticketControl.ticketType}</td>
        <td className={cx('day-use')}>{ticketControl.dayUse}</td>
        <td className={cx('address')}>{ticketControl.address}</td>
        <td>{renderControlStatus()}</td>
      </Fragment>
    );
  };

  return (
    <div className={cx('wraper')}>
      <span className={cx('wraper-big')}>
        <header className={cx('header')}>Đối soát vé</header>
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
                <p className={cx('btn-text')}>Chốt đối soát</p>
              </button>
            </span>
          </div>
          <div className={cx('table')}>
            <Table<TicketControlType>
              data={filteredData.length > 0 ? filteredData : ticketsControl}
              loading={loading}
              error={error}
              itemsPerPage={itemsPerPage}
              renderHeadRow={renderHeadRow}
              renderBodyRow={renderBodyRow}
            />
          </div>
        </div>
      </span>

      <span className={cx('wraper-small')}>
        <header className={cx('header')}>Lọc vé</header>
        <div className={cx('body')}>
          <span className={cx('dropdown')}>
            <Dropdown
              options={optionsDropdown}
              placeholder="Chọn sự kiện cần lọc"
              onSelect={handleDropdownSelect}
              width="360px"
              height="40px"
            />
          </span>
          <div className={cx('filter-group')}>
            <p className={cx('name')}>Tình trạng đối soát</p>
            <div className={cx('filter')}>
              <RadioList
                options={optionsRadio}
                onChange={handleRadioChange}
                style={{ flexDirection: 'column' }}
              />
            </div>
          </div>

          <div className={cx('filter-group', 'filter-group-center')}>
            <p className={cx('name')}>Loại vé</p>
            <div className={cx('filter')}>
              <p className={cx('text')}>Vé cổng</p>
            </div>
          </div>

          <div className={cx('filter-group', 'filter-group-center')}>
            <p className={cx('name')}>Từ ngày</p>
            <div className={cx('filter')}>
              <div className={cx('input-day', 'disable')}>
                <input className={cx('input')} type="text" disabled value={''} />
                <button className={cx('calendar-icon')}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
              </div>
            </div>
          </div>

          <div className={cx('filter-group', 'filter-group-center')}>
            <p className={cx('name')}>Đến ngày</p>
            <div className={cx('filter')}>
              <div className={isShowCalendarTo ? cx('input-day', 'active') : cx('input-day')}>
                <input
                  className={cx('input')}
                  type="text"
                  readOnly
                  value={formatDate(selectedDate)}
                />
                <button className={cx('calendar-icon')} onClick={handleShowCalendarTo}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                {isShowCalendarTo && (
                  <span className={cx('wraper')}>
                    <Calendar onDateSelect={handleDateSelect} onRangeSelect={handleRangeSelect} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className={cx('btn-style', 'btn-filter')} onClick={handleFilterClick}>
          Lọc
        </button>
      </span>
    </div>
  );
};

export default TicketControl;
