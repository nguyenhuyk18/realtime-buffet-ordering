import { Modal , Form , Input, Button , notification  } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { openNotificationError } from "../component/notification/NotificaComponent";
openNotificationError

const DoashBoardPage = () => {
    const location = useLocation()
    const [api, contextHolder] = notification.useNotification();


    useEffect (() => {
        if(location.state?.message) {
            openNotificationError( location.state.message , 'Quyền Truy Cập' , api);
            location.state = null
        }
    } , []);

    return (
    <>
    {contextHolder}
    <h1>Trang Chủ</h1>
    </>) 
        
    
}

export default DoashBoardPage;