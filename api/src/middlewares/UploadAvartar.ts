import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import StaffService from "../services/StaffService";
import staff from "../models/staff";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/avatarstaff');
    },
    filename: (req : Request, file, cb) => {
        const username = 'avatar';
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, username + '_' + uniqueSuffix + ext);
    },
});



const UploadAvatarStaff = multer({ 
    storage: storage , 
    fileFilter: (req : Request , file , cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        // Kiểm tra MIME type
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Chấp nhận file
        } else {
            cb(null, false); // Từ chối file
        }
    } 
});


const checkIDStaff = async (req : Request , res : Response , next : NextFunction ) => {
    const id : number = Number(req.params.id);
    const mStaff : staff = await StaffService.find(id);
    if(mStaff) {
        next();
        return;
    }

    res.status(404).json({message : 'Không tìm thấy nhân viên vui lòng thử lại sau !!!'});
    return;
}

export  {UploadAvatarStaff , checkIDStaff};