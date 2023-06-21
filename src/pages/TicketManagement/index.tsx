import React from 'react';
import SearchInput from '../../components/SearchInput';

import classNames from 'classnames/bind';
import styles from './TicketManagement.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const TicketManagement: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={cx('wraper')}>
      <header className={cx('header')}>Danh sách vé</header>
      <div className={cx('body')}>
        <div className={cx('feature-group')}>
          <SearchInput
            onSearch={handleSearch}
            placeholder="Tìm bằng số vé"
            width="446px"
            height="48px"
            backgroundColor="#F7F7F8"
          />

          <span className={cx('btn-group')}>
            <button className={cx('btn-style', 'btn-feature')}>
              <span className={cx('btn-icon')}>
                <FontAwesomeIcon icon={faFilter} />
              </span>
              <p className={cx('btn-text')}>Lọc vé</p>
            </button>
            <button className={cx('btn-style', 'btn-feature')}>
              <p className={cx('btn-text')}>Xuất file (.csv)</p>
            </button>
          </span>
        </div>
        <div className={cx('table')}></div>
      </div>
    </div>
  );
};

export default TicketManagement;
