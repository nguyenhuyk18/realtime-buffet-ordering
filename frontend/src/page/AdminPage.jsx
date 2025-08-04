import  { useEffect, useState } from 'react';
import { BorderHorizontalOutlined, BorderOuterOutlined, CarryOutOutlined, CodepenOutlined, CustomerServiceOutlined, DashboardOutlined, DropboxOutlined, InteractionOutlined, ProductOutlined, TabletOutlined, UserAddOutlined , DownOutlined , SettingOutlined, PhoneOutlined, ProjectOutlined, CloudServerOutlined  } from '@ant-design/icons';
import {Avatar ,Button, Flex, Layout, Menu, theme , Dropdown, Space  } from 'antd';
import '../assets/Admin.css'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { jwtDecode } from "jwt-decode";
import logo from '../assets/img/pngtree-pizza-restaurant-logo-design-template-premium-vector-png-image_5435494.jpg'
const { Header, Content, Footer, Sider } = Layout;





const AdminPage = () => {
  const navigate = useNavigate();
  const [displayLoading , setDisplayLoading] = useState(false);
  const [imageAvatar , setImageAvatar] = useState(null);
  const [nameStaff , setNameStaff] = useState(null);

  useEffect(() => {

    const jwtAccess = localStorage.getItem('login');

    // const token = "eyJ0eXAiO.../// jwt token";
    const decoded = jwtDecode(jwtAccess);
    // console.log(decoded)
    // console.log(decoded);
    setImageAvatar(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/avatar-staff/${decoded.id}`);
    setNameStaff(decoded.fullname);
  } , [])


    const handleDisplayLoading = () => {
      setDisplayLoading(true);
      setTimeout(() => {
        setDisplayLoading(false);
      } , 700);
    }

    useEffect(() => {
      handleDisplayLoading();
    } , [])

    const items = [
    {
      label : <Link to={'/admin'} onClick={ handleDisplayLoading } >Trang Chủ</Link>,
      icon : <DashboardOutlined />,
      key : 'Dashboard',
      path : '/admin'
    },
    {
      label : <Link to={'/admin/category'} onClick={ handleDisplayLoading } >Danh Mục</Link>,
      icon : <DropboxOutlined />,
      key : 'Category',
      path : '/admin/category'
    },
    {
      label : <Link to={'/admin/brand'} onClick={ handleDisplayLoading } >Thương Hiệu</Link>,
      icon : <CodepenOutlined />,
      key : 'Brand',
      path : '/admin/brand'
    },
    {
      label : <Link to={'/admin/product'} onClick={ handleDisplayLoading } >Sản Phẩm</Link>,
      icon : <ProductOutlined />,
      key : 'Product',
      path : '/admin/product'
    },
    {
      label : <Link to={'/admin/staff'} onClick={ handleDisplayLoading } >Nhân Viên</Link>,
      icon : <UserAddOutlined />,
      key : 'Staff',
      path : '/admin/staff'
    },
    {
      label : <Link to={'/admin/role'} onClick={ handleDisplayLoading } >Vai Trò</Link>,
      icon : <CarryOutOutlined />,
      key : 'Role',
      path : '/admin/role'
    },

    {
      label : <Link to={'/admin/action'} onClick={ handleDisplayLoading } >Các Tác Vụ</Link>,
      icon : <InteractionOutlined />,
      key : 'Action',
      path : '/admin/action'
    },


    {
      label : <Link to={'/admin/floor'} onClick={ handleDisplayLoading } >Tầng Nhà Hàng</Link>,
      icon : <BorderOuterOutlined />,
      key : 'Floor',
      path : '/admin/floor'
    },

    {
      label : <Link to={'/admin/table'} onClick={ handleDisplayLoading } >Quản Lý Bàn</Link>,
      icon : <TabletOutlined />,
      key : 'Table',
      path : '/admin/table'
    },

    {
      label : <Link to={'/admin/reservation'} onClick={ handleDisplayLoading } >Lịch Sử Đặt Chỗ</Link>,
      icon : <BorderHorizontalOutlined />,
      key : 'Reservation',
      path : '/admin/reservation'
    },

    {
      label : <Link to={'/admin/new_reservation'} onClick={ handleDisplayLoading } >Đặt Chỗ Mới Nhất</Link>,
      icon : <BorderHorizontalOutlined />,
      key : 'new_reservation',
      path : '/admin/new_reservation'
    },


    {
      label : <Link to={'/admin/customer'} onClick={ handleDisplayLoading } >Quản Lý Khách Hàng</Link>,
      icon : <CustomerServiceOutlined />,
      key : 'Customer',
      path : '/admin/customer'
    },
    
    {
      label : <Link to={'/admin/call-food-chef'} onClick={ handleDisplayLoading } >Món Ăn Đang Gọi</Link>,
      icon : <PhoneOutlined />,
      key : 'call-food-chef',
      path : '/admin/call-food-chef'
    },

    {
      label : <Link to={'/admin/call-food-done'} onClick={ handleDisplayLoading } >Món Ăn Đã Chuẩn Bị Xong</Link>,
      icon : <CloudServerOutlined />,
      key : 'call-food-done',
      path : '/admin/call-food-done'
    }

  ];


  const items1 = [
    {
      key: '1',
      label: 'Tài Khoản Của Tôi',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Thông Tin Của Tôi',
    },
    {
      key: '4',
      label: (
        <a onClick={() => {
          localStorage.clear();
          navigate('/admin/login');
        }} >Đăng Xuất</a>                   
      ) ,
    }
  ];

  // lấy thông tin path hiện tại truy xuất đến pathname sẽ in ra path của bạn
  const currentPath = useLocation();

    // trả về key từ key này sẽ bỏ vào chỗ selectedKeys={[keySelected.key]} để chọn cái path mình đang đứng
  const keySelected = items.find(row => {
    if(row.path === currentPath.pathname) {
      return row.key;
    }
  })

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
        //   console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu selectedKeys={[keySelected.key]} theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }} >

            
          <div style={{ color: '#000', fontSize: '18px' , width: '40px' , height : '40px' }}>
            <img src={logo} style={{ width : '100%' , height : '100%' }} alt="" />
          </div>
          
          
          <div style={{display : 'flex' , justifyContent: 'space-between' , alignItems : 'center'}} >
            { nameStaff ? 
            <Dropdown menu={{ items : items1 }}>
                <span style={{ marginRight : '10px' }} >      
                  <Space>
                  {nameStaff}
                  <DownOutlined />
                </Space>
                </span> 
            </Dropdown>
            
            : 
            '' }
            { imageAvatar ?  <Avatar  size="large" src={imageAvatar} /> :  <Avatar  size="large" src="https://i.pravatar.cc/150?img=3" />     } 
            
          </div>
          </Header>
        <Content style={{ margin: '24px 16px 0px'}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 'calc(100vh - 64px - 65px)'
            }}
          >

            { displayLoading == true ? <Flex justify='center' align='center'>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Flex>  :   ''  } 
            { displayLoading == false ? <Outlet/> : '' }
            {/* <Outlet/>  */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Nguyễn Đức Huy Buffet Ngon Nhất Thế Giới
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminPage;