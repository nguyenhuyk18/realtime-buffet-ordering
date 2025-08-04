// const action = require('../../services/ActionService');
// const permission = require('../../services/PermissionService');
// const RoleService = require('../../services/RoleService');
// const role = require('../../services/RoleService');

import PermissionService from "../services/PermissionService";
import ActionService from "../services/ActionService";
import RoleService from "../services/RoleService";
import permission from "../models/permission";
import action from "../models/action";
import role from "../models/role";
import { Request , Response } from "express";

class PermissionController {
    static allActionOfRole = async (req : Request , res : Response) => {
        // id role
        const id : number = Number(req.params.id_role);
        // tìm kiếm role
        const mrole : role = await RoleService.find(id);

        // lấy ra các action của role đó
        const allpermissionofrole : permission[] = await PermissionService.findByRoleID(mrole.id);

        const actionOfRole : action[] = await Promise.all(allpermissionofrole.map( async row => {
            const tmp : action =  await ActionService.find(row.action_id);
            return tmp;
        }));

        res.status(201).json(actionOfRole)
    }

    static store = async (req, res) => {
        const data = req.body.permission; // array chứa các action_id
        const idrol = req.body.role_id;
        
        // console.log(data);
        // console.log(idrol);

        if(typeof data == 'undefined' || typeof idrol == 'undefined') {
            res.status(400).json({
                message: "Dữ liệu không hợp lệ 1"
            });
            return;
        }

        if( !data || !idrol) {
            res.status(400).json({
                message: "Dữ liệu không hợp lệ 2"
            });
            return;
        }

        // lay het permission cua role ra
        const checkRole = await RoleService.find(idrol);
        if(!checkRole) {
            res.status(404).json({
                message: "Không tìm thấy role"
            });
            return;
        }

        // xoa het permission cua role do
        const deletePermission = await PermissionService.deleteByRoleID(Number(idrol));
        if(!deletePermission) {
            res.status(500).json({
                message: "Xóa permission không thành công"
            });
            return;
        }

        // thêm vào permission mới
        for( const id_ac  of  data) {
            const tmp : permission = new permission(idrol , Number(id_ac))
            if(! (await PermissionService.save(tmp))) {
                res.status(500).json({
                    message: "Lưu permission không thành công"
                });
                return;
            }
        }

        res.status(201).json({
            message: "Cập nhật permission thành công !!!"
        });

    }
}


export default PermissionController;