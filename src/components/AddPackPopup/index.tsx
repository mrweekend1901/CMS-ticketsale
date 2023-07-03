import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../Calendar';

import classNames from 'classnames/bind';
import styles from './AddPackPopup.module.scss';
import Dropdown from '../Dropdown';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

type FilterTicketPopupProps = {
  onAdd: (dataFilter: AddData) => void;
};

export type AddData = {
  selectedDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  formValues: FormValues;
  dropDownValue: string;
  packName: string;
};

interface FormValues {
  ticket: boolean;
  ticketCombo: boolean;
  price: number;
  priceCombo: number;
  ticketNum: number;
}

const optionsDropdown = [
  { id: '1', label: 'Đang áp dụng', value: 'Đang áp dụng' },
  { id: '2', label: 'Tắt', value: 'Tắt' },
];

const AddPackPopup: React.FC<FilterTicketPopupProps> = ({ onAdd }) => {
  const [dropDownValue, setdropDownValue] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [priceCombo, setPriceCombo] = useState<number>(0);
  const [ticketNum, setTicketNum] = useState<number>(0);
  const [packName, setPackName] = useState<string>('');

  // Lấy value price

  // Xử lý chọn dropdown
  const handleDropdownSelect = (selectedValue: string) => {
    setdropDownValue(selectedValue);
  };

  const [formValues, setFormValues] = useState<FormValues>({
    ticket: false,
    ticketCombo: false,
    price: 0,
    priceCombo: 0,
    ticketNum: 0,
  });

  console.log(formValues);

  // Xử lý thay đổi giá vé
  useEffect(() => {
    console.log(price);
  }, [price]);

  // Lấy dữ liệu input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    if (name === 'ticket') {
      setFormValues((prevFormValues: FormValues) => ({
        ...prevFormValues,
        ticket: checked,
        price: checked ? price || 0 : 0,
      }));
    } else if (name === 'ticketCombo') {
      setFormValues((prevFormValues: FormValues) => ({
        ...prevFormValues,
        ticketCombo: checked,
        priceCombo: checked ? priceCombo || 0 : 0,
        ticketNum: checked ? ticketNum || 0 : 0,
      }));
    }

    if (name === 'price') {
      setPrice(parseFloat(value));
    } else if (name === 'priceCombo') {
      setPriceCombo(parseFloat(value));
    } else if (name === 'ticketNum') {
      setTicketNum(parseFloat(value));
    } else if (name === 'packName') {
      setPackName(value);
    }
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

  // Định dạng format giờ
  function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const handleAddClick = () => {
    const dataADD: AddData = {
      packName,
      selectedDate,
      startDate,
      endDate,
      formValues, // Thêm formValues vào dataAdd
      dropDownValue, // Thêm dropDownValue vào dataAdd
    };
    console.log('Data Filter:', dataADD);
    // Truyền cho component cha
    onAdd(dataADD);
  };

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>Thêm gói vé</header>
      <div className={cx('body')}>
        <span className={cx('group')}>
          <div className={cx('filter')}>
            <p className={cx('name')}>
              Tên gói vé <span style={{ color: '#FD5959' }}>*</span>
            </p>
            <input
              className={cx('name-pack')}
              name="packName"
              onChange={handleChange}
              type="text"
            />
          </div>
        </span>
        <span className={cx('group')}>
          <div className={cx('filter')}>
            <p className={cx('name')}>Ngày áp dụng</p>
            <span className={cx('group-day')}>
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

              <div className={cx('pack')} style={{ width: '130px', marginLeft: '10px' }}>
                <input
                  className={cx('input')}
                  type="text"
                  value={startDate ? formatTime(startDate) : ''}
                  readOnly
                />
                <button className={cx('clock-icon')}>
                  <FontAwesomeIcon icon={faClock} />
                </button>
              </div>
            </span>
          </div>
          <div className={cx('filter')}>
            <p className={cx('name')}>Ngày hết hạn</p>
            <span className={cx('group-day')}>
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

              <div className={cx('pack')} style={{ width: '130px', marginLeft: '10px' }}>
                <input
                  className={cx('input')}
                  type="text"
                  value={endDate ? formatTime(endDate) : ''}
                  readOnly
                />
                <button className={cx('clock-icon')}>
                  <FontAwesomeIcon icon={faClock} />
                </button>
              </div>
            </span>
          </div>
        </span>

        <span className={cx('group')}>
          <div className={cx('filter')}>
            <p className={cx('name')}>Giá vé áp dụng</p>
            <div className={cx('checkbox-group')}>
              <input
                id="ticket"
                name="ticket"
                className={cx('checkbox')}
                type="checkbox"
                checked={formValues.ticket}
                onChange={handleChange}
              />
              <span className={cx('checkbox-name')}>Vé lẻ (vnđ/vé) với giá</span>
              <input
                className={cx('price')}
                type="number"
                name="price"
                placeholder="Giá vé"
                onChange={handleChange}
                value={price !== 0 ? price : ''}
              />
              <span className={cx('checkbox-name')}>/ vé</span>
            </div>

            <div className={cx('checkbox-group')}>
              <input
                id="ticketCombo"
                name="ticketCombo"
                className={cx('checkbox')}
                type="checkbox"
                checked={formValues.ticketCombo}
                onChange={handleChange}
              />
              <span className={cx('checkbox-name')}>Combo vé với giá</span>
              <input
                className={cx('priceCombo')}
                type="number"
                name="priceCombo"
                placeholder="Giá vé"
                onChange={handleChange}
                value={priceCombo !== 0 ? priceCombo : ''}
              />
              <span className={cx('checkbox-name')}>/</span>

              <input
                className={cx('ticket-num')}
                style={{ width: '74px' }}
                type="number"
                name="ticketNum"
                placeholder="Số vé"
                onChange={handleChange}
                value={ticketNum !== 0 ? ticketNum : ''}
              />

              <span className={cx('checkbox-name')}>vé</span>
            </div>
          </div>
        </span>

        <span className={cx('group')}>
          <div className={cx('filter')}>
            <p className={cx('name')}>Tình trạng</p>
            <Dropdown
              options={optionsDropdown}
              placeholder="Chọn tình trạng"
              onSelect={handleDropdownSelect}
              width="360px"
              height="40px"
            />
          </div>
        </span>
        <span className={cx('group')}>
          <p className={cx('ps')}>
            <span style={{ color: '#FD5959' }}>*</span> Là thông tin bắt buộc
          </p>
        </span>
      </div>
      <span className={cx('btn-group')}>
        <button className={cx('btn-style', 'btn-filter')}>Hủy</button>
        <button className={cx('btn-style', 'btn-add')} onClick={handleAddClick}>
          Thêm
        </button>
      </span>
    </div>
  );
};

export default AddPackPopup;
