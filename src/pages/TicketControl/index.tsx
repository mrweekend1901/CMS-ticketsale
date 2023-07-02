import React, { Fragment, useEffect } from 'react';
import SearchInput from '../../components/SearchInput';
import RadioList from '../../components/RadioList';
import Dropdown from '../../components/Dropdown';
import { ThunkDispatch } from 'redux-thunk';
import Table from '../../components/Table';
import { RootState } from '../../redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TicketControlType } from '../../redux/types/ticketControlType';
import { fetchTicketControl } from '../../redux/actions/ticketControlAction';

import classNames from 'classnames/bind';
import styles from './TicketControl.module.scss';

const cx = classNames.bind(styles);

const optionsRadio = [
  { id: '1', label: 'Tất cả', value: 'option1' },
  { id: '2', label: 'Đã đối soát', value: 'option2' },
  { id: '3', label: 'Chưa đối soát', value: 'option3' },
];

const optionsDropdown = [
  { id: '1', label: 'Option 1', value: 'option1' },
  { id: '2', label: 'Option 2', value: 'option2' },
  { id: '3', label: 'Option 3', value: 'option3' },
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

  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Searching for:', searchTerm);
  };

  // Xử lý chọn dropdown
  const handleDropdownSelect = (selectedValue: string) => {
    console.log(selectedValue);
  };

  // Xử lý chọn radio
  const handleRadioChange = (selectedValues: string[]) => {
    console.log('Selected options:', selectedValues);
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
      if (ticketControl.controlStatus) {
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
              data={ticketsControl}
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

          <div className={cx('filter-group')}>
            <p className={cx('name')}>Loại vé</p>
            <div className={cx('filter')}>
              <p className={cx('text')}>Vé cổng</p>
            </div>
          </div>

          <div className={cx('filter-group')}>
            <p className={cx('name')}>Từ ngày</p>
            <div className={cx('filter')}></div>
          </div>

          <div className={cx('filter-group')}>
            <p className={cx('name')}>Đến ngày</p>
            <div className={cx('filter')}></div>
          </div>
        </div>
        <button className={cx('btn-style', 'btn-filter')}>Lọc</button>
      </span>
    </div>
  );
};

export default TicketControl;
