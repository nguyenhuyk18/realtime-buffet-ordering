import { Modal , Form , Input, Button , notification, Select , Upload  } from "antd";
import { openNotificationSuccess , openNotificationError } from "../notification/NotificaComponent";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './style.css'
import { saveProductApi } from "../../service/api.service";
import { useNavigate } from "react-router-dom";


const ModalAddProduct = (props) => {
  const navigate = useNavigate();
    // upload ant design
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

    // upload ant design


    const [api , contextHolder] = notification.useNotification();

    // ckeditor
    const [editorValue, setEditorValue] = useState('');
    // ckeditor

    const [form] = Form.useForm();

    const { isModalAddProductOpen , loadingData , handleCancleModalAdd , listCategory , listBrand }  = props;

    // console.log(listCategory);

    const onFinish = async (values) => {
        const data = new FormData();

        data.append('product_name' , values.product_name);
        data.append('id_category' , values.id_category);
        data.append('id_brand' , values.id_brand);
        data.append('type_buffet' , values.type_buffet);
        data.append('description' , values.description);
        console.log(data);
        if(fileList.length) {
            data.append('imageproduct' , fileList[0].originFileObj ,fileList[0].name)
        }
        
        

        const rs = await saveProductApi(data);
        if(rs.status == 405) {
          navigate('/admin/login');
        }


        if(rs.status == 201) {
            openNotificationSuccess(rs.data.message, 'Thêm Sản Phẩm' , api);
            form.resetFields();
            loadingData();
            handleCancleModalAdd();
            setFileList([]);
            setEditorValue('')
        }
        else {
            openNotificationError(rs.data.message, 'Thêm Sản Phẩm' , api);
            handleCancleModalAdd();
            form.resetFields();
            setFileList([]);
            setEditorValue('');
        }

    }

    return (
        <>
        {contextHolder}
        <Modal
        footer={false}
        // layout={layout}
        title="Thêm Sản Phẩm"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddProductOpen}
        // onOk={handleAddOk}
        onCancel={handleCancleModalAdd}
      >
        <Form
            form = {form}
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ paddingTop: '20px' }}
            // validateMessages={validateMessages}
        >
        <Form.Item name='product_name' label="Tên Sản Phẩm" rules={[{ required: true , message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input />
        </Form.Item>
        <Form.Item name='id_category' label="Chọn Danh Mục" rules={[{ required: true , message: 'Vui lòng chọn danh mục' }]}>
          <Select >
            {listCategory.map(row => <Select.Option value={row.id} key={row.id}>{row.name_category}</Select.Option> )}
          </Select>
        </Form.Item>
        <Form.Item name='id_brand' label="Chọn Thương Hiệu" rules={[{ required: true , message: 'Vui lòng chọn thương hiệu' }]}>
          <Select>
            {listBrand.map(row => <Select.Option value={row.id} key={row.id}>{row.name_brand}</Select.Option> )}
          </Select>
        </Form.Item>
        <Form.Item name='type_buffet' label="Loại Buffet" rules={[{ required: true , message: 'Vui lòng chọn loại buffet mà mình muốn !!!' }]} >
          <Select>
            <Select.Option value="1">1 - Buffet Thường</Select.Option>
            <Select.Option value="2">2 - Buffet Vip</Select.Option>
          </Select>
        </Form.Item>
        
        <ImgCrop rotationSlider>
            <Upload
            
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {  fileList.length < 1 && '+ Upload'}
            </Upload>
        </ImgCrop>

        <Form.Item name='description' label="Nhập mô tả" style={{marginTop : '20px' }} rules={[{ required: true , message: 'Vui lòng nhập mô tả sản phẩm !!!' }]} >
            <CKEditor
            
              editor={ClassicEditor}
              data={editorValue}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorValue(data);
                form.setFieldsValue({ description: data });
              }}
              config={{
                toolbar: [
                  'bold',
                  'italic',
                  'bulletedList',
                  'numberedList',
                  '|', // Dấu phân cách trên toolbar
                  'undo',
                  'redo',
                ],
                placeholder: 'Nhập mô tả với định dạng cơ bản...',
              }}
            />
        </Form.Item>

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

export default ModalAddProduct