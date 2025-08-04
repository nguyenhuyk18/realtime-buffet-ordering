import { useNavigate } from "react-router-dom";



const NavigateHelpers = () => {
    const navigate = useNavigate();
    navigate('/admin/login');
}

export default NavigateHelpers;