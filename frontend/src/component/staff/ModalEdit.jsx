import { Modal , Form , Input, Button , notification, Select  } from "antd";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import { useEffect } from "react";
import { updateStaffApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";


const ModalEditStaff = (props) => {
 const navigate = useNavigate();
    const [form] = Form.useForm();
    const [api , contextHolder] = notification.useNotification(); 
    const { staffDetail ,  loadingData ,  isModalEditStaffOpen , handleCancleModalEdit , listRole } = props;

    useEffect(() => {
        if(staffDetail) {
            form.setFieldsValue(
                {   
                    id : staffDetail.id,
                    name : staffDetail.name,
                    username : staffDetail.username,
                    email : staffDetail.email,
                    mobile : staffDetail.mobile,
                    is_active : String(staffDetail.is_active),
                    role_id : staffDetail.role_id
                }
            )
        }

    } , [staffDetail])

    const onFinish = async (values) =>  {
        const dataJson = JSON.stringify(values);
        // console.log(dataJson);
        const rs = await updateStaffApi(dataJson);
                if(rs.status == 405) {
          navigate('/admin/login');
        }
        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message , 'Thêm Nhân Viên' , api);
            loadingData();
            handleCancleModalEdit();
            form.resetFields();
        }
        else {
            openNotificationError(rs.data.message , 'Thêm Nhân Viên' , api);
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
        title="Thêm Nhân Viên"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalEditStaffOpen}
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
        <Form.Item name='id' label="Mã Nhân Viên" rules={[{ required: true , message: 'Vui lòng nhập tên nhân viên' }]}>
            <Input  disabled/>
        </Form.Item>


        {/* tên đầy đủ  */}
        <Form.Item name='name' label="Tên Nhân Viên" rules={[{ required: true , message: 'Vui lòng nhập tên nhân viên' }]}>
            <Input />
        </Form.Item>

        {/* username */}
        <Form.Item name='username' label="Nhập Tên Đăng Nhập" rules={[{ required: true , message: 'Vui lòng điền tên đăng nhập' }]}>
            <Input />
        </Form.Item>

        {/* email */}
        <Form.Item name='email' label="Nhập Email Của Bạn" rules={[{ required: true , message: 'Vui lòng điền Email' }, {type : 'email' , message : 'Email nhập không đúng cú pháp'}]}>
            <Input />
        </Form.Item>

        {/* nhập số điện thoại */}
        <Form.Item name='mobile' label="Nhập Số Điện Thoại Của Bạn" rules={[{ required: true , message: 'Vui lòng điền số điện thoại' } , { pattern: /^0[0-9]{9}$/, message: 'Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số!' }]}>
            <Input />
        </Form.Item>

        {/* Chọn isactive */}
        <Form.Item name='is_active' label="Chọn Trạng Thái Tài Khoản" rules={[{ required: true , message: 'Vui lòng chọn trạng thái !!!' }]} >
            <Select>
                <Select.Option value="0">Vô Hiệu Hóa</Select.Option>
                <Select.Option value="1">Đã Được Kích Hoạt</Select.Option>
            </Select>
        </Form.Item>

        {/* Chọn vai trò */}
        <Form.Item name='role_id' label="Chọn Vai Trò Cho Tài Khoản Này" rules={[{ required: true , message: 'Vui lòng chọn vai trò !!!'}]} >
            <Select>
                {listRole != null ? listRole.map(row => <Select.Option key={row.id} value={row.id}>{row.name_role}</Select.Option>) : ''}
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

export default ModalEditStaff