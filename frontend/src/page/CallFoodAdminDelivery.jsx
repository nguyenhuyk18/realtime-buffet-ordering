import {  Table , Flex, Button  , message, Popconfirm  ,  Row , Col, Card  } from 'antd';
import { Badge, Tag } from 'antd';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteCallFood, getAllCallFood, updateCallFood } from '../service/api.service';
import { jwtDecode } from "jwt-decode";
const CallFoodAdminDelivery = () => {
    const navigate = useNavigate();
    const [ listFoodCall , setFoodCall ] = useState([]);
    const [isSocket , setIsSocket] = useState(false);

    useEffect(() => {
        

        loadingData()
        const decoded = jwtDecode(localStorage.getItem('login'));
        console.log(decoded)
        const role_id = decoded.role_id;
        if(role_id != 14) {
            navigate('/admin' , { state : { message : 'Bạn không có đủ thẩm quyền đề vào đây' } });
            return;
        }

        const socket = io(import.meta.env.VITE_BACKEND_URL, {});
        socket.on('call-food-chef-staff' , () => {
            // console.log('alo')
            loadingData();
        });
        setIsSocket(socket);
    } , []);

    const loadingData = async () => {
        const rs = await getAllCallFood(2);
        
        // console.log(rs);

        if(rs.status == 405) {
            navigate('/admin/login');
        }

        if(rs.status == 403) {
            navigate('/admin' , { state : { message : rs.data.message } });
        }

        setFoodCall(rs.data);
    }
 
    const handleOnClickSubmit = async (id) => {
        const rs = await  deleteCallFood(id);
        if(rs.status == 201) {
            loadingData();
        }   
    }

    const handleOnClickCancle = async (id) => {
        const findCallFood = listFoodCall.find(row => row.id == id);
        findCallFood.status = 1;
        
        const rs = await updateCallFood(JSON.stringify(findCallFood));

        if(rs.status == 201) {
            loadingData();
            isSocket.emit('call-back-food');
        }
    }

    return (
        <>
        <Flex style={{marginBottom : '20px'}} justify={'space-between'} align='center'>
        <h1 >Các Món Ăn Đã Chuẩn Bị</h1>
        </Flex>
        <Row gutter={{ xs: 8, sm: 16 }}>
            {listFoodCall.length ? listFoodCall.map(row => {
                return (
            <Col  key={row.id} className="gutter-row"         sm={{ flex: '50%' }}
        md={{ flex: '40%' }}
        lg={{ flex: '20%' }}
        xl={{ flex: '0%' }} >
                <Badge.Ribbon text="Mang Đến Bàn" color="red">
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
                    <Flex justify="space-between">
                        <Button
                        color='cyan'
                        variant="solid"
                        // style={{
                            
                        //     border: 'none',
                        //     fontWeight: 600,
                        //     letterSpacing: 1,
                        // }}
                        onClick={() => handleOnClickSubmit(row.id)}
                        >
                        Hoàn Tất
                        </Button>
                        <Button
                        color='danger'
                        variant="solid"
                        onClick={() => handleOnClickCancle(row.id)}
                        >
                        Hủy Bỏ
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

export default CallFoodAdminDelivery;