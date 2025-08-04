import { Request, Response } from "express";
import province from "../models/province";
import ProvinceService from "../services/ProvinceService";

class ProvinceController {
    static getAll = async (req : Request, res : Response) => {
        const listProvince : province[] = await ProvinceService.getAll();
        res.status(201).json(listProvince);
    }

    static find = async (req : Request, res : Response) => {
        const id : string = req.params.id;
        const provinceData : province = await ProvinceService.find(id);
        if (!provinceData) {
            res.status(404).json({ message: `Không tìm thấy tỉnh với id ${id}` });
            return;
        }
        res.status(200).json(provinceData);
    }
}

export default ProvinceController