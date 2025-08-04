import { Space, Table, Tag , Flex, Button  , message, Popconfirm  } from 'antd';
import { useEffect, useState } from 'react';
import { getActionApi } from '../service/api.service';
import { useNavigate } from 'react-router-dom';
// useNavigate

const ActionPage = () => {
    const navigate = useNavigate();
    const [listAction , setListAction] = useState([]);
    // const 

    useEffect(() => {
        loadingData()
    } , []);


    const columns = [

    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tên Tác Vụ',
        dataIndex: 'name_action',
        key: 'name_action',
    },
    {
        title: 'Mô Tả',
        dataIndex: 'description',
        key: 'description'
    },

    ];


    // call api
    const loadingData = async () => {
        const rs = await getActionApi();

        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , {
                state: { message: "Bạn không có quyền truy cập vào trang này !!!" },
            })
        }

        setListAction(rs.data);
    }

    return (
        <>
        
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Tác Vụ</h1>
        {/* <Button type='primary' onClick={showModalCategory} >Thêm tác vụ</Button> */}
        </Flex>
        
        
        <Table columns={columns} rowKey={'id'} dataSource={listAction} scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/>
        </>
    )
}

export default ActionPage