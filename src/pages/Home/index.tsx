import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Calendar from '../../components/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import StatisticsChart from '../../components/StaticChart';
import DonutChart from '../../components/DonutChart';

const data = [
  { name: 'Vé chưa sử dụng', value: 35 },
  { name: 'Vé đã sử dụng', value: 65 },
];

const data2 = [
  { name: 'Vé chưa sử dụng', value: 55 },
  { name: 'Vé đã sử dụng', value: 45 },
];

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isShowCalendarFrom, setIsShowCalendarFrom] = useState(false);
  const [isShowCalendarTo, setIsShowCalendarTo] = useState(false);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    // console.log('Selected Date:', date);
  };

  const handleShowCalendarFrom = () => {
    setIsShowCalendarFrom(!isShowCalendarFrom);
  };

  const handleShowCalendarTo = () => {
    setIsShowCalendarTo(!isShowCalendarTo);
  };

  // Định dạng format ngày
  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  };

  const handleRangeSelect = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    // console.log('Start Date:', start);
    // console.log('End Date:', end);
  };
  return (
    <div className={cx('wraper')}>
      <header className={cx('header')}>Thống kê</header>
      <div className={cx('body')}>
        <span className={cx('chart')}>
          <header className={cx('chart-head')}>
            <p className={cx('chart-title')}>Doanh thu</p>
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
                <span className={cx('popup')}>
                  <Calendar onDateSelect={handleDateSelect} onRangeSelect={handleRangeSelect} />
                </span>
              )}
            </div>
          </header>
          <div className={cx('chart-body')}>
            <StatisticsChart />
          </div>
          <footer className={cx('chart-footer')}>
            <p style={{ opacity: 0.5 }}>Tổng doanh thu theo tuần</p>
            <p>
              <span style={{ fontSize: '24px', fontWeight: 700 }}>525.145.000</span> đồng
            </p>
          </footer>
        </span>

        <span className={cx('chart-bot')}>
          <span className={cx('donut-calendar')}>
            <div className={isShowCalendarFrom ? cx('input-day', 'active') : cx('input-day')}>
              <input
                className={cx('input')}
                type="text"
                readOnly
                value={formatDate(selectedDate) || formatDate(startDate)}
              />
              <button className={cx('calendar-icon')} onClick={handleShowCalendarTo}>
                <FontAwesomeIcon icon={faCalendarDays} />
              </button>
              {isShowCalendarTo && (
                <span className={cx('popup')}>
                  <Calendar onDateSelect={handleDateSelect} onRangeSelect={handleRangeSelect} />
                </span>
              )}
            </div>
          </span>
          <span className={cx('donut')}>
            <p className={cx('donut-name')}>Gói gia đình</p>
            <DonutChart data={data} />
          </span>

          <span className={cx('donut')}>
            <p className={cx('donut-name')}>Gói sự kiện</p>
            <DonutChart data={data2} />
          </span>

          <span className={cx('type')}>
            <span className={cx('type-group')}>
              <input style={{ background: '#4F75FF' }} type="text" readOnly />
              <span>Vé đã sử dụng</span>
            </span>
            <span className={cx('type-group')}>
              <input style={{ background: '#FF8A48' }} type="text" readOnly />
              <span>Vé chưa sử dụng</span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Home;
