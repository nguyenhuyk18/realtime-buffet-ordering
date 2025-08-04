import '../assets/Login.css';
import { useState } from 'react';
import { loginToAdmin } from '../service/api.service';
import { notification } from 'antd';
import { openNotificationSuccess , openNotificationError } from '../component/notification/NotificaComponent'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
     const navigate = useNavigate(); // khởi tạo hàm navigate

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');

    const [api , contextHolder] = notification.useNotification()

    const handleChangeUsername = (values) => {
        setUsername(values);
    }

    const handleChangePassword = (values) => {
        setPassword(values);
    }

    const handleSubmitForm = async () => {
        const val = {
            email : username,
            password : password
        }

        const dataJSON = JSON.stringify(val);
        const rs = await loginToAdmin(dataJSON);

        if( rs.status == 201 ) {
            openNotificationSuccess( 'Đăng Nhập Thành Công' , 'Đăng Nhập' , api );

            localStorage.setItem('login' , rs.data.access_token );
            setCookie('refresh_token' , rs.data.refresh_token , 8);

            setTimeout(() => {
                navigate('/admin');
            } , 2000);
        }   
        else {
            openNotificationError(rs.data.message , 'Đăng Nhập' , api);
        }
    }   

    return (
        <div className="bodyLogin">
            {contextHolder}
        <div className="login-admin">
            <h1 className='titleAdmin'>ADMIN PANEL</h1>
            <div className='loginForm' >
                
                <div className="control-form">
                    {/* <label htmlFor="username">Tên Đăng Nhập</label> */}
                    <input type="email" name='username' id='username' placeholder='Nhập EMAIL của bạn' onChange={(e) => handleChangeUsername(e.target.value)} />
                </div>
                <div className="control-form">
                    {/* <label htmlFor="password">Mật Khẩu</label> */}
                    <input type="password" name='password' id='password' onChange={(e) => handleChangePassword(e.target.value)} placeholder='Nhập Mật Khẩu' />
                </div>
                

                

                <button className='btnSubmitLogin'  onClick={handleSubmitForm} >Đăng Nhập</button>
            </div>
        </div>
        </div>

    )
}

export default LoginPage