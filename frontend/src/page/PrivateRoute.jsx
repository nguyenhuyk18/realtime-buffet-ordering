import { Navigate, Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
const PrivateRoute = () => {
    const isLogin = localStorage.getItem('login');
    return isLogin ? <Outlet /> : <Navigate to={'/admin/login'} />
}

export default PrivateRoute
