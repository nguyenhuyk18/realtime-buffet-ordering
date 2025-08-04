import {  Table , Flex, Button  , message, Popconfirm  } from 'antd';
import { useEffect, useState } from 'react';
import { deleteRoleApi, findRoleApi, getActionApi, getPermissionApi, getRoleApi } from '../service/api.service';
import ModalAddRole from '../component/role/ModallAdd';
import ModalEditRole from '../component/role/ModalEdit';
import ModalPermission from '../component/role/ModalPermission';
import { useNavigate } from 'react-router-dom';

const RolePage = () => {
     const navigate = useNavigate();
    const [roleList , setRoleList] = useState([]);
    const [isModalAddRoleOpen , setModalAddRoleOpen] = useState(false);
    const [isModalEditOpen , setModalEditOpen] = useState(false);
    const [roleDetail , setRoleDetail]  = useState(null);
    const [isModalPermissionOpen , setModalPermissionOpen] = useState(false);
    const [actionRoleHas , setActionRoleHas] = useState([]); // luu ma action ma roole do co
    const [allAction , setAllAction] = useState([]);
    // const [] = 

    useEffect(() => {
        loadingData();
    } , []);


    const confirm = async e => {
        const rs = await deleteRoleApi(e);

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
        // console.log(e);
        message.success('Cảm ơn bạn đã lựa chọn');
    };

    const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tên Vai Trò',
        dataIndex: 'name_role',
        key: 'name_role',
    },
    {
        title: 'Các Tác Vụ',
        key: 'action',
        // dataIndex: 'action',
        render: (_, record) => (
        
        <Flex gap='small'>
            {/* {console.log(_)}    */}
            <Button color="pink" onClick={async () => {
                const rs1 = await getActionApi();
                const rs2 = await getPermissionApi(record.id);
                const roleDet = await findRoleApi(record.id)

                console.log(rs2);
                if(rs2.data?.message) {
                    navigate('/admin' , { state : { message : 'Bạn không có thẩm quyền để vào trang này' } } );
                }

                setActionRoleHas(rs2);
                setAllAction(rs1.data);
                setModalPermissionOpen(true);
                setRoleDetail(roleDet.data);

            }} variant="solid">
                Phân Quyền
            </Button>
            <Button color="cyan" onClick={async () => {

                const rs = await findRoleApi(record.id);
                        if(rs.status == 405) {
            navigate('/admin/login');
        }
                setRoleDetail(rs.data);
                setModalEditOpen(true);

            }}  variant="solid">
                Sửa
            </Button>
              <Popconfirm
                title="Xóa danh mục"
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

        </Flex>
      
        ),
        },
    ];

    

    // call api
    const loadingData = async () => {
        const rs = await getRoleApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }
        setRoleList(rs.data);

    }


    // điều chỉnh modal
    const handleCancleAddRole = () => {
        setModalAddRoleOpen(false);
    }


    const handleCancleEditRole = () => {
        setModalEditOpen(false);
    }

    const handleCanclePermission = () => {
        setModalPermissionOpen(false);
        
    }


    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Vai Trò</h1>
        <Button type='primary' onClick={() => {
            setModalAddRoleOpen(true);
        }} >Thêm Vai Trò</Button>
        </Flex>


        <Table columns={columns} rowKey={'id'} dataSource={roleList} scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/>

        <ModalAddRole loadingData={loadingData} handleCancleAddRole={handleCancleAddRole} isModalAddRoleOpen={isModalAddRoleOpen}  />

        <ModalEditRole loadingData={loadingData} handleCancleEditRole={handleCancleEditRole} isModalEditOpen={isModalEditOpen} roleDetail={roleDetail} />
        

        <ModalPermission roleDetail={roleDetail} allAction={allAction} actionRoleHas={actionRoleHas} isModalPermissionOpen={isModalPermissionOpen} handleCanclePermission={handleCanclePermission}  />
        </>
    )
}

export default RolePage