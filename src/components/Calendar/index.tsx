import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

type CalendarProps = {
  onDateSelect: (date: Date | null) => void;
  onRangeSelect: (startDate: Date | null, endDate: Date | null) => void;
};

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, onRangeSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isRangeMode, setIsRangeMode] = useState(false);

  const handleMonthChange = (month: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + month);
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    if (isRangeMode) {
      if (startDate && !endDate) {
        if (date >= startDate) {
          setEndDate(date);
          onRangeSelect(startDate, date);
        } else {
          setStartDate(date);
          setEndDate(null);
          onRangeSelect(date, null);
        }
      } else {
        setStartDate(date);
        setEndDate(null);
        onRangeSelect(date, null);
      }
    } else {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startOffset = firstDay.getDay();
    const endOffset = 6 - lastDay.getDay();

    const totalDays = startOffset + daysInMonth + endOffset;

    const calendarDays: Date[] = [];

    for (let i = 0; i < totalDays; i++) {
      const day = new Date(year, month, i + 1 - startOffset);
      calendarDays.push(day);
    }

    const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']; // Thứ trong tuần

    // Tạo mảng rangeDates để lưu trữ các ngày nằm giữa startDate và endDate
    const rangeDates: Date[] = [];

    // Kiểm tra isRangeMode và tồn tại startDate và endDate
    if (isRangeMode && startDate && endDate) {
      // Tạo startDay và endDay dựa trên ngày, tháng và năm của startDate và endDate
      const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

      // Thêm các ngày từ startDay đến endDay vào mảng rangeDates
      for (let d = startDay; d <= endDay; d.setDate(d.getDate() + 1)) {
        rangeDates.push(new Date(d));
      }
    }

    return (
      <div className={cx('calendar-grid')}>
        {/* Cột thứ */}
        {weekdays.map((weekday, index) => (
          <div key={index} className={cx('calendar-header')}>
            {weekday}
          </div>
        ))}

        {/* Các ngày trong tháng */}
        {calendarDays.map((day, index) => {
          // Các biến check startday, endday và in-range (ngày giữa startday và endday)
          const isStartDay = startDate && day.getTime() === startDate.getTime();
          const isEndDay = endDate && day.getTime() === endDate.getTime();
          const isInRange = rangeDates.some(date => date.getTime() === day.getTime());

          return (
            <div
              className={cx(
                'space-around-day',
                isSelected(day) && 'selected', // Thêm lớp 'selected' nếu ngày được chọn
                isStartDay && 'startday', // Thêm lớp 'startday' nếu ngày là ngày bắt đầu
                isEndDay && 'endday', // Thêm lớp 'endday' nếu ngày là ngày kết thúc
                isInRange && !isStartDay && !isEndDay && 'in-range', // Thêm lớp 'in-range' nếu ngày nằm trong khoảng thời gian giữa ngày bắt đầu và ngày kết thúc
              )}
              key={index}
              onClick={() => handleDateClick(day)}
            >
              <span className={cx('calendar-cell')}>{day.getDate()}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const isSelected = (date: Date) => {
    if (isRangeMode) {
      if (startDate && endDate) {
        return date >= startDate && date <= endDate;
      } else {
        return startDate !== null && date.getTime() === startDate.getTime();
      }
    } else {
      return date.getTime() === selectedDate?.getTime();
    }
  };

  const renderDaySelected = () => {
    if (isRangeMode) {
      return (
        <div className={cx('selected-date')}>
          {startDate ? `Tháng ${startDate.getMonth() + 1}, ${startDate.getFullYear()}` : ''} -
          {endDate ? `Tháng ${endDate.getMonth() + 1}, ${endDate.getFullYear()}` : ''}
        </div>
      );
    } else {
      return (
        <div className={cx('selected-date')}>
          {selectedDate
            ? `Tháng ${selectedDate.getMonth() + 1}, ${selectedDate.getFullYear()}`
            : ''}
        </div>
      );
    }
  };

  const setIsSingleMode = () => {
    setIsRangeMode(false);
    setStartDate(null);
    setEndDate(null);

    // Xóa dữ liệu gửi đến component cha
    onRangeSelect(null, null);
  };

  const setIsPickRangeMode = () => {
    setIsRangeMode(true);
    setSelectedDate(null);

    // Xóa dữ liệu gửi đến component cha

    onDateSelect(null);
  };

  return (
    <div className={cx('calendar')}>
      <div className={cx('calendar-head')}>
        <button className={cx('btn-change-month')} onClick={() => handleMonthChange(-1)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className={cx('header-date')}>{renderDaySelected()}</div>
        <button className={cx('btn-change-month')} onClick={() => handleMonthChange(1)}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className={cx('calendar-mode')}>
        <span className={cx('radio-group')}>
          <input
            className={cx('radio')}
            type="radio"
            name="dateMode"
            checked={!isRangeMode}
            onChange={setIsSingleMode}
          />
          Theo ngày
        </span>
        <span className={cx('radio-group')}>
          <input
            className={cx('radio')}
            type="radio"
            name="dateMode"
            checked={isRangeMode}
            onChange={setIsPickRangeMode}
          />
          Theo tuần
        </span>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
