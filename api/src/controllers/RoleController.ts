import role from "../models/role";
import { Request, Response } from 'express';
import RoleService from "../services/RoleService";
import StaffService from "../services/StaffService";
import staff from "../models/staff";

class RoleController {
    static index = async (req : Request, res : Response) => {
        const listRole : role[] = await RoleService.getAll();
        res.status(201).json(listRole)
    }

    static edit = async (req : Request, res : Response) => {
        const data : any = req.body;
        const oldData : role = await RoleService.find(Number(data.id));

        if(!data?.id || !data?.name_role) {
            res.status(400).json({message : 'Cập nhật vai trò thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }   

        if(!oldData) {
            res.status(404).json({message : 'Không tìm thấy vai trò'});
            return;
        }
        oldData.name_role = data.name_role;
        if(RoleService.update(oldData)) {
            res.status(201).json({message : `Cập nhật role ${oldData.name_role} thành công !!!`});
            return;
        }
        res.status(500).json({message : `Cập nhật role ${oldData.name_role} không thành công vui lòng thử lại sau !!!`});
    }

    static store = async (req : Request, res : Response) => {
        const data : any = req.body;

        // console.log(data.name_role);
        if(!data?.name_role) {
            res.status(400).json({message : 'Thêm role thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }

        const tmp = new role(null , data.name_role);

        if(await RoleService.save(tmp)) {
            res.status(201).json({message : `Thêm role ${tmp.name_role} thành công !!!`});
            return;
        }

        res.status(500).json({message : `Thêm role thất bại vui lòng thử lại sau !!!`});

    }

    static delete = async (req : Request, res : Response) => {
        const id = Number(req.params.id);
        // const mRole = new role();
        const tmp : role = await RoleService.find(id);
        if(!tmp) {
            res.status(404).json({message : 'Role không tồn tại trong hệ thống !!!'});
            return;
        }

        const staff : staff[] = await StaffService.getAll(` staff.role_id = ${id}`);

        if(staff.length) {
            res.status(500).json({message : `Xóa vai trò không thành công vì đang có ${staff.length} nhân viên thuộc vai trò này !!!`});
            return;
        }

        if(staff)

        if( await RoleService.destroy(id)) {
            res.status(201).json({message : `xóa role ${tmp.name_role} thành công !!!`});
            return;
        }

        res.status(500).json({message : `Role ${tmp.name_role} xóa không thành công , vui lòng thử lại sau !!!`});
        return;
    }

    static find = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);
        const rs : role = await RoleService.find(id);
        if(rs == null) {
            res.status(404).json({message : 'Không tìm thấy vai trò nào cả'});
            return;
        }
        res.status(201).json(rs);
    }


}

export default RoleController;