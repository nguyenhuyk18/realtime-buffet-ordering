import { Link } from 'react-router-dom';
import logo from '../../assets/img/—Pngtree—logo template for and restaurant_5255565.png'
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { getProfileClienApi, logoutClientApi } from '../../service/api.service';

const NavBarClient = (props) => {
  const navigate = useNavigate();
  const { setIsLoginOpen, setIsRegisterOpen, dataCustomer, setDataCustomer } = props;

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    console.log(dataCustomer, 'navlink')
    if (dataCustomer) {
      loadIsLogin();
    }

  }, [dataCustomer]);


  const loadIsLogin = async () => {
    const rs = await getProfileClienApi();
    // console.log(rs.data.name)
    if (rs.status == 201) {
      setDataCustomer(rs.data.name);
      setIsLogin(true)
    }
    else {
      setDataCustomer(null)
      setIsLogin(false);
    }

  }

  return (
    <header>
      {/* {console.log(isLogin)}
  {console.log(dataCustomer)} */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}><img src={logo} alt="" /></Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="index.html">Trang Chủ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/chinh-sach-dat-ban.html'}>Chính Sách Đặt Bàn</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link reserve me-2" to={"/dat-ban.html"} >Đặt Bàn</Link>
              </li>
            </ul>
            <div className="d-flex my-2 my-lg-0">
              {dataCustomer ? <><a className='btn me-2'>{dataCustomer}</a> <a className='btn' onClick={() => {
                setIsLogin(false);
                setDataCustomer(null);
                logoutClientApi();
                navigate('/', { state: { log_out_now: 'true' } })
              }} >Đăng Xuất</a> </> : <>
                <a onClick={() => setIsRegisterOpen(true)} className="btn me-2 " >Đăng
                  Ký</a>
                <a onClick={() => setIsLoginOpen(true)} className="btn" >Đăng Nhập</a>

              </>}

            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBarClient;