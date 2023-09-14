import React from 'react';
import images from '../../../../img';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTicket, faReceipt, faGear } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

interface MenuItem {
  path: string;
  name: string;
  icon?: JSX.Element;
  children?: MenuItem[];
}

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
  // Mảng Menu
  const menuItem: MenuItem[] = [
    {
      path: '/CMS-ticketsale/',
      name: 'Trang chủ',
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      path: '/CMS-ticketsale/management',
      name: 'Quản lý vé',
      icon: <FontAwesomeIcon icon={faTicket} />,
    },
    {
      path: '/CMS-ticketsale/control',
      name: 'Đối soát vé',
      icon: <FontAwesomeIcon icon={faReceipt} />,
    },
    {
      path: '/CMS-ticketsale/setting',
      name: 'Cài đặt',
      icon: <FontAwesomeIcon icon={faGear} />,
      children: [
        {
          path: '/CMS-ticketsale/setting/service',
          name: 'Gói dịch vụ',
        },
      ],
    },
  ];

  const renderMenuItem = (menuItem: MenuItem, index: number) => {
    // Kiểm tra và ngăn chặn navlink của path /setting
    const isSettingPath = menuItem.path === '/CMS-ticketsale/setting';

    const linkClassName = cx('link', { 'no-pointer': isSettingPath });

    const handleSidebarClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (isSettingPath) {
        event.preventDefault();
      }
    };

    return (
      <li className={cx('sidebar-item')} key={index}>
        <NavLink to={menuItem.path} className={linkClassName} onClick={handleSidebarClick}>
          <div className={cx('icon')}>{menuItem.icon}</div>
          <div className={cx('link-text')}>{menuItem.name}</div>
        </NavLink>

        {/* Tab con */}
        {menuItem.children && (
          <ul className={cx('sidebar-child-list')}>
            {menuItem.children.map((childItem, childIndex) => (
              <li className={cx('sidebar-child-item')} key={childIndex}>
                <NavLink to={childItem.path} className={cx('child-link')}>
                  {childItem.icon && <div className={cx('icon')}>{childItem.icon}</div>}
                  <div className={cx('link-text')}>{childItem.name}</div>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={cx('sidebar')}>
      <img className={cx('logo')} src={images.logo} alt="Logo" />
      <ul className={cx('sidebar-list')}>
        {menuItem.map((item: MenuItem, index: number) => renderMenuItem(item, index))}
      </ul>
    </div>
  );
};

export default Sidebar;
