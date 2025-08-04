import { Request, Response } from 'express';
import ward from '../models/ward'
import WardService from '../services/WardService';
// import {  }

class WardController {
    static getByDistrictID = async (req : Request , res : Response) => {
        const id_district : string = req.params.id_district;
        const listWard : ward[] = await WardService.findByDistrictID(id_district);
        if(!listWard || listWard.length === 0) {
            res.status(404).json({ message: `Không tìm thấy phường nào trong quận với id ${id_district}` });
            return;
        }
        res.status(201).json(listWard);
    }

    static getAll = async (req : Request , res : Response) => {
        const listWard : ward[] = await WardService.getAll();
        res.status(201).json(listWard);
    }

    static find = async (req : Request , res : Response) => {
        const id : string = req.params.id;
        const wardData : ward = await WardService.find(id);
        if (!wardData) {
            res.status(404).json({ message: `Không tìm thấy phường với id ${id}` });
            return;
        }
        res.status(200).json(wardData);
    }
}

export default WardController