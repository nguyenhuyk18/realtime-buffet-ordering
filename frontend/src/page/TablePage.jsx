import {  Table , Flex, Button  , message, Popconfirm   } from 'antd';
import { useEffect, useState } from 'react';
import { deleteTableApi, findTableApi, getFloorApi, getTableApi } from '../service/api.service';
import ModalAddTable from '../component/table/ModalAdd';
import ModalEditTable from '../component/table/ModalEdit';
import { useNavigate } from 'react-router-dom';

const TablePage = () => {
     const navigate = useNavigate();
    const [listTable , setListTable] = useState([]);
    const [tableDetail , setTableDetail] = useState(null);
    const [listFloor , setListFloor] = useState(null);
    const [isModalAddTableOpen , setModalAddTableOpen] = useState(false);
    const [isModalEditTableOpen , setModalEditTableOpen] = useState(false)
    
    // Tác Vụ Xóa Dữ Liệu 
    const confirm = async e => {
        // message.success('Xóa thành công !!!');
        const rs = await deleteTableApi(e);
        
        if(rs.status == 201) {
            message.success('Xóa thành công !!!');
            loadingData();
        }
        else {
            message.error(rs.data.message);
        }
    };

    const cancel = e => {
        message.success('Cảm ơn bạn đã lựa chọn');
    };

    useEffect(() => {
        loadingData();
    } , []);

    const loadingData = async () => {
        const rs = await getTableApi();
        const rsFloor = await getFloorApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        if(rsFloor.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , {state : { message : rs.data.message  }});
        }

        if(rsFloor.status == 403) {
             navigate('/admin' , {state : { message : rsFloor.data.message  }});
        }
        setListTable(rs.data);
        setListFloor(rsFloor.data);
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
        dataIndex: 'name_table',
        key: 'name_table',
    },
    {
        title: 'Số Chỗ Ngồi (người)',
        dataIndex: 'capacity',
        key: 'capacity',
    },
    {
        title: 'Trạng Thái',
        // dataIndex: 'capacity',
        key: 'status',
        render: (_, record) => (
           record.status == 3 ?  <p>Đang Trống</p> : record.status == 2 ? <p>Đang phục vụ</p> : record.status == 1 ? <p>Đã đặt trước</p> : ''
        )                   
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
                    const rs = await findTableApi(record.id);
                            if(rs.status == 405) {
            navigate('/admin/login');
        }
                    setModalEditTableOpen(true);
                    setTableDetail(rs.data);
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

    const handleCancleModalAdd = () => {
        setModalAddTableOpen(false);

    }

    const handleCancleModalEdit = () => {
        setModalEditTableOpen(false);
    }

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Bàn</h1>
        <Button type='primary' onClick={() => {
            setModalAddTableOpen(true)
        }}  >Thêm Bàn Mới</Button>
        </Flex>

        <Table columns={columns} rowKey={'id'} dataSource={listTable} scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/>

        <ModalAddTable isModalAddTableOpen={isModalAddTableOpen} handleCancleModalAdd={handleCancleModalAdd} loadingData={loadingData} listFloor={listFloor}  />


        <ModalEditTable tableDetail={tableDetail} isModalEditTableOpen={isModalEditTableOpen} handleCancleModalEdit={handleCancleModalEdit} loadingData={loadingData} listFloor={listFloor}  />

        </>
    )

}

export default TablePage