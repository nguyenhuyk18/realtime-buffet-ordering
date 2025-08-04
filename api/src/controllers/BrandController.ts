import { Request, Response } from "express";
import brand from "../models/brand";
import BrandServices from '../services/BrandService';
import ProductService from "../services/ProductService";

// const brand_category = require('../../services/BrandCategoryService');
// const brand = require("../../models/brand")

class BrandController {
    static index = async (req : Request, res: Response) => {
        const listBrand : Array<brand> = await BrandServices.getAll();
        res.status(201).json(listBrand);
    }

    static update = async (req: Request, res: Response) => {
        const data = req.body;
        const oldData : brand = await BrandServices.find(data.id);

        // kiểm tra dữ liệu bắt buộc
        if (!data?.id || !data?.name_brand) {
            res.status(400).json({message: 'Cập nhật thương hiệu thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }

        if(!oldData) {
            res.status(404).json({message: 'Thương hiệu không tồn tại trong hệ thống'});
            return;
        }
        const olen = oldData.name_brand;    
        oldData.name_brand = data.name_brand;
        
        if (await BrandServices.update(oldData)) {
            res.status(201).json({message: `Sửa thương hiệu từ tên ${olen} sang ${data.name_brand} thành công`});
            return;
        }

        res.status(500).json({message: `Sửa thương hiệu từ tên ${olen} sang ${data.name_brand} không thành công vui lòng thử lại sau !!!`});

        return;
    }


    static store = async (req : Request, res : Response) => {
        const data = req.body;
        const tmp : brand = new brand(null, data.name_brand);
        // kiểm tra dữ liệu bắt buộc
        if (!data?.name_brand) {
            res.status(400).json({message: 'Thêm thương hiệu thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }
        if (await BrandServices.save(tmp)) {
            res.status(201).json({message: `Thêm thương hiệu ${data.name_brand} thành công !!!`});
            return;
        }

        res.status(500).json({message: `Thêm thương hiệu ${data.name_brand} thất bại vui lòng xem lại !!!`});
        return;
    }

    static delete = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);

        const br = await BrandServices.find(id);
        if (!br) {
            res.status(404).json({message: `Thương Hiệu Không Tồn Tại !!!`});
            return;
        }

        const soLuong : number = (await ProductService.getAll(` id_brand = ${id}`)).length;

        if(soLuong) {
            res.status(409).json({message: `Xóa thương hiệu thất bại, vì có ${soLuong} sản phẩm thuộc thương hiệu này !!!`});
            return;
        }

        // console.log(br)
        if (await BrandServices.destroy(id)) {
            // console.log('con cac')
            res.status(201).json({message: `Xóa thương hiệu ${br.name_brand} thành công`});
            return;
        }

        res.status(500).json({message: `Xóa thương hiệu ${br.name_brand} thất bại`});
        return;
    }

    static find = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);
        const tmp : brand = await BrandServices.find(id);
        if (!tmp) {
            res.status(404).json({message: 'Không tìm thấy thương hiệu nào cả'});
            return;
        }
        res.status(201).json(tmp);
    }
}

export default BrandController;