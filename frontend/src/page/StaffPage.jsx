import {  Table, Flex, Button  , message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { deleteStaffApi, findStaffApiByID, getAllStaffApi, getRoleApi } from '../service/api.service';
import StaffDetail from '../component/staff/StaffDetail';
import ModalAddStaff from '../component/staff/ModalAdd';
import ModalEditStaff from '../component/staff/ModalEdit';
import ModalChangeImage from '../component/staff/ModalChangeImage';
import { useNavigate } from 'react-router-dom';
const StaffPage = () => {
     const navigate = useNavigate();
    const [listStaff , setStaffList] = useState([]);
    const [open , setOpen] = useState(false);
    const [staffDetail , setStaffDetail] = useState(null);
    const [isModaAddStaffOpen , setModalAddStaffOpen] = useState(false);
    const [isModalEditStaffOpen , setModalEditStaffOpen] = useState(false);
    const [isModalChangeImageOpen , setModalChangeImageOpen] = useState(false);
    const [listRole , setRole] = useState(null);
    // const []

    const confirm = async e => {
        const rs = await deleteStaffApi(e);

        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 201) {
            message.success(rs.data.message);
            loadingData();
        }
        else {
            message.error(rs.data.message);
        }
    };

    const cancel = e => {
        message.success('Cảm ơn bạn đã lựa chọn');
    };

    useEffect(()=> {
        loadingData();
        loadingRole();
    } , [])

    const columns = [
    {
        title: 'ID',
        // dataIndex: 'id',
        key: 'id',
        render: (_, record) => <a onClick={ async () => {
            await findStaff(record.id)
            onOpenDrawer()
        }}>{record.id}</a>,
    },
    {
        title: 'Tên Nhân Viên',
        dataIndex: 'name',
        key: 'name',
        // width : 200
    },
    {
        title: 'Số Điện Thoại',
        dataIndex: 'mobile',
        key : 'mobile',
        // width : 190
    },
    {
        title : 'Tên Đăng Nhập',
        dataIndex : 'username',
        key : 'username'
    },
    {
        title: 'Hình Ảnh',
        // dataIndex: 'image',
        key: 'image',
        width: 150,
        render: (_ , record) => (
            <img style={{width : '100%'}} src={import.meta.env.VITE_BACKEND_URL + `/api/v1/admin/avatar-staff/${record.id}?t=` + Date.now() } alt="" />
        )
    },
    {
        title : 'Vai Trò',
        dataIndex: 'name_role',
        key : 'name_role',
    },
    {
        title: 'Các Tác Vụ',
        key: 'action',
        // dataIndex: 'action',
        render: (_, record) => (
                
        <Flex gap='small'>
            {/* {console.log()}    */}
            <Button color="cyan"  variant="solid" onClick={ async () => {
                const rs = await findStaffApiByID(record.id);
                const staff = rs.data;
                setStaffDetail(staff)
                setModalEditStaffOpen(true);
                }}>
                Sửa
            </Button>
              <Popconfirm
                title="Xóa Nhân Viên"
                description="Bạn có chắc muốn xóa chứ !!!"
                onConfirm={() => confirm(record.id)}
                onCancel={cancel}
                okText="Đồng Ý"
                cancelText="Hủy"
            >
            <Button color="danger"  variant="solid">
                Xóa
            </Button>
            </Popconfirm>
            <Button color="purple"  variant="solid" onClick={async () => {
                setModalChangeImageOpen(true);
                const rs = await findStaffApiByID(record.id);
                        if(rs.status == 405) {
            navigate('/admin/login');
        }
                setStaffDetail(rs.data);
                }}>
                Thay Ảnh
            </Button>

        </Flex>
      
        ),
        },
    ];

    // call api
    const loadingData =  async () => {
        const rs = await getAllStaffApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin'  , {state : { message : rs.data.message }} );
        }
        setStaffList(rs.data);
    }

    const loadingRole = async () => {
        const rs = await getRoleApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        if(rs.status == 403) {
            navigate('/admin'  , {state : { message : rs.data.message }} );
        }
        setRole(rs.data);
    }

    const findStaff = async (id) => {
        const rs = await findStaffApiByID(id);
        if(rs.status == 201) {
            setStaffDetail(rs.data) 
        } 
        else {
            setStaffDetail(null)
        }
    }

    // modal, drawer
    const onCloseDrawer = () => {
        setOpen(false);
    }

    const onOpenDrawer = () => {
        setOpen(true);
    }

    const handleCancleModalAdd = () => {
        setModalAddStaffOpen(false);
    }


    const handleCancleModalEdit = () => {
        // setStaffDetail(null);
        setModalEditStaffOpen(false);
    }

    const handleCancleModalChangeImage = () => {
        setModalChangeImageOpen(false);
    }





    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
            <h1 >Quản Lý Nhân Viên</h1>
            <Button type='primary' onClick={setModalAddStaffOpen} >Thêm Nhân Viên</Button>
        </Flex>
        
        <Table columns={columns} rowKey={'id'} dataSource={listStaff} scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/> 

        <ModalAddStaff loadingData={loadingData} listRole={listRole} isModaAddStaffOpen={isModaAddStaffOpen} handleCancleModalAdd={handleCancleModalAdd} />

        <ModalEditStaff staffDetail={staffDetail} loadingData={loadingData} listRole={listRole} isModalEditStaffOpen={isModalEditStaffOpen} handleCancleModalEdit={handleCancleModalEdit}  />

        <ModalChangeImage loadingData={loadingData} isModalChangeImageOpen={isModalChangeImageOpen} handleCancleModalChangeImage={handleCancleModalChangeImage} staffDetail={staffDetail} />

        <StaffDetail onCloseDrawer={onCloseDrawer} open={open} staffDetail={staffDetail}   />
        </>
    )
}

export default StaffPage