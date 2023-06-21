import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import images from '../../img';

import classNames from 'classnames/bind';
import styles from './UserGroup.module.scss';

const cx = classNames.bind(styles);

const UserGroup: React.FC = () => {
  return (
    <div className={cx('container')}>
      <span className={cx('icon')}>
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <span className={cx('icon')}>
        <FontAwesomeIcon icon={faBell} />
      </span>
      <img src={images.avatar} alt="Avatar" />
    </div>
  );
};

export default UserGroup;
