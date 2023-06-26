import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './RadioList.module.scss';

const cx = classNames.bind(styles);

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface RadioListProps {
  options: RadioOption[];
  onChange: (selectedValues: string[]) => void;
  defaultValue?: string; // Giá trị mặc định
}

const RadioList: React.FC<RadioListProps> = ({ options, onChange, defaultValue }) => {
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
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
      onChange([defaultValue]);
    }
  }, [defaultValue, onChange]);

  return (
    <div className={cx('container')}>
      {options.map(option => (
        <label className={cx('radio-group')} key={option.id}>
          <input
            className={cx('radio-btn')}
            type="radio"
            value={option.value}
            checked={option.value === selectedValue}
            onChange={handleOptionChange}
          />
          <p className={cx('radio-name')}>{option.label}</p>
        </label>
      ))}
    </div>
  );
};

export default RadioList;
