import { Modal , Form , Input, Button , notification } from 'antd';
import { useEffect, useState } from "react";
import { updateBrandApi } from '../../service/api.service';
import { openNotificationSuccess , openNotificationError } from '../notification/NotificaComponent';
import { useNavigate } from 'react-router-dom';

const ModalEditBrand = (props) => {
    const navigate = useNavigate();
    const { isModalEditOpen , handleCancleEdit , loadingData , dataEdit } = props;

    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    useEffect(() => {

        if(dataEdit) {
            form.setFieldsValue({
                id: dataEdit.id,
                name_brand: dataEdit.name_brand,
            });
        }
    } , [dataEdit])

    const onFinish = async (values) => {
        const dataJson = JSON.stringify(values);
        const rs = await updateBrandApi(dataJson);
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        
        if( rs.status == 201 ) {
            loadingData();
            form.resetFields();
            handleCancleEdit();
            openNotificationSuccess( rs.data.message  , 'Cập nhật thương hiệu' ,api)
        }
        else {
            form.resetFields();
            handleCancleEdit();
            openNotificationError( rs.data.message  , 'Cập nhật thương hiệu' , api)
        }
    }



    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Sửa Thương Hiệu"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalEditOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleEdit}
        >
        <Form
            form = {form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
        >

        <Form.Item name='id'   label="Mã Thương Hiệu">
            <Input  disabled />
        </Form.Item>
        
        <Form.Item name='name_brand'  label="Tên thương hiệu" rules={[{ required: true , message: 'Vui lòng nhập tên thương hiệu' }]}>
            <Input   />
        </Form.Item>

        <Form.Item label={null} style={{marginTop: '20px'}} >
            <Button type="primary" htmlType="submit">
                Lưu
            </Button>
        </Form.Item>
        </Form>
        </Modal>
        </>

    )
}

export default ModalEditBrand