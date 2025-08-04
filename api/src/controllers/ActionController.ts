// const action = require('../../services/ActionService');
import { Request, Response } from 'express';
import mAction from '../services/ActionService'
import action from '../models/action';


class ActionController {
    static index = async (req : Request, res : Response) => {
        const listAction : Array<action> = await mAction.getAll();
        res.status(201).json(listAction);
    }

    static find = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id); 
        const rs : action = await mAction.find(id);
        if(rs == null) {
            res.status(404).json({message : 'Không tìm thấy user nào cả'});
            return
        }
        res.status(201).json(rs);
    }


}

export default ActionController
