import { Modal , Form , Input, Button , notification  } from "antd";
import { openNotificationSuccess , openNotificationError } from '../notification/NotificaComponent';
import { updateFloorApi } from "../../service/api.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const ModalEditFloor = (props) => {
    const navigate = useNavigate();
    const [api , contextHolder] = notification.useNotification();

    const [form] = Form.useForm();

    const { isModalEditOpen , handleEditCancel , loadingData , floorDetail }  = props;

    useEffect(() => {
        if(floorDetail) {
            form.setFieldsValue({
                id : floorDetail.id,
                name_floor : floorDetail.name_floor
            })
        }
    } , [floorDetail]);

    const onFinish = async (values) => {
        const dataJSON = JSON.stringify(values);
        const rs = await updateFloorApi(dataJSON);
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message ,  'Cập Nhật Tầng Mới' , api);
            loadingData();
            handleEditCancel();
            form.resetFields();
        }
        else {
            openNotificationError(rs.data.message ,  'Cập Nhật Tầng Mới' , api);
            handleAddCancel();
            form.resetFields();
        }
    }

    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Cập Nhật Tầng"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalEditOpen}
        // onOk={handleAddOk}
        onCancel={handleEditCancel}
      >
        <Form
        form = {form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
        >
        <Form.Item name='id' label='Mã Tầng' >
            <Input disabled />
        </Form.Item>
        <Form.Item name='name_floor' label="Tên Tầng Mới" rules={[{ required: true , message: 'Vui lòng nhập tên tầng mới' }]}>
            <Input />
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

export default ModalEditFloor;