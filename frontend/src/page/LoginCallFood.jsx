import { useEffect } from 'react'
import login from '../assets/vendor/login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginToCallFood } from '../service/api.service'
import { openNotificationError } from '../component/notification/NotificaComponent'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const LoginCallFood = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();


  const formik = useFormik({
    // Khởi động giá trị cho thẻ nhập liệu
    initialValues: {
      username: '',
      password: ''
    },
    // Kiểm tra dữ liệu hợp lệ không
    validationSchema: Yup.object({
      username: Yup.string().required('Vui lòng điền tên đăng nhập của bạn !!'),
      password: Yup.string().required('Vui lòng nhập mật khẩu của bạn !!')
    }),

    // nếu dữ liệu hợp lệ thì dô đây chạy ahehe
    onSubmit: async (values ,    { resetForm }) => {
      const data = JSON.stringify(values);
      const rs = await loginToCallFood(data);
      if(rs.status == 201) {
        localStorage.setItem('login-call-food' , rs.data.access_token);
        navigate('/call-food');
      }
      else {
        openNotificationError( rs.data.message , 'Đăng Nhập Thất Bại' , api);
        resetForm();
      }
    },
  });


  useEffect(() => {
    import('../assets/vendor/bootstrap.min.css');
  }, [])

    return (
          <div className={login.goi_mon_login}>
            {contextHolder}
    <form className={login.form_login_call_food} onSubmit={formik.handleSubmit} >
      <h1 style={{fontSize :'35px' , color : '#fff' }} className="text-center mb-1   pt-5 pb-5 fw-bold">CHÀO MỪNG BẠN ĐẾN VỚI BUFFET ĐỨC HUY HẸ HẸ HẸ</h1>
      <div className='mb-4'>
        <input name='username' type="text" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control  call-food"  placeholder="Nhập Tên Đăng Nhập Của Bạn" />
        {
          formik.touched.username && formik.errors.username ?
            <div className='text-danger'>{formik.errors.username}</div> : null
        }
      </div>
      <div className='mb-4'>
        <input name='password' type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control call-food"  placeholder="Nhập Mật Khẩu Của Bạn" />
        {
          formik.touched.password && formik.errors.password ?
            <div className='text-danger'>{formik.errors.password}</div> : null
        }
      </div>
      <div className="text-center mt-2">
        <button className="btn btn-success mx-auto" type='submit' >Đăng nhập</button>
      </div>
    </form>
  </div>
    )
}

export default LoginCallFood