import reservation from '../../assets/img/reservation.jpg'
import { useEffect, useState, useRef } from "react";
import { TableOutlined } from "@ant-design/icons";
import { getFloorApiClient, getProfileClienApi, getTableApiClient, placeOrderClientApi } from '../../service/api.service';
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import ModalConfirm from './ModalConfirm';
import { openNotificationSuccess, openNotificationError } from "../notification/NotificaComponent";
import { notification } from "antd";
import { io } from "socket.io-client";

const PlaceTableComponent = () => {
  const navigate = useNavigate();
  const [listTable, setListTable] = useState([]);
  const [listFloor, setListFloor] = useState([]);
  const [floorChoice, setFloorChoice] = useState([]);
  const [tableChoice, setTableChoice] = useState(null);
  const [isConfirmLogin, setConfirmLogin] = useState(false);
  const [isVipType, setVipType] = useState(false);
  const [useSocket, setUseSocket] = useState(null);
  // const []
  const floorChoiceRef = useRef(floorChoice);
  const tableListRef = useRef(listTable);


  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    loadingData();
  }, []);

  useEffect(() => {
    floorChoiceRef.current = floorChoice;
  }, [floorChoice]);

  useEffect(() => {
    tableListRef.current = listTable;
  }, [listTable])

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {});

    socket.on('place-table-process', async () => {
      // console.log(floorChoice.id , 'cđmll')
      if (floorChoiceRef.current && floorChoiceRef.current.id) {
        const rsTable = await getTableApiClient(floorChoiceRef.current.id);
        if (rsTable.status == 201) {
          setListTable(rsTable.data);
        }
      }
    })

    socket.on('cap-nhat-trang-thai-ban-process', async (table_id, status) => {
      console.log(table_id, status, tableListRef.current, 'chacha');
      if (tableListRef.current.length != 0) {
        const table_list = tableListRef.current
        for (const tmp of table_list) {
          console.log(tmp.id, ' ', table_id)
          if (tmp.id == table_id) {
            const rsTable = await getTableApiClient(floorChoiceRef.current.id);
            if (rsTable.status == 201) {
              setListTable(rsTable.data);
            }
            break;
          }
        }
      }
    })
    setUseSocket(socket);
    return () => {
      socket.off('place-table-process')
      socket.off('cap-nhat-trang-thai-ban-process')
    }
  }, []);
  // phải chỉnh cái dependency này để socket on nó update call back vì trong call back của socket on mình có dùng trực tiếp state của placetable là floorChoice ( phải lưu ý khi dùng state trực tiếp trong useEffect )

  const loadingData = async () => {

    // const log = localStorage.getItem('login-client-site');
    const rs = await getProfileClienApi()
    if (rs.status != 201) {
      navigate('/', { state: { message_unlogin: 'Bạn chưa đăng nhập không thể vào đặt bàn' } });
    }

    const rsFloor = await getFloorApiClient();
    if (rsFloor.status == 405) {
      navigate('/', { state: { message_unlogin: 'Bạn chưa đăng nhập không thể vào đặt bàn' } })
    }
    setListFloor(rsFloor.data);
    setFloorChoice(rsFloor.data[0]);
    // console.log(rsFloor.data)
    const rsTable = await getTableApiClient(rsFloor.data[0].id);
    if (rsTable.status == 405) {
      navigate('/', { state: { message_unlogin: 'Bạn chưa đăng nhập không thể vào đặt bàn' } })
    }
    setListTable(rsTable.data);
  }

  const handleClickFloor = async (id) => {
    const floorFound = listFloor.find(row => row.id == id);
    // console.log(floorFound)
    const rsTable = await getTableApiClient(floorFound.id);
    if (rsTable.status == 405) {
      navigate('/', { state: { message_unlogin: 'Bạn chưa đăng nhập không thể vào đặt bàn' } })

    }
    setFloorChoice(floorFound);
    setListTable(rsTable.data);
    setTableChoice(null);
  }


  const handleClickTable = async (id) => {
    const tableFound = listTable.find(row => row.id == id);

    if (tableFound.status != 3) {
      openNotificationError('Bàn Này Đã Được Đặt Trước Đó Vui Lòng Chọn Bàn Khác !!!', 'Lỗi Xảy Ra', api);

    }
    else {
      setTableChoice(tableFound);
    }
  }


  const handlePlaceOrder = async () => {
    const rs1 = await getProfileClienApi();
    if (rs1.status == 405) {
      navigate('/', { state: { message_unlogin: 'Bạn chưa đăng nhập không thể vào đặt bàn' } })
    }

    // const login = localStorage.getItem('login-client-site');
    // const data = jwtDecode(login);
    const dataSend = {
      customer_id: rs1.data.id,
      table_id: tableChoice.id,
      amount_cus: tableChoice.capacity,
      type_buffet: isVipType == true ? 2 : 1,
      status: 1
    }

    const dataJSON = JSON.stringify(dataSend);

    const rs = await placeOrderClientApi(dataJSON);
    // console.log(rs)
    if (rs.status == 201) {
      openNotificationSuccess('Đặt Bàn Thành Công', 'Đặt Bàn Thành Công', api);
      const rs = await getTableApiClient(floorChoice.id);
      setListTable(rs.data);
      useSocket.emit('place-table');
    }
    else {
      openNotificationError(rs.data.message, 'Thông Báo Lỗi Xảy Ra', api);
    }
  }

  return (
    <main>
      {contextHolder}
      <section id="ordertable" >
        <div className="container-fluid ordertable" style={{ padding: '100px' }} >
          <h2 className="text-center mb-4"
            style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "2px",
              background: "linear-gradient(90deg,#1677ff 0%,#52c41a 100%)",
              borderRadius: "24px",
              padding: "32px 0",
              boxShadow: "0 8px 32px rgba(22,119,255,0.15)",
              marginBottom: "40px",
              textShadow: "0 4px 16px rgba(22,119,255,0.18)",
              border: "3px solid #1677ff",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              transition: "all 0.2s"
            }}
          >ĐẶT BÀN NGAY BÂY GIỜ</h2>
          {/* {console.log(listTable)} */}

          <div className="col-12 text-center mt-4">
            <div className='text-center'>
              <b>Chọn Tầng : </b> {listFloor.map(row => <Button onClick={() => handleClickFloor(row.id)} color='pink' variant='solid' style={{ marginRight: '10px' }}  >{row.name_floor}</Button>)}
            </div>
            <div className='list-table mb-4'>
              <h4 className='text-center my-3' style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#1677ff",
                letterSpacing: "1px",
                background: "linear-gradient(90deg,#e6f4ff 0%,#fff 100%)",
                borderRadius: "16px",
                padding: "18px 0",
                boxShadow: "0 4px 24px rgba(22,119,255,0.08)",
                marginBottom: "32px",
                textShadow: "0 2px 8px rgba(22,119,255,0.12)",
                border: "2px solid #1677ff",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                transition: "all 0.2s"
              }} >Các Bàn Ở {floorChoice.name_floor}</h4>
              <div className="w-75 m-auto d-flex flex-wrap justify-content-center gap-4">
                {listTable.map(row => <div
                  onClick={() => handleClickTable(row.id)}
                  className='col-3'
                  style={{
                    width: '25%',
                    cursor: "pointer",
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(22,119,255,0.08)",
                    background: row.status == 3 ? "#fff" : row.status == 2 ? "red" : row.status == 1 ? 'orange' : '',
                    color: "#222",
                    padding: "24px 18px",
                    minWidth: 120,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    border: "2px solid #eee",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  <TableOutlined style={{ fontSize: 36, marginBottom: 12 }} />
                  <span>Bàn số {row.name_table}</span>
                  <span>Số lượng {row.capacity}</span>
                </div>)}

              </div>

              <div className='typeBuffet mt-4'>
                <label><input type="checkbox" onChange={e => setVipType(e.target.checked)} /> Bạn có muốn chọn loại buffet vip không ??</label>
              </div>
            </div>
            <button
              className="btn btn-success px-5 py-2"
              onClick={() => {
                if (tableChoice) {
                  setConfirmLogin(true)
                }
                else {
                  openNotificationError('Bạn Chưa Chọn Bàn Nào', 'Thông Báo Lỗi Xảy Ra', api)
                }

              }}
            >
              Đặt bàn {tableChoice ? tableChoice.name_table : ''}
            </button>
          </div>
        </div>


      </section>
      <ModalConfirm isConfirmLogin={isConfirmLogin} setConfirmLogin={setConfirmLogin} tableChoice={tableChoice} handlePlaceOrder={handlePlaceOrder} />
    </main>
  )
}

export default PlaceTableComponent;