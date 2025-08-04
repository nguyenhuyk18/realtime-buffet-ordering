import {  Drawer, Image } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationDetail = (props) => {
  const navigate = useNavigate();

    const { reservationDetail , onClose , open , showDrawer } = props


    return (
        <Drawer
        title="Thông tin đặt bàn chi tiết"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <p style={{marginBottom: '20px'}}><b>Tên Khách Hàng: </b> {reservationDetail?.customer_name ? reservationDetail?.customer_name : '' } </p>
        <p style={{marginBottom: '20px'}}><b>Tên Bàn: </b> {reservationDetail?.table_name ? reservationDetail?.table_name : '' } </p>
        <p style={{marginBottom: '20px'}}><b>Tên Tầng: </b> {reservationDetail?.floor_name ? reservationDetail?.floor_name : ''} </p>
        <p style={{marginBottom: '20px'}}><b>Số Lượng Khách Hàng: </b> {reservationDetail?.amount_cus ? reservationDetail?.amount_cus : ''} </p>
        <p style={{marginBottom: '20px'}}><b>Ngày Đặt: </b> {reservationDetail?.reservation_date ? reservationDetail?.reservation_date : ''} </p>
      </Drawer>
    )
}

export default ReservationDetail;