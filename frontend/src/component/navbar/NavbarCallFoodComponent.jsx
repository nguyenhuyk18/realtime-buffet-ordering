// import '../../assets/vendor/bootstrap.min.css'
// import '../../assets/vendor/style.css'
import images from '../../assets/img/—Pngtree—logo template for and restaurant_5255565.png';
import jessi from '../../assets/img/Aaron_Paul_Breaking_Bad_Jesse_Pinkman_Yellow_Hoodie__54705.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const NavbarComponentCallFood = () => {
    const [nameCustomer, getNameCustomer] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem('login-call-food');

        if (login) {
            const payload = jwtDecode(login);
            console.log(payload);
            getNameCustomer(payload.name_customer)
        }
        else {
            navigate('/login-call-food');
        }

    }, [])

    const handleOnclickLogout = () => {
        localStorage.removeItem('login-call-food');
        localStorage.removeItem('call-food');
        navigate('/login-call-food')

    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid d-block w-100">
                    <div className="row">
                        <div className="col-6">
                            <img src={images} alt="" />
                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className='dropLogOut'>
                                    <div className="name-customer">Welcome {nameCustomer ? nameCustomer : ''} !!</div>
                                    <div className="text-center log_out" onClick={handleOnclickLogout}>
                                        <span  ><i className="fa-solid fa-right-from-bracket"></i> Đăng Xuất</span>
                                    </div>
                                </div>

                                <div className="avartar">
                                    <img src={jessi} alt="jj" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavbarComponentCallFood;