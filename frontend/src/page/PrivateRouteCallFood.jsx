import { Navigate, Outlet } from "react-router-dom"
// import { useNavigate } from 'react-router-dom';
const PrivateRouteCallFood = () => {
    const isLoginCallFood = localStorage.getItem('login-call-food');
    return isLoginCallFood ? <Outlet /> : <Navigate to={'/login-call-food'} />
}

export default PrivateRouteCallFood
