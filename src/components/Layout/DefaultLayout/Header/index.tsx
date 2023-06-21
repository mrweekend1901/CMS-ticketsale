import React from 'react';
import SearchInput from '../../../SearchInput';
import UserGroup from '../../../UserGroup';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={cx('container')}>
      <SearchInput onSearch={handleSearch} width="470px" height="48px" />
      <UserGroup />
    </div>
  );
};

export default Header;
