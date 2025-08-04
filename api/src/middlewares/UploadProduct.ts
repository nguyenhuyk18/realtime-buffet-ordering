import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import ProductService from "../services/ProductService";
// import product from "../models/product";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/product');
    },
    filename: (req : Request, file, cb) => {
        const username = 'product';
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, username + '_' + uniqueSuffix + ext);
    }
});

const UploadImageProduct = multer({ storage: storage });


// const checkIDProduct = async (req : Request , res : Response , next : NextFunction ) => {
//     // const id : number = Number(req.body.id);
//     // console.log(req.body)

//     // tìm kiếm product 
//     if(await ProductService.findByID(123123123123123123)) {
//         next();
//         return;
//     }

//     res.status(404).json({message : `Không tìm thấy sản phẩm với mã là ${123123123123123123}`});
// }

export  {UploadImageProduct  };