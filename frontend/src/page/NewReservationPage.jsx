import { Table, Flex, Button, message, Popconfirm, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { deleteReservationApi, findReservationApi, getAllStaffApi, getCustomerApi, getReservationApi, getTableApi } from '../service/api.service';
import ModalAddReservation from '../component/reservation/ModalAdd';
import ModalEditReservation from '../component/reservation/ModalEdit';
import ReservationDetail from '../component/reservation/DrawerReservation';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

const NewReservationPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // để mở drawer
    const [listReservation, setListReservation] = useState([]);
    const [reservationDetail, setReservation] = useState(null);
    const [isModalAddOpen, setModalAddOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [listStaff, setListStaff] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [listTable, setListTable] = useState([]);

    // const []

    useEffect(() => {
        loadingData();
        const socket = io(import.meta.env.VITE_BACKEND_URL, {});
        socket.on('new-reservation-process', () => {
            loadingData();
        })
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        // setProductDetail(null);
        setOpen(false);
    };

    const confirm = async e => {
        // message.success(rs.data.message);
        const rs = await deleteReservationApi(e);

        console.log(rs)

        if (rs.status == 405) {
            navigate('/admin/login');
        }

        if (rs.status == 201) {
            message.success(rs.data.message);
            loadingData();
        }

        else {
            message.error(rs.data.message);
        }
    };

    const cancel = e => {
        // console.log(e);
        message.success('Cảm ơn bạn đã lựa chọn');
    };


    const columns = [
        {
            title: 'Mã Đặt Bàn',
            // dataIndex: 'id',
            key: 'id',
            render: (_, record) => <a onClick={async () => {
                await handleOpenDrawer(record.id);
            }} >{record.id}</a>,
        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'reservation_date',
            key: 'reservation_date',
            // width : 200
        },
        {
            title: 'Yêu Cầu Kèm Theo',
            dataIndex: 'note',
            key: 'note',
            // width : 190
        },
        {
            title: 'Trạng Thái',
            // dataIndex: 'status',
            key: 'status',
            // width : 190
            render: (_, record) => (
                record.status == 3 ? <p>Đã Đến</p> : record.status == 2 ? <p>Đã Hủy</p> : record.status == 1 ? <p>Đã Đặt</p> : record.status == 4 ? <p>Đã Thanh Toán</p> : ''
            ),
        },
        {
            title: 'Các Tác Vụ',
            key: 'action',
            // dataIndex: 'action',
            render: (_, record) => (

                <Flex gap='small'>
                    {/* {console.log()}    */}
                    <Button color="cyan" onClick={async () => {
                        // showModalEditCategory(record.id);
                        const pro = await findReservationApi(record.id);
                        if (pro.status == 405) {
                            navigate('/admin/login');
                        }
                        setModalEditOpen(true);
                        setReservation(pro.data);
                    }} variant="solid">
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa Sản Phẩm"
                        description="Bạn có chắc muốn xóa chứ !!!"
                        onConfirm={() => confirm(record.id)}
                        onCancel={cancel}
                        okText="Đồng Ý"
                        cancelText="Hủy"
                    >
                        <Button color="danger" variant="solid">
                            Xóa
                        </Button>
                    </Popconfirm>

                </Flex>

            ),
        },
    ];


    const loadingData = async () => {
        // let cc = 'sdsdsdsds'
        // console.log(cc)
        const rs = await getReservationApi('chacha');
        const rs1 = await getCustomerApi();
        const rs2 = await getAllStaffApi();
        const rs3 = await getTableApi();
        if (rs.status == 405) {
            navigate('/admin/login');
        }

        if (rs1.status == 405) {
            navigate('/admin/login');
        }

        if (rs2.status == 405) {
            navigate('/admin/login');
        }

        if (rs3.status == 405) {
            navigate('/admin/login');
        }

        if (rs.status == 403) {
            navigate('/admin', { state: { message: rs.data.message } });
        }

        if (rs1.status == 403) {
            navigate('/admin', { state: { message: rs1.data.message } });
        }

        if (rs2.status == 403) {
            navigate('/admin', { state: { message: rs2.data.message } });
        }

        if (rs3.status == 403) {
            navigate('/admin', { state: { message: rs3.data.message } });
        }


        setListReservation(rs.data);
        setListCustomer(rs1.data);
        setListStaff(rs2.data);
        setListTable(rs3.data);
    }


    const handleCancleModalAdd = () => {
        setModalAddOpen(false);
    }


    const handleCancleModalEdit = () => {
        setModalEditOpen(false);
    }

    const handleOpenDrawer = async (id) => {
        const rs = await findReservationApi(id);
        if (rs.status == 405) {
            navigate('/admin/login');
        }

        if (rs.status == 403) {
            navigate('/admin', { state: { message: rs.data.message } });
        }
        setReservation(rs.data);
        setOpen(true);
    }

    return (
        <>
            <Flex style={{ marginBottom: '20px' }} justify={'space-between'} align='center'>
                <h1>Lịch Sử Đặt Bàn</h1>
                <Button type='primary' onClick={() => {
                    setModalAddOpen(true)
                }} >Thêm Đặt Bàn Mới</Button>
            </Flex>


            <Table columns={columns} rowKey={'id'} dataSource={listReservation} scroll={{ x: 'max-content' }} pagination={{
                pageSize: 10, // Giới hạn 10 dòng mỗi trang
            }} />


            <ModalAddReservation isModalAddOpen={isModalAddOpen} handleCancleModalAdd={handleCancleModalAdd} loadingData={loadingData} listStaff={listStaff} listCustomer={listCustomer} listTable={listTable} />


            <ModalEditReservation reservationDetail={reservationDetail} loadingData={loadingData} isModalEditOpen={isModalEditOpen} handleCancleModalEdit={handleCancleModalEdit} listStaff={listStaff} listCustomer={listCustomer} listTable={listTable} />


            <ReservationDetail open={open} showDrawer={showDrawer} onClose={onClose} reservationDetail={reservationDetail} />

        </>
    )
}

export default NewReservationPage;