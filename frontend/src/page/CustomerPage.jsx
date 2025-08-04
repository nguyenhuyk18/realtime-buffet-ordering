import {  Table,  Flex, Button  , message, Popconfirm  } from 'antd';
import { useEffect, useState } from 'react';
import { findCustomerApi, findDistrict, findProvinceApi, findWardApi, findWardByDistrict, getCustomerApi, getDistrictByProvince, getProvinceApi } from '../service/api.service';
import ModalAddCustomer from '../component/customer/ModalAdd';
import ModalEditCustomer from '../component/customer/ModalEdit';
import { useNavigate } from 'react-router-dom';
const CustomerPage = () => {
     const navigate = useNavigate();
    // const navigate = useNavigate()
    const [ listCustomer , setListCustomer ] = useState([]);
    const [ isModalAddOpen , setModalAddOpen ] = useState(false);
    const [ isModalEditOpen , setModalEditOpen ] = useState(false);
    // const [  ]
    const [ listWard , setListWard ] = useState([]);
    const [ listProvince , setProvince ] = useState([]);
    const [ listDistrict, setDistrict ] = useState([]);

    const [districtHas , setDistrictHas] = useState(null);
    const [provinceHas , setProvinceHas] = useState(null);

    const [customerDetail , setCustomerDetail] = useState(null);
 

    // Tác Vụ Xóa Dữ Liệu 
    // const confirm = async e => {
    //     message.success('Xóa thành công !!!');
    //     // const rs = await deleteFloorApi(e);
        
    //     // if(rs.status == 201) {
    //     //     message.success('Xóa thành công !!!');
    //     //     loadingData();
    //     // }
    //     // else {
    //     //     message.error(rs.data.message);
    //     // }
    // };

    // const cancel = e => {
    //     // console.log(e);  
    //     message.success('Cảm ơn bạn đã lựa chọn');


    // };

    useEffect(() => {
        loadingData();
    } , [])

    const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tên Khách Hàng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Trạng Thái',
        // dataIndex: 'status',
        key: 'status',
        render: (_, record) => (
            record.status == 1 ?  <p>Hoạt Động</p>  :  <p>Bị Vô Hiệu Hóa</p> 
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
                    const rs = await findCustomerApi(record.id);

                    if(rs.status == 405) {
                        navigate('/admin/login');
                    }

                    const rs1  = await getProvinceApi();

                    const rsWard = await findWardApi(record.ward_id)
                    const rsDistrict = await findDistrict(rsWard.data.district_id);
                    const rsProvince = await findProvinceApi(rsDistrict.data.province_id);

                    const districtInProvince = await getDistrictByProvince(rsProvince.data.id);
                    const wardInDisTrict = await findWardByDistrict(rsDistrict.data.id);

                    setCustomerDetail(rs.data);
                    
                    setDistrictHas(rsDistrict.data);
                    setProvinceHas(rsProvince.data);

                    setListWard(wardInDisTrict.data)
                    setDistrict(districtInProvince.data)
                    setProvince(rs1.data);

                    setModalEditOpen(true)
                }
            }  >
                Sửa
            </Button>
            {/* <Popconfirm
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
            </Popconfirm> */}

        </Flex>
      
        ),
        },
    ];

    const loadingData = async () => {
        const rs = await getCustomerApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }

        setListCustomer(rs.data);
    }

    const handleCancleModalAdd = () => {
        setModalAddOpen(false);
    }

    const handleCancleModalEdit = () => {
        setModalEditOpen(false);
    }

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Thông Tin Khách Hàng</h1>
        <Button type='primary' onClick={async () => {
            const rs = await getProvinceApi();
            setProvince(rs.data);
            // console.log(rs.data)
            setModalAddOpen(true);
            }} >Thêm Khách Hàng</Button>
        </Flex>
        
        
        <Table
        columns={columns}
        rowKey={'id'}
        dataSource={listCustomer} 
        scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, 
        }}/>

        <ModalAddCustomer isModalAddOpen={isModalAddOpen} handleCancleModalAdd={handleCancleModalAdd} loadingData={loadingData}  listDistrict={listDistrict} listProvince={listProvince} listWard={listWard} setListWard={setListWard} setDistrict={setDistrict} setProvince={setProvince}    />

        <ModalEditCustomer isModalEditOpen={isModalEditOpen} loadingData={loadingData}  listDistrict={listDistrict} listProvince={listProvince} listWard={listWard} setListWard={setListWard} setDistrict={setDistrict} setProvince={setProvince} districtHas={districtHas} provinceHas={provinceHas} customerDetail={customerDetail} handleCancleModalEdit={handleCancleModalEdit} />

        </>
    )

}

export default CustomerPage