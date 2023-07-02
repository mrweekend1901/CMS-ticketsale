import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './CheckboxList.module.scss';

const cx = classNames.bind(styles);

interface CheckboxOption {
  id: string;
  label: string;
  value: string;
}

interface CheckboxListProps {
  options: CheckboxOption[]; // Mảng các tùy chọn cho CheckboxList
  onChange: (selectedOptions: string[]) => void; // Hàm callback khi giá trị thay đổi
}

const CheckboxList: React.FC<CheckboxListProps> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    options.find(option => option.id === '1')?.value || '',
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    let updatedOptions: string[];

    if (id === '1') {
      // Khi id là '1' được chọn, uncheck tất cả các tùy chọn khác
      if (checked) {
        updatedOptions = [options.find(option => option.id === '1')?.value || ''];
      } else {
        updatedOptions = [];
      }
    } else {
      // Khi id khác '1' được chọn, uncheck tùy chọn '1' (nếu có)
      updatedOptions = selectedOptions.filter(
        option => option !== options.find(option => option.id === '1')?.value,
      );
      if (checked) {
        updatedOptions = [...updatedOptions, options.find(option => option.id === id)?.value || ''];
      }
    }

    setSelectedOptions(updatedOptions); // Cập nhật giá trị đã chọn
  };

  useEffect(() => {
    onChange(selectedOptions); // Truyền giá trị đã chọn về component cha
  }, [selectedOptions, onChange]);

  return (
    <div className={cx('container')}>
      {options.map(option => (
        <div className={cx('checkbox-group')} key={option.id}>
          <input
            className={cx('checkbox')}
            type="checkbox"
            id={option.id}
            value={option.value}
            checked={selectedOptions.includes(option.value)} // Kiểm tra xem giá trị đã được chọn hay chưa
            onChange={handleCheckboxChange}
          />
          <label className={cx('checkbox-name')} htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
