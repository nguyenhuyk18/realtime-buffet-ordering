import { Request, Response } from 'express';
import table from '../models/table';
import TableService from '../services/TableService';
import FloorService from '../services/FloorService';
import ReservationService from '../services/ReservationService';

class TableController {
    static getAll = async (req : Request, res : Response) => {
        const list : table[] = await TableService.getAll();
        
        res.status(201).json(list);
    }

    static findByID = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);
        
        const mtable : table = await TableService.find(id);

        if(!mtable) {
            res.status(404).json({message : `Không tìm thấy bàn với mã là ${id}`});
            return;
        }

        res.status(201).json(mtable);
    }

    static store = async (req : Request, res : Response) => {
        const data = req.body;

        if(!data?.name_table || !data?.capacity  || !data?.floor_id || !data?.status) {
            res.status(400).json({message : `Dữ liệu thêm không hợp lệ !!!`});
            return;
        }

        if(!await FloorService.find(data.floor_id)) {
            res.status(404).json({message : `Không tìm thấy tầng với mã là ${data.floor_id}`});
            return;
        }

        const tmp : table = new table(null, data.name_table, data.capacity, data.floor_id, data.status);

        if((await TableService.save(tmp))) {
            res.status(201).json({message : `Thêm bàn ${tmp.name_table} thành công !!`});
            return;
        }

        res.status(500).json({message : `Thêm bàn ${tmp.name_table} thất bại !!`});
    }

    static update = async (req : Request , res : Response) => {
        const data = req.body;

        if(!data.id || !data.name_table || !data.capacity || Number(data.capacity) < 0 || !data.floor_id || !data.status) {
            res.status(400).json({message : `Không thể cập nhật vì thiếu dữ liệu !!!`});
            return;
        }

        // Kiểm tra xem tầng có tồn tại không
        if(!await FloorService.find(data.floor_id)) {
            res.status(404).json({message : `Không tìm thấy tầng với mã là ${data.floor_id}`});
            return;
        }


        const oldData : table = await TableService.find(Number(data.id));
        // Kiểm tra xem có tìm thấy bàn cũ không
        if(!oldData) {
            res.status(404).json({message : `Không tìm thấy bàn với id là ${data.id}`});
            return;
        }

        oldData.name_table = data.name_table;
        oldData.capacity = data.capacity;
        oldData.floor_id = data.floor_id;
        oldData.status = data.status;

        if(await TableService.update(oldData)) {
            res.status(201).json({message : "Cập nhật bàn thành công !!"});
            return;
        }

        res.status(500).json({message : "Cập nhật bàn không thành công !!!"});
    }

    static delete = async (req : Request , res : Response) => {
        const id : number = Number(req.params.id);
        const oldData : table = await TableService.find(id);

        if(!oldData) {
            res.status(404).json({message : `Không tìm thấy bàn với id là ${id}`});
            return;
        }

        // console.log((await ReservationService.getAll(` table_id = ${id}`)).length);
        if((await ReservationService.getAll(` table_id = ${id}`)).length != 0 ) {
            res.status(404).json({message :  'Bàn này hiện đang được đặt, không thể xóa !!!'});
            return;
        }

        if(await TableService.delete(id)) {
            res.status(201).json({message : `Xoá bàn ${oldData.name_table} thành công !!`});
            return;
        }

        res.status(500).json({message : `Xoá bàn ${oldData.name_table} không thành công !!!`});
    }


    static findByFloorID = async (req : Request, res : Response) => {
        const floor_id : number = Number(req.params.floor_id);
        
        const tables : table[] = await TableService.findByFloorID(floor_id);

        if(!tables || tables.length === 0) {
            res.status(404).json({message : `Không tìm thấy bàn nào ở tầng với mã là ${floor_id}`});
            return;
        }

        res.status(201).json(tables);
    }
}

export default TableController;