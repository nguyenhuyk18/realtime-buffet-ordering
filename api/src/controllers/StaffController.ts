import { Request, Response } from 'express';
import staff from '../models/staff';
import StaffService from '../services/StaffService';
import bcrypt from 'bcrypt';
import path from 'path'


class StaffController {
    static index = async (req : Request, res : Response) => {
        const listStaff = await StaffService.getAll();
        res.status(201).json(listStaff);
        return;
    }

    static store = async (req : Request, res : Response) => {
        const data : any = req.body;

        // kiểm tra dữ liệu bắt buộc
        if(!data?.role_id || !data?.name || !data?.mobile || !data?.username || !data?.email) {
            res.status(400).json({message : 'Thêm nhân viên thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }

        if(typeof data.password == 'undefined') {
            data.password = '111';
        }

        // const password = '111';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;

        // Kiểm tra username
        const check = await StaffService.findByUsername(data.username);
        if (check) {
            res.status(409).json({message : 'Thêm nhân viên thất bại vì trùng username !!!'});
            return;
        }

        //kiểm tra email
        const checkEmail = await StaffService.findByEmail(data.email);
        if (checkEmail) {
            res.status(409).json({message : 'Thêm nhân viên thất bại vì trùng email !!!'});
            return;
        }


        const avatar = 'c21f969b5f03d33d43e04f8f136e7682.png';
        data.avatar = avatar;

        // mã hóa mật khẩu


        const tmp : staff = new staff(data.id, data.role_id, data.name, data.mobile, data.username, data.password, data.email, data.is_active, data.avatar);

        //thêm dữ liệu
        if (await StaffService.save(tmp)) {
            res.status(201).json({message : `Thêm nhân viên ${data.name} thành công`});
            return;
        }

        res.status(500).json({message : `Thêm nhân viên ${data.name} thất bại`});
        return;

    }

    static update = async (req : Request, res : Response) => {
        const data : any = req.body;

        // mã hóa mật khẩu
        if(typeof data.password == 'undefined') {
            data.password = '111';
        }
        // const password = '111';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;


        if(!data?.id || !data?.role_id || !data?.name || !data?.mobile || !data?.username || !data?.email) {
            res.status(400).json({message : 'Cập nhật nhân viên thất bại vì dữ liệu không hợp lệ !!!'});
            return;
        }

        const oldStaff = await StaffService.find(Number(data.id));

        if (!oldStaff) {
            res.status(404).json({message : 'Nhân viên không tồn tại'});
            return;
        }
        // console.log(await StaffService.findByUsername(data.username))

        // kiểm tra username
        if(data.username != oldStaff.username) {
            if (await StaffService.findByUsername(data.username)) {
                res.status(409).json({message : 'Cập nhật nhân viên thất bại vì trùng username !!!'});
                return;
            }
        }

        //kiểm tra email
        if(data.email != oldStaff.email) {
            if (await StaffService.findByEmail(data.email)) {
                res.status(409).json({message : 'Cập nhật nhân viên thất bại vì trùng email !!!'});
                return;
            }
        }



        // oldStaff.avatar = 'c21f969b5f03d33d43e04f8f136e7682.png';
        oldStaff.email = data.email;
        oldStaff.is_active = data.is_active;
        oldStaff.mobile = data.mobile;
        oldStaff.name = data.name;
        oldStaff.password = data.password;
        oldStaff.role_id = data.role_id;
        oldStaff.username = data.username;

        // lưu cập nhật
        if( await StaffService.update(oldStaff)) {
            res.status(201).json({message : `Cập nhật nhân viên ${oldStaff.name} thành công`});
            return;
        }

        res.status(500).json({message : `Cập nhật nhân viên ${oldStaff.name} thất bại`});
        return;

    }

    static delete = async (req : Request, res : Response) => {
        const id = Number(req.params.id);
        const mStaff = await StaffService.find(id);

        if (!mStaff) {
            res.status(404).json({message : 'Nhân viên không tồn tại trong hệ thống !!!'});
            return;
        }

        // xóa dữ liệu
        if (await StaffService.delete(id)) {
            res.status(201).json({message : `Xóa nhân viên ${mStaff.name} thành công`});
            return;
        }

        res.status(500).json({message : `Xóa nhân viên ${mStaff.name} thất bại, vui lòng thử lại sau !!!`});
        return;
    }

    static find = async (req : Request , res : Response) => {
        const id : number = Number(req.params.id);
        const mStaff : staff = await StaffService.find(id);

        if(!mStaff) {
            res.status(404).json({message : 'Mã nhân viên không hợp lệ !!!'});
            return;
        }

        res.status(201).json(mStaff);
    }

    static getImageStaff = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);
        const mStaff = await StaffService.find(id);

        if (!mStaff) {
            res.status(404).json({message : 'Nhân viên không tồn tại trong hệ thống !!!'});
            return;
        }

        const nameImage = mStaff.avatar;


        const imagePath : string = path.join(__dirname, '..', '..', 'public', 'images', 'avatarstaff', nameImage);
        res.sendFile(imagePath);
    }

    static uploadImageStaff = async (req : Request, res : Response) => {
        if(!req.file?.filename) {
            res.status(400).json({message : 'Vui lòng upload ảnh, không được upload các file khác !!!'});
            return;
        }


        const nameFile : string = req.file.filename;
        const id : number = Number(req.params.id);

        const mStaff : staff = await StaffService.find(id);

        mStaff.avatar = nameFile;

        if(await StaffService.update(mStaff)) {
            res.status(201).json({message : `Cập nhật ảnh nhân viên ${mStaff.name} thành công !!!`});
            return;
        }

        res.status(500).json({message : `Cập nhật ảnh cho nhân viên ${mStaff.name} không thành công, vui lòng thử lại sau !!!`});
        return;
    }
}



export default StaffController;