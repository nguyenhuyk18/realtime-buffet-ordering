import {  Table , Flex, Button  , message, Popconfirm   } from 'antd';
import { useEffect, useState } from 'react';
import { deleteProductApi, findProductApi, getAllBrandApi, getAllCategory, getProductApi } from '../service/api.service';
import ModalAddProduct from '../component/product/ModalAdd';
import ProductDetail from '../component/product/DrawerProduct';
import ModalEditProduct from '../component/product/ModalEdit';
// import { Button,  } from 'antd';
import { useNavigate } from 'react-router-dom';
const ProductPage = () => {
     const navigate = useNavigate();
    // use State 
    const [listProduct , setProductList] = useState([]);
    const [isModalAddProductOpen , setModalAddProductOpen] = useState(false);
    const [isModalEditProductOpen , setModalEditProductOpen] = useState(false);
    const [listBrand , setListBrand] = useState([]);
    const [listCategory , setListCategory] = useState([]);
    const [open, setOpen] = useState(false); // để mở drawer
    const [productDetail , setProductDetail] = useState(null);
    // const []

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        // setProductDetail(null);
        setOpen(false);
    };

    useEffect(() => {
        // console.log(listProduct);
        loadingData();
        
    } , [])

    const confirm = async e => {
        const rs = await deleteProductApi(e);
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

    // call api

    const loadingData = async () => {
        const rs = await getProductApi();
        const rs1 = await getAllCategory();
        const rs2 = await getAllBrandApi();
        if(rs.status == 405) {
            navigate('/admin/login');
        }
        if(rs1.status == 405) {
            navigate('/admin/login');
        }
        if(rs2.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }
        if(rs1.status == 403) {
            navigate('/admin' , { state : { message : rs1.data.message } });
        }
        if(rs2.status == 403) {
            navigate('/admin' , { state : { message : rs2.data.message } });
        }

        setProductList(rs.data);
        setListBrand(rs2.data);
        setListCategory(rs1.data);
    }      


    // open modal edit
    const handleCancleModalAdd = () => {
        setModalAddProductOpen(false);
    }


    const handleCancleModalEdit = () => {
        setModalEditProductOpen(false);
        setProductDetail(null);

    }
    

    const handleOpenDrawer = async (record) => {
        // console.log('mở con cặc')
        const pro = await findProductApi(record.id);
        if(pro.status == 405) {
            navigate('/admin/login');
        }

        if(pro.status == 403) {
            navigate('/admin' , {state : {message : pro.data.message}});
        }

        setProductDetail(pro.data);
        showDrawer();
    };


    const columns = [
    {
        title: 'ID',
        // dataIndex: 'id',
        key: 'id',
        render: (_, record) => <a href='javascript:void(0)' onClick={ () => {
            handleOpenDrawer(record)
        }}>{record.id}</a>,
    },
    {
        title: 'Tên Sản Phẩm',
        dataIndex: 'product_name',
        key: 'product_name',
        width : 200
    },
    {
        title: 'Tên Danh Mục',
        dataIndex: 'name_category',
        key : 'name_category',
        width : 190
    },
    {
        title : 'Tên Thương Hiệu',
        dataIndex : 'name_brand',
        key : 'name_brand'
    },
    {
        title: 'Hình Ảnh',
        // dataIndex: 'image',
        key: 'image',
        width: 150,
        render: (_ , record) => (
            <img style={{width : '100%'}} src={import.meta.env.VITE_BACKEND_URL + `/api/v1/admin/image-product/${record.id}?t=` + Date.now() } alt="" />
        )
    },
    {
        title: 'Mô Tả',
        // dataIndex: 'description',
        key: 'description',
        render: (_ , record) => (
            <>
                <div dangerouslySetInnerHTML={{ __html: record.description }} />
            </>
        )
    },
    {
        title: 'Các Tác Vụ',
        key: 'action',
        // dataIndex: 'action',
        render: (_, record) => (
                
        <Flex gap='small'>
            {/* {console.log()}    */}
            <Button color="cyan" onClick={async () => {
                // showModalEditCategory(record.id);
                const pro = await findProductApi(record.id);
                    if(pro.status == 405) {
                        navigate('/admin/login');
                    }
                setModalEditProductOpen(true);
                setProductDetail(pro.data);
                }}  variant="solid">
                Sửa
            </Button>
              <Popconfirm
                title="Xóa Sản Phẩm"
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

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
            <h1 >Quản Lý Sản Phẩm</h1>
            <Button type='primary' onClick={() => setModalAddProductOpen(true)} >Thêm Sản Phẩm</Button>
        </Flex>
        
        
        <Table columns={columns} rowKey={'id'} dataSource={listProduct} scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/>

        <ModalAddProduct listBrand={listBrand} listCategory={listCategory} isModalAddProductOpen={isModalAddProductOpen} loadingData={loadingData} handleCancleModalAdd={handleCancleModalAdd} />

        <ModalEditProduct isModalEditProductOpen={isModalEditProductOpen}  handleCancleModalEdit={handleCancleModalEdit} loadingData={loadingData} listBrand={listBrand} listCategory={listCategory} productDetail={productDetail} />

        <ProductDetail onClose={onClose} open={open} productDetail={productDetail} />
        
        </>
    )
}


export default ProductPage