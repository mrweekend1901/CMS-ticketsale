import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss';

const cx = classNames.bind(styles);

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  width: string;
  height: string;
  backgroundColor?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search',
  width,
  height,
  backgroundColor = '#ededed',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      className={cx('container')}
      onSubmit={handleSubmit}
      style={{ width, height, backgroundColor }}
    >
      <input
        className={cx('input')}
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <button className={cx('btn-search')} type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default SearchInput;
