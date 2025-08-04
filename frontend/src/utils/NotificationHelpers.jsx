import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const openNotificationSuccess = (descrip , title , api) => {
    api.open({
        message: title,
        description: descrip,
        icon: <CheckOutlined />,
    });
};


const openNotificationError = (descrip , title , api) => {
    api.open({
        message: title,
        description: descrip,
        icon: <CloseOutlined /> ,
    });
};

export { openNotificationSuccess ,  openNotificationError }