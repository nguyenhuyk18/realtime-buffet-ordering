import { Outlet } from 'react-router-dom';
import FooterClient from '../component/navbar/FooterClient';
import NavBarClient from '../component/navbar/NavBarClient';
import ModalLogin from '../component/client/ModalLogin';
import ModalRegister from '../component/client/ModalRegister';
import { useEffect, useRef, useState } from 'react';
import { getProfileClienApi } from '../service/api.service';
import { useLocation } from 'react-router-dom';

// import 'bootstrap'


const ClientPage = () => {
    import('../assets/vendor/bootstrap-5.0.2-dist/css/bootstrap.min.css');
    import('../assets/vendor/style.css');
    import('../assets/vendor/fontawesome-free-6.7.2-web/css/all.css');

    const location = useLocation()


    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isConfirmLogin, setConfirmLogin] = useState(false);
    const [dataCustomer, setDataCustomer] = useState(null);
    // const dataCustomerRef = useRef

    const getNameCustomer = async () => {
        const rs = await getProfileClienApi();
        if (rs.status == 201) {
            setDataCustomer(rs.data.name)
        }
        else {
            setDataCustomer(null)
        }
    }


    useEffect(() => {

        if (location.state?.log_out_now) {
            console.log(dataCustomer, 'yess sirrr')
            setDataCustomer(null)
            getNameCustomer();
        }
        delete location.state
        //
    }, [location.pathname])


    return (
        <>
            <NavBarClient setIsLoginOpen={setIsLoginOpen} setIsRegisterOpen={setIsRegisterOpen} dataCustomer={dataCustomer} setDataCustomer={setDataCustomer} />
            <Outlet />
            <FooterClient />
            <ModalLogin isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} setDataCustomer={setDataCustomer} />
            <ModalRegister isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen} />

        </>
    )
}

export default ClientPage;