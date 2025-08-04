// const district = require('../../services/DistrictService');
import { Request, Response } from 'express';
import district from '../models/district';
import DistrictService from '../services/DistrictService';

class DistrictController {
    static getByProvinceID = async (req: Request, res: Response) => {
        const id_province : string = req.params.id_province;
        const listDistrict : district[] = await DistrictService.findByProvinceID(id_province);
        if(!listDistrict || listDistrict.length === 0) {
            res.status(404).json({ message: `Không tìm thấy quận nào trong tỉnh với id ${id_province}` });
            return;
        }
        res.status(201).json(listDistrict);
    }


    static getAll = async (req : Request , res : Response) => {
        const listDistrict : district[] = await DistrictService.getAll();
        res.status(201).json(listDistrict);
    }

    static find = async (req : Request , res : Response) => {
        const id : string = req.params.id;
        const districtData : district = await DistrictService.find(id);
        if (!districtData) {
            res.status(404).json({ message: `Không tìm thấy quận huyện với id ${id}` });
            return;
        }
        res.status(200).json(districtData);
    }
    


}

export default DistrictController