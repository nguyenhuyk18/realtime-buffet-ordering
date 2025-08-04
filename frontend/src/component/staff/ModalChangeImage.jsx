
import { Modal , Form , Button , notification , Upload, Input  } from "antd";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { changeImageStaffApi, updateStaffApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";


const ModalChangeImage = (props) => {
 const navigate = useNavigate();
    const [form] = Form.useForm();
    const [api , contextHolder] = notification.useNotification(); 

    const { isModalChangeImageOpen ,  handleCancleModalChangeImage , staffDetail } = props

    const  __awaiter = (this && this.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    
    
    //  file hình ảnh sau khi upload
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if(staffDetail) {
            form.setFieldsValue({
                id : staffDetail.id
            })
            const tmp =     [{
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: import.meta.env.VITE_BACKEND_URL + `/api/v1/admin/avatar-staff/${staffDetail.id}`
                            }]

            setFileList(tmp);
        }
    } , [staffDetail])
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    const onPreview = file =>
        __awaiter(void 0, void 0, void 0, function* () {
            let src = file.url;
            if (!src) {
                src = yield new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow === null || imgWindow === void 0
                ? void 0
                : imgWindow.document.write(image.outerHTML);
    });




    const onFinish = async (values)  => {
        const data = new FormData();

        data.append('avatarstaff' , fileList[0].originFileObj , fileList[0].name );


        const rs = await changeImageStaffApi(data , values.id);
                if(rs.status == 405) {
          navigate('/admin/login');
        }

        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message , 'Thay Ảnh Đại Diện' , api);
            form.resetFields();
            setFileList([]);
            handleCancleModalChangeImage();
            loadingData();
        }
        else {
            openNotificationError(rs.data.message , 'Thay Ảnh Đại Diện' , api);
            form.resetFields();
            setFileList([]);
            handleCancleModalChangeImage();
        }
    }


    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Thêm Nhân Viên"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalChangeImageOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleModalChangeImage}
      >
        <Form
            form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
        <Form.Item label='Mã Nhân Viên' name="id" style={{marginTop: '20px'}}>
            <Input disabled />
        </Form.Item>
        <ImgCrop rotationSlider style={{margin : 'auto'}}>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {  fileList.length < 1 && 'Tải Hình Ảnh'}
            </Upload>
        </ImgCrop>

        <Form.Item label={null} style={{marginTop: '20px'}}>
            <Button type="primary" htmlType="submit">
                Lưu
            </Button>
        </Form.Item>
        </Form>
        </Modal>
        </>
    )
}


export default ModalChangeImage