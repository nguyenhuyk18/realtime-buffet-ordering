import { Modal , Form , Input, Button , notification  } from "antd";
import { openNotificationSuccess , openNotificationError } from '../notification/NotificaComponent'
import { useEffect } from "react";
import { updateRoleApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";

const ModalEditRole = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [api , contextHolder] = notification.useNotification();

    const {loadingData , isModalEditOpen ,  handleCancleEditRole , roleDetail} = props;

    useEffect(() => {
        if(roleDetail) {
            form.setFieldsValue({
                id : roleDetail.id,
                name_role : roleDetail.name_role
            })
        }
    } , [roleDetail])


    const onFinish = async (values) => {
        const rs = await updateRoleApi(values);
                if(rs.status == 405) {
          navigate('/admin/login');
        }
        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message , 'Sửa Vai Trò' , api);
            handleCancleEditRole();
            loadingData();
            form.resetFields();
        }
        else {
            openNotificationError(rs.data.message , 'Sửa Vai Trò' , api);
            handleCancleEditRole();
            form.resetFields();
        }
    }

    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Sửa Tên Vai Trò"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalEditOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleEditRole}
        >
        <Form
        form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
        <Form.Item name='id' label="Mã Vai Trò">
            <Input disabled/>
        </Form.Item>
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

export default ModalEditRole