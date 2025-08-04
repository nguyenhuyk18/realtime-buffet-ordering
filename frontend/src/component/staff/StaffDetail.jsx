import { Drawer, Image } from "antd";
// import { useNavigate } from "react-router-dom";

const StaffDetail = (props) => {
//  const navigate = useNavigate();
    const { staffDetail ,  onCloseDrawer , open  } = props;

    return (
    <Drawer
        title="Thông Tin Chi Tiết Nhân Viên"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onCloseDrawer}
        open={open}
      >
        <p style={{marginBottom: '20px'}}><b>Họ Và Tên: </b>  {staffDetail?.name} </p>
        <p style={{marginBottom: '20px'}}><b>Số Điện Thoại: </b> {staffDetail?.mobile} </p>
        <p style={{marginBottom: '20px'}}><b>Tên Đăng Nhập: </b> {staffDetail?.username} </p>
        <p style={{marginBottom: '20px'}}><b>Email: </b> {staffDetail?.email} </p>
        {/* <p><b>Địa Chỉ: </b> {staffDetail?.address} </p> */}
        <p style={{marginBottom: '20px'}}><b>Trạng Thái: </b> {staffDetail?.is_active == 1 ? 'Đang Hoạt Động' : 'Không Hoạt Động'} </p>
        {/* <p><b>Ngày Tạo: </b> {staffDetail?.created_at} </p> */}
        <p style={{marginBottom: '20px'}}><b>Vai Trò: </b> {staffDetail?.name_role} </p>
        <p style={{marginBottom: '10px'}}><b>Hình Ảnh: </b></p>
        <Image
        width={200}
        src={import.meta.env.VITE_BACKEND_URL + `/api/v1/admin/avatar-staff/${staffDetail?.id}`}
        ></Image>
      </Drawer>
    )
}

export default StaffDetail