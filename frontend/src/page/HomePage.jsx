import { useLocation } from "react-router-dom";
import AboutComponent from "../component/client/AboutComponent"
import ContactEmail from "../component/client/ContactEmailComponent"
import IntroduceComponent from "../component/client/IntroduceComponent"
import TeamComponent from "../component/client/TeamComponent"
import { openNotificationError } from "../component/notification/NotificaComponent";
import { notification } from "antd";
import { useEffect } from "react";

const  HomePage = () => {
    const location = useLocation()
    const [api, contextHolder] = notification.useNotification();
    useEffect (() => {
        if(location.state?.message_unlogin) {
            openNotificationError( location.state.message_unlogin , 'Quyền Truy Cập' , api);
            location.state = null
        }
    } , []);

    return (
        <>
        {contextHolder}
        <IntroduceComponent/>
        <AboutComponent/>
        <TeamComponent/>
        <ContactEmail/>
        </>
    )
}

export default HomePage