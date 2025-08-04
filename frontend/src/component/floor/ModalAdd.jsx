import { Modal , Form , Input, Button , notification  } from "antd";
import { openNotificationSuccess , openNotificationError } from '../notification/NotificaComponent';
import { saveFloorApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";


const ModalAddFloor = (props) => {
    const navigate = useNavigate();
    const [api , contextHolder] = notification.useNotification();

    const [form] = Form.useForm();

    const { isModalAddOpen , handleAddCancel , loadingData}  = props

    const onFinish = async (values) => {
        const dataJSON = JSON.stringify(values);
        const rs = await saveFloorApi(dataJSON);
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message ,  'Thêm Tầng Mới' , api);
            loadingData();
            handleAddCancel();
            form.resetFields();
        }
        else {
            openNotificationError(rs.data.message ,  'Thêm Tầng Mới' , api);
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
        title="Thêm Tầng Mới"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddOpen}
        // onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form
        form = {form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
        >
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

export default ModalAddFloor;