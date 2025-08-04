import { Modal , Form , Input, Button , notification, Select , Upload  } from "antd";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import { saveTableApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";

const ModalAddTable = (props) => {
 const navigate = useNavigate();
    const { isModalAddTableOpen , handleCancleModalAdd , loadingData , listFloor } = props

    const [form] = Form.useForm();

    const [api , contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        const dataJSON  = JSON.stringify(values)
        const rs = await saveTableApi(dataJSON);
                if(rs.status == 405) {
          navigate('/admin/login');
        }
        if(rs.status == 201) {
            loadingData();
            handleCancleModalAdd();
            form.resetFields();
            openNotificationSuccess(rs.data.message , 'Thêm Bàn Mới' , api);

        }
        else {
            handleCancleModalAdd();
            form.resetFields();
            openNotificationError(rs.data.message , 'Thêm Bàn Mới' , api);
        }
    }

    return (
        <>
                {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Thêm Bàn Mới"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddTableOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleModalAdd}
      >
        <Form
            form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
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


export default ModalAddTable