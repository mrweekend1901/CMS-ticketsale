import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

interface ComponentProps {
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

const DefaultLayout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className={cx('container')}>
      <Sidebar />
      <div className={cx('content')}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
