import { useState } from "react";
import { getProfileClienApi, loginToClientSiteApi } from "../../service/api.service";
// import { useNavigate } from "react-router-dom";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import { notification } from "antd";


const ModalLogin = (props) => {
  // const navigate = useNavigate();
  const { isLoginOpen  , setIsLoginOpen , setDataCustomer} = props;
  const [username , setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const handleOnChangeUsername = (val) => {
    setUsername(val);
  }

  const handleOnChangePassword = (val) => {
    setPassword(val);
  }

  const handleSubmit = async () => {

    const data = {
      username : username,
      password : password
    }

    const dataJSON = JSON.stringify(data);
    // console.log(dataJSON)
    const rs = await loginToClientSiteApi(dataJSON);
    if(rs.status == 201)  {
      const nameCustomer = await getProfileClienApi();
      setIsLoginOpen(false);
      // console.log(nameCustomer)
      setDataCustomer(nameCustomer.data.name);
      // localStorage.setItem('login-client-site' , rs.data.access_token);
      openNotificationSuccess( 'Bạn Đã Đăng Nhập Thành Công Có Thể Đặt Bàn Ngay !!!' , 'Đăng Nhập Thành Công'  , api);
      setUsername('');
      setPassword('');
    }
    else {
      openNotificationError( rs.data.message , 'Đăng Nhập Thành Công'  , api);
      setIsLoginOpen(false);
      setUsername('');
      setPassword('');
    }

  }

    return (
      <>
      {contextHolder}
      <div className={`modal fade ${isLoginOpen ? ' show d-block' : '' } `} id="dangnhap" >
  <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalTitleId">
          Đăng Nhập
        </h5>
        <button type="button" onClick={() => setIsLoginOpen(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="">
        <div className="modal-body">

          <div className="row">

            <div className="col-12 mb-3">
              <input type="email" name="email" value={username} className="form-control" placeholder="Nhập Tên Đăng Nhập" onChange={(e) => handleOnChangeUsername(e.target.value)} />
            </div>
            <div className="col-12 mb-3">
              <input type="password" value={password} onChange={(e) => handleOnChangePassword(e.target.value)} name="password" className="form-control" placeholder="Nhập Mật Khẩu"/>
            </div>

          </div>
        </div>
        <div className="modal-footer flex-nowrap">
          <button type="button" className="btn btn-danger w-50" data-bs-dismiss="modal"  onClick={() => {
            setIsLoginOpen(false)
            setUsername('');
            setPassword('');
            }} >
            Đóng
          </button>
          <button type="button" onClick={handleSubmit} className="btn btn-success w-50">Đăng Nhập</button>
        </div>
      </form>
    </div>
  </div>
</div>
{isLoginOpen && <div className="modal-backdrop fade show"></div>}
      </>

    )
}

export default ModalLogin