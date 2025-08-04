import { Modal , Form , Input, Button , notification  } from "antd";
import { CheckOutlined, CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { saveRoleApi } from "../../service/api.service";
import { openNotificationSuccess , openNotificationError } from '../notification/NotificaComponent'
import { useNavigate } from "react-router-dom";


const ModalAddRole = (props) => {
     const navigate = useNavigate();
    const {handleCancleAddRole , isModalAddRoleOpen ,  loadingData} = props;

    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const dataJSON = JSON.stringify(values);
        const rs = await saveRoleApi(dataJSON);
                if(rs.status == 405) {
          navigate('/admin/login');
        }

        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message , 'Thêm Vai Trò' , api);
            loadingData();
            form.resetFields();
            handleCancleAddRole();
        }else {
            openNotificationError(rs.data.message , 'Thêm Vai Trò' , api);
            form.resetFields();
            handleCancleAddRole();
        }
    }
    
    return ( 
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Thêm Vai Trò"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddRoleOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleAddRole}
        >
        <Form
        form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
        <Form.Item name='name_role' label="Tên Vai Trò" rules={[{ required: true , message: 'Vui lòng nhập tên vai trò' }]}>
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

export default ModalAddRole