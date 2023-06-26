import React from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  return (
    <div className={cx('wraper')}>
      <header className={cx('header')}>Thống kê</header>
      <div className={cx('body')}></div>
    </div>
  );
};

export default Home;
