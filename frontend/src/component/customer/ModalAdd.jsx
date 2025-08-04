import { Modal , Form , Input, Button , notification, Select , Upload , Col, Divider, Row  } from "antd";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import {  findWardByDistrict, getDistrictByProvince, getWardApi, saveCustomerApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";

const ModalAddCustomer = (props) => {
    const navigate = useNavigate();
    const { isModalAddOpen , handleCancleModalAdd , loadingData , listWard , listProvince , listDistrict , setListWard , setDistrict  } = props


    const [form] = Form.useForm(); 

    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        const data = JSON.stringify(values);

        const rs = await saveCustomerApi(data);
        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 201) {
            openNotificationSuccess( rs.data.message ,  'Thêm Khách Hàng'  , api);
            loadingData() 
            form.resetFields();
            handleCancleModalAdd();
        }
        else {
            openNotificationError(rs.data.message ,  'Thêm Khách Hàng'  , api);
            form.resetFields();
            handleCancleModalAdd();
        }
    }

    return  (
        <>
        {contextHolder}
        <Modal
        footer={false}
        title="Thêm Khách Hàng"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddOpen}
        onCancel={handleCancleModalAdd}
        width={1200}
      >
        <Form
        form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >


        <Form.Item name='name' label="Tên Khách Hàng" rules={[{ required: true , message: 'Vui lòng nhập tên khách hàng' }]}>
            <Input />
        </Form.Item>

        <Form.Item name='phone' label="Số Điện Thoại" rules={[{ required: true , message: 'Vui lòng nhập số điện thoại' } , {pattern : /^[0-9]+$/ , message : 'Vui lòng nhập số nguyên' } ]}>
            <Input />
        </Form.Item>

        <Form.Item name='email' label="Nhập Email" rules={[{ required: true , message: 'Vui lòng nhập email khách hàng' } , { type : 'email' , message : 'Vui lòng nhập đúng cú pháp email' } ]}>
            <Input />
        </Form.Item>

        <Form.Item name='username' label="Nhập tên đăng nhập" rules={[{ required: true , message: 'Vui lòng nhập tên đăng nhập' } , { pattern : /^[a-zA-Z0-9_]{4,20}$/ , message : 'Vui lòng nhập đúng cú pháp không cách, không dấu' }]}>
            <Input  />
        </Form.Item>



        <Form.Item name='housenumber_street' label="Nhập địa chỉ nhà" rules={[{ required: true , message: 'Vui lòng nhập địa chỉ nhà' }]}>
            <Input  />
        </Form.Item>


        <Row gutter={16}>
            <Col className="gutter-row" span={8}>
                <Form.Item name='province_id' label="Chọn Tỉnh Thành" rules={[{ required: true , message: 'Vui lòng chọn tỉnh thành' }]}>
                    <Select onChange={ async (e) => { 
                        if(e) {
                            const rs = await getDistrictByProvince(e);
                            setDistrict(rs.data);
                            form.resetFields(['district_id', 'ward_id']);
                        }
                        else {
                            setDistrict([]);
                            setListWard([]);
                            form.resetFields(['district_id', 'ward_id']);
                        }
                     }} >   
                        <Select.Option>-- Vui Lòng Chọn Tỉnh Thành --</Select.Option>
                        {listProvince.length  ? listProvince.map(row => <Select.Option value={row.id}>{row.name}</Select.Option> )  : '' }
                    </Select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
                <Form.Item name='district_id' label="Chọn Quận" rules={[{ required: true , message: 'Vui lòng nhập địa chỉ nhà' }]}>
                    <Select onChange={async (e) => {
                        if(e) {
                            const rs = await findWardByDistrict(e);
                            setListWard(rs.data);
                            form.resetFields(['ward_id']);
                        }
                        else {
                            // setDistrict([]);
                            setListWard([]);
                            form.resetFields(['ward_id']);
                        }
                    }} >
                        <Select.Option>-- Vui Lòng Chọn Quận --</Select.Option>
                        {listDistrict.length  ? listDistrict.map(row => <Select.Option value={row.id}>{row.name}</Select.Option> )  : '' }
                    </Select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
                <Form.Item name='ward_id' label="Chọn Phường" rules={[{ required: true , message: 'Vui lòng nhập địa chỉ nhà' }]}>
                    <Select>
                        <Select.Option>-- Vui Lòng Chọn Phường --</Select.Option>
                        {listWard.length  ? listWard.map(row => <Select.Option value={row.id}>{row.name}</Select.Option> )  : '' }
                    </Select>
                </Form.Item>
            </Col>
        </Row>

        <Form.Item name='status' label="Chọn Trạng Thái" rules={[{ required: true , message: 'Vui lòng chọn trạng thái' }]}>
            <Select>
                <Select.Option value="0">Vô Hiệu Hóa</Select.Option>
                <Select.Option value="1">Hoạt Động</Select.Option>
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

export default ModalAddCustomer