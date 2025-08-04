import {  Table , Flex, Button  , message, Popconfirm  ,  Row , Col, Card  } from 'antd';
import { Badge, Tag } from 'antd';
import image from '../assets/img/z1742627080390_004_c5cbc5590532245cbc7ce1e01c822fae.jpg'
import { useEffect, useState } from 'react';
import { getAllCallFood, updateCallFood } from '../service/api.service';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
const { Meta } = Card;
const CallFoodAdminChef = () => {
    const navigate = useNavigate();
    const [listCallFood , setListCallFood] = useState([]);
    const [isSocket , setIsSocket] = useState(false);
    useEffect(() => {
        loadingData();
        const decoded = jwtDecode(localStorage.getItem('login'));

        const role_id = decoded.role_id;
        if(role_id != 9) {
            navigate('/admin' , { state : { message : 'Bạn không có đủ thẩm quyền đề vào đây' } });
            return;             
        }
        const socket = io(import.meta.env.VITE_BACKEND_URL, {});
        // khách hàng gửi tới đầu bếp
        socket.on('call-food-from-client-process' , () => {
            loadingData();
        });


        // nhân viên giao món gửi lại món vì kh đạt yêu cầu phải làm lại
        socket.on('call-back-food-process' , () => {
            loadingData();
        });


        setIsSocket(socket);
    } , [])

    const loadingData = async () => {
        const rs = await getAllCallFood(1);
        
        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }

        setListCallFood(rs.data);
    }

    const handleOnClick = async (id) => {
        const tmpFound = listCallFood.find(row => row.id == id);
        // console.log(tmpFound);
        tmpFound.status = 2;
        const dataJSON = JSON.stringify(tmpFound);
        const rs = await updateCallFood(dataJSON);
        if(rs.status == 201) {
            isSocket.emit('call-to-chef' , dataJSON)
            loadingData();
        }
    }

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Các Món Ăn Cần Nấu Ngay</h1>
        </Flex>
        <Row gutter={{   md : 16}}>
            {listCallFood.length ? listCallFood.map(row => {
                return (
        <Col key={row.id} className="gutter-row"           
        // xs={{ flex: '100%' }}
        sm={{ flex: '50%' }}
        md={{ flex: '40%' }}
        lg={{ flex: '20%' }}
        xl={{ flex: '0%' }}    >
                <Badge.Ribbon text="Đang chờ" color="red">
                    <Card
                    hoverable
                    style={{
                        width: 260,
                        borderRadius: 16,
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        marginBottom: 24,
                    }}
                    cover={
                        <img
                        alt="Món ăn"
                        src={import.meta.env.VITE_BACKEND_URL + `/api/v1/admin/image-product/${row.id_food}?t=` + Date.now() }
                        style={{
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            height: 160,
                            objectFit: 'cover',
                        }}
                        />
                    }
                    >
                    <Flex vertical gap={8} align="center" style={{ marginBottom: 12 }}>
                        <Tag color="orange" style={{ fontSize: 16, padding: '4px 16px' }}>
                        <b>{row.name_food}</b>
                        </Tag>
                        <Tag color="pink" style={{ fontSize: 16, padding: '4px 16px' }}>
                        <b>Số Lượng: {row.number}</b>
                        </Tag>
                        <Tag color="blue" style={{ fontSize: 16, padding: '4px 16px' }}>
                        <b>{row.name_table}</b>
                        </Tag>
                        <Tag color="purple" style={{ fontSize: 16, padding: '4px 16px' }}>
                        <b>{row.name_floor}</b>
                        </Tag>
                    </Flex>
                    <Flex justify="center">
                        <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{
                            background: 'linear-gradient(90deg,#1677ff 60%,#52c41a 100%)',
                            border: 'none',
                            fontWeight: 600,
                            letterSpacing: 1,
                        }}
                        onClick={() => handleOnClick(row.id)}
                        >
                        Hoàn Tất
                        </Button>
                    </Flex>
                    </Card>
                </Badge.Ribbon>
            </Col>
                )
            })  : '' }
        </Row>

        </>
    )
}

export default CallFoodAdminChef;