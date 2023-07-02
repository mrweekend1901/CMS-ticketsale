import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './RadioList.module.scss';

const cx = classNames.bind(styles); // Tạo một hàm ràng buộc các style vào class names

interface RadioOption {
  id: string;
  label: string;
  value: string;
} // Định nghĩa một interface `RadioOption` với các thuộc tính id, label, value

interface RadioListProps {
  options: RadioOption[];
  onChange: (selectedValues: string[]) => void;
  style?: React.CSSProperties;
}

const RadioList: React.FC<RadioListProps> = ({ options, onChange, style }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === selectedValue) {
      setSelectedValue('');
      onChange([]);
    } else {
      setSelectedValue(value);
      onChange([value]);
    }
  }; // Định nghĩa một hàm handleOptionChange để xử lý sự kiện thay đổi của các radio button

  useEffect(() => {
    if (selectedValue === '' && options.length > 0) {
      setSelectedValue(options[0].value);
      onChange([options[0].value]);
    }
  }, [options, selectedValue, onChange]); // Sử dụng hook useEffect để thực hiện các tác vụ khi các dependency (options, selectedValue, onChange) thay đổi

  return (
    <div className={cx('container')} style={style}>
      {options.map(option => (
        <label className={cx('radio-group')} key={option.id}>
          <input
            className={cx('radio-btn')}
            type="radio"
            value={option.value}
            checked={option.value === selectedValue} // Đánh dấu radio button là đã chọn nếu giá trị của option bằng giá trị selectedValue
            onChange={handleOptionChange}
          />
          <p className={cx('radio-name')}>{option.label}</p>
        </label>
      ))}
    </div>
  );
};

export default RadioList;
