import { Modal, Form, Input, Button, notification, Select, Upload } from "antd";
import { openNotificationSuccess, openNotificationError } from "../notification/NotificaComponent";
import { saveReservationApi, updateReservationApi } from "../../service/api.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const ModalEditReservation = (cc) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const { reservationDetail, isModalEditOpen, loadingData, handleCancleModalEdit, listStaff, listCustomer, listTable } = cc;
    const [isSocket, setSocket] = useState(null);
    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL, {});
        setSocket(socket);
        if (reservationDetail) {
            form.setFieldsValue({
                id: reservationDetail.id,
                table_id: reservationDetail.table_id,
                staff_id: reservationDetail.staff_id != null ? reservationDetail.staff_id : null,
                status: reservationDetail.status,
                amount_cus: reservationDetail.amount_cus,
                note: reservationDetail.note != null ? reservationDetail.note : null,
                type_buffet: reservationDetail.type_buffet,
                total_price: reservationDetail.total_price
            })
        }
    }, [reservationDetail]);

    const onFinish = async (values) => {
        const dataJSON = JSON.stringify(values);
        // console.log()
        const rs = await updateReservationApi(dataJSON);
        if (rs.status == 405) {
            navigate('/admin/login');
        }
        if (rs.status == 201) {
            openNotificationSuccess(rs.data.message, 'Cập Nhật Đơn Đặt Bàn', api);
            handleCancleModalEdit();
            loadingData();
            if (values.status == 1) {

            }
            isSocket.emit('cap-nhat-trang-thai-ban', values.table_id, values.status == 1 ? '1' : values.status == 2 ? '3' : values.status == 3 ? '2' : '1');
            form.resetFields();
        }
        else {
            openNotificationError(rs.data.message, 'Cập Nhật Đơn Đặt Bàn', api);
            handleCancleModalEdit();
            form.resetFields();
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                footer={false}
                // layout={layout}
                title="Sửa Đơn Đặt Chỗ"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalEditOpen}
                // onOk={handleAddOk}
                onCancel={handleCancleModalEdit}
            >
                <Form
                    form={form}
                    // {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ paddingTop: '20px' }}
                // validateMessages={validateMessages}
                >
                    <Form.Item name='id' label="Mã Đơn Đặt Bàn">
                        <Input disabled />
                    </Form.Item>

                    {/* <Form.Item name='customer_id' label="Chọn Khách Hàng" rules={[{ required: true , message: 'Vui lòng chọn khách hàng muốn đặt bàn' }]}>
            <Select>
                {listCustomer ? listCustomer.map(row => <Select.Option key={row.id} value={row.id}>{row.name}</Select.Option> )  : ''}
            </Select>
        </Form.Item> */}

                    <Form.Item name='table_id' label="Chọn Bàn" rules={[{ required: true, message: 'Vui Lòng Chọn Bàn Họ Muốn Đặt' }]}>
                        <Select disabled>
                            {listTable ? listTable.map(row => <Select.Option key={row.id} value={row.id}>{row.name_table}</Select.Option>) : ''}
                        </Select>

                    </Form.Item>

                    <Form.Item name='staff_id' label="Chọn Nhân Viên">
                        <Select>
                            {listStaff ? listStaff.map(row => <Select.Option key={row.id} value={row.id}>{row.name}</Select.Option>) : ''}
                        </Select>
                    </Form.Item>

                    <Form.Item name='status' label="Chọn Trạng Thái" rules={[{ required: true, message: 'Vui Lòng Chọn Trạng Thái' }]}>
                        <Select>
                            <Select.Option value={1}>Đã Đặt</Select.Option>
                            <Select.Option value={2}>Hủy</Select.Option>
                            <Select.Option value={3}>Đã Đến</Select.Option>
                            <Select.Option value={4}>Đã Thanh Toán</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name='amount_cus' label="Số Người Đến" rules={[{ required: true, message: 'Vui lòng nhập số người' }, { pattern: /^[0-9]+$/, message: 'Vui Lòng Nhập Số Nguyên' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='note' label="Các Yêu Cầu">
                        <Input />
                    </Form.Item>

                    <Form.Item name='type_buffet' label="Chọn Kiểu Buffet" rules={[{ required: true, message: 'Vui lòng chọn loại buffet' }]}>
                        <Select>
                            <Select.Option value={1}>1 - Buffet Thường</Select.Option>
                            <Select.Option value={2}>2 - Buffet Vip</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name='total_price' label="Nhập Gía Tiền" rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }, { pattern: /^[0-9]+$/, message: 'Vui lòng nhập giá tiền' }]} >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null} style={{ marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )

}

export default ModalEditReservation;