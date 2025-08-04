import { Table,  Flex, Button  , message, Popconfirm  } from 'antd';
import { deleteBrandApi, getAllBrandApi } from '../service/api.service';
import { useEffect, useState } from 'react';
import ModalAddBrand from '../component/brand/ModalAdd';
import ModalEditBrand from '../component/brand/ModalEdit';
import { useNavigate } from 'react-router-dom';


const BrandPage = () => {
    const navigate = useNavigate();
    // Các state hook
    const [listBrand , setListBrand] = useState([]);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalEditOpen , setModalEditOpen] = useState(false);
    const [dataEdit , setDataEdit] = useState(null);

    // useeffect
    useEffect(() => {
        loadingData();
    } , [])

    // Tác Vụ Xóa Dữ Liệu 
    const confirm = async e => {
        const rs = await deleteBrandApi(e);
        // console.log(rs.status);

        if(rs.status == 405) {
          navigate('/admin/login');
        }

        if(rs.status == 201) {
            message.success('Xóa thành công !!!');
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

    const loadingData  = async () => {
        const rs = await getAllBrandApi();
        console.log('brand' , rs)
        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }

        setListBrand(rs.data);
    }


    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    }

    const handleCancleEdit = () => {
        setModalEditOpen(false);
    }

    const showModalEditBrand = (idBrand) => {
        const findBrand = listBrand.find(row => row.id == idBrand);
        setDataEdit(findBrand)
        setModalEditOpen(true);
    }


    

    const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tên Thương Hiệu',
        dataIndex: 'name_brand',
        key: 'name_brand',
    },
    {
        title: 'Các Tác Vụ',
        key: 'action',
        // dataIndex: 'action',
        render: (_, record) => (
                
        <Flex gap='small'>
            {/* {console.log()}    */}
            <Button color="cyan"  variant="solid" onClick={() => showModalEditBrand(record.id)} >
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


    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Thương Hiệu</h1>
        <Button type='primary' onClick={() => setIsModalAddOpen(true)} >Thêm danh mục</Button>
        </Flex>
        
        
        <Table columns={columns} rowKey={'id'} dataSource={listBrand}  scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/>

        <ModalAddBrand isModalAddOpen={isModalAddOpen} handleCancelAdd={handleCancelAdd}  loadingData={loadingData}   />
        <ModalEditBrand dataEdit={dataEdit} isModalEditOpen={isModalEditOpen} handleCancleEdit={handleCancleEdit} loadingData={loadingData} />
        </>
        
    )
}

export default BrandPage