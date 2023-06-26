import React from 'react';
import SearchInput from '../../components/SearchInput';
import RadioList from '../../components/RadioList';
import Dropdown from '../../components/Dropdown';

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
          <div className={cx('table')}></div>
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
                defaultValue="option1"
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
