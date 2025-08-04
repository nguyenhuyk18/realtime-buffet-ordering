import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const openNotificationSuccess = (descrip , title , api) => {
    api.open({
        message: <span style={{ color: '#52c41a', fontWeight: 600 }}>{title}</span>,
        description: <span style={{ color: '#333' }}>{descrip}</span>,
        icon: <CheckOutlined style={{ color: '#52c41a', fontSize: 22 }} />,
        style: { background: '#f6ffed', border: '1px solid #b7eb8f' },
        // duration: 3,
        placement: 'topRight',
    });
};


const openNotificationError = (descrip , title , api) => {
    api.open({
        message: <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{title}</span>,
        description: <span style={{ color: '#333' }}>{descrip}</span>,
        icon: <CloseOutlined style={{ color: '#ff4d4f', fontSize: 22 }} />,
        style: { background: '#fff2f0', border: '1px solid #ffccc7' },
        placement: 'topRight',
    });
};

export { openNotificationSuccess ,  openNotificationError }