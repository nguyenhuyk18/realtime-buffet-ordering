import {  Table,  Flex, Button  , message, Popconfirm  } from 'antd';
import { useEffect, useState } from 'react';
import { deleteFloorApi, findFloorApi, getFloorApi } from '../service/api.service';
import ModalAddFloor from '../component/floor/ModalAdd';
import ModalEditFloor from '../component/floor/ModalEdit';
import { useNavigate } from 'react-router-dom';
const FloorPage = () => {
     const navigate = useNavigate();
    const [listFloor , setListFloor] = useState([]);
    const [isModalAddOpen , setModalAddOpen] = useState(false);
    const [isModalEditOpen , setModalEditOpen] = useState(false);
    const [floorDetail , setFloorDetail] = useState(null);

    useEffect(() => {
        loadingData();
    } , [])

        // Tác Vụ Xóa Dữ Liệu 
    const confirm = async e => {
        
        const rs = await deleteFloorApi(e);
        
        if(rs.status == 201) {
            message.success('Xóa thành công !!!');
            loadingData();
        }

        if(rs.status == 405) {
          navigate('/admin/login');
        }

        else {
            message.error(rs.data.message);
        }
    };

    const cancel = e => {
        // console.log(e);  
        message.success('Cảm ơn bạn đã lựa chọn');


    };

    const loadingData = async () => {
        const rs = await getFloorApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }

        setListFloor(rs.data);
    }

    const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tên Tầng',
        dataIndex: 'name_floor',
        key: 'name_floor',
    },
    {
        title: 'Các Tác Vụ',
        key: 'action',
        // dataIndex: 'action',
        render: (_, record) => (
                
        <Flex gap='small'>
            {/* {console.log()}    */}
            <Button color="cyan"  variant="solid" onClick={
                async () => {
                    const rs = await findFloorApi(record.id);
                    if(rs.status == 405) {
                        navigate('/admin/login');
                    }
                    setModalEditOpen(true);
                    setFloorDetail(rs.data);
                }   
            } >
                Sửa
            </Button>
            <Popconfirm
                title="Xóa thương hiệu"
                description="Bạn có chắc muốn xóa chứ ??"
                onConfirm={() => confirm(record.id)}
                onCancel={cancel}
                okText="Đồng Ý"
                cancelText="Hủy Bỏ"
            >
            <Button color="danger"  variant="solid">
                Xóa
            </Button>
            </Popconfirm>

        </Flex>
      
        ),
        },
    ];


    const handleAddCancel = () => {
        setModalAddOpen(false);
    }

    const handleEditCancel = () => {
        setModalEditOpen(false);
    }

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Tầng</h1>
        <Button type='primary' onClick={() => setModalAddOpen(true)} >Thêm Tầng Mới</Button>
        </Flex>
        
        
        <Table
	columns={columns}
	rowKey={'id'}
	dataSource={listFloor} 
	scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, 
        }}/>

        <ModalAddFloor
	    isModalAddOpen={isModalAddOpen}
	    handleAddCancel={handleAddCancel}
	    loadingData={loadingData}
        />

        <ModalEditFloor
	    isModalEditOpen={isModalEditOpen}
	    handleEditCancel={handleEditCancel}
	    loadingData={loadingData}
	    floorDetail={floorDetail}
        />
        </>
    )
}

export default FloorPage