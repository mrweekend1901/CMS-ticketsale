import React, { Fragment, useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import AddPackPopup, { AddData } from '../../components/AddPackPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UpdatePackPopup, { UpdateData } from '../../components/UpdatePackPopup';
import { RootState } from '../../redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  addServicePack,
  fetchServicePack,
  updateServicePack,
} from '../../redux/actions/servicePackAction';
import { ServicePackType } from '../../redux/types/servicePackType';
import Table from '../../components/Table';
import TicketStatus from '../../components/TicketStatus';

import classNames from 'classnames/bind';
import styles from './Service.module.scss';

const cx = classNames.bind(styles);

const Service: React.FC = () => {
  // Lấy dữ liệu User từ Redux
  const dispatch: ThunkDispatch<RootState, null, any> = useDispatch();
  const servicePacks = useSelector((state: RootState) => state.servicePack.servicePacks);
  const loading = useSelector((state: RootState) => state.servicePack.loading);
  const error = useSelector((state: RootState) => state.servicePack.error);

  useEffect(() => {
    // Gọi hàm fetchUsers khi component được mount
    dispatch(fetchServicePack());
  }, [dispatch]);

  // Số lượng trang của Table
  const itemsPerPage = 12;

  // Render RowHead
  const renderHeadRow = () => {
    return (
      <Fragment>
        <th>STT</th>
        <th className={cx('left')}>Mã gói</th>
        <th className={cx('left')}>Tên gói vé</th>
        <th className={cx('right')}>Ngày áp dụng</th>
        <th className={cx('right')}>Ngày hết hạn</th>
        <th className={cx('right')}>Giá vé (VNĐ/Vé)</th>
        <th className={cx('left', 'price-combo')}>Giá combo (VNĐ/Combo)</th>
        <th className={cx('left')}>Tình trạng</th>
        <th></th>
      </Fragment>
    );
  };

  const formatDayTime = (day: string, time: string) => {
    return (
      <span>
        <p className={cx('day')}>{day}</p>
        <p className={cx('time')}>{time}</p>
      </span>
    );
  };

  // Show popup
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopupUpdate = () => {
    setShowPopupUpdate(!showPopupUpdate);
  };

  // Ngăn hành vi nổi bọt, popup không bị ẩn
  const handleInnerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // State để lưu trữ dữ liệu hàng được chọn
  const [selectedDataRow, setSelectedDataRow] = useState<ServicePackType[]>([]);

  // Hàm xử lý khi người dùng nhấp vào nút "Update" trên hàng
  const handleUpdateClick = (rowData: ServicePackType) => {
    setSelectedDataRow([rowData]); // Gán dữ liệu hàng được chọn vào mảng selectedDataRow
    setShowPopupUpdate(!showPopupUpdate); // Hiển thị UpdatePackPopup
  };

  function formatCurrency(price: number, note: string, num: number) {
    // Chuyển đổi số thành chuỗi và thêm dấu phẩy hàng nghìn
    const formattedNumber = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const ticketNum = `/${num} Vé`;
    // Thêm dấu chấm nếu cần
    return `${formattedNumber} ${note}${num !== 0 ? ticketNum : ''} `;
  }

  // Render RowBody
  const renderBodyRow = (servicePack: ServicePackType, index: number) => (
    <Fragment>
      <td className={cx('stt')}>{index + 1}</td>
      <td>{servicePack.packID}</td>
      <td>{servicePack.packName}</td>
      <td className={cx('day-time')}>{formatDayTime(servicePack.dayMFG, servicePack.timeMFG)}</td>
      <td className={cx('day-time')}>{formatDayTime(servicePack.dayEXP, servicePack.timeEXP)}</td>
      <td className={cx('price')}>
        {servicePack.price !== 0 ? formatCurrency(servicePack.price, 'VNĐ', 0) : ''}
      </td>
      <td className={cx('price-combo')}>
        {servicePack.priceCombo !== 0
          ? formatCurrency(servicePack.priceCombo, 'VNĐ', servicePack.ticketNum)
          : ''}
      </td>
      <td>
        <TicketStatus ticketStatus={servicePack.packStatus} />
      </td>
      <td>
        <Fragment>
          <button className={cx('container')} onClick={() => handleUpdateClick(servicePack)}>
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            <span className={cx('name')}>Cập nhật</span>
          </button>

          {showPopupUpdate && (
            <div className={cx('popup')} onClick={handleClosePopupUpdate}>
              <div className={cx('popup-inner')} onClick={handleInnerClick}>
                <UpdatePackPopup dataRow={selectedDataRow} onUpdate={handleUpdate} />
              </div>
            </div>
          )}
        </Fragment>
      </td>
    </Fragment>
  );

  const [filteredData, setFilteredData] = useState<ServicePackType[]>([]);

  const handleSearch = (searchTerm: string) => {
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Đang tìm kiếm:', searchTerm);
    // Áp dụng logic lọc vào ticketsManagement dựa trên searchTerm
    const filteredTickets = servicePacks.filter((ticket: ServicePackType) => {
      return ticket.packID.includes(searchTerm);
    });

    // Lưu trữ dữ liệu đã lọc vào state filteredData
    setFilteredData(filteredTickets);
  };

  const handleAdd = (dataADD: AddData) => {
    setShowPopup(!showPopup);
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    const variableID = `ALT${dataADD.startDate?.getFullYear()}${random}`;

    // Variable MFG & time
    const variableDayMFG = `${(dataADD.startDate?.getDate() || '').toString().padStart(2, '0')}/${(
      (dataADD.startDate?.getMonth() || 0) + 1
    )
      .toString()
      .padStart(2, '0')}/${dataADD.startDate?.getFullYear() || ''}`;
    const variableTimeMFG = `${(dataADD.startDate?.getHours() || '')
      .toString()
      .padStart(2, '0')}:${(dataADD.startDate?.getMinutes() || '').toString().padStart(2, '0')}:${(
      dataADD.startDate?.getSeconds() || ''
    )
      .toString()
      .padStart(2, '0')}`;

    // Variable EXP & time
    const variableDayEXP = `${(dataADD.endDate?.getDate() || '').toString().padStart(2, '0')}/${(
      (dataADD.endDate?.getMonth() || 0) + 1
    )
      .toString()
      .padStart(2, '0')}/${dataADD.endDate?.getFullYear() || ''}`;
    const variableTimeEXP = `${(dataADD.endDate?.getHours() || '').toString().padStart(2, '0')}:${(
      dataADD.endDate?.getMinutes() || ''
    )
      .toString()
      .padStart(2, '0')}:${(dataADD.endDate?.getSeconds() || '').toString().padStart(2, '0')}`;

    const newServicePack: ServicePackType = {
      packID: variableID,
      packName: dataADD.packName,
      dayMFG: variableDayMFG,
      timeMFG: variableTimeMFG,
      dayEXP: variableDayEXP,
      timeEXP: variableTimeEXP,
      price: dataADD.formValues.ticket ? dataADD.formValues.price : 0,
      priceCombo: dataADD.formValues.ticketCombo ? dataADD.formValues.priceCombo : 0,
      ticketNum: dataADD.formValues.ticketCombo ? dataADD.formValues.ticketNum : 0,
      packStatus: dataADD.dropDownValue,
    };

    dispatch(addServicePack(newServicePack));
  };

  const handleUpdate = (dataUpdate: UpdateData) => {
    setShowPopupUpdate(!showPopupUpdate);

    // Variable MFG & time
    const variableDayMFG = `${(dataUpdate.startDate?.getDate() || '')
      .toString()
      .padStart(2, '0')}/${((dataUpdate.startDate?.getMonth() || 0) + 1)
      .toString()
      .padStart(2, '0')}/${dataUpdate.startDate?.getFullYear() || ''}`;
    const variableTimeMFG = `${(dataUpdate.startDate?.getHours() || '')
      .toString()
      .padStart(2, '0')}:${(dataUpdate.startDate?.getMinutes() || '')
      .toString()
      .padStart(2, '0')}:${(dataUpdate.startDate?.getSeconds() || '').toString().padStart(2, '0')}`;

    // Variable EXP & time
    const variableDayEXP = `${(dataUpdate.endDate?.getDate() || '').toString().padStart(2, '0')}/${(
      (dataUpdate.endDate?.getMonth() || 0) + 1
    )
      .toString()
      .padStart(2, '0')}/${dataUpdate.endDate?.getFullYear() || ''}`;
    const variableTimeEXP = `${(dataUpdate.endDate?.getHours() || '')
      .toString()
      .padStart(2, '0')}:${(dataUpdate.endDate?.getMinutes() || '').toString().padStart(2, '0')}:${(
      dataUpdate.endDate?.getSeconds() || ''
    )
      .toString()
      .padStart(2, '0')}`;

    const newServicePack: ServicePackType = {
      packID: dataUpdate.packID,
      packName: dataUpdate.packName,
      dayMFG: variableDayMFG,
      timeMFG: variableTimeMFG,
      dayEXP: variableDayEXP,
      timeEXP: variableTimeEXP,
      price: dataUpdate.formValues.ticket ? dataUpdate.formValues.price : 0,
      priceCombo: dataUpdate.formValues.ticketCombo ? dataUpdate.formValues.priceCombo : 0,
      ticketNum: dataUpdate.formValues.ticketCombo ? dataUpdate.formValues.ticketNum : 0,
      packStatus: dataUpdate.dropDownValue,
    };

    dispatch(updateServicePack(newServicePack));
  };

  return (
    <Fragment>
      <div className={cx('wraper')}>
        <header className={cx('header')}>Danh sách gói vé</header>
        <div className={cx('body')}>
          <div className={cx('feature-group')}>
            <SearchInput
              onSearch={handleSearch}
              placeholder="Tìm bằng mã gói"
              width="446px"
              height="48px"
              backgroundColor="#F7F7F8"
            />

            <span className={cx('btn-group')}>
              <button className={cx('btn-style', 'btn-feature')}>
                <p className={cx('btn-text')}>Xuất file (.csv)</p>
              </button>

              <button className={cx('btn-style', 'btn-background')}>
                <p className={cx('btn-text')} onClick={handleClosePopup}>
                  Thêm gói vé
                </p>
              </button>
            </span>
          </div>
          <div className={cx('table')}>
            <Table<ServicePackType>
              data={filteredData.length > 0 ? filteredData : servicePacks}
              loading={loading}
              error={error}
              itemsPerPage={itemsPerPage}
              renderHeadRow={renderHeadRow}
              renderBodyRow={renderBodyRow}
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className={cx('popup')} onClick={handleClosePopup}>
          <div className={cx('popup-inner')} onClick={handleInnerClick}>
            <AddPackPopup onAdd={handleAdd} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Service;
