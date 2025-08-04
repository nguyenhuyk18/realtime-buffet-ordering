import CallFoodService from "../services/CallFoodService";
import call_food from "../models/call_food";
import { Request , Response } from "express";


class CallFoodController {
    static getAll = async (req : Request, res : Response) => {
        const status = req.query.status || '';
        let cond = null
        if(status) {
            cond = ` call_food.status = ${status}`;
        }

        const listCallFood = await CallFoodService.getAll(cond);
        res.status(201).json(listCallFood);
    }


    static save = async (req : Request, res : Response) => {
        const data : any = req.body;

        const tmp : call_food = new call_food(null, data.id_food , data.id_table , data.status , data.number , null , null , null);

        if(await CallFoodService.save(tmp)) {
            res.status(201).json({message : 'Thêm Món Thành Công, Vui Lòng Đợi Nhé !!!'});
            return;
        }

        res.status(500).json({message : 'Lỗi Thêm Món Vui Lòng Thử Lại Sau Nhé !!!'});
        return;
    }


    static delete = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);

        if(await CallFoodService.delete(id)) {
            res.status(201).json({message : 'Xóa món ăn thành công yes sirrrr'});
            return;
        }

        res.status(500).json({message : 'Xóa món ăn không thành công !!!'});
        return;
    }

    static edit = async (req : Request , res : Response) => {
        const data : any = req.body;
        // console.log(data)
        const tmpFind : call_food =  await CallFoodService.find(Number(data.id));
        // console.log(tmpFind)
        tmpFind.id_food = data.id_food;
        tmpFind.id_table = data.id_table;
        tmpFind.number = data.number;
        tmpFind.status = data.status;

        if(await CallFoodService.update(tmpFind)) {
            res.status(201).json({message : 'cập nhật dữ liệu thành công !!!'});
            return;
        }
        res.status(500).json({message : 'Cập nhật dữ liệu không thành công !!!'});
        return;
    }

    static find = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);

        const tmp : call_food = await CallFoodService.find(id);

        if(tmp) {
            res.status(201).json(tmp);
            return;
        }

        res.status(500).json({message : 'Không tìm thấy id gọi món này !!!'});
        return;

    }
}

export default CallFoodController