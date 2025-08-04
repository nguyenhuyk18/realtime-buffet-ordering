// const product = require('../../services/ProductService');
import product from "../models/product";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import category from "../models/category";
import { Request, Response } from "express";
import dayjs from "dayjs";
import path from "path";


class ProductController {


    static paginationIndex = async (req : Request , res : Response) => {
        const categoryList : category[] = await CategoryService.getAll();
        // const resultJSON : any = [];

        const resultJSON : any[]  = await Promise.all(categoryList.map(async row => {
            const listProduct : product[] = await ProductService.getAll(` id_category = ${row.id} `);
            const tmp : any = {
                name_category : row.name_category,
                list_product : listProduct
            }
            return tmp;
        })) 
        
        res.status(201).json(resultJSON);
        return;
    }


    static index = async (req : Request , res : Response) => {
        const listProduct = await ProductService.getAll();
        res.status(201).json(listProduct);
    }

    static update = async (req :Request , res : Response ) => {
        const data : any = req.body;

        // kiểm tra dữ liệu
        if( !data.id || !data.product_name || !data.id_category || !data.description  || !data.id_brand || !data.type_buffet) {
            res.status(400).json({message : 'Cập nhật sản phẩm thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }

        
        

        // Xử lý hình ảnh nếu kh upload 
        const oleData : product = await ProductService.findByID(Number(data.id));
        if(!oleData) {
            res.status(404).json({message : `Không tìm thấy dữ liệu sản phẩm có id ${data.id}`});
            return;
        }
        const nameImage = req.file ? req.file.filename :  oleData.image;


        // const oldName = oleData.product_name;

        // thêm dữ liệu vào data
        oleData.description = data.description;
        oleData.id_brand = data.id_brand;
        oleData.id_category = data.id_category;
        oleData.image = nameImage;
        oleData.product_name = data.product_name;
        oleData.type_buffet = data.type_buffet;


        // console.log(oleData);


        if(await ProductService.update(oleData)) {
            res.status(201).json({message : `Cập nhật sản phẩm có mã là ${oleData.id} thành công !!!!`});
            return;
        }

        res.status(500).json({message : `Cập nhật sản phẩm có mã là ${oleData.id}  thất bại !!!!`});
    }

    static delete = async (req :Request , res : Response ) => {
        const id : number = Number(req.params.id);
        const tmp = await ProductService.findByID(id);
        if(!tmp) {
            res.status(404).json({message : 'Không tìm thấy sản phẩm !!!'});
            return;
        } 

        const oldName = tmp.product_name;

        if(await ProductService.delete(tmp.id)) {
            res.status(201).json({message : `Xóa sản phẩm ${oldName} thành công !!!`});
            return;
        }

        res.status(500).json({message : `Xóa sản phẩm ${oldName} thất bại, thử lại sau !!!`});
    }

    static store = async (req : Request , res : Response) => {
        const data : any = req.body;
        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');

        data.image = req.file ?  req.file.filename :  'do-an-nhanh-cho-nguoi-ban-ron.jpg'


        if(!data?.product_name || !data?.id_category || !data?.description  || !data?.id_brand || !data?.type_buffet) {
            res.status(400).json({message : 'Thêm sản phẩm thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }

        const mProduct = new product(null , data.product_name , data.id_category , data.description , data.image , data.created_date , data.id_brand , data.type_buffet );
        if(await ProductService.save(mProduct)) {
            res.status(201).json({message : `Thêm sản phẩm ${data.product_name} thành công`});
            return;
        }

        res.status(500).json({message : 'Thêm sản phẩm thất bại !!!'});
        
    }

    static find = async (req : Request , res : Response) => {
        const id : number = Number(req.params.id);
        // console.log('ssssssss')
        const tmp = await ProductService.findByID(id)
        if(tmp) {
            res.status(201).json(tmp);
            return;
        }

        res.status(404).json({message : `Không tìm thấu sản phẩm có mã là ${id}`});
    }

    static returnImageProduct = async (req : Request , res : Response) => {
        const id : number = Number(req.params.id);
        const tmp = await ProductService.findByID(id);

        if(!tmp) {
            res.status(404).json({message : `Không tìm thấu sản phẩm có mã là ${id}`});
            return;
        }


        const pathImageProduct = path.join(__dirname , '..' , '..' , 'public' , 'images' , 'product' , tmp.image);
        res.sendFile(pathImageProduct);
        return;
    }
}

export default ProductController;