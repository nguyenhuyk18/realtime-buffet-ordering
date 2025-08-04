import PermissionService from "../services/PermissionService";
import ActionService from "../services/ActionService";
import RoleService from "../services/RoleService";
import StaffService from "../services/StaffService";
import permission from "../models/permission";
import action from "../models/action";
import CustomerService from "../services/CustomerService";
import ReservationService from "../services/ReservationService";
import role from "../models/role";
import staff from "../models/staff";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import customer from "../models/customer";
import { Request, Response } from "express";
// import CustomerService from "../services/CustomerService";
import reservation from "../models/reservation";
import TableService from "../services/TableService";
import table from "../models/table";

// type  pay {
//     role_id : 
// }

class AuthController {
    static loginToCallFood = async (req : Request , res : Response ) => {
        const data : any = req.body;

        // console.log(data)

        if(!data?.username || !data?.password ) {
            res.status(400).json({message : 'Thông tin đăng nhập không hợp lệ !!!'});
            return;
        }

        // 1 là đã đặt, 2 là Hủy, 3 là đã đến
        const mcustomer : customer = await CustomerService.findByUsername(data.username)
        if(!mcustomer) {
            res.status(400).json({ message : 'Tên username không tồn tại !!!' });
            return;
        }
        
        // console.log(bcrypt.compareSync(data.password , mcustomer.password))
        if(!bcrypt.compareSync(data.password , mcustomer.password)) {
            res.status(400).json({message : 'Mật khẩu bị sai vui lòng thử lại !!'});
            return;
        }  

        const allReservationOfCustomer = await ReservationService.getAll(` customer_id = ${mcustomer.id}`);
        
        let check : number = 0;
        let reser : reservation = null;

        for( const tmp of allReservationOfCustomer) {
            if(tmp.status == 1 || tmp.status == 3) {
                if(!tmp.is_cancle) {
                    check++;
                    reser = tmp;
                    break;
                }
            }
        }

        if(check) {
            const tableFound : table =  await TableService.find(reser.table_id);
            const object = {
                username : mcustomer.username,
                name_customer : mcustomer.name,
                type_buffet : reser.type_buffet,
                table_id : reser.table_id,
                floor_id : tableFound.floor_id
            }
            const payload = object;
            const token = jwt.sign(payload , process.env.KEY_JWT_CALL_FOOD , {expiresIn : "7d"} );
            res.status(201).json({ access_token :  token  });
            return;
        }

        res.status(404).json({ message : 'Đăng Nhập Không Thành Công !!!' });
        return;
    }


    static logoutCustomer = (req : Request , res : Response) => {
        res.clearCookie('client-login-site');
        res.status(201).json({message : 'Đăng Xuất Thành Công !!!'});
        return;
    }

    static InformationCustomer = async (req : Request , res : Response) => {
        const data = req.cookies['client-login-site'];
        // console.log(req.cookies)
        if(!data) {
            res.status(405).json({message : 'Bạn chưa đăng nhập !!!'});
            return;
        }

        try {
            const token = jwt.verify(data, process.env.KEY_JWT_CLIENT_SIDE);
            res.status(201).json(token);
            return
        } catch (error) {
            res.status(405).json({message : 'Token không hợp lệ !!!'});
            return
        }
    }

    static loginCustomer = async (req : Request , res : Response) => {
        const data = req.body;

        if( typeof data == 'undefined') {
            res.status(400).json({message : 'Thông tin đăng nhập không đầy đủ !!!'});
            return;
        }

        if( !data?.username || !data?.password ) {
            res.status(400).json({message : 'Thông tin đăng nhập không đầy đủ !!!'});
            return;
        }

        const mCustomer : customer = await CustomerService.findByUsername(data.username);

        if(!mCustomer) {
            res.status(404).json({message : 'không tìm thấy username của khách hàng !!!'});
            return;
        }

        if(!bcrypt.compareSync(data.password , mCustomer.password)) {
            res.status(400).json({message : 'Mật khẩu bị sai vui lòng thử lại !!'});
            return;
        }   

        const payload = {
            name : mCustomer.name,
            id : mCustomer.id
        }

        const generate_access_token = jwt.sign(payload , process.env.KEY_JWT_CLIENT_SIDE , { expiresIn : "7d" });

        // [3] Gửi token vào HttpOnly cookie
        res.cookie("client-login-site", generate_access_token, {
            httpOnly: true,
            sameSite: 'lax',      
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false
        });

        res.status(201).json({
            message : 'Đăng Nhập Thành Công Xin Chúc Mừng'
        });
    }

    static login = async (req : Request, res : Response) => {
        const data = req.body;

        if( typeof data == 'undefined') {
            res.status(400).json({message : 'Thông tin đăng nhập không đầy đủ !!!'});
            return;
        }

        if( !data?.email || !data?.password ) {
            res.status(400).json({message : 'Thông tin đăng nhập không đầy đủ !!!'});
            return;
        }


        const mstaff : staff = await StaffService.findByEmail(data.email);
        if(!mstaff) {
            res.status(404).json({message : 'Không tìm thấy email của nhân viên này !!!'});
            return;
        }

        // console.log(bcrypt.compareSync(data.password , mstaff.password));
        if(!bcrypt.compareSync(data.password , mstaff.password)) {
            res.status(400).json({message : 'Mật khẩu bị sai vui lòng thử lại !!'});
            return;
        }   

        const allpermission : permission[] = await PermissionService.findByRoleID(mstaff.role_id);
        // console.log(allpermission)

        if(!allpermission) {
            res.status(201).json({
                role_id : mstaff.role_id,
                fullname  : mstaff.name,
                name_action : []
            });
            return;
        }

        const allaction : string[] = await Promise.all( allpermission.map( async (row) => {
            const actionnew : action = await ActionService.find(row.action_id);
            return actionnew.name_action;
        }));

        const payload = {
            id : mstaff.id,
            role_id : mstaff.role_id,
            fullname  : mstaff.name,
            name_action : allaction
        }
        
        const generate_access_token = jwt.sign(payload , process.env.KEY_ACCESS_TOKEN , { expiresIn : "2h" });
        const generate_refresh_token = jwt.sign(payload , process.env.KEY_REFRESH_TOKEN , { expiresIn : '7d' });


        res.status(201).json({
            refresh_token : generate_refresh_token,
            access_token : generate_access_token
        });
    }


    static newTokenAccess = (req : Request, res : Response) => {
        const tmp  = req.headers['refresh-token'];

        // console.log('sdsdsds' , tmp)

        if(!tmp || Array.isArray(tmp) ) {
            res.status(407).json({message : 'refresh token kh ton tai !!!'});
            return;
        }

        const refreshToken : string = tmp;
        try {
            const payload : any = jwt.verify(refreshToken , process.env.KEY_REFRESH_TOKEN );
            const object = {
                id : payload.id,
                role_id : payload.role_id,
                fullname : payload.fullname,
                name_action : payload.name_action
            }
            
            const generate_access_token = jwt.sign(object , process.env.KEY_ACCESS_TOKEN , { expiresIn : "120s" });

            res.status(201).json({ access_token : generate_access_token });
            return;
        }catch(err) {
            console.log(err);
            res.status(405).json({message : 'Token het han hoac loi'});
            return;
        }

    }   

    static logout = (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Không thể xóa session');
            }
        });
        // console.log(1)
        res.redirect('/admin/login.html');
        return;
    }

}

export default   AuthController