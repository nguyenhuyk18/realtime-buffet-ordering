import category from '../models/category';
import { Request, Response } from 'express';
import CategoryService from '../services/CategoryService';
// import ProductController from './ProductController';
import ProductService from '../services/ProductService';

class CategoryController {
    static index = async (req: Request, res: Response) => {
        const listCategory = await CategoryService.getAll();
        res.status(201).json(listCategory);
    }


    // sửa
    static update = async (req: Request, res: Response) => {
        const data = req.body;

        const oldCategory : category = await CategoryService.find(Number(data.id));

        // kiểm tra dữ liệu bắt buộc
        if (!data?.id || !data?.name_category) {
            res.status(400).json({ message: 'Cập nhật danh mục thất bại vì dữ liệu không hợp lệ !!!' });
            return;
        }
    

        if(!oldCategory) {
            res.status(404).json({ message: `Không tìm thấy danh mục với id ${data.id}` });
            return;
        }

        const oldName = oldCategory.name_category;
        oldCategory.name_category = data.name_category;


        if (await CategoryService.update(oldCategory)) {
            res.status(201).json({
                message: `Cập nhật danh mục ${oldName} sang ${oldCategory.name_category} thành công !!`,
            });
            return;
        }
        res.status(500).json({
            message: `Cập nhật danh mục ${oldName} sang ${oldCategory.name_category} thất bại vui lòng xem lại !!!`,
        });
    }


    // thêm
    static store = async (req : Request, res : Response) => {

        const data = req.body;

        // kiểm tra dữ liệu bắt buộc
        if (!data?.name_category) {
            res.status(400).json({ message: 'Thêm danh mục thất bại vì dữ liệu không hợp lệ !!!' });
            return;
        }

        const mcategory = new category(null, data.name_category);

        if (await CategoryService.save(mcategory)) {
            res.status(201).json({message : `Thêm danh mục ${data.name_category} thành công !!!!`})
            return;
        }
        res.status(500).json({ message : `Thêm danh mục ${data.name_category} thất bại vui lòng xem lại !!!` });
        return;
    }

    // Xóa
    static delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        // console.log(id)

        if (!(await CategoryService.find(id))) {
            res.status(404).json({message: `Tìm danh mục không thành công vui lòng xem lại !!!`});
            return;
        }

        // console.log(await ProductService.getAll(` id_category = ${id}`));
        const soLuong : number = (await ProductService.getAll(` id_category = ${id}`)).length;

        if(soLuong) {
            res.status(409).json({message: `Xóa danh mục không thành công, có ${soLuong} sản phẩm thuộc danh mục này !!`});
            return;
        }

        // console.log(br)
        if (await CategoryService.destroy(id)) {
            res.status(201).json({message: `Xóa danh mục thành công !!!`});
            return;
        }

        res.status(500).json({ message: `Xóa danh mục thất bại vui lòng thử lại sau !!!` });
        return;
    }

    static find = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const categoryFound = await CategoryService.find(id);

        if (!categoryFound) {
            res.status(404).json({ message: `Không tìm thấy danh mục với id ${id}` });
            return;
        }

        res.status(200).json(categoryFound);
    }

}

export default CategoryController;