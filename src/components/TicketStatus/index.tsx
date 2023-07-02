import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './TicketStatus.module.scss';

const cx = classNames.bind(styles);

interface StatusProp {
  ticketStatus: string;
}

const TicketStatus: React.FC<StatusProp> = ({ ticketStatus }) => {
  const renderStatus = (status: any) => {
    if (status === 'Đã sử dụng') {
      return (
        <div
          className={cx('status')}
          style={{ borderColor: '#919DBA', color: '#919DBA', background: '#EAF1F8' }}
        >
          <span className={cx('status-icon')}>
            <FontAwesomeIcon icon={faCircle} />
          </span>
          <span className={cx('status-name')}>{status}</span>
        </div>
      );
    } else if (status === 'Chưa sử dụng') {
      return (
        <div
          className={cx('status')}
          style={{ borderColor: '#03AC00', color: '#03AC00', background: '#DEF7E0' }}
        >
          <span className={cx('status-icon')}>
            <FontAwesomeIcon icon={faCircle} />
          </span>
          <span className={cx('status-name')}>{status}</span>
        </div>
      );
    } else if (status === 'Hết hạn') {
      return (
        <div
          className={cx('status')}
          style={{ borderColor: '#FD5959', color: '#FD5959', background: '#F8EBE8' }}
        >
          <span className={cx('status-icon')}>
            <FontAwesomeIcon icon={faCircle} />
          </span>
          <span className={cx('status-name')}>{status}</span>
        </div>
      );
    } else {
      return <div className={cx('status')}>Lỗi</div>;
    }
  };

  return <>{renderStatus(ticketStatus)}</>;
};

export default TicketStatus;
