import { Modal , Form , Input, Button , notification, Checkbox  } from "antd";
import { openNotificationSuccess , openNotificationError } from '../notification/NotificaComponent';
import { Col, Row } from 'antd';
import { useEffect } from "react";
import { savePermissionApi, updateRoleApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";



const ModalPermission = (props) => {
     const navigate = useNavigate();
    const { roleDetail , actionRoleHas , allAction , isModalPermissionOpen , handleCanclePermission } = props;

    useEffect(() => {
        if(roleDetail) {
            // console.log(roleDetail);
            form.setFieldsValue({ permission: actionRoleHas , role_id : roleDetail.id });
        }
    }, [roleDetail]);

    const [form] = Form.useForm();

    const [api , contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        
        const dataJSON = JSON.stringify(values);
        console.log(dataJSON);
        const rs = await savePermissionApi(dataJSON);

        if(rs.status == 405) {
          navigate('/admin/login');
        }


        // if(rs.status == 403) {
        //   navigate('/admin' , { state : { message : 'Bạn không có thẩm quyền để thực hiện ' } });
        // }

        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message , 'Phân quyền' , api);
            handleCanclePermission();
            form.resetFields();
        }
        else {
            openNotificationError(rs.data.message , 'Phân quyền' , api);
            handleCanclePermission();
            form.resetFields();
        }
    }

    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Phân Quyền Cho Vai Trò"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalPermissionOpen}
        // onOk={handleAddOk}
        onCancel={() => {handleCanclePermission(); form.resetFields()  }}
        >
        <Form
            form = {form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
        >
            <Form.Item label={false} name="role_id">
                <Input  disabled />
            </Form.Item>
            <Form.Item label={false} name="permission" >
                <Checkbox.Group>
                    <Row gutter={16}>
                        {   
                            allAction.length ? 
                            allAction.map(row => {
                            // console.log(row);
                            // console.log(actionRoleHas);
                                return ( 
                                <Col className="gutter-row" key={row.id} span={12}>
                                        {/* <Input  /> */}
                                        <Checkbox value={row.id} checked={ actionRoleHas.includes(row.id) ? true : false }>{row.description}</Checkbox>
                                </Col>
                                )
                            })
                            : 
                            ''
                        }
                    </Row>
                </Checkbox.Group>
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


export default ModalPermission;