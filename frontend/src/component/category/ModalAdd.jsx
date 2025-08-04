import { Modal , Form , Input, Button , notification  } from "antd"
import { saveCategoryApi } from "../../service/api.service";
import { useMemo, useState } from "react";
import { CheckOutlined, CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const ModalAddCategory = (props) => {
    const navigate = useNavigate();
    const {loadingData ,  handleAddCancel , isModalAddOpen } = props;

    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const openNotificationSuccess = (descrip) => {
        api.open({
        message: 'Thêm Danh Mục Thành Công',
        description: descrip,
        icon: <CheckOutlined />,
        });
    };


    const openNotificationError = (descrip) => {
        api.open({
        message: 'Thêm Danh Mục Thất Bại',
        description: descrip,
        icon: <CloseOutlined /> ,
        });
    };

    const onFinish = async (values) => {
        const data = JSON.stringify(values);

        const rs = await saveCategoryApi(data);
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        // console.log(rs)

        if(rs.status == 201) {
            openNotificationSuccess('Thêm danh mục thành công !!!');
            loadingData()
            form.resetFields();
            handleAddCancel();
            
        }
        else {
            openNotificationError(rs.data.message);
            // setIsModalAddOpen(false);
            form.resetFields();
            handleAddCancel();
            // setIsModalAddOpen(false);
        }
    }

    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Thêm Danh Mục"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddOpen}
        // onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form
        form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
        <Form.Item name='name_category' label="Tên Danh Mục" rules={[{ required: true , message: 'Vui lòng nhập tên danh mục' }]}>
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

export default ModalAddCategory;
