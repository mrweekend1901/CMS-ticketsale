import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  width: string;
  height: string;
  onSelect: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Placeholder',
  width,
  height,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? cx('dropdown', 'open') : cx('dropdown')} style={{ width, height }}>
      <div className={cx('dropdown-toggle')} onClick={handleDropdownClick}>
        <p className={cx('name')}>{selectedValue || placeholder}</p>
        <span className={cx('icon')}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </span>
      </div>
      {isOpen && (
        <ul className={cx('dropdown-menu')}>
          {options.map(option => (
            <li
              className={cx('dropdown-item')}
              key={option.id}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
