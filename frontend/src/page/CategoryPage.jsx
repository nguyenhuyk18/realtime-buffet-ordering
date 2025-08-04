import {  Table, Flex, Button  , message, Popconfirm  } from 'antd';
import { deleteCategoryApi, getAllCategory } from '../service/api.service';
import { useEffect, useState } from 'react';
import ModalAddCategory from '../component/category/ModalAdd';
import ModalEditCategory from '../component/category/ModalEdit';
import { useNavigate } from 'react-router-dom';
const CategoryPage = () => {
    const navigate = useNavigate();
    const [ categoryList , SetCategoryList ] = useState([]);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalEditOpen , setModalEditOpen] = useState(false);
    const [dataEditCategory , setDataEdit] = useState(null);

    const confirm = async e => {
        const rs = await deleteCategoryApi(e);

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
        title: 'Tên Danh Mục',
        dataIndex: 'name_category',
        key: 'name_category',
    },
    {
        title: 'Các Tác Vụ',
        key: 'action',
        // dataIndex: 'action',
        render: (_, record) => (
                
        <Flex gap='small'>
            {/* {console.log()}    */}
            <Button color="cyan" onClick={() => {
                showModalEditCategory(record.id);
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

    const loadingData = async () => {
        const allCategory = await getAllCategory();
        if(allCategory.status == 405) {
            navigate('/admin/login');
        }
        if(allCategory.status == 403) {
            navigate('/admin' , { state : { message : allCategory.data.message } });
        }
        SetCategoryList(allCategory.data);        
    }

    // open modal 
    const showModalCategory = () => {
        // console.log(10)
        setIsModalAddOpen(true);
        // console.log(isModalAddOpen);
    };

    const handleAddCancel = () => {
        setIsModalAddOpen(false);
    };

    // open modal edit = ()
    const showModalEditCategory = (id) => {
        const categoryEdit = categoryList.find(row => row.id == id);
        setDataEdit(categoryEdit);
        setModalEditOpen(true);
    }

    const handleEditCancle = () => {
        setModalEditOpen(false);
    }

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Quản Lý Danh Mục</h1>
        <Button type='primary' onClick={showModalCategory} >Thêm danh mục</Button>
        </Flex>
        
        
        <Table columns={columns} rowKey={'id'} dataSource={categoryList} scroll={{ x: 'max-content' }} pagination={{
        pageSize: 10, // Giới hạn 10 dòng mỗi trang
        }}/>

        <ModalAddCategory loadingData={loadingData}  handleAddCancel={handleAddCancel} isModalAddOpen={isModalAddOpen} />

        <ModalEditCategory dataEditCategory={dataEditCategory} loadingData={loadingData} isModalEditOpen={isModalEditOpen} handleEditCancle={handleEditCancle}  />
        </>
        
    )
}

export default CategoryPage