import floor from "../models/floor";
import FloorService from "../services/FloorService";
import TableService from "../services/TableService";
import { Request , Response } from "express";

class FloorController {
    static getAll = async (req : Request, res : Response) => {
        const list : floor[] = await FloorService.getAll();
        res.status(201).json(list);
    }

    static findByID = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);
        
        const mfloor : floor = await FloorService.find(id);

        if(!mfloor) {
            res.status(404).json({message : `Không tìm thấy tầng với mã là ${id}`});
        }

        res.status(201).json(mfloor);
    }

    static store = async (req : Request, res : Response) => {
        const data = req.body;

        if(!data?.name_floor) {
            res.status(400).json({message : `Dữ liệu thêm không hợp lệ !!!`});
            return;
        }

        const tmp : floor = new floor( null, data.name_floor );

        if((await FloorService.save(tmp))) {
            res.status(201).json({message : `Thêm tầng ${tmp.name_floor} thành công !!`});
            return;
        }

        res.status(500).json({message : `Thêm tầng ${tmp.name_floor} thất bại !!`})
        // return;
    }


    static update = async (req : Request , res : Response) => {
        const data = req.body;

        if(!data?.id || !data?.name_floor) {
            res.status(400).json({message : `Không thể cập nhật vì thiếu dữ liệu !!!`});
            return;
        }

        const oldData : floor = await FloorService.find(Number(data.id));
        if(!oldData) {
            res.status(404).json({message : `Không tìm thấy tầng với id là ${data.id}`});
        }

        oldData.name_floor = data.name_floor;

        if(await FloorService.update(oldData)) {
            res.status(201).json({message : "Cập nhật tầng thành công !!"});
            return
        }

        res.status(500).json({message : "Cập nhật tầng không thành công !!!"});
    }

    static delete = async (req : Request , res : Response) => {
        const id : number = Number(req.params.id);
        const oldData : floor = await FloorService.find(id);
        if(!oldData) {
            res.status(404).json({message : `Không tìm thấy tầng với id là ${id}`});
            return;
        }

        const numberOfTable : number = (await TableService.findByFloorID(id)).length;
        if(numberOfTable) {
            res.status(404).json({message : `Xoá tầng ${oldData.name_floor} không thành công vì đang có ${numberOfTable} bàn !!`});
            return;
        }

        if(await FloorService.delete(id)) {
            res.status(201).json({message : `Xoá tầng ${oldData.name_floor} thành công !!`});
            return;
        }

        res.status(500).json({message : `Xoá tầng ${oldData.name_floor} không thành công !!!`});
    }


}

export default FloorController;