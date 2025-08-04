import { Modal , Form , Input, Button , notification, Select , Upload  } from "antd";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import { useEffect } from "react";
import { updateTableApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";

const ModalEditTable = (props) => {
 const navigate = useNavigate();
    const { isModalEditTableOpen , handleCancleModalEdit , loadingData , listFloor , tableDetail } = props

    const [form] = Form.useForm();

    const [api , contextHolder] = notification.useNotification();

    useEffect(() => {
        if(tableDetail) {
            form.setFieldsValue({
                id : tableDetail.id,
                name_table : tableDetail.name_table,
                capacity : tableDetail.capacity,
                floor_id : tableDetail.floor_id,
                status : String(tableDetail.status)
            })
        }
    } , [tableDetail])

    const onFinish = async (values) => {
        const dataJSON  = JSON.stringify(values)
        const rs = await updateTableApi(dataJSON);
                if(rs.status == 405) {
          navigate('/admin/login');
        }
        if(rs.status == 201) {
            loadingData();
            handleCancleModalEdit();
            form.resetFields();
            openNotificationSuccess(rs.data.message , 'Cập Nhật Bàn' , api);
        }
        else {
            handleCancleModalEdit();
            form.resetFields();
            openNotificationError(rs.data.message , 'Cập Nhật Bàn' , api);
        }
    }

    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Cập Nhật Bàn"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalEditTableOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleModalEdit}
      >
        <Form
            form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
        <Form.Item name='id' label="Mã Số Bàn">
            <Input disabled />
        </Form.Item>

        {/* tên bàn  */}
        <Form.Item name='name_table' label="Tên Bàn" rules={[{ required: true , message: 'Vui lòng nhập tên bàn' }]}>
            <Input />
        </Form.Item>

        {/* số chỗ ngôi */}
        <Form.Item name='capacity' label="Số Chỗ Ngồi" rules={[{ required: true , message: 'Vui lòng điền số chỗ ngồi' } , { pattern: /^[0-9]+$/ , message : 'Vui lòng chỉ nhập số nguyên' }]}>
            <Input />
        </Form.Item>

        {/* tầng */}
        <Form.Item name='floor_id' label="Chọn Tầng" rules={[{ required: true , message: 'Vui lòng Chọn Tầng' }]}>
            <Select>
                {/* <Select.Option value="0">Vô Hiệu Hóa</Select.Option>
                <Select.Option value="1">Đã Được Kích Hoạt</Select.Option> */}
                {listFloor ?  listFloor.map(row => <Select.Option key={row.id} value={row.id}>{row.name_floor}</Select.Option> ) : ''}
            </Select>
        </Form.Item>

        {/* trạng thái */}
        <Form.Item name='status' label="Chọn Trạng Thái" rules={[{ required: true , message: 'Vui lòng chọn trạng thái' }]}>
            <Select>
                <Select.Option value="1">Đã Đặt Trước</Select.Option>
                <Select.Option value="2">Đang Phục Vụ</Select.Option>
                <Select.Option value="3">Bàn Trống</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label={null} style={{marginTop: '20px'}}>
            <Button type="primary" htmlType="submit">
                Lưu
            </Button>
        </Form.Item>

        </Form>
        </Modal>
        </>
    )
}


export default ModalEditTable