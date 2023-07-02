import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import RadioList from '../RadioList';
import CheckboxList from '../CheckboxList';
import Calendar from '../Calendar';

import classNames from 'classnames/bind';
import styles from './FilterTicketPopup.module.scss';

const cx = classNames.bind(styles);

type FilterTicketPopupProps = {
  onFilter: (dataFilter: FilterData) => void;
};

export type FilterData = {
  radioValue: string[];
  checkboxValue: string[];
  selectedDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
};

const optionsRadio = [
  { id: '1', label: 'Tất cả', value: 'Tất cả' },
  { id: '2', label: 'Đã sử dụng', value: 'Đã sử dụng' },
  { id: '3', label: 'Chưa sử dụng', value: 'Chưa sử dụng' },
  { id: '4', label: 'Hết hạn', value: 'Hết hạn' },
];

const optionsCheckbox = [
  { id: '1', label: 'Tất cả', value: 'Tất cả' },
  { id: '2', label: 'Cổng 1', value: 'Cổng 1' },
  { id: '3', label: 'Cổng 2', value: 'Cổng 2' },
  { id: '4', label: 'Cổng 3', value: 'Cổng 3' },
  { id: '5', label: 'Cổng 4', value: 'Cổng 4' },
  { id: '6', label: 'Cổng 5', value: 'Cổng 5' },
];

const FilterTicketPopup: React.FC<FilterTicketPopupProps> = ({ onFilter }) => {
  const [radioValue, setRadioValue] = useState<string[]>([]);
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

  // Xử lý chọn radio
  const handleRadioChange = (selectedValues: string[]) => {
    setRadioValue(selectedValues);
    // console.log('Selected options:', selectedValues);
  };

  // Xử lý giá trị đã chọn từ CheckboxList
  const handleCheckboxChange = (selectedOptions: string[]) => {
    setCheckboxValue(selectedOptions);
    // console.log('Giá trị đã chọn:', selectedOptions);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setSelectedDate(null);
      setStartDate(null);
      setEndDate(null);
      isInitialMount.current = false;
    }
  }, []);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    // console.log('Selected Date:', date);
  };

  const handleRangeSelect = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    // console.log('Start Date:', start);
    // console.log('End Date:', end);
  };

  // Show calendar
  const [isShowCalendarFrom, setIsShowCalendarFrom] = useState(false);
  const [isShowCalendarTo, setIsShowCalendarTo] = useState(false);

  const handleShowCalendarFrom = () => {
    setIsShowCalendarFrom(!isShowCalendarFrom);
    setIsShowCalendarTo(false);
  };

  const handleShowCalendarTo = () => {
    setIsShowCalendarTo(!isShowCalendarTo);
    setIsShowCalendarFrom(false);
  };

  // Định dạng format ngày
  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  };

  const handleFilterClick = () => {
    const dataFilter: FilterData = {
      radioValue,
      checkboxValue,
      selectedDate,
      startDate,
      endDate,
    };
    console.log('Data Filter:', dataFilter);
    // Truyền cho component cha
    onFilter(dataFilter);

    // Xóa giá trị của các trường input
    setSelectedDate(null);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>Lọc vé</header>
      <div className={cx('body')}>
        <span className={cx('group')}>
          <div className={cx('filter')} style={{ marginRight: '120px' }}>
            <p className={cx('name')}>Từ ngày</p>
            <div className={isShowCalendarFrom ? cx('input-day', 'active') : cx('input-day')}>
              <input
                className={cx('input')}
                type="text"
                readOnly
                value={formatDate(selectedDate) || formatDate(startDate)}
              />
              <button className={cx('calendar-icon')} onClick={handleShowCalendarFrom}>
                <FontAwesomeIcon icon={faCalendarDays} />
              </button>
              {isShowCalendarFrom && (
                <span className={cx('wraper')}>
                  <Calendar onDateSelect={handleDateSelect} onRangeSelect={handleRangeSelect} />
                </span>
              )}
            </div>
          </div>
          <div className={cx('filter')}>
            <p className={cx('name')}>Đến ngày</p>
            <div className={isShowCalendarTo ? cx('input-day', 'active') : cx('input-day')}>
              <input
                className={cx('input')}
                type="text"
                readOnly
                value={formatDate(selectedDate) || formatDate(endDate)}
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
        </span>
        <span className={cx('group')}>
          <div className={cx('filter')}>
            <p className={cx('name', 'cus-mrbot')}>Trạng thái sử dụng</p>
            <RadioList
              options={optionsRadio}
              onChange={handleRadioChange}
              style={{ flexDirection: 'row' }}
            />
          </div>
        </span>
        <span className={cx('group')}>
          <div className={cx('filter')}>
            <p className={cx('name')}>Cổng Check - in</p>
            <CheckboxList options={optionsCheckbox} onChange={handleCheckboxChange} />
          </div>
        </span>
      </div>
      <button className={cx('btn-style', 'btn-filter')} onClick={handleFilterClick}>
        Lọc
      </button>
    </div>
  );
};

export default FilterTicketPopup;
